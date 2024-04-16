import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import axios from 'axios'

// For toast.
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PersonalInfo = (props) =>{
    const [username,setUsername] = useState(props.username)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()

    const navigate = useNavigate()

    const notify = (message) => {
        toast(message)
    }

    const changeUsername = () => {
        console.log(username)
        if (!username) {
            return
        }

        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        axios.patch("http://localhost:4000/user/username-change", { newUsername: username })
        .then(response => {
            notify("Username changed")
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
                return axios.patch("http://localhost:4000/user/username-change", { newUsername: username })
            })
            .then(retryResponse => {
                notify("Username changed")
            })
            .catch(refreshError => {
                console.error("Error refreshing token:", refreshError)
                navigate("/login", { replace: true })
            });
        })
    }

    const changeEmail = () => {
        if (!email) {
            return
        }

        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        axios.patch("http://localhost:4000/user/email-change", { newEmail: email })
        .then(response => {
            notify("Username changed")
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
                return axios.patch("http://localhost:4000/user/email-change", { newEmail: email })
            })
            .then(retryResponse => {
                notify("Username changed")
            })
            .catch(refreshError => {
                console.error("Error refreshing token:", refreshError)
                navigate("/login", { replace: true })
            });
        })
    }

    const changeUserData = () => {
        if (!firstName && !lastName && !phone) {
            return
        }

        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        axios.patch("http://localhost:4000/user/change-data", { firstName: firstName, lastName: lastName, phone: phone })
        .then(response => {  
            notify("Data changed")
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
                return axios.patch("http://localhost:4000/user/change-data", { firstName: firstName, lastName: lastName, phone: phone })
            })
            .then(retryResponse => {
                notify("Data changed")
            })
            .catch(refreshError => {
                console.error("Error refreshing token:", refreshError)
                navigate("/login", { replace: true })
            });
        })
    }

    const confirmChanges = () => {
        changeUsername()
        changeEmail()
        changeUserData()
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        axios.get("http://localhost:4000/user/get-user-data")
        .then(response => {
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setPhone(response.data.phone)
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
                return axios.get("http://localhost:4000/user/get-user-data")
            })
            .then(retryResponse => {
                setFirstName(retryResponse.data.firstName)
                setLastName(retryResponse.data.lastName)
                setPhone(retryResponse.data.phone)
            })
            .catch(refreshError => {
                console.error("Error refreshing token:", refreshError)
                navigate("/login", { replace: true })
            });
        })
    }, [])

    return(
        <div style={{display:"flex",flexDirection:"column"}}>   
            <div style={{marginRight:"auto",marginLeft:"auto",fontSize:"1.5rem",fontFamily:"serif"}}>Here are some infomation about your profile</div>
            <div style={{display:"flex",flexDirection:"column",}}>
                <div style={{marginTop:"50px"}}>
                    <p style={{fontSize:"0.8rem"}}>➤The username can only change once</p>
                    <div className="flex flex-row">
                        <div className='flex flex-row'>
                            <p style={{fontFamily:"serif",fontSize:"1rem",alignItems:"center",justifyContent:"center",marginTop:"auto",marginBottom:"auto",marginRight:"20px"}}>Username: </p>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                        </div>  

                        <div className='flex flex-row mx-10'>
                            <p style={{fontFamily:"serif",fontSize:"1rem",alignItems:"center",justifyContent:"center",marginTop:"auto",marginBottom:"auto",marginRight:"20px"}}>First name: </p>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                        </div>

                        <div className='flex flex-row mx-10'>
                            <p style={{fontFamily:"serif",fontSize:"1rem",alignItems:"center",justifyContent:"center",marginTop:"auto",marginBottom:"auto",marginRight:"20px"}}>Last name: </p>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",}}>
                <div style={{marginTop:"50px"}}>
                    <p style={{fontSize:"0.8rem"}}>➤The email is used to recieve informations from your favorite stores</p>
                    <div style={{display:"flex",flexDirection:"row"}}>
                        <p style={{fontFamily:"serif",fontSize:"1rem",alignItems:"center",justifyContent:"center",marginTop:"auto",marginBottom:"auto",marginRight:"20px"}}>Email Address: </p>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>

                        <div className='flex flex-row mx-10'>
                            <p style={{fontFamily:"serif",fontSize:"1rem",alignItems:"center",justifyContent:"center",marginTop:"auto",marginBottom:"auto",marginRight:"20px"}}>Phone Number: </p>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <button className='w-fit mt-3' style={{borderRadius:"10px",backgroundColor : 'beige'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ADD8E6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'beige'}
                onClick={confirmChanges}>Confirm changes</button>
        </div>
    )
}
export default PersonalInfo;