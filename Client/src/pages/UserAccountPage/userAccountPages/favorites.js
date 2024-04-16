import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import axios from "axios"

import StoreItem from "../../../components/storeSelectionComponents/storeItem"

const Favorites = () => {
    const [displayStores, setDisplayStores] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        console.log("Hello")

        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        axios.get("http://localhost:4000/user/get-user-favourites")
        .then (response => {
            console.log(response)
            setDisplayStores(response.data.favourites)
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
                        return axios.get("http://localhost:4000/user/get-user-favourites")
                    })
                    .then(retryResponse => {          
                        setDisplayStores(retryResponse.data.favourites)
                    })
                    .catch(refreshError => {
                        console.error("Error refreshing token:", refreshError)
                        navigate("/login", { replace: true })
                    });
            } else {
                console.error("Error fetching stores:", error)
                navigate("/login", { replace: true })
            }
        })
    }, [])

    return(
        <div >    
            <div style={{ height: "800px" }}>
                <p className="text-center" style={{ fontSize: "1.5rem", fontFamily: "sans-serif", fontWeight: "bold" }}>Favorites</p>
                {displayStores.length !== 0 ?
                    <div className="flex flex-row flex-wrap justify-center items-center">
                        {displayStores.map((element, index) => (
                            <StoreItem 
                                key={index}
                                id={element.id}
                                backgroundPhoto={element.backgroundphoto}
                                logoPhoto={element.logophoto}
                                storeName={element.storename}
                                storeRating={Math.ceil(element.avg_rating * 10) / 10}
                                storeType={element.type}
                                lowestPrice={element.lowestPrice}
                                storeCity={element.city}
                                active={element.isFavourite}
                            />
                        ))}
                    </div>
                    :
                    <h3>No favourite stores</h3>
                }
            </div>
        </div>
    )
}
export default Favorites