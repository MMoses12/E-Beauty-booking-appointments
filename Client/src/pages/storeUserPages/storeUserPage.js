import React, {useState} from 'react';
import { useNavigate } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';
import BanCustomerComponent from "./banCustomerComponent"
import AppointmentsComponent from "./appointmentsComponent"
import ReviewsComponent from "./reviewsComponent"
import MyStoreComponent from "./myStoreComponent"

const StoreUserPage = () => {
    const [selectedItem, setSelectedItem] = useState('My Store ✎');
    const navigate = useNavigate()

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        
        navigate("/", { replace: true })
        navigate(0)
    }

    const renderComponent = () => {
        switch (selectedItem) {
            case 'My Store ✎':
                return <MyStoreComponent />;
            case 'Reviews ☆':
                return <ReviewsComponent />;
            case 'Appointments 📆':
                return <AppointmentsComponent />;
            case 'Ban Customer 🚫':
                return <BanCustomerComponent />;
            case 'Log Out':
                logOut()
                break
            default:
                return null;
        }
    };
    return (
        <div  className="d-flex flex-column flex-md-row" style={{backgroundColor:"beige", height:"100vh",width:'100vw'}}>
            <div className='card d-flex flex-column shadow' style={{backgroundColor :"white ", marginTop:"0px" , marginBottom:"0px", width: "15%" ,borderRadius: "0 1.5rem 1.5rem 0 "}}>  
                <div className='UserData' style={{display:"flex", flexDirection:"row",marginLeft:"10px"}}>
                    <div style={{marginRight:"10px"}}>
                        <img src="../public/Photos/logo1.png"></img>
                    </div>
                    <div className='card-title text-center'>
                        <h4>Username</h4>
                    </div>        
                </div>
                <div className="choices card-title text-center" style = {{fontFamily:"serif",paddingTop:"10px",cursor:"pointer",marginTop:"100px"}}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'blue'} 
                            onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                            onClick={() => handleItemClick('My Store ✎')}>                
                    <h5>My Store ✎</h5>   
                </div>

                <hr></hr>
                <div className="choices card-title text-center" style = {{fontFamily:"serif",paddingTop:"10px",cursor:"pointer" }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'blue'} 
                            onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                            onClick={() => handleItemClick('Reviews ☆')}>                
                    <h5>Reviews ☆</h5>     
                </div>

                <hr></hr>
                <div className="choices card-title text-center" style = {{fontFamily:"serif",paddingTop:"10px",cursor:"pointer" }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'blue'} 
                            onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                            onClick={() => handleItemClick('Appointments 📆')}>                
                    <h5>Appointments 📆</h5>                   
                </div>

                <hr></hr>
                <div className="choices card-title text-center" style = {{fontFamily:"serif",paddingTop:"10px",cursor:"pointer" }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'blue'} 
                            onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                            onClick={() => handleItemClick('Ban Customer 🚫')}>                
                    <h5>Ban Customer 🚫</h5>                   
                </div>
                <hr></hr>
                <div className="choices card-title text-center" style = {{fontFamily:"serif",paddingTop:"10px",cursor:"pointer" }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'blue'} 
                            onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                            onClick={() => handleItemClick('Log Out')}>                
                    <h5>Log Out</h5>                   
                </div>
            </div>

            <div className="" style={{ width:"100vw"}}>
                {renderComponent()}
            </div>

        </div>
    )
}

export default StoreUserPage