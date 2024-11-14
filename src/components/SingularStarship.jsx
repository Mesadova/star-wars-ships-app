import { Row, Col } from "react-bootstrap";
import styled from "styled-components";

export const StarshipCard = styled.div`
  border: solid;
  border-color: #111315;
  border-weight: 1px;
  background-color: #212529;
  border-radius: 10px;
  color: #a1a09c;
  width: 180vh;
  font-size: 16px;
  padding: 20px;

`

const SingularStarship = ({ starshipToRender, starshipId }) => {
  
  return (
    <>
    <div>STARSHIP</div>
    <StarshipCard style={{margins: '0px', padding: '0px', overflow: 'hidden'}} >
      <Row >
        <Col >
          <img src={`https://starwars-visualguide.com/assets/img/starships/${starshipId}.jpg`}
          style={{ width: '100%', height: '100%', objectFit: 'cover'}}
          ></img>
        </Col>
        <Col>
          <p>{starshipToRender.name}</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus aliquet scelerisque. Duis magna nisi, egestas in nibh at, tristique condimentum sem.</p>
          <Row>
            <Col>
              <p>{`Model: ${starshipToRender.crew}`}</p>
              <p>{`Cost in credits: ${starshipToRender.cost_in_credits}`}</p>
              <p>{`Atmospheric speed: ${starshipToRender.max_atmosphering_speed}`}</p>
            </Col>
            <Col>
              <p>{`Manufacturer: ${starshipToRender.manufacturer}`}</p>
              <p>{`Length: ${starshipToRender.length}`}</p>
              <p>{`Crew: ${starshipToRender.crew}`}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </StarshipCard>
    </>
  )
}

export default SingularStarship