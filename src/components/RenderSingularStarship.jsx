import SingularStarship from './SingularStarship';
import { useDispatch, useSelector } from 'react-redux';
import { ShipsContainer } from './RenderShipCollection';
import { useParams } from 'react-router-dom';
import { selectStarshipsCollection, setStarshipToShow } from '../store/starshipsSlice.js'

const RenderSingularStarship = () => {
    const selectedStarship = useParams();
    const starshipsCollection = useSelector(selectStarshipsCollection);
    
    
    const starshipToRender = starshipsCollection.find((ship) => ship.name === selectedStarship.shipName);
    const dispatch = useDispatch();
    dispatch(setStarshipToShow(starshipToRender))

    const re = /\d+/g;
    const starshipId = JSON.stringify(starshipToRender.url).match(re);

    return (
        <ShipsContainer>
            <SingularStarship starshipId={starshipId} />
        </ShipsContainer>
    )
}

export default RenderSingularStarship