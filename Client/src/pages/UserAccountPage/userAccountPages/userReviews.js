import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt,faStar } from '@fortawesome/free-solid-svg-icons';

const UserReviews = () => {
    const [reviews, setReviews] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        axios.post("http://localhost:4000/user/get-user-reviews")
        .then (response => {
            setReviews(response.data.userReviews)
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
                        return axios.get("http://localhost:4000/user/get-user-reviews")
                    })
                    .then(retryResponse => {
                        setReviews(retryResponse.data.userReviews)
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

    // const reviews = [
    //     {storeName:"Gary", number:"3.5",text:"Leader"},
    //     {storeName:"NtiTheGav", number:"5",text:"Hellooooooo ntiiiiiiiiiiiiiiiiiiiii"},
    //     {storeName:"Bazilis", number:"2.5",text:"EEEE mounopano"},
    //     {storeName:"Baoli", number:"4",text:"Hello , you are not a very good store"},
        
    // ]

    const renderStars = (numStars) => {
        const stars = [];
        
            // Render full stars
            for (let i = 0; i < Math.floor(numStars); i++) {
              stars.push(<span key={i} style={{ marginRight: '5px' }}><FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} /></span>);
            }
        
            // Check if there's a decimal part (half star)
            if (numStars % 1 !== 0) {
                stars.push(<FontAwesomeIcon icon={faStarHalfAlt} style={{ color: '#FFD43B' }} />)
            }
            stars.push(<span>({numStars})</span>)

        return stars;
      };

    return(
        
        <div className="text-center" style={{display:"flex",flexDirection:"column" ,alignItems:"center",height:"800px"}}>
            <p className="text-center" style={{fontSize:"2rem",fontFamily:"sans-serif",fontWeight:"bold"}}>My reviews</p>
            <div className="reviews-list" style={{marginTop:"40px", maxHeight: '600px', overflowY: 'auto',width:"100%"}}>
                    {reviews.map((review, index) => (
                        <div key={index} className="review" style={{marginLeft:"5%",width : "90%", marginBottom:'10px'}}>
                            <div className='' style={{ display: 'flex',gap:"15px" ,flexDirection: 'column',justifyContent:"center",alignItems:"center"}}>   
                                    <h3 >{review.storename}</h3> 
                                    <h5 >{renderStars(review.rating)}</h5>
                            </div>
                            <p style={{alignSelf :"flex-start",marginLeft:"20px"}}>{review.reviewtext}</p>
                            <hr></hr>
                        </div>
                    ))}
            </div>
        </div>
    )
}
export default UserReviews