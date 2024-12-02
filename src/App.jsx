import { createGlobalStyle  } from 'styled-components'
import MainPageNav from './components/MainPageNav'
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './components/Home';
import RenderSingularStarship from './components/RenderSingularStarship.jsx'
import RenderShipCollection from './components/RenderShipCollection'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveKey } from './store/starshipsSlice.js';
import { LoginModal } from "./components/LoginModal";
import { RegisterModal } from "./components/RegisterModal";

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
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  useEffect(() => {
    navigate(activeKey)
  }, []);

  return (
    <>
      <GlobalStyle />
      <MainPageNav setShowLoginModal={setShowLoginModal} setShowRegisterModal={setShowRegisterModal} />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route element={<ProtectedRoute canActivate={isAuthenticated} setShowLoginModal={setShowLoginModal}/>}>
            <Route path='/starships'>
                <Route index element={<RenderShipCollection />} />
                <Route path=':shipName' element={<RenderSingularStarship />} />
            </Route>
          </Route>
        </Routes>
        <LoginModal show={showLoginModal} setShowLoginModal={setShowLoginModal} onHide={() => setShowLoginModal(false)} />
        <RegisterModal show={showRegisterModal} setShowRegisterModal={setShowRegisterModal} onHide={() => setShowRegisterModal(false)} />
    </>
  )
}

export default App
