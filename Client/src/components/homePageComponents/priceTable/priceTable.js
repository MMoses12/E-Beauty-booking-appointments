import React from 'react';
import { useNavigate } from 'react-router-dom';

const PricingTable = () => {
    const navigate = useNavigate()
    const goRegister = () => {
        navigate("/register", { replace: true, state: { isStore: true } })
    }

    return (
        <div className="container mx-auto mt-8">
        <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 flex-shrink-0 md:flex-shrink md:flex-grow md:flex-basis-0 px-4 mb-8">
            <div className="h-full bg-white border border-gray-200 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2 text-center">1 month</h3>
                <div className="text-3xl font-bold mb-4 text-center m p-2">35€<small className="text-base text-gray-500">/mo</small></div>
                <ul className="list-disc list-inside mb-4">
                <li className="mb-2">Enter store for 1 month</li>
                <li className="mb-2">Control appointments</li>
                <li className="mb-2">Basic Support</li>
                </ul>
                <button onClick={goRegister} className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition duration-300 mt-5">Sign up now</button>
            </div>
            </div>

            {/*-------------------------------------------*/}

            <div className="w-full md:w-1/3 flex-shrink-0 md:flex-shrink md:flex-grow md:flex-basis-0 px-4 mb-8">
            <div className="h-full bg-white border border-gray-200 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2 text-center">5 month</h3>
                <div className="text-3xl font-bold mb-4 text-center p-2">25€<small className="text-base text-gray-500">/mo</small></div>
                <ul className="list-disc list-inside mb-4">
                <li className="mb-2">Enter store for 5 month</li>
                <li className="mb-2">Control appointments</li>
                <li className="mb-2">Block customers</li>
                <li className="mb-2">Extra Support</li>
                </ul>
                <button onClick={goRegister} className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition duration-300 mt-3">Sign up now</button>
            </div>
            </div>

            {/*-------------------------------------------*/}
            
            <div className="w-full md:w-1/3 flex-shrink-0 md:flex-shrink md:flex-grow md:flex-basis-0 px-4 mb-8">
            <div className="h-full bg-white border border-gray-200 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2 text-center">1 year</h3>
                <div className="text-3xl font-bold mb-4 text-center">15€<small className="text-base text-gray-500">/mo</small></div>
                <ul className="list-disc list-inside mb-4">
                <li className="mb-2">Enter store for 1 year</li>
                <li className="mb-2">Control appointments</li>
                <li className="mb-2">Block customers</li>
                <li className="mb-2">More customer data</li>
                <li className="mb-2">Extra Support</li>
                </ul>
                <button onClick={goRegister} className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition duration-300">Sign up now</button>
            </div>
            </div>
        </div>
        </div>
    );
};

export default PricingTable;