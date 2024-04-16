import React, { useState, useEffect } from "react";
import axios from "axios"

import { useNavigate } from "react-router-dom"

// For toast.
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import TopCardView from "./topCardView"
import '../../pages/StorePage/storePage.css'
import ServiceList from '../appointmentComponents/servicesList';
import CountryDropdown from "../appointmentComponents/phoneList"
import Diary from "../appointmentComponents/diary"
import Times from "../appointmentComponents/times"
import StoreInfo from "./storeInfo"
import { Button } from "react-bootstrap";
import { phone } from "fontawesome";

const CloseAppointment = (props) => {   
    const [selectedService, setSelectedService] = useState('Select service')
    const [appointmentTime, setAppointmentTime] = useState ()
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [date, setDate] = useState(new Date())
    const [hours, setHours] = useState([])

    const navigate = useNavigate()

    const notify = (message) => {
        toast(message)
    }

    const changeFirstName = (event) => {
        setFirstname(event.target.value)
    }

    const changeLastName = (event) => {
        setLastname(event.target.value)
    }

    const changePhoneNumber = (event) => {
        if (event.target.value.length !== 10) {
            return
        }  

        setPhonenumber(event.target.value)
    }

    const closeAppointment = () => {
        if (!appointmentTime || !firstname || !lastname || !phonenumber) {

            return
        }

        const dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        const fullName = firstname + " " + lastname

        axios.put("http://localhost:4000/appointment/close-appointment", { 
            date: dateString,
            hour: appointmentTime,
            storeID: props.id, 
            service: selectedService, 
            date: dateString,
            fullName: fullName,
            phone: phonenumber
        })
        .then(response => {
            notify("Appointment closed successfully")
            navigate("/storeSelection", { replace: true })
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
                return axios.put("http://localhost:4000/appointment/close-appointment", { 
                    date: dateString,
                    hour: appointmentTime,
                    storeID: props.id, 
                    service: selectedService, 
                    date: dateString,
                    fullName: fullName,
                    phone: phonenumber
                })
            })
            .then(retryResponse => {
                notify("Appointment closed successfully")
                navigate("/storeSelection", { replace: true })
            })
            .catch(refreshError => {
                console.error("Error refreshing token:", refreshError)
                navigate("/login", { replace: true })
            })
        })
    }
      
    useEffect(() => {
        if (selectedService === 'Select service') {
            return
        }

        const dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()

        axios.post("http://localhost:4000/appointment/get-appointments", { storeID: props.id, serviceName: selectedService, date: dateString })
        .then(response => {
            setHours(response.data.appointments)
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
                return axios.post("http://localhost:4000/appointment/get-appointments", { storeID: props.id, serviceName: selectedService, date: date })
            })
            .then(retryResponse => {
                setHours(retryResponse.data.appointments)
            })
            .catch(refreshError => {
                console.error("Error refreshing token:", refreshError)
                navigate("/login", { replace: true })
            })
        })
    }, [selectedService, date])

    return(
        //Here the customer should add his personal data
        <div className="card rounded-3 shadow border dynamic-height-container ms-3 mx-auto appointment " style={{ maxWidth: '800px' ,marginTop:'50px' ,width:'90%'}} >
        <div>
            <h3 className="card-title text-center " style={{marginTop:'10px',fontFamily:'cursive',fontWeight:'bold'}}>Close Appointment</h3>
            <h6 className></h6>
            <div className="container" style={{ padding: '20px' }}>
                <div className="row ">
                    <div className="col">
                        <div className="form-floating" style={{ width: '100%',marginTop:'20px' }}>
                            <input type="text" className="form-control" placeholder="" id="floatingTextarea1" onChange={changeFirstName} />
                            <label htmlFor="floatingTextarea1">Firstname</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating" style={{ width: '100%',marginTop:'20px' }}>
                            <input type="text" className="form-control" placeholder="" id="floatingTextarea2" onChange={changeLastName} />
                            <label htmlFor="floatingTextarea2">Lastname</label>
                        </div>
                    </div>
                </div>
                
                <div className="container mt-3" style={{marginLeft:'-18px'}}>
                    <div className="row no-gutters" style={{ height: '50px', marginTop: '20px' }}>
                        <div className="col-4 dropdownmenu" style={{ height: '50px' }}>
                            <CountryDropdown />
                        </div>
                        <div className="col-8">
                            <div className="form-floating" style={{ width: '100%' ,paddingBottom:'20px'}}>
                                <input type="text" className="form-control" placeholder="" id="floatingTextarea3" onChange={changePhoneNumber}/>
                                <label htmlFor="floatingTextarea3">Phone Number</label>
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                
                {/* here the customer shoul choose the service that he want */}
                <div className="text-center" style={{marginTop:'40px'}}>
                    <h5 className="card-title" style={{fontFamily:'cursive',fontWeight:'bold', marginBottom:'20px'}}>Choose the service that you prefer</h5>
                </div>
                <div className="text-center" >
                    <ServiceList 
                        serviceArray={props.services} 
                        selectedService={selectedService}
                        setSelectedService={setSelectedService}
                    />
                
                </div>
                <hr ></hr>

                {/* here the customer shoul choose the Date that he want */}
                <div className="text-center">
                    <Diary setDate={setDate} date={date} />
                </div>
                <hr ></hr>

                {/* here the customer shoul choose the time that he want */}
                <div>
                    <Times 
                        hours = {hours}
                        setAppointmentTime={setAppointmentTime}
                        appointmentTime={appointmentTime}
                    />
                </div>
                <div className="text-center">
                    <Button style={{marginBottom:'10px', marginTop:'10px',borderColor:"grey",backgroundColor:"grey"}} onClick={closeAppointment} >Close Appointment</Button>
                    <ToastContainer />
                </div> 
            </div> 
        </div>


    </div>
    )
}
export default CloseAppointment