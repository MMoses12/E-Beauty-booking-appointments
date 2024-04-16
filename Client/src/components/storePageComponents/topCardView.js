import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

import { IoStar } from "react-icons/io5";

const TopCardView = ( props ) => {
    return (
        <div>
            <div className="card rounded-3 border ms-3 mx-auto shadow" style={{marginTop: '50px', maxWidth: '850px', width: '100%'}}>
                <img src={props.storeImage} className="card-img-top" style={{ maxHeight: "300px" }} />
                <div className="card-body">
                    <div style={{display:"flex",flexDirection:"row", alignItems: "center"}}>                    
                        <img src={props.storeLogo}  alt="Store Logo" style={{ width: '60px', height: '60px', marginRight: '10px',borderRadius:'50%' }} />
                        <h2 className="card-title text-center">{props.storeName}</h2>
                    </div>
                    <div className="d-flex flex-row" style={{marginTop:"10px"}}>
                        <p className="card-text" style ={{marginRight:'10px'}}>{props.storeKind}</p>
                        <p className="card-text" style ={{marginRight:'10px'}}>•</p>
                        <p className="card-text" style ={{marginRight:'10px'}}>{props.storeHour}</p>
                        <p className="card-text" style ={{marginRight:'10px'}}>•</p>
                        <p className="card-text"> <IoStar className="mb-1 w-5 text-yellow" /> {props.storeStars} </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TopCardView;