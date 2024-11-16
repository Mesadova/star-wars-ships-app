import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { forwardRef } from "react";

export const ShipCard = styled.div`
    display: box;
    background-color: #1c1c1c;
    color: #a7a4a4;
    border-radius: 10px;
    justify-content: center;
    padding: 15px;
    width: 50%;
    margin: 0;
    cursor: pointer;
`;

export const ShipCardInfo = styled.p.attrs(props => ({
    type: "text",
    $size: props.$size || '15px',
    $colorText: props.$colorText || '#a7a4a4',
}))`
    font-size: ${props => props.$size};
    align: left;
    color: ${props => props.$colorText};
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-right: 0.5em;
`;

const ShipCollection = forwardRef(({ shipName, shipModel, index }, ref) => {
    const navigate = useNavigate();
    const handleClick = (shipName) => {
        navigate(`${shipName}`);
    };

    return (
        <ShipCard onClick={(e) => handleClick(shipName)} value={index} ref={ref}>
            <ShipCardInfo>{shipName.toUpperCase()}</ShipCardInfo>
            <ShipCardInfo>{shipModel}</ShipCardInfo>
        </ShipCard>
    );
});

ShipCollection.displayName = "ShipCollection";

export default ShipCollection;