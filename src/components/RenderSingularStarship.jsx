import SingularStarship from './SingularStarship';
import { useSelector } from 'react-redux';
import { ShipsContainer } from './RenderShipCollection';
import { useParams } from 'react-router-dom';
import { selectStarships } from '../store/starshipsSlice';

const RenderSingularStarship = () => {
    const selectedStarship = useParams();
    const starships = useSelector(selectStarships);
    
    const starshipToRender = starships.find((ship) => ship.name === selectedStarship.shipName);
    const re = /\d+/g;
    const starshipId = JSON.stringify(starshipToRender.url).match(re);

    return (
        <ShipsContainer>
                <SingularStarship starshipToRender={starshipToRender} starshipId={starshipId} />
        </ShipsContainer>
    )
}

export default RenderSingularStarship