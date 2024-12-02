import Modal from 'react-bootstrap/Modal'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
    width: 60vh;
`

export const RegisterModal = (props) => {
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

    return(
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    data-bs-theme="dark"
    >
        <Modal.Header closeButton >
            <Modal.Title id="contained-modal-title-vcenter">
                <FormWrapper>
                    <ShipCardInfo $size='30px' $colorText='yellow' >Register</ShipCardInfo>
                </FormWrapper>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{padding: '5px'}}>
            <div>
                <form onSubmit={handleRegister}>
                    <FormWrapper>
                        <StyledInput
                        type="email"
                        placeholder="Email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormWrapper>
                    <FormWrapper>
                        <StyledInput
                        type="password"
                        placeholder="Password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormWrapper>
                    <FormWrapper>
                        <StarshipButton type="submit">Submit</StarshipButton>
                    </FormWrapper>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
        </Modal.Body>
    </Modal>
  )
}
