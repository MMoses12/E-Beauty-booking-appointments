import React, { useState, useEffect } from "react"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faKey, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import "./styleForm.css"

import ErrorMessage from "../errorMessage"

function Form (props) {
	const navigate = useNavigate()

	// Form useStates.
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [confPassword, setConfPassword] = useState('')

	// Error useStates.
	const [passwordError, setPasswordError] = useState(false)
	const [usernameError, setUsernameError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [loginError, setLoginError] = useState(false)
	const [lengthError, setLengthError] = useState(false)

    useEffect(() => {
        setUsername()
        setPassword()
    }, [props.isStore])

	// Handle form changes.
	const changeUsername = (event) => {
		setUsernameError(false)
		setLoginError(false)
		setUsername(event.target.value)
	}

	const changePassword = (event) => {
		setLoginError(false)
		
		if (event.target.value.length < 8) {
			setLengthError(true)
		}
		else {
			setLengthError(false)
		}

		setPassword(event.target.value)
	}

	const changeEmail = (event) => {
		setEmailError(false)
		setEmail(event.target.value)
	}

	const changeConfPassword = (event) => {
		setLengthError(false)
		setConfPassword(event.target.value)
		
		if (event.target.value === password) {
			setPasswordError(false)
		}
		else {
			setPasswordError(true)
		}
	}

    const changeForm = () => {
        props.setIsStore(!props.isStore)
    }

	// Handle url changes.
	const loginPage = () => {
        props.setIsStore(false)
		navigate('/login', { replace: true, state: { isStore: false } })
	}

	const registerPage = () => {
        props.setIsStore(false)
		navigate('/register', { replace: true, state: { isStore: false } })
	}

	// Send request with credentials to register.
	const loginRegister = (event) => {
		event.preventDefault(); // Prevent default form submission behavior

        if (event.type != "submit") {
            return
        }

		setUsername('')
		setPassword('')
		setEmail('')
		setConfPassword('')
		
        if (!props.isStore)
            if (props.isRegistered) {
                if (!username || !password) {
                    return 
                }

                axios.post("http://localhost:4000/user/check-credentials", { username, password })
                .then(response => {
                    if (response.status === 200) {
                        localStorage.setItem('token', response.data.token)
                        localStorage.setItem('refreshToken', response.data.refreshtoken)
                        navigate("/storeSelection", { replace: true })
                    }
                })  
                .catch (error => {
                    setLoginError(true)
                });
            }
            else {
                if (!email || !username || !password) {
                    return
                }

                if (confPassword !== password) {
                    setPasswordError(true)
                    return
                }
                
                axios.put("http://localhost:4000/user/send-otp", { username, email })
                .then(
                    navigate("/check-otp", { replace: true, state: 
                        { 
                            email: email,
                            password: password,
                            username: username,
                            isStore: false
                        } })
                )
                .catch( error =>
                    navigate("/login", { replace: true })
                )
            }
        else {
            if (props.isRegistered) {
                if (!username || !password) {
                    return 
                }

                axios.post("http://localhost:4000/store/login", { username, password })
                .then(response => {
                    if (response.status === 200) {
                        localStorage.setItem('token', response.data.token)
                        localStorage.setItem('refreshToken', response.data.refreshtoken)
                        navigate("/editStore", { replace: true })
                    }
                })  
                .catch (error => {
                    setLoginError(true)
                });
            }
            else {
                if (!email || !username || !password) {
                    return
                }

                if (confPassword !== password) {
                    setPasswordError(true)
                    return
                }
                
                axios.put("http://localhost:4000/user/send-otp", { username, email })
                .then(
                    navigate("/check-otp", { replace: true, state: 
                        { email: email,
                        password: password,
                        username: username,
                        isStore: true
                        } })
                )
                .catch(error =>
                    navigate("/login", { replace: true })
                )
            }
        }
	};
	
	return (
		<div className="h-fit">
			<form className="form-style" onSubmit={loginRegister}>
				<ErrorMessage passwordMatch={passwordError} usernameError={usernameError} emailError={emailError} loginError={loginError} 
					passwordLength={lengthError}
				/>
				<div className="icon pb-2"> 
					<input className="input-txt select-none" type="text" placeholder="Username" value={username} onChange={changeUsername} autoComplete="off"/> 
					<i className="fa-icon"> <FontAwesomeIcon icon={faUser} /> </i> 
				</div>

				{props.isRegistered === false && <div className="icon pb-2"> 
					<input className="input-txt select-none" type="text" placeholder="Email" onChange={changeEmail} autoComplete="off" /> 
					<i className="fa-icon">
					   <FontAwesomeIcon icon={faEnvelope} />
					</i>
				</div>}

				<div className="icon pb-2"> 
					<input className="input-txt select-none" type="password" placeholder="Password" value={password} onChange={changePassword} autoComplete="off" /> 
					<i className="fa-icon"> <FontAwesomeIcon icon={faKey} /> </i> 
				</div>

				{props.isRegistered === false && <div className="icon pb-2"> 
					<input className="input-txt select-none" type="password" placeholder="Confirm Password" onChange={changeConfPassword} autoComplete="off" /> 
					<i className="fa-icon"> <FontAwesomeIcon icon={faCheck}/> </i>
				</div>}

				<input autoComplete="off" type="submit" className="submit-btn hover:bg-blue-500 border-none border-0 text-center h-auto w-fit select-none" value={props.isRegistered ? "Log In" : "Sign Up"} />
				
				{props.isRegistered === false ? <div> 
					<p> If you are already a member 
					<button className="sign-btn" onClick={loginPage}> Log In </button> </p>

					{props.isStore ?
                        (   
                            <p> If you want to sign up as user 
                                <button className="sign-btn" onClick={changeForm}> Sign up </button>
                            </p>
                        )
                        :
                        (   
                            <p> If you want to add a store     
                                <button className="sign-btn" onClick={changeForm}> Sign up now </button>
                            </p>        
                        )
                    }
                    
				</div> : <div> 
                    <p> If you are not already a member 
					<button className="sign-btn" onClick={registerPage}> Sign Up </button> </p> 
                    
					{!props.isStore ?
                        (
                            <p> If you have a store
                                <button className="sign-btn" onClick={changeForm}> Log in now </button> 
                            </p>
                        )
                        :
                        (
                            <p> If you are user
                                <button className="sign-btn" onClick={changeForm}> Log in </button> 
                            </p>
                        )
                    }
				</div>}
			</form>
		</div>
	);
}

export default Form;