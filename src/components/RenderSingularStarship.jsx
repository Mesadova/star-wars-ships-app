import SingularStarship from './SingularStarship';
import { useSelector } from 'react-redux';
import { ShipsContainer } from './RenderShipCollection';
import { useParams } from 'react-router-dom';

const RenderSingularStarship = () => {
    const selectedStarship = useParams();
    
    const starships = useSelector((state) => state.starships.starships);
    
    const starshipToRender = starships.find((ship) => ship.name === selectedStarship.shipName);
    const starshipId = (starshipToRender.url).slice(-2, -1);

    return (
        <ShipsContainer>
                <SingularStarship starshipToRender={starshipToRender} starshipId={starshipId} />
        </ShipsContainer>
    )
}

export default RenderSingularStarship