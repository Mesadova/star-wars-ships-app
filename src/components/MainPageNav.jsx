import { styled } from 'styled-components'
import { Tab, Tabs } from 'react-bootstrap'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import RenderSingularStarship from './RenderSingularStarship.jsx'
import RenderShipCollection from './RenderShipCollection'
import { ProtectedRoute } from './ProtectedRoute.jsx'
import { MainBanner } from './MainBanner.jsx'
import Home from './Home.jsx'
import { useState, useEffect } from 'react'

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
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(location.pathname);

  useEffect(() => {
    setActiveKey(location.pathname);
  }, [location]);

  
  const isAuthenticated = !!localStorage.getItem("token");

  const handleSelect = (eventKey) => {
    setActiveKey(eventKey)
    navigate(eventKey); 
  }

  return (
    <>
      <MainBanner />
      <TabsWrapper>
        <Tabs id="main-menu-tabs" activeKey={activeKey} onSelect={handleSelect} >
          <Tab eventKey="/home" title="HOME">
            <Routes>
              <Route path='/home' element={<Home />} />
            </Routes>
          </Tab>
          <Tab eventKey="/starships" title="STARSHIPS" className={'tab'}>
            <Routes>
              <Route element={<ProtectedRoute canActivate={isAuthenticated} />}>
                <Route path='/starships'>
                    <Route index element={<RenderShipCollection />} />
                    <Route path=':shipName' element={<RenderSingularStarship />} />
                </Route>
              </Route>
            </Routes>
          </Tab>
        </Tabs>
      </TabsWrapper>
    </>
  )
}

export default MainPageNav
