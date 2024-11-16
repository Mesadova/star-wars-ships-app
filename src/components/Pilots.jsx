import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { peopleToShow } from "../store/starshipsSlice";

const Pilots = ({ idImage}) => {
    const namesOfPilots = useSelector(peopleToShow);

    return(
        <>
        {idImage.map((element) => {
            <Row>
            <Col>
                <img id="pilotImage"
                src={`https://starwars-visualguide.com/assets/img/characters/${element}.jpg`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', border: 'solid', borderWidth: '0 0 3px 0', borderColor: '#904b4b'}}
                //onError={handleImageError}
                />
            </Col>
        </Row>
        })}
        {namesOfPilots.map((element) => {
        <Row>
            <Col>
                <p>{element}</p>
            </Col>
        </Row>
        })}   
        </>
    )
}

export default Pilots