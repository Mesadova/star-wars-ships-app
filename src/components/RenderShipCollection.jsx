import { styled } from 'styled-components'
import ShipCollection from './ShipCollection'
import { useSelector } from 'react-redux'
import { useCallback, useRef } from 'react'

export const ShipsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const RenderShipCollection = () => {
  const starships = useSelector((state) => state.starships.starships);
  const hasMore = useSelector((state) => state.starships.hasMore);
  const loading = useSelector((state) => state.starships.loading);

  const observer = useRef()
  const lastShipElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('Visible')
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  return (
    <ShipsContainer>
      {starships.map((element, index) => {
        if (starships.length === index + 1) {
          console.log(element.name)
          return (
            <div ref={lastShipElementRef} key={index}>
              <ShipCollection key={index} index={index} shipName={element.name} shipModel={element.model} />
            </div>
          )
        } else {
          return <ShipCollection key={index} index={index} shipName={element.name} shipModel={element.model} />
        }
      })}
    </ShipsContainer>
  )
}

export default RenderShipCollection
