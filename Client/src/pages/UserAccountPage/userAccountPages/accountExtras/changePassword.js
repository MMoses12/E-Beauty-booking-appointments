import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

// For toast.
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword =() =>{
    const [password,setPassword] = useState()
    const [newPassword,setNewPassword] = useState()
    const [confirmPassword,setConfirmPassword] = useState()

    const navigate = useNavigate()

    const notify = (message) => {
        toast(message)
    }

    const changePassword = (event) => {
		setPassword(event.target.value)
	}

    const changeNewPassword = (event) => {
		setNewPassword(event.target.value)
	}

    const changeConfPassword = (event) => {
		setConfirmPassword(event.target.value)
	}
    
    const requestChangePassword = () => {
        if (!newPassword || newPassword !== confirmPassword) {
            return
        }

        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        axios.patch("http://localhost:4000/user/change-password", { password: password, newPassword: newPassword })
        .then(response => {
            notify("Password changed")
        })
        .catch (error => {
            const refreshToken = localStorage.getItem('refreshToken')
            axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`

            axios.get("http://localhost:4000/token/refresh-token")
            .then(refreshResponse => {
                // Extract the refreshed token from the response data based on its structure
                const newToken = refreshResponse.data.accessToken // Adjust this based on the actual structure

                // Update the token in local storage
                localStorage.setItem('token', newToken)

                // Update the default Authorization header with the new token
                axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`

                // Retry the initial request after refreshing the token
                return axios.patch("http://localhost:4000/user/change-password", { password: password, newPassword: newPassword })
            })
            .then(retryResponse => {
                notify("Password changed")
            })
            .catch(refreshError => {
                console.error("Error refreshing token:", refreshError)
                navigate("/login", { replace: true })
            });
        })
    }

    const handlePassChange = (password) =>{}
    return(
        <div style ={{display:"flex" ,flexDirection:"column" ,justifyContent:"center" ,alignItems:"center"}}>
            <div style={{fontSize:"1.5rem",fontFamily:"serif"}}>Here you can change your password</div>
            <div className='card d-flex ' style={{flexDirectiob:"column",width:"60%",height:"400px" ,borderRadius:"20px",alignItems:"center",marginTop:"50px"}}>
                <div style={{display:"flex",flexDirection:"row",marginTop:"40px",justifyContent:"center"}}>
                    <p style={{margingRight:"20px",fontSize:"1.3rem",fontFamily:"serif"}}>Password:</p>
                    <input type="password" value={password} onChange={changePassword} style={{width:"200px",marginLeft:"30px"}}></input>
                </div>
                <div style={{display:"flex",flexDirection:"row",marginTop:"40px",justifyContent:"center"}}>
                    <p style={{margingRight:"20px",fontSize:"1.3rem",fontFamily:"serif"}}>New Password:</p>
                    <input type="password" value={newPassword} onChange={changeNewPassword} style={{width:"200px",marginLeft:"30px"}}></input>
                </div>
                <div style={{display:"flex",flexDirection:"row",marginTop:"40px",justifyContent:"center"}}>
                    <p style={{margingRight:"20px",fontSize:"1.3rem",fontFamily:"serif"}}>Confirm Password:</p>
                    <input type="password" value={confirmPassword} onChange={changeConfPassword} style={{width:"200px",marginLeft:"30px"}}></input>
                </div>
                <ToastContainer />
                
                <button className='w-fit mt-3' style={{borderRadius:"10px",backgroundColor : 'beige'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ADD8E6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'beige'}
                onClick={requestChangePassword}>Confirm Change</button>
            </div>
        </div>
        
    )
}
export default ChangePassword;