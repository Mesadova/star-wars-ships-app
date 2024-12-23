import { fetchFilmsNames, selectStarshipToShow, selectFilmsNames, setFilmsNumbers, selectFilmsNumbers } from "../store/starshipsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { StarshipCard } from "./SingularStarship";
import { ShipsContainer } from "./RenderShipCollection";
import { ShipCardInfo } from "./ShipCollection";


export const RenderFilms = () => {
    const dispatch = useDispatch();

    const starshipsToShow = useSelector(selectStarshipToShow);
    const filmsNamesToShow = useSelector(selectFilmsNames);
    const filmsNumbersToShow = useSelector(selectFilmsNumbers);
    
    const re = /\d+/g;

    useEffect(() => {
        const fetchSequentially = async () => {
            for (const value of starshipsToShow.films) {
                await dispatch(fetchFilmsNames(value.match(re)))
            } 
        };
        fetchSequentially();
    }, [dispatch]);

    useEffect(() => {
        starshipsToShow.films.flatMap((element) => {
            dispatch(setFilmsNumbers(element.match(re)))
        });
    }, []);


    return(
        <ShipsContainer $direction='row' $alignment='start' style={{width: '80%'}}>
            {filmsNumbersToShow.map((element, index) => {
                return(
                    <StarshipCard className="pilots" key={index} style={{justifyText: 'center'}}>
                        <Row key={index}>
                            <Col>
                                <img id="pilotImage"
                                src={`https://starwars-visualguide.com/assets/img/films/${element}.jpg`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', border: 'solid', borderWidth: '0 0 3px 0', borderColor: '#904b4b'}}
                                //onError={handleImageError}
                                />
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                            {filmsNamesToShow[index] && (
                                <>
                                    <ShipCardInfo $alignment='center'>{(filmsNamesToShow[index].title).toUpperCase()}</ShipCardInfo>
                                    <ShipCardInfo $alignment='center'>Episode {filmsNamesToShow[index].episode_id}</ShipCardInfo>
                                </>
                            )}
                            </Col>
                        </Row>
                    </StarshipCard>
                )
            })}   
        </ShipsContainer>
    )
}
