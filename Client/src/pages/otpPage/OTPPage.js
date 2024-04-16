import React, { useState, useRef } from 'react'
import { useNavigate, useEffect, useLocation } from "react-router-dom"

import axios from 'axios';

const OtpPage = () => {
  const [otp, setOtp] = useState(['', '', '', ''])
  const otpInputs = [useRef(), useRef(), useRef(), useRef()]

  const navigate = useNavigate()
  const location = useLocation()

  let email = location.state.email
  let password = location.state.password
  let username= location.state.username
  let isStore = location.state.isStore

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ''); // Allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input
    if (value !== '' && index < otp.length - 1) {
      otpInputs[index + 1].current.focus();
    }
  };

  const handleVerifyClick = () => {
    const enteredOtp = otp.join('');

    console.log(username + " " + password)
    
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    if (!isStore) {
        axios.post("http://localhost:4000/user/check-otp", { otp: enteredOtp, email: email })
        .then (response => {
            axios.put("http://localhost:4000/user/register", { username: username, email: email, password: password })
            .then (registerResponse => {
                navigate("/login", { replace: true })
            })
            .catch (registerError => {
                navigate("/register", { replace: true })
            })
        })
        .catch(error => {
            navigate("/register", { replace: true })
        })
    }
    // If account is store.
    else {
        axios.post("http://localhost:4000/user/check-otp", { otp: enteredOtp, email: email })
        .then (response => {
            axios.put("http://localhost:4000/store/register-store-user", { username: username, email: email, password: password })
            .then (registerResponse => {
                navigate("/login", { replace: true })
            })
            .catch (registerError => {
                navigate("/register", { replace: true })
            })
        })
        .catch(error => {
            navigate("/login", { replace: true })
        })
    }
  };

  const handleResend = () => {
  };

  return (
    <div className="otp-page container shadow " style={{display:"flex",flexDirection:"column",width:"400px",height:"400px",gap:"30px",borderRadius:"10px",justifyContent:"center",alignItems:"center",marginTop:"100px"}} >
      <h2 >Enter 4-digit OTP</h2>
      <div className="otp-input" style={{display:"flex", flexDirection:"row",alignItems:"center"}}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleOtpChange(e, index)} style={{width:"30px",borderRadius:"6px",borderColor:"black",borderBlockColor:"black", marginRight:"20px"}}
            ref={otpInputs[index]}
          />
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"row",gap:"15px"}}>
            <p>Didn't find the OTP?</p>
            <p style={{cursor:"pointer" , fontWeight:"bold"}} onClick={handleResend}>Resend OTP</p>
        </div>
      <button onClick={handleVerifyClick}>Verify OTP</button>
    </div>
  );
};

export default OtpPage