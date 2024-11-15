import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { ShipCardInfo } from "./ShipCollection";

export const StarshipCard = styled.div`
  border: solid;
  border-color: #23272b;
  border-weight: 1px;
  background-color: #212529;
  border-radius: 10px;
  color: #a1a09c;
  width: 160vh;
  font-size: 16px;
  padding: 20px;
`

export const StarshipBanner = styled.div`
  width: 160vh;
  border: solid;
  border-color: #a7a4a4;
  border-width: 2px 0 2px 0;
  margin-bottom: 15px;
  justify-content: start;
  padding: 2px;
  padding-left: 10px;
`

const SingularStarship = ({ starshipToRender, starshipId }) => {
  console.log(starshipId)

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  
  const handleImageError = () => {
    const img = document.getElementById('starshipImage');
    img.src = `../public/assets/${starshipId}.jpg`
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
            <ShipCardInfo $size='20px' $colorText='white' ><strong>{starshipToRender.name.toUpperCase()}</strong></ShipCardInfo>
            <ShipCardInfo>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus aliquet scelerisque. Duis magna nisi, egestas in nibh at, tristique condimentum sem.</ShipCardInfo>
            <Row>
              <Col>
                <ShipCardInfo><strong>{`Model: `}</strong>{`${starshipToRender.model}`}</ShipCardInfo>
                <ShipCardInfo><strong>{`Cost: `}</strong>{numberWithCommas(starshipToRender.cost_in_credits)} {`credits`}</ShipCardInfo>
                <ShipCardInfo><strong>{`Atmospheric speed: `}</strong>{`${starshipToRender.max_atmosphering_speed} km/h`}</ShipCardInfo>
              </Col>
              <Col>
                <ShipCardInfo><strong>{`Manufacturer: `}</strong>{`${starshipToRender.manufacturer}`}</ShipCardInfo>
                <ShipCardInfo><strong>{`Length: `}</strong>{`${starshipToRender.length} m`}</ShipCardInfo>
                <ShipCardInfo><strong>{`Crew: `}</strong>{`${starshipToRender.crew}`}</ShipCardInfo>
              </Col>
            </Row>
          </Col>
        </Row>
      </StarshipCard>
    </>
  )
}

export default SingularStarship