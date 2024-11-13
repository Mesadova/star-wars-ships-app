import { styled, createGlobalStyle  } from 'styled-components'
import { Tab, Tabs } from 'react-bootstrap'
import { Route, Routes, useNavigate } from 'react-router-dom'
import RenderSingularStarship from './RenderSingularStarship.jsx'
import RenderShipCollection from './RenderShipCollection'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchStarships } from '../store/starshipsSlice.js'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Matterhorn Regular', sans-serif;
    background-color: #0a0b0b;
    color: #aaa;
    letter-spacing: 0.15px;
    font-weight: 500;
    font-size: 22px;
  }
`

const TabsWrapper = styled.div`
  & .nav {
    border: solid;
    border-color: #a7a4a4;
    border-width: 3px 0 3px 0;
    justify-content: center;
    margin-bottom: 25px;
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
  }, [dispatch]);

  const navigate = useNavigate();
  const handleSelect = (eventKey) => {
    navigate(eventKey); 
  }; 

  return (
    <div>
      <GlobalStyle />
      <div style={{display: 'flex', justifyContent: 'center', }}>
        <img src="../public/assets/logo.png" style={{width: '15%', marginBottom: '40px', marginTop: '20px'}}></img>
      </div>
      <TabsWrapper>
        <Tabs defaultActiveKey="/home" id="main-menu-tabs" onSelect={handleSelect} >
          <Tab eventKey="/home" title="HOME">
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
    </div>
  )
}

export default MainPageNav
