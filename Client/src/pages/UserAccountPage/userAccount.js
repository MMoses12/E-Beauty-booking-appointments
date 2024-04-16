import React,{ useState, useEffect } from "react" 
import { useNavigate, useLocation } from "react-router-dom"

import axios from "axios"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faCalendar, faHeart, faStar, faUser, faQuestionCircle, faPencilAlt  } from '@fortawesome/free-solid-svg-icons' 

import  logo from '../../Photos/logo1.png'
import  Favorites  from "./userAccountPages/favorites"
import  Account  from "./userAccountPages/account"
import  Help  from "./userAccountPages/help"
import  UserAppointments  from "./userAccountPages/userAppointments"
import  UserReviews from "./userAccountPages/userReviews"

import Navbar from "../../components/basicComponents/navbar/navbar"

// For toast.
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserAccount () {
	let location = useLocation()	
	let selection = location.state.selection
	const [username, setUsername] = useState('') 
	const [selectedItem, setSelectedItem] = useState(selection)
    const [favourites, setFavourites] = useState(0)
    const [appointments, setAppointments] = useState(0)
    const [reviewCount, setReviewCount] = useState(0)
    const [photo, setPhoto] = useState()
    const [changePhoto, setChangePhoto] = useState()

    const navigate = useNavigate()

    const notify = (message) => {
        toast(message)
    }

    const handleItemClick = (item) => {
		setSelectedItem(item) 
	}

    const changeUserPhoto = (event) => {
        const photo = event.target.files[0]

        let reader = new FileReader()

        reader.onload = (e) => {
            const imageDataUrl = e.target.result
            setChangePhoto(imageDataUrl)
            console.log(imageDataUrl)
        }

        reader.readAsDataURL(photo)
    }
    
	const handleMouseLeave = (e) => {
		// Revert styles to the original state
		if (selectedItem === e.currentTarget.innerText) {
			e.currentTarget.style.color = 'black' 
			e.currentTarget.style.fontWeight = 'bold' 
			} else {
			e.currentTarget.style.color = '#999999' 
			e.currentTarget.style.fontWeight = 'normal' 
		}
	} 
	
	const renderComponent = () => {
		switch (selectedItem) {
			case 'Account':
				return <Account username={username} /> 
			case 'Favourites':
				return <Favorites /> 
			case 'Appointments':
				return <UserAppointments /> 
			case 'Reviews':
				return <UserReviews /> 
			case 'Help':
				return <Help /> 
			default:
				return null 
		}
	} 

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        axios.get("http://localhost:4000/user/get-sum-data")
        .then (response => {
            setFavourites(response.data.favourites[0].count)   
            setAppointments(response.data.appointments[0].count)
            setReviewCount(response.data.reviews[0].count)
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
                        return axios.get("http://localhost:4000/user/get-sum-data")
                    })
                    .then(retryResponse => {
                        setFavourites(retryResponse.data.favourites[0].count)   
                        setAppointments(retryResponse.data.appointments[0].count)
                        setReviewCount(retryResponse.data.reviews[0].count)
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

    useEffect (() => {
		const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        axios.get("http://localhost:4000/user/get-username-photo")
        .then (response => {
            setUsername(response.data.username)
            setPhoto(response.data.photo)
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
                        setUsername(retryResponse.data.username)
                        setPhoto(retryResponse.data.photo)
                    })
                    .catch(refreshError => {
                        console.error("Error refreshing token:", refreshError)
                        navigate("/login", { replace: true })
                    });
                })
            } else {
                console.error("Error fetching stores:", error)
                navigate("/login", { replace: true })
            }
        })
	}, [photo])

    useEffect (() => {
        if (!changePhoto) {
            return 
        }

        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        axios.post("http://localhost:4000/user/change-photo", { photo: changePhoto })
        .then (response => {
            notify("Photo changed!")
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
                        return axios.get("http://localhost:4000/user/change-photo", { photo: changePhoto })
                    .then(retryResponse => {
                        notify("Photo changed!")
                    })
                    .catch(refreshError => {
                        console.error("Error refreshing token:", refreshError)
                        navigate("/login", { replace: true })
                    });
                })
            } else {
                console.error("Error fetching stores:", error)
                navigate("/login", { replace: true })
            }
        })
    }, [changePhoto])
	
	return(
		<div style={{display:"flex",flexDirection:"column"}}>
			<div className="card d-flex shadow" style={{flexDirection:"column", backgroundColor:"white",height:"320px",borderRadius:"0 0 5rem 5rem"}}>
                <div className="navbar-box bg-white">
                </div>
				<div className="d-flex bg-white" style={{flexDirection:"row",height:"200px",width:"95%",alignSelf:"center",borderRadius:"0 0 5rem 5rem"}}>
					<div className="text-center" style={{display:"flex",flexDirection:"row",gap:"30px",marginLeft:"40px",marginTop:"30px"}}>
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={changeUserPhoto}
                                className="hidden"
                                id="profileInput"
                            />
                            <label htmlFor="profileInput" className="cursor-pointer">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden text-center">
                                    <img src={photo} className="w-full h-full object-cover" alt="Profile" />
                                    <div className="absolute top-50 right-70 flex items-center justify-center mt-4 pt-2 pl-3 ml-5">
                                        <FontAwesomeIcon icon={faPencilAlt} style={{ fontSize: '1rem' }} />
                                    </div>
                                </div>
                            </label>
                        </div>
                        <p className="mt-5" style={{fontWeight:"bold",fontSize:"1.4rem",fontFamily:"inherit"}}>{username}</p>
					</div>
					<div style={{display:"flex",flexDirection:"row",marginLeft: "auto",alignSelf:"center"}}>
						<div className="text-center" style={{cursor:"pointer",height:"120px" ,display:"felx",flexDirection:"column",width:"150px", fontSize: "30px",borderRight: '2px solid #ccc' }}> 
							<FontAwesomeIcon icon={faCalendar} /> 
							<p style={{fontSize:"0.8rem",fontWeight:"bold"}}>Appointments</p>
							<p style={{fontSize:"1.6rem",fontWeight:"bold"}}> {appointments} </p>
						</div>
						<div className="text-center" style={{cursor:"pointer",height:"120px" ,display:"felx",flexDirection:"column", width:"150px",fontSize: "30px",borderRight: '2px solid #ccc'  }}> 
							<FontAwesomeIcon icon= {faHeart}/>
							<p style={{fontSize:"0.8rem",fontWeight:"bold"}}>Favourites</p>
							<p style={{fontSize:"1.6rem",fontWeight:"bold"}}> {favourites} </p>
						</div>
						<div className="text-center" style={{cursor:"pointer",height:"120px" ,display:"felx",flexDirection:"column", width:"150px",fontSize: "30px" }}> 
							<FontAwesomeIcon icon={faStar} /> 
							<p style={{fontSize:"0.8rem",fontWeight:"bold"}}>Reviews</p>
							<p style={{fontSize:"1.6rem",fontWeight:"bold"}}> {reviewCount} </p>
                            <ToastContainer />
						</div>
					</div>
				</div>    
			</div>

			<div className="container" style={{marginTop:"40px",display:"flex",gap:"40px" , flexDirection:"row" ,width:"100vw"}}>
				<div style={{cursor:"pointer",display:"flex" , flexDirection:"column",color:"#999999",gap :"30px",fontSize:"1.2rem",width:"20%"}}>
					<p style={{color: selectedItem === 'Account' ? 'black' : '#999999',fontWeight: selectedItem === 'Account' ? 'bold' : 'normal'}} 
							onMouseEnter={(e) => e.currentTarget.style.color = 'black'}
							onMouseLeave={handleMouseLeave}
							onClick={() => handleItemClick('Account')}><FontAwesomeIcon icon={faUser}  style={{marginRight:"15px"}}/>Account</p>
					<p style={{color: selectedItem === 'Appointments' ? 'black' : '#999999',fontWeight: selectedItem === 'Appointments' ? 'bold' : 'normal'}} 
							onMouseEnter={(e) => e.currentTarget.style.color = 'black'} 
							onMouseLeave={handleMouseLeave}
							onClick={() => handleItemClick('Appointments')}><FontAwesomeIcon icon={faCalendar} style={{marginRight:"15px"}} />Appointments</p>
					<p style={{color: selectedItem === 'Favourites' ? 'black' : '#999999',fontWeight: selectedItem === 'Favourites' ? 'bold' : 'normal'}} 
							onMouseEnter={(e) => e.currentTarget.style.color = 'black'}
							onMouseLeave={handleMouseLeave}
							onClick={() => handleItemClick('Favourites')}><FontAwesomeIcon icon= {faHeart} style={{marginRight:"15px"}}/>Favourites</p>
					<p style={{color: selectedItem === 'Reviews' ? 'black' : '#999999',fontWeight: selectedItem === 'Reviews' ? 'bold' : 'normal'}}
							onMouseEnter={(e) => e.currentTarget.style.color = 'black'}
							onMouseLeave={handleMouseLeave}
							onClick={() => handleItemClick('Reviews')}><FontAwesomeIcon icon={faStar}  style={{marginRight:"15px"}}/>Reviews</p>
					<p style={{color: selectedItem === 'Help' ? 'black' : '#999999',fontWeight: selectedItem === 'Help' ? 'bold' : 'normal'}} 
							onMouseEnter={(e) => e.currentTarget.style.color = 'black'}
							onMouseLeave={handleMouseLeave}
							onClick={() => handleItemClick('Help')}><FontAwesomeIcon icon={faQuestionCircle}  style={{marginRight:"15px"}} />Help</p>
				</div>
				<div className="shadow" style={{width:"90%" , borderRadius:"20px"}}>
					<div className="ml-3">
						{renderComponent()}
					</div>
				</div>
			</div>
		</div>
		
	)
}

export default UserAccount