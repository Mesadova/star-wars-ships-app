import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalStyle } from "../App";
import { StarshipButton } from "./MainBanner";
import { ShipCardInfo } from "./ShipCollection";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setActiveKey } from "../store/starshipsSlice";

export const FormWrapper = styled.div`
    display: flex;
    gap: 10px;
    padding: 5px;
    align-items: center;
`

export const StyledInput = styled.input`
    border-radius: 10px;
`

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        await axios.post("https://reqres.in/api/login", {
                email,
                password,
        })
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            dispatch(setActiveKey('/starships'));
            navigate("/starships");
        })
        .catch((error) => {
            setError(error);
            console.log(error);
        })
    };
    const backHome = () => {
        dispatch(setActiveKey('/home'));
        navigate("/home")
    }

    return (
        <div style={{padding: '30px'}}>
            <div>
                <GlobalStyle />
                <FormWrapper>
                    <ShipCardInfo $size='35px' $colorText='yellow' >Login</ShipCardInfo>
                    <ShipCardInfo>( email: "eve.holt@reqres.in" )</ShipCardInfo>
                    <ShipCardInfo>( password: "cityslicka" )</ShipCardInfo>
                </FormWrapper>
                <form onSubmit={handleLogin}>
                    <FormWrapper>
                        <StyledInput
                            type="email"
                            placeholder="Email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <StyledInput
                            type="password"
                            placeholder="Password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <StarshipButton type="submit">Login</StarshipButton>
                    </FormWrapper>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <FormWrapper>
                <StarshipButton onClick={backHome} >Home</StarshipButton>
            </FormWrapper>
        </div>
    );
}