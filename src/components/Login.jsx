import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalStyle } from "../App";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
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
        })
    };

    return (
        <div>
            <GlobalStyle />
            <h1>Login</h1>
            <p>email:"eve.holt@reqres.in"</p>
            <p>password:"cityslicka"</p>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}