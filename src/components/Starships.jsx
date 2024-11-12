import { useState, useEffect } from 'react'
import axios from 'axios'
import { styled } from 'styled-components'
import RenderShipCard from './RenderShipCard'


export const ShipsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const Starships = () => {
  const [shipCollection, setShipCollection] = useState([])

  useEffect(() => {
    console.log('effect')    
    axios      
    .get('https://swapi.dev/api/starships')      
    .then(response => {
      console.log(response.data.results)
      setShipCollection(response.data.results)})  
    }, [])

  return (
    <ShipsContainer>
      {shipCollection.map((element, index) => {
        console.log(element.name)
        return (
          <RenderShipCard key={index} shipName={element.name} shipModel={element.model}></RenderShipCard>
        )
      })}
    </ShipsContainer>
  )
}

export default Starships
