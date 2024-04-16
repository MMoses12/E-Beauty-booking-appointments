import React ,{ useState } from 'react';
import "./times.css"

const Times = (props) => {

    const handleTimeClick = (hour) => {
        props.setAppointmentTime(hour)
    };

    return(
        <div className='container text-center' >
                <h4 className="card-title" style={{fontFamily:'cursive' , fontWeight:'bold'}}>Choose Hour</h4>
                <div className="hour-selector mx-auto" >
                    {props.hours.map((hour, index) => (
                        <div key={index} className="hour-box rounded" style ={{width:'70px', backgroundColor: (props.appointmentTime === hour) ? '#ADD8E6': 'white'}} onClick={() => handleTimeClick(hour)}>
                            {hour}
                        </div>
                    ))}
                </div>
        </div>

    )
}
export default Times;