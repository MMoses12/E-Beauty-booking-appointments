import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Page Imports.
import StartingPage from "./pages/StartingPage/startingPage"
import LoginPage from "./pages/RegisterPage/loginForm"
import RegisterPage from "./pages/RegisterPage/registerForm"
import StoreSelection from "./pages/StoresPage/storeSelectionPage"
import Store from "./pages/StorePage/storePage"
import UserAccountPage from "./pages/UserAccountPage/userAccount"
import OTPPage from "./pages/otpPage/OTPPage"
import StoreUserPage from "./pages/storeUserPages/storeUserPage"

import MoysisCV from "./pages/StartingPage/moysisCV"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartingPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="storeSelection" element={<StoreSelection />} />
                <Route path="store" element={<Store />} />
                <Route path="my-account" element={<UserAccountPage />} />
                <Route path="check-otp" element={<OTPPage />} />
                <Route path="moysis-cv" element={<MoysisCV />} />
                <Route path="editStore" element={<StoreUserPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
