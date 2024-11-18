import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalStyle } from "../App";
import { StarshipButton } from "./MainBanner";
import { FormWrapper, StyledInput } from "./Login";
import { ShipCardInfo } from "./ShipCollection";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        await axios.post("https://reqres.in/api/login", {
                email,
                password,
        })
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            navigate("/");
        })
        .catch((error) => {
            setError(error);
            console.log(error)
        })
    };

    const backHome = () => {
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