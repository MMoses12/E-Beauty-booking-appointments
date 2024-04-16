import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const ReviewsComponent =  () => {
    const storeReviews = [
        { name: 'John', text: 'Excellent service!', number: 5 },
        { name: 'Alice', text: 'Good experience.', number: 4 },
        { name: 'Bob', text: 'Could be better.', number: 3 },
        { name: 'John', text: 'Excellent service!', number: 5 },
        { name: 'Alice', text: 'Good experience.', number: 4 },
        // Add more reviews as needed
    ];
    return(
        <div className='text-center' style={{display:"flex",flexDirection:"column",alignItems:'center',backgroundColor:"beige",height:"100vh"}}>
            <div className="shadow text-center"style={{backgroundColor : "#ADD8E6",width:"100%" ,borderRadius: "0 0 1.5rem 1.5rem ",paddingBottom:"10px",paddingTop:"5px"}}>
                <h2 className='text-center' style={{fontFamily:"cursive", fontWeight:"bold"}}>See your store reviews</h2>
            </div>
            <div className='container bg-white shadow' style={{borderRadius:"10px",width:"auto",marginTop:"100px"}}> 
                <div className='card-title text-center'>
                    <h5>All store reviews</h5>
                </div>
                <div>
                    <div className="reviews-list " style={{ maxHeight: '450px', overflowY: 'auto',width:"400px"}}>
                    {storeReviews.map((review, index) => (
                        <div key={index} className="review" style={{marginLeft:"5%",width : "90%", marginBottom:'10px'}}>
                            <div className='flex-row' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between',}}>   
                                <h3 style={{marginLeft:'20px'}}>{review.name}</h3> 
                                <h5 style={{marginRight:'20px'}}>⭐{review.number}</h5>
                            </div>
                            <p style={{alignSelf :"flex-start",marginLeft:"20px"}}>{review.text}</p>
                            <hr></hr>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ReviewsComponent