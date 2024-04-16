import React, { useState, useEffect } from "react";
import NavbarPhone from "./navbarPhone";
import Logo from "../../../Photos/logoBasic.png";

import UserDropdownMenu from "./userDropdown";

import { useNavigate } from "react-router-dom";

function Navbar (props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true)
  const navigate = useNavigate()

  const login = () => {
    props.logIn || props.register
      ? navigate("/login",  { replace: true, state: { isStore: false } })
      : navigate("/login", { state: { isStore: false } });
  }

  const goRegister = () => {
    props.logIn || props.register
      ? navigate("/register", { replace: true, state: { isStore: false } })
      : navigate("/register", { state: { isStore: false } });
  }

  const navigateStoreSelection = () => {
      navigate("/storeSelection", { replace: true })
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <div>
      <nav className="md:h-full bg-white bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center">
            <img src={Logo} alt="E-Beauty Logo" height={90} width={150} className="select-none" />
          </div>
          {!props.logged ? (
            <div className="flex h-full justify-between items-center flex-grow">
              <div className="flex md:hidden items-center">
                <button
                  onClick={toggleMobileMenu}
                  className="select-none inline-flex items-center justify-center p-2 rounded-md text-black bg-beige hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
                  aria-expanded={isMobileMenuOpen}
                >
                  <svg
                    className="block h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="hidden md:flex items-center justify-center flex-grow"> {/* Updated this line */}
                <a
                  href="/#carousel"
                  className="select-none text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-5 rounded-md text-base font-medium no-underline"
                  style={{ color: "inherit" }}
                >
                  Home
                </a>
                <a
                  href="/#aboutUs"
                  className="select-none text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-5 rounded-md text-base font-medium no-underline"
                  style={{ color: "inherit" }}
                >
                  About
                </a>
                <a
                  href="/#priceTable"
                  className="select-none text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-5 rounded-md text-base font-medium no-underline"
                  style={{ color: "inherit" }}
                >
                  Services
                </a>
                <a
                  href="/#contactUs"
                  className="select-none text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-5 rounded-md text-base font-medium no-underline"
                  style={{ color: "inherit" }}
                >
                  Contact
                </a>
              </div>
              <div className="hidden md:flex item-center">
                <button
                  onClick={login}
                  className="select-none bg-beige hover:bg-beigeLight px-3 py-2 rounded-md text-base font-medium mx-3 border-2 border-black border-solid"
                >
                  Log In
                </button>
                <button
                  onClick={goRegister}
                  className="select-none bg-beige hover:bg-beigeLight px-3 py-2 rounded-md text-base font-medium border-2 border-black border-solid"
                >
                  Sign Up
                </button>
              </div>
            </div>
          ) : (
            <div className="flex h-full justify-between items-center flex-grow relative">
                <div className="relative w-3/5 mr-2">
                    { (!props.homePage) ?
                        <div>
                            <input 
                                type="search" 
                                placeholder="Search here" 
                                className="rounded-full text-black border border-transparent pr-3 pl-8 py-2.5 pr-10 text-sm w-full select-none" 
                                style={{focus:'border-black', hover:'border-black'}}
                                onChange={props.changeSearch}
                            />
                        
                            <i className="fa fa-search text-grey-400 absolute left-3 top-1/2 transform -translate-y-1/2 hover:text-grey-500 cursor-pointer" aria-hidden="true"></i>
                        </div>
                        :
                        <div className="flex justify-end"> 
                            <button
                                onClick={navigateStoreSelection}
                                className="select-none bg-beige hover:bg-beigeLight px-3 py-2 rounded-md text-base font-medium border-2 border-black border-solid"
                                >
                                Stores
                            </button>
                        </div>
                    }
                </div>
                <UserDropdownMenu logged={props.logged} />
            </div>
          )}
        </div>
        <NavbarPhone isMobileMenuOpen={isMobileMenuOpen} />
      </nav>
    </div>
  );
}

export default Navbar;
