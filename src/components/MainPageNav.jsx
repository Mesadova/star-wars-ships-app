import { styled } from 'styled-components'
import { Tab, Tabs } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import { MainBanner } from './MainBanner.jsx'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectActiveKey, setActiveKey } from '../store/starshipsSlice.js'

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
  const activeKey = useSelector(selectActiveKey);
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === '/home' || location.pathname === '/starships') {
      dispatch(setActiveKey(location.pathname));
    }
  }, [location]);
  
  const handleSelect = (eventKey) => {
    dispatch(setActiveKey(eventKey))
    navigate(eventKey);
  }

  return (
    <>
      <MainBanner />
      <TabsWrapper>
        <Tabs id="main-menu-tabs" activeKey={activeKey} onSelect={handleSelect} >
          <Tab eventKey="/home" title="HOME" />
          <Tab eventKey="/starships" title="STARSHIPS" />
        </Tabs>
      </TabsWrapper>
    </>
  )
}

export default MainPageNav
