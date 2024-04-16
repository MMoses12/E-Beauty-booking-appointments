import React, { useState, useRef, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

import PriceSlider from "./basicComponents/navbar/priceSlider";

let types = ['Barber shop', 'Hair salon', 'Nail salon', 'Tattoo artists', 'Spa']

var services = ["Men haircut", "Woman haircut", "Child haircut", "Manicure", "Pedicure", "Old-fashioned tattoo", "Old-school tattoo", "Modern tattoo"]

var cities = ["Larissa", "Volos", "Athens", "Thessaloniki", "Patra"]

function Filters (props) {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownHeight, setDropdownHeight] = useState(0)
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    
    const changeSelection = (event) => {
        props.changeGroup(event)
        setIsOpen(false)
    }

    types.addEventLiistener = () => {

    }

    useEffect(() => {
        if (isOpen) {
            setDropdownHeight(dropdownRef.current.clientHeight + 10);
        } else {
            setDropdownHeight(0);
        }
    }, [isOpen]);

    return (
        <div className="pl-4">
            <p className="text-2xl font-bold"> Filters </p>
            
            <p className="text-lg mt-2 font-bold"> Group By </p>
            
            <div className="relative">
                <div className="text-center bg-white border border-gray-400 rounded-bottom-md shadow-md px-4 py-2 select-none w-4/5 h-full cursor-pointer p-2" onClick={toggleDropdown}>
                    {props.selectedGroup} 
                    <span> {(isOpen) ? <ChevronUpIcon className="text-end h-3 w-3" /> : <ChevronDownIcon className="text-end h-3 w-3" />} </span>
                </div>
                {isOpen && (
                    <div ref={dropdownRef} className="absolute top-full left-0 w-4/5 bg-white shadow-md rounded-bottom-md overflow-hidden">
                        <ul className="list-none p-0 m-0">
                            {props.selectedGroup !== "By popularity" && (
                                <li className="text-center hover:bg-grey-200 cursor-pointer py-2 px-4 select-none" onClick={changeSelection}> By popularity </li>
                            )}
                            {props.selectedGroup !== "Newest First" && (
                                <li className="text-center hover:bg-grey-200 cursor-pointer py-2 px-4 select-none" onClick={changeSelection}> Newest First </li>
                            )}
                            {props.selectedGroup !== "Ascending Price" && (
                                <li className="text-center hover:bg-grey-200 cursor-pointer py-2 px-4 select-none" onClick={changeSelection}> Ascending Price </li>
                            )}
                            {props.selectedGroup !== "Descending Price" && (
                                <li className="text-center hover:bg-grey-200 cursor-pointer py-2 px-3 select-none" onClick={changeSelection}> Descending Price </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>

            <div style={{ marginTop: isOpen ? dropdownHeight : 0 }}>
                <p className="text-lg mt-3 font-bold"> Price range </p>
                <PriceSlider />

                <p className="text-lg mt-3 font-bold"> Categories </p>
                <div>
                    {types.map((element, index) => (
                        <div key={index}>
                            <Checkbox
                                type="checkbox"
                                className="text-black"
                                inputProps={{ 'aria-label': 'controlled' }}
                                value={element} // Set the value to the store type string
                                checked={props.types.includes(element)}
                                onChange={props.changeTypes}
                            />
                            {element}
                        </div>
                    ))}
                </div>
                
                <p className="text-lg mt-2 font-bold"> Services </p>
                <div>
                    {services.map((element, index) => (
                        <div key={index}>
                            <Checkbox
                                className="text-black"
                                inputProps={{ 'aria-label': 'controlled' }}
                                value={element}
                                checked={props.services.includes(element)}
                                onChange={props.changeServices}
                            />
                            {element}
                        </div>
                    ))}
                </div>

                <p className="text-lg mt-2 font-bold"> Cities </p>
                <div>
                    {cities.map((element, index) => (
                        <div key={index}>
                            <Checkbox
                                className="text-black"
                                inputProps={{ 'aria-label': 'controlled' }}
                                value={element}
                                checked={props.cities.includes(element)}
                                onChange={props.changeCities}
                            />
                            {element}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Filters;
