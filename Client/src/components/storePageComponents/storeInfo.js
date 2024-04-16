import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StoreInfo =(props)=>{
    return(
        <div className="card rounded-3 border ms-3 mx-auto shadow" style={{marginTop:'50px',maxWidth: '850px' ,width: '100%'}}>
        <div className="card-body">
            <h5 className="card-title">About us:</h5>
            <p className="card-text">
                <div className= "mx-3 text-left">{props.storeText}</div>
            </p>
            <h5 className="card-title ">Our Services:</h5>
            <div className="column">
                {props.serviceList}
            </div>
            <h5 className="card-title">Contact us:</h5>
            <p style={{marginLeft:'15px'}}>{props.phoneNumber}</p>
            <p style={{marginLeft:'15px'}}>{props.emailAddress}</p>
        </div>
    </div> 
    )
}
export default StoreInfo 