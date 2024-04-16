import React, { useState } from "react";
import Form from "../../components/userPageComponents/userForm/form";
import Navbar from "../../components/basicComponents/navbar/navbar";

import Background from "../../Photos/reception.jpg";

import { useLocation } from "react-router-dom";

function LoginForm() {
    const location = useLocation()
    const isStoreStart = location.state ? location.state.isStore : false
    const [isStore, setIsStore] = useState(isStoreStart)

    console.log(isStore)

    return (
        <div className="log-container w-screen h-screen flex flex-col" style={{backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="nav-box">
                <Navbar logIn={false} register={true} />
            </div>
            <div className="log-box">
                <div className="box">
                    <div className="login-text">
                        {(!isStore) ? <p> Sign Up </p> : <p> Add your store </p>}
                    </div>
                    <div className="box">
                        <Form isRegistered={false} isStore={isStore} setIsStore={setIsStore} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
