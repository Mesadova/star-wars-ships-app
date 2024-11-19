import { createGlobalStyle  } from 'styled-components'
import MainPageNav from './components/MainPageNav'
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './components/Home';
import RenderSingularStarship from './components/RenderSingularStarship.jsx'
import RenderShipCollection from './components/RenderShipCollection'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveKey } from './store/starshipsSlice.js';

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

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const activeKey = useSelector(selectActiveKey);

  useEffect(() => {
    navigate(activeKey)
  }, []);

  return (
    <>
      <GlobalStyle />
      <MainPageNav />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route element={<ProtectedRoute canActivate={isAuthenticated} />}>
          <Route path='/starships'>
              <Route index element={<RenderShipCollection />} />
              <Route path=':shipName' element={<RenderSingularStarship />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
