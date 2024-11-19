import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const BannerWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: end;
`

export const StarshipButton = styled.button`
    border-radius: 10px;
    padding: 10px;
    font-size: 19px;
    font-weight: 600;
    background-color: #212529;
    color: white;
    border: solid;
    border-color: #a1a09c;
    border-weight: 1px;
    overflow: hidden;

    &:hover {
        color: yellow;
    }
`

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
        <BannerWrapper>
                <div style={{gridColumn: 2, textAlign: 'center', marginRight: '30px'}}>
                    <img src="../src/assets/logo.png" style={{width: '80%', height: '80%', marginBottom: '40px', marginTop: '20px'}}></img>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center', gap: '10px', marginTop: '80px', alignItems: 'center', gridColumn: 3 }}>
                    <StarshipButton onClick={handleLogin}>LOGIN</StarshipButton>
                    <StarshipButton onClick={handleRegister}>REGISTER</StarshipButton>
                </div>
        </BannerWrapper>
    )
}