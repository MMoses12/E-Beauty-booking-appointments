import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"

import axios from 'axios'

import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import "../../pages/StorePage/storePage.css";
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

import { IoStar } from "react-icons/io5";

// For toast.
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const labels = {
    0.5: 'Bad',
    1: 'Bad+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function Ratings(props) {
    const [rating, setRating] = useState()
    const [review, setReview] = useState()
    const [hover, setHover] = useState(-1)

    const [displayReviews, setDisplayReviews] = useState([])

    useEffect(() => {
        console.log(props.ratingArray)
        setDisplayReviews(props.ratingArray)
    }, [props.ratingArray])

    const navigate = useNavigate()

    const notify = (message) => {
        toast(message)
    }

    const changeReview = (event) => {
        console.log(event.target.value)
        setReview(event.target.value)
    }

    const saveComment = () => {
        console.log(props.id)

        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        axios.put("http://localhost:4000/review/submit-rating", { storeID: props.id, rating: rating, review: review })
        .then(response => {
            notify("Review submited")
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
                return axios.put("http://localhost:4000/review/submit-rating", { storeID: props.id, rating: rating, review: review })
            })
            .then(retryResponse => {
                notify("Review submited")
            })
            .catch(refreshError => {
                console.error("Error refreshing token:", refreshError)
                navigate("/login", { replace: true })
            });
        })
    }

    return (
        //here we make the review item for the user  
        <div className=" card rounded-3 border ms-3 mx-auto shadow" style={{marginTop: '50px', maxWidth: '850px', width: '100%'}}>
            <div>
            <h5 className='card-title text-center'>Review Store</h5>
            </div>
            <Box className="text-center"
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
            >
            <Rating style ={{marginLeft:'20px'}}
                name="hover-feedback"
                value={rating}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {rating !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
            )}
            </Box>
            <div className="container">
            <div className='d-flex flex-row'>
                <div className="comment-container">
                <input type='text' onChange={changeReview} className="border comment" style ={{height:'100px' , width :'300px',marginLeft:'20px',marginBottom:"20px", resize: 'none'}}
                    placeholder='Set your comment here...'
                />
                </div>
                <div>
                    <button className='submit' style={{marginLeft:'10px',marginTop:'40px'}} onClick={saveComment}>Submit</button>
                    <ToastContainer />
                </div>
            </div>
            <hr></hr>
            </div>
            
            {/* here we take all the reviews from the users to display them in the store page */}
            { displayReviews.length !== 0 &&
                <div> 
                    <div className='card-title text-center'>
                        <h5>All store reviews</h5>
                    </div>
                    <div>
                        <div className="reviews-list " style={{ maxHeight: '300px', overflowY: 'auto'}}>
                        {displayReviews.map((review, index) => (
                            <div key={index} className="review" style={{marginLeft:"5%",width : "90%", marginBottom:'10px'}}>
                                <div className='flex-row' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between',}}>   
                                    <h3 style={{marginLeft:'20px'}}>{review.username}</h3> 
                                    <h5 style={{marginRight:'20px'}}> <IoStar className="w-5 text-yellow" /> {review.rating}</h5>
                                </div>
                                <p style={{alignSelf :"flex-start",marginLeft:"20px"}}>{review.reviewtext}</p>
                                <hr></hr>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>        
            }
        </div>
    );
}