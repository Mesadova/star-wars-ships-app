import { useNavigate } from "react-router-dom"

export const MainBanner = () => {
  const navigate = useNavigate();
    
  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/login')
  }
  const handleRegister = (e) => {
    e.preventDefault()
    navigate('/register')
  }

    return(
        <>
            <div style={{display: 'flex', justifyContent: 'center', }}>
                <img src="../public/assets/logo.png" style={{width: '15%', marginBottom: '40px', marginTop: '20px'}}></img>
            </div>
            <button onClick={handleLogin}>LOGIN</button>
            <button onClick={handleRegister}>REGISTER</button>
        </>
    )
}