
import { fetchPeople, starshipToShow, peopleToShow, setPilotsNumbers, selectPilotsNumbers } from "../store/starshipsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { StarshipCard } from "./SingularStarship";


export const RenderPilots = () => {

    const starshipsToShow = useSelector(starshipToShow);
    const peoplesToShow = useSelector(peopleToShow);
    const pilotsNumbersToShow = useSelector(selectPilotsNumbers)
    console.log(starshipsToShow)
    const dispatch = useDispatch()

    
    const re = /\d+/g;


    useEffect(() => {
        if (starshipsToShow && starshipsToShow.pilots) {
            const pilotId = starshipsToShow.pilots.flatMap((element) => {
                dispatch(fetchPeople(element.match(re)))
                dispatch(setPilotsNumbers(element.match(re)))
            });
        }
    }, [starshipsToShow]);

    //const peoplesToShow = useSelector(peopleToShow);

    return(
        <>
            {peoplesToShow.map((element, index) => {
                return(
                <StarshipCard key={index}>
                    {pilotsNumbersToShow.map((element, index) => {
                        return(
                        <Row key={index}>
                            <Col>
                                <img id="pilotImage"
                                src={`https://starwars-visualguide.com/assets/img/characters/${element}.jpg`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', border: 'solid', borderWidth: '0 0 3px 0', borderColor: '#904b4b'}}
                                //onError={handleImageError}
                                />
                            </Col>
                        </Row>
                        )
                    })}
                    <Row >
                        <Col>
                            <p>{element}</p>
                        </Col>
                    </Row>
                </StarshipCard>
                )
            })}   
        </>
    )
}
