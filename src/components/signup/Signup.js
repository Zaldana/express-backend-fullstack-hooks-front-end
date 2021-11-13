import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'
import "./Signup.css"
import FirstNameHook from '../../hooks/FirstNameHook';
import LastNameHook from '../../hooks/LastNameHook'
import UsernameHook from '../../hooks/UsernameHook';
import PasswordHook from '../../hooks/PasswordHook';
import EmailHook from '../../hooks/EmailHook';
import CheckTokenHook from '../../hooks/CheckTokenHook';



function Signup() {

    const navigate = useNavigate()

    const { checkJwtToken } = CheckTokenHook()

    const [
        firstName,
        handleFirstNameOnChange,
        firstNameError
    ] = FirstNameHook();

    const [
        lastName,
        handleLastNameOnChange,
        lastNameError,
        lastNameSetOnFocus,
        lastNameSetOnBlur,
    ] = LastNameHook();

    const [
        username,
        handleUsernameOnChange,
        usernameError,
        setUsernameOnFocus,
        setUsernameOnBlur,
    ] = UsernameHook();

    const [
        password,
        handlePasswordOnChange,
        passwordError,
        setPasswordOnFocus,
        setPasswordOnBlur,
    ] = PasswordHook();

    const [
        email,
        handleEmailOnChange,
        emailError,
        setEmailOnFocus,
        setEmailOnBlur,
    ] = EmailHook();

    useEffect(() => {
        if (checkJwtToken()) {
            navigate("/")
        }
    }, []);

    async function handleSubmit(e) {

        e.preventDefault();

        try {
            let payload = await axios.post(
                "http://localhost:3001/api/users/create-user",
                {
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                }
            );

            console.log(payload);

            toast.success("Congrats! Account created", {
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
        <div className="form-div-signup">
            <main className="form-signin">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-light h3 mb-3 fw-normal">Please Sign Up</h1>

                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="first name"
                            onChange={handleFirstNameOnChange}
                        />
                        <div>{firstNameError && firstNameError}</div>
                        <label htmlFor="floatingInput">First Name</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="last name"
                            onFocus={() => lastNameSetOnFocus(true)}
                            onBlur={() => lastNameSetOnBlur(true)}
                            onChange={handleLastNameOnChange}
                        />
                        <div>{lastNameError && lastNameError}</div>
                        <label htmlFor="floatingInput">Last Name</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="username"
                            onFocus={() => setUsernameOnFocus(true)}
                            onBlur={() => setUsernameOnBlur(true)}
                            onChange={handleUsernameOnChange}
                        />
                        <div>{usernameError && usernameError}</div>
                        <label htmlFor="floatingInput">Username</label>
                    </div>

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
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            onChange={handlePasswordOnChange}
                            onFocus={() => setPasswordOnFocus(true)}
                            onBlur={() => setPasswordOnBlur(true)}
                        />
                        <div>{passwordError && passwordError}</div>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">
                        Sign Up
                    </button>
                </form>
            </main>
        </div>
    );
}

export default Signup;