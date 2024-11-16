import { styled } from 'styled-components'
import ShipCollection from './ShipCollection'
import { useSelector, useDispatch } from 'react-redux'
import { useCallback, useRef, useState, useEffect } from 'react'
import { fetchStarships } from '../store/starshipsSlice.js'
import { selectStarshipsCollection, selectHasMore, selectLoading, reset } from '../store/starshipsSlice.js'

export const ShipsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const RenderShipCollection = () => {
  const [pageNumber, setPageNumber] = useState(1)

  const starshipsCollection = useSelector(selectStarshipsCollection);
  const hasMore = useSelector(selectHasMore);
  const loading = useSelector(selectLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset())
    dispatch(fetchStarships(pageNumber));
  }, []);

  const observer = useRef()
  const lastShipElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        const newPageNumber = pageNumber + 1
        setPageNumber(newPageNumber)
        dispatch(fetchStarships(newPageNumber));
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  return (
    <ShipsContainer>
      {starshipsCollection.map((element, index) => {
        if (starshipsCollection.length === index + 1) {
          return <ShipCollection key={index} index={index} shipName={element.name} shipModel={element.model} ref={lastShipElementRef}/>
        } else {
          return <ShipCollection key={index} index={index} shipName={element.name} shipModel={element.model} />
        }
      })}
      <div>{loading && 'Loading...'}</div>
    </ShipsContainer>
  )
}

export default RenderShipCollection
