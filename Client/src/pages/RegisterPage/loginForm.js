import React, { useState } from "react";
import Form from "../../components/userPageComponents/userForm/form";
import Navbar from "../../components/basicComponents/navbar/navbar";

import Background from "../../Photos/reception.jpg";
import { useLocation } from "react-router-dom";

function LoginForm () {
    const location = useLocation()
    const isStoreStart = location.state ? location.state.isStore : false
    const [isStore, setIsStore] = useState(isStoreStart)

    console.log(isStore)

    return (
        <div className="log-container w-screen h-screen flex flex-col" style={{backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <Navbar logIn={true} register={false} />
            <div className="flex flex-col items-center h-full">
                <div className="log-box">
                    <div className="login-text select-none">
                        {(!isStore) ? <p>Welcome Back</p> : <p>See your store</p>}
                    </div>
                    <div className="m-4">
                        <Form isRegistered={true} isStore={isStore} setIsStore={setIsStore} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
