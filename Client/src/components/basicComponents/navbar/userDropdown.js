import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import axios from "axios"

function UserDropdownMenu(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [selection, setSelection] = useState()
  const [photo, setPhoto] = useState()
  let navigate = useNavigate()

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
	setIsOpen(!isOpen);
  }

  const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')

    navigate("/", { replace: true })
    navigate(0)
  }

    useEffect (() => {
        if (!selection) {
            return 
        }

        navigate("/my-account", { state: { selection: selection } })
    }, [selection])

    useEffect (() => {
        if (!props.logged) {
            return 
        }

        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        axios.get("http://localhost:4000/user/get-username-photo")
        .then (response => {  
            setPhoto(response.data.photo)
            console.log(response.data.photo)
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                const refreshToken = localStorage.getItem('refreshToken')
                axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`

                axios.get("http://localhost:4000/token/refresh-token")
                    .then(refreshResponse => {
                        const newToken = refreshResponse.data.accessToken;
                        localStorage.setItem('token', newToken)

                        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
                        return axios.get("http://localhost:4000/user/get-username-photo")
                    .then(retryResponse => {
                        setPhoto(retryResponse.data.photo)
                    })
                    .catch(refreshError => {
                        console.error("Error refreshing token:", refreshError)
                    });
                })
            } else {
                console.error("Error fetching stores:", error)
            }
        })
    }, []) 

  return (
	<div className="relative">
        <img 
            onClick={toggleDropdown} 
            className="text-grey-400 rounded-full transform -translate-x-1/2 hover:text-grey-500 hover:cursor-pointer hover:border-grey-500 z-10 w-10 h-10" src={photo} 
        />

        {/* Dropdown content */}
        {isOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-md rounded overflow-hidden">
                <ul className="list-none p-0 m-0">
                <li className="text-start hover:bg-grey-200 cursor-pointer py-2 px-4 select-none" onClick={() => setSelection('Account')} >My account</li>
                <li className="text-start hover:bg-grey-200 cursor-pointer py-2 px-4 select-none" onClick={() => setSelection('Appointments')} >Appointments</li>
                <li className="text-start hover:bg-grey-200 cursor-pointer py-2 px-4 select-none" onClick={() => setSelection('Favourites')} >My favourites</li>
                <li className="text-start hover:bg-grey-200 cursor-pointer py-2 px-4 select-none" onClick={() => setSelection('Reviews')} >My Reviews</li>
                <hr/>
                <li className="text-start hover:bg-grey-200 cursor-pointer pb-2 pt-0 px-4 select-none" onClick={logOut} > Log out </li>
                </ul>
            </div>
        )}

	</div>
  );
}

export default UserDropdownMenu;
