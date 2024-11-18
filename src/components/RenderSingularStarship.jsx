import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ShipsContainer } from './RenderShipCollection';
import SingularStarship from './SingularStarship';
import { selectStarshipsCollection, setStarshipToShow } from '../store/starshipsSlice.js'

const RenderSingularStarship = () => {
    const dispatch = useDispatch();
    const { shipName } = useParams();

    const starshipsCollection = useSelector(selectStarshipsCollection);
    
    const starshipToRender = starshipsCollection.find((ship) => ship.name === shipName);
    
    useEffect(() => {
        if (starshipToRender) {
            dispatch(setStarshipToShow(starshipToRender));
        } else {
            console.warn('Starship to render is undefined');
        }
    }, [dispatch, starshipToRender]);

    const re = /\d+/g;
    const starshipId = JSON.stringify(starshipToRender?.url).match(re);

    return (
        <ShipsContainer>
            {starshipToRender ? (
                <SingularStarship starshipId={starshipId} />
            ) : (
                <p>Starship not found</p>
            )}
        </ShipsContainer>
    )
}

export default RenderSingularStarship