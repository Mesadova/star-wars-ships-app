import { fetchPilotsNames, selectStarshipToShow, selectPilotsNames, setPilotsNumbers, selectPilotsNumbers } from "../store/starshipsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { StarshipCard } from "./SingularStarship";
import { ShipsContainer } from "./RenderShipCollection";
import { ShipCardInfo } from "./ShipCollection";


export const RenderPilots = () => {
    const dispatch = useDispatch();

    const starshipsToShow = useSelector(selectStarshipToShow);
    const pilotsNamesToShow = useSelector(selectPilotsNames);
    const pilotsNumbersToShow = useSelector(selectPilotsNumbers);
    
    const re = /\d+/g;

    useEffect(() => {
        const fetchSequentially = async () => {
            for (const value of starshipsToShow.pilots) {
                await dispatch(fetchPilotsNames(value.match(re)))
            } 
        };
        fetchSequentially();
    }, [dispatch]);

    useEffect(() => {
        starshipsToShow.pilots.flatMap((element) => {
            dispatch(setPilotsNumbers(element.match(re)))
        });
    }
    , []);


    return(
        <ShipsContainer $direction='row' $alignment='start' style={{maxWidth: '180vh', minWidth: '180vh'}}>
            {pilotsNumbersToShow.map((element, index) => {
                return(
                    <StarshipCard className="pilots" key={index} style={{justifyText: 'center'}}>
                        <Row key={index}>
                            <Col>
                                <img id="pilotImage"
                                src={`https://starwars-visualguide.com/assets/img/characters/${element}.jpg`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', border: 'solid', borderWidth: '0 0 3px 0', borderColor: '#904b4b'}}
                                //onError={handleImageError}
                                />
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <ShipCardInfo $alignment='center' >{pilotsNamesToShow[index]}</ShipCardInfo>
                            </Col>
                        </Row>
                    </StarshipCard>
                )
            })}   
        </ShipsContainer>
    )
}
