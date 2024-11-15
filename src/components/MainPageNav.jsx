import { styled, createGlobalStyle  } from 'styled-components'
import { Tab, Tabs } from 'react-bootstrap'
import { Route, Routes, useNavigate } from 'react-router-dom'
import RenderSingularStarship from './RenderSingularStarship.jsx'
import RenderShipCollection from './RenderShipCollection'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchStarships } from '../store/starshipsSlice.js'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #0a0b0b;
    color: #aaa;
    letter-spacing: 0.15px;
    font-weight: 500;
    font-size: 22px;
    font-family: "Michroma", sans-serif;
  }
  p {
    font-family: "Michroma", sans-serif;
  }
`

export const TabsWrapper = styled.div.attrs(props => ({
  $divWidth: props.$divWidth || 'auto',
}))`
  width: ${props => props.$divWidth};
  & .nav {
    border: solid;
    border-color: #a7a4a4;
    border-width: 3px 0 3px 0;
    margin-bottom: 25px;
    justify-content: center;
  }
  & .nav-link {
    color: #a7a4a4;
  }
  & .nav-link:hover, .nav-link:focus, .nav-link:not(:focus) {
    border: solid;
    border-color: #a7a4a4;
    border-width: 0 1px 0 1px;
    border-radius: 0px;
  }
  & .nav-link:hover {
    color: white;
  }
  & .nav-tabs .active, .nav-link .active {
    box-shadow: 0 2px 0 #215395;
    border: solid;
    border-width: 0 1px 0 1px;
    border-color: #a7a4a4;
    background-color: #0a0b0b;
    border-radius: 0px;
    color: white;
  }
`

const MainPageNav = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStarships());
  }, []);

  const navigate = useNavigate();
  const handleSelect = (eventKey) => {
    navigate(eventKey); 
  };

  return (
    <>
      <GlobalStyle />
      <div style={{display: 'flex', justifyContent: 'center', }}>
        <img src="../public/assets/logo.png" style={{width: '15%', marginBottom: '40px', marginTop: '20px'}}></img>
      </div>
      <TabsWrapper>
        <Tabs defaultActiveKey="/home" id="main-menu-tabs" onSelect={handleSelect} >
          <Tab eventKey="/home" title="HOME">
            <Routes>
              <Route path='/home' element={<p>TEST</p>} />
            </Routes>
          </Tab>
          <Tab eventKey="/starships" title="STARSHIPS">
            <Routes>
                <Route path='/starships'>
                    <Route index element={<RenderShipCollection />} />
                    <Route path=':shipName' element={<RenderSingularStarship />} />
                </Route>
            </Routes>
          </Tab>
        </Tabs>
      </TabsWrapper>
    </>
  )
}

export default MainPageNav
