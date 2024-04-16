import React, {useState, useEffect} from "react"
import { useNavigate, useLocation } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css'
import TopCardView from "../../components/storePageComponents/topCardView"
import './storePage.css'
import StoreInfo from "../../components/storePageComponents/storeInfo"
import CloseAppointment from "../../components/storePageComponents/closeAppointment"
import Ratings from "../../components/storePageComponents/rating"

import axios from "axios"

function StorePage () {
    const [storeInfo, setStoreInfo] = useState([])
    const [services, setServices] = useState([])
    const [review, setReviews] = useState([])
    const [servicesList, setServicesList] = useState([])

    const navigate = useNavigate()
    let location = useLocation()
    let id = location.state.id

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        axios.post("http://localhost:4000/store/get-store-info", { storeID: id  })
        .then(response => {
            let openHoursString = response.data.storeInfo[0].open_at


            const openHoursRanges = openHoursString.substring(1, openHoursString.length - 1).split('),[')
            const openHours = openHoursRanges.map(range => range.replace(/\[|\]|\(|\)/g, '').split(','))

            openHours.forEach((range) => {
                const [start, end] = range

                openHoursString = start + ":00" + " - " + end +":00 "
            })

            response.data.storeInfo[0].open_at = openHoursString

            setStoreInfo(response.data.storeInfo[0])
            setServices(response.data.services)

            // Create servicesList here
            const list = response.data.services.map((service, index) => (
                <p key={index} style={{ marginLeft: '15px' }}> {service.name} </p>
            ))

            setServicesList(list)
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
                return axios.get("http://localhost:4000/store/get-store-info", { storeID: id })
            })
            .then(retryResponse => {
                setStoreInfo(retryResponse.data.storeInfo[0])
                setServices(retryResponse.data.services[0])
                
                // Create servicesList here
                const list = retryResponse.data.services.map((service, index) => (
                    <p key={index} style={{ marginLeft: '15px' }}> {service.name} </p>
                ))
    
                setServicesList(list)
            })
            .catch(refreshError => {
                console.error("Error refreshing token:", refreshError)
                navigate("/login", { replace: true })
            });
        })
    }, [id])

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        axios.post("http://localhost:4000/review/get-reviews", { storeID: id  })
        .then(response => {
            setReviews(response.data.getReviews)
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
                return axios.get("http://localhost:4000/review/get-reviews", { storeID: id })
            })
            .then(retryResponse => {
                setReviews(retryResponse.data.getReviews)
            })
            .catch(refreshError => {
                console.error("Error refreshing token:", refreshError)
                navigate("/login", { replace: true })
            });
        })
    }, [id])

      return (
        <div className="container d-flex flex-column flex-md-row " style={{width: '100vw'}}>
            <div className="container d-flex flex-column leftCont" >
                <div>
                <TopCardView
                    storeName= {storeInfo.storename}
                    storeHour= {storeInfo.open_at}
                    storeImage={storeInfo.backgroundphoto}
                    storeLogo = {storeInfo.logophoto}
                    storeKind={storeInfo.type}
                    storeStars={Math.ceil((storeInfo.avg_rating * 10) / 10)}
                />  
                
                {/* here we place the bottom half of the page... the filter and the services*/}
                <StoreInfo
                    storeText={storeInfo.about_us}
                    serviceList={servicesList}
                    phoneNumber={storeInfo.phonenumber}
                    emailAddress={storeInfo.email}
                />
                </div>
            </div>

            {/*HERE ARE THE APPOINTMENT CARD FOR THE STORE THAT WE ARE IN */}
            <div className="rightCont">
                <CloseAppointment id={ id } services={services} />
                <div>
                    <Ratings ratingArray={review} id={ id } />
                </div>
            </div>

        </div>
    );
}

export default StorePage;