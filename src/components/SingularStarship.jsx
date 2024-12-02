import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { ShipCardInfo } from "./ShipCollection";
import { selectStarshipToShow } from "../store/starshipsSlice";
import { useSelector } from "react-redux";
import { RenderPilots } from "./RenderPilots";
import { RenderFilms } from "./RenderFilms";

export const StarshipCard = styled.div`
  border: solid;
  border-color: #23272b;
  border-weight: 1px;
  background-color: #212529;
  border-radius: 10px;
  color: #a1a09c;
  width: 80%;
  font-size: 16px;
  margins: 0px;
  padding: 0px;
  overflow: hidden;

  &.pilots {
    width: 40%;
    align-items: center;
  }
`

export const StarshipBanner = styled.div`
  width: 80%;
  border: solid;
  border-color: #a7a4a4;
  border-width: 2px 0 2px 0;
  margin-bottom: 15px;
  justify-content: start;
  padding: 2px;
  padding-left: 10px;
`

const SingularStarship = ({ starshipId }) => {

  const starshipsToShow = useSelector(selectStarshipToShow);
  if (!starshipsToShow || !starshipsToShow.name) {
    return <div>Loading...</div>;
  }

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  const handleImageError = () => {
    const img = document.getElementById('starshipImage');
    img.src = `../src/assets/${starshipId}.jpg`;
  }
  
  return (
    <>
      <StarshipBanner>
        <ShipCardInfo $size='20px' $align='left' $colorText='white'>STARSHIP</ShipCardInfo>
      </StarshipBanner>
      <StarshipCard style={{margins: '0px', padding: '0px', overflow: 'hidden'}} >
        <Row >
          <Col >
            <img id="starshipImage"
              src={`https://starwars-visualguide.com/assets/img/starships/${starshipId}.jpg`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', border: 'solid', borderWidth: '0 3px 0 0', borderColor: '#904b4b'}}
              onError={handleImageError}
            />
          </Col>
          <Col>
            <ShipCardInfo $size='20px' $colorText='white' ><strong>{starshipsToShow.name.toUpperCase()}</strong></ShipCardInfo>
            <ShipCardInfo>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus aliquet scelerisque. Duis magna nisi, egestas in nibh at, tristique condimentum sem.</ShipCardInfo>
            <Row>
              <Col>
                <ShipCardInfo><strong>{`Model: `}</strong>{`${starshipsToShow.model}`}</ShipCardInfo>
                <ShipCardInfo><strong>{`Cost: `}</strong>{numberWithCommas(starshipsToShow.cost_in_credits)} {`credits`}</ShipCardInfo>
                <ShipCardInfo><strong>{`Atmospheric speed: `}</strong>{`${starshipsToShow.max_atmosphering_speed} km/h`}</ShipCardInfo>
              </Col>
              <Col>
                <ShipCardInfo><strong>{`Manufacturer: `}</strong>{`${starshipsToShow.manufacturer}`}</ShipCardInfo>
                <ShipCardInfo><strong>{`Length: `}</strong>{`${starshipsToShow.length} m`}</ShipCardInfo>
                <ShipCardInfo><strong>{`Crew: `}</strong>{`${starshipsToShow.crew}`}</ShipCardInfo>
              </Col>
            </Row>
          </Col>
        </Row>
      </StarshipCard>
      <StarshipBanner>
        <ShipCardInfo $size='20px' $align='left' $colorText='white'>PILOTS</ShipCardInfo>
      </StarshipBanner>
      <RenderPilots />
      <StarshipBanner>
        <ShipCardInfo $size='20px' $align='left' $colorText='white'>FILMS</ShipCardInfo>
      </StarshipBanner>
      <RenderFilms />
    </>
  )
}

export default SingularStarship