import React, { useEffect, useState } from "react"
import Moysis from "../../Photos/MoysisCV.pdf"

// Component Imports
import Navbar from "../../components/basicComponents/navbar/navbar.js";
import { useLocation } from "react-router-dom";

function MoysisCV () {
    const location = useLocation()
    const logged = location.state ? location.state.logged : false
    const homePage = location.state ? location.state.homePage : false

    return (
        <div>
            <div className="navbar-box absolute w-full h-full">
                <Navbar logged={logged} homePage={homePage} />
                <embed src={Moysis} type="application/pdf" className="w-full h-full" />
            </div>
        </div>
    )
}

export default MoysisCV