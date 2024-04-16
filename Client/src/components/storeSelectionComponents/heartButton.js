import React, { useState } from 'react'
import { useNavigate } from "react-router-dom" 
import axios from "axios"

import Heart from "react-heart"

function HeartButton (props) {
    const [active, setActive] = useState(props.active)
    const navigate = useNavigate()

    const changeFavourite = () => {
        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        if (!active) {
            axios.put("http://localhost:4000/user/add-favourites",  { storeID: props.id })
            .then(response => {
                setActive(true)
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    const refreshToken = localStorage.getItem('refreshToken')
                    axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`

                    axios.put("http://localhost:4000/token/refresh-token")
                    .then(refreshResponse => {
                        // Extract the refreshed token from the response data based on its structure
                        const newToken = refreshResponse.data.accessToken; // Adjust this based on the actual structure

                        // Update the token in local storage
                        localStorage.setItem('token', newToken)

                        // Update the default Authorization header with the new token
                        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`

                        // Retry the initial request after refreshing the token
                        return axios.put("http://localhost:4000/user/add-favourites", { storeID:props.id })
                    })
                    .then(retryResponse => {
                        setActive(true)
                    })
                    .catch(refreshError => {
                        console.error("Error refreshing token:", refreshError)
                        navigate("/login", { replace: true })
                    });
                }
            });
        }
        else {
            const params = { storeID: props.id }

            axios.delete("http://localhost:4000/user/remove-favourites", { params })
            .then(response => {
                setActive(false)
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    const refreshToken = localStorage.getItem('refreshToken')
                    axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`

                    axios.put("http://localhost:4000/token/refresh-token")
                    .then(refreshResponse => {
                        // Extract the refreshed token from the response data based on its structure
                        const newToken = refreshResponse.data.accessToken; // Adjust this based on the actual structure

                        // Update the token in local storage
                        localStorage.setItem('token', newToken)

                        // Update the default Authorization header with the new token
                        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`

                        // Retry the initial request after refreshing the token
                        return axios.put("http://localhost:4000/user/remove-favourites", { storeID:props.id })
                    })
                    .then(retryResponse => {
                        setActive(false)
                    })
                    .catch(refreshError => {
                        console.error("Error refreshing token:", refreshError)
                        navigate("/login", { replace: true })
                    });
                }
            });
        }
    }

    return (
        <div className='w-6'>
          <Heart isActive={active} onClick={changeFavourite} animationScale = {1.2} animationTrigger = "both" animationDuration = {.2} className = {`customHeart${active ? " active": ""}`} />
        </div>
    );
  }

export default HeartButton