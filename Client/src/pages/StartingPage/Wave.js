import React from "react";

const Wave = ({ color }) => {
    return (
        <div className="wave-container relative w-full">
            <svg viewBox="0 0 1519 436" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">

                <path fill={'#53a8b6'} d="M 0 235 C 2.5 235 -7.5 244 -5 244 L -5 244 L -5 0 L 0 0 Z" strokeWidth="0"></path>

                <path fill={'#53a8b6'} d="M -6 244 C 75 244 75 190 156 190 L 156 190 L 156 0 L -6 0 Z" strokeWidth="0"></path>

                <path fill={'#53a8b6'} d="M 155 190 C 514 190 514 388 873 388 L 873 388 L 873 0 L 155 0 Z" strokeWidth="0"></path>

                <path fill={'#53a8b6'} d="M 872 388 C 1199.5 388 1199.5 216 1527 216 L 1527 216 L 1527 0 L 872 0 Z" strokeWidth="0"></path>

                <path fill={'#53a8b6'} d="M 1526 216 C 1529.5 216 1515.5 215 1519 215 L 1519 215 L 1519 0 L 1526 0 Z" strokeWidth="0"></path>
            </svg>
        </div>
    );
}

export default Wave;