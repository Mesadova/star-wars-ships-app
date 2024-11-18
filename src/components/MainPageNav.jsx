import { styled } from 'styled-components'
import { Tab, Tabs } from 'react-bootstrap'
import { Route, Routes, useNavigate } from 'react-router-dom'
import RenderSingularStarship from './RenderSingularStarship.jsx'
import RenderShipCollection from './RenderShipCollection'
import { ProtectedRoute } from './ProtectedRoute.jsx'
import { MainBanner } from './MainBanner.jsx'

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
  const isAuthenticated = !!localStorage.getItem("token");

  const handleSelect = (eventKey) => {
    navigate(eventKey); 
  }

  return (
    <>
      <MainBanner />
      <TabsWrapper>
        <Tabs id="main-menu-tabs" onSelect={handleSelect} >
          <Tab eventKey="/home" title="HOME">
            <Routes>
              <Route path='/home' element={<p>TEST</p>} />
            </Routes>
          </Tab>
          <Tab eventKey="/starships" title="STARSHIPS">
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
