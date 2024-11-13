import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const ShipCard = styled.div`
    display: box;
    background-color: #1c1c1c;
    color: #a7a4a4;
    border-radius: 10px;
    justify-content: center;
    padding: 15px;
    width: 50%;
    margin: 0;
    cursor: pointer;
`

const ShipCardInfo = styled.p`
    display: block;
    height: 100%;
    width: 100%;
    color: #a7a4a4;
    justify-content: start;
    margin: 0;
`

const ShipCollection = ({shipName, shipModel, index }) => {

    const navigate = useNavigate();
    const handleClick = (e, index, shipName) => {
        navigate(`${shipName}`);
    };

    return(
        <ShipCard onClick={(e) => handleClick(e, index, shipName)} value={index}>
            <ShipCardInfo>{shipName.toUpperCase()}</ShipCardInfo>
            <ShipCardInfo>{shipModel}</ShipCardInfo>
        </ShipCard>
    )
}

export default ShipCollection