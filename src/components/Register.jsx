import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalStyle } from "../App";
import { StarshipButton } from "./MainBanner";
import { ShipCardInfo } from "./ShipCollection";
import { useDispatch } from "react-redux";
import { setActiveKey } from "../store/starshipsSlice";
import { FormWrapper, StyledInput } from "./Login";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async (e) => {
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
                    <ShipCardInfo $size='35px' $colorText='yellow' >Register</ShipCardInfo>
                </FormWrapper>
                <form onSubmit={handleRegister}>
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
                        <StarshipButton type="submit">Submit</StarshipButton>
                    </FormWrapper>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <FormWrapper>
                <StarshipButton onClick={backHome} >Home</StarshipButton>
            </FormWrapper>
        </div>
    )
}