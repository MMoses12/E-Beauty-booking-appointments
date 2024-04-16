import React from "react"
import { useNavigate } from "react-router-dom";

function NavbarPhone (props) {
    const navigate = useNavigate();
    const login = () => {
        (props.logIn || props.register) ? navigate('/login', {replace: true}) : navigate('/login');
    }
    const goRegister = () => {
        (props.logIn || props.register) ? navigate('/register', {replace: true}) : navigate('/register');
    }

    return (
        <div className={`md:hidden ${props.isMobileMenuOpen ? "" : "hidden"}`}>
            <div className="px-2 pt-2 pb-3 sm:px-3 flex flex-col justify-center items-center">
                <div className="flex flex-col">
                    <a
                        href="/#carousel"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium no-underline"
                        style={{color:'inherit'}}
                    >
                        Home
                    </a>
                    <a
                        href="/#aboutUs"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium no-underline"
                        style={{color:'inherit'}}
                    >
                        About
                    </a>
                    <a
                        href="/#priceTable"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium no-underline"
                        style={{color:'inherit'}}
                    >
                        Services
                    </a>
                    <a
                        href="/#contactUs"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium no-underline"
                        style={{color:'inherit'}}
                    >
                        Contact
                    </a>
                </div>
                <div className="flex justify-center mt-4">
                    <button onClick={login} className="bg-beige hover:bg-beigeLight px-3 py-2 rounded-md text-base font-medium mx-3 border-2 border-black border-solid">
                        Log In
                    </button>
                    <button onClick={goRegister} className="bg-beige hover:bg-beigeLight px-3 py-2 rounded-md text-base font-medium border-2 border-black border-solid">
                        Sign Up
                    </button>
                </div>
            </div>
      </div>
    );
}

export default NavbarPhone;