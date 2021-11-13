import React, { useEffect } from 'react'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./Signin.css"
import EmailHook from '../../hooks/EmailHook';
import PasswordHook from '../../hooks/PasswordHook';
import CheckTokenHook from '../../hooks/CheckTokenHook';

function Signin({ setUser }) {

    const navigate = useNavigate()

    const { checkJwtToken } = CheckTokenHook()

    const [
        email,
        handleEmailOnChange,
        emailError,
        setEmailOnFocus,
        setEmailOnBlur,
    ] = EmailHook();

    const [
        password,
        handlePasswordOnChange,
    ] = PasswordHook();

    useEffect(() => {
        if (checkJwtToken()) {
            navigate("/")
        }
    }, []);

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            let payload = await axios.post(
                "http://localhost:3001/api/users/login",
                {
                    email,
                    password,
                }
            );

            window.localStorage.setItem("jwtToken", payload.data.payload)

            let decodedToken = jwtDecode(payload.data.payload);

            setUser({
                email: decodedToken.email,
                username: decodedToken.username,
            })

            navigate("/protected-home")

            toast.success("Logged In", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });


        } catch (e) {

            toast.error(e.response.data.error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div className="form-div-signin">
            <main className="form-signin">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-light h3 mb-3 fw-normal">Please Sign In</h1>

                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            onChange={handleEmailOnChange}
                            onFocus={() => setEmailOnFocus(true)}
                            onBlur={() => setEmailOnBlur(true)}
                        />
                        <div>{emailError && emailError}</div>
                        <label htmlFor="floatingInput">Email Address</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            onChange={handlePasswordOnChange}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">
                        Sign In
                    </button>
                </form>
            </main>
        </div>
    );
}

export default Signin;