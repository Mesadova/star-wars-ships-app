import { styled } from 'styled-components'
import ShipCollection from './ShipCollection'
import { useSelector } from 'react-redux'


export const ShipsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const RenderShipCollection = () => {
  const starships = useSelector((state) => state.starships.starships);

  return (
    <ShipsContainer>
      {starships.map((element, index) => {
        return (
          <ShipCollection key={index} index={index} shipName={element.name} shipModel={element.model} />
        )
      })}
    </ShipsContainer>
  )
}

export default RenderShipCollection
