import React, { useState } from "react";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

function PriceSlider() {
    const maxPrice = 100;
    const [priceRange, setPriceRange] = useState([0, maxPrice]);
    const [isDragging, setIsDragging] = useState(false); // State to track if slider handles are being dragged
    const [radioSelected, setRadioSelected] = useState("");

    const quantity = [2, 3, 7, 1, 4, 9]; // Sample data for histogram

    const handlePriceChange = (newPriceRange) => {
        setPriceRange(newPriceRange);
    };

    const handleRadio = (event) => {
        setRadioSelected(event.target.value);
    }   

    return (
        <div className="relative w-full">
            {/* Editable Text Fields */}
            <div className="flex justify-between text-white mt-2">
                <input type="text" value={priceRange[0] + "€"} onChange={(e) => setPriceRange([e.target.value ? parseInt(e.target.value) : 0, priceRange[1]])} className="w-1/4 px-2 py-1 rounded border border-black" />
                <input type="text" value={priceRange[1] + "€"} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-1/4 px-2 py-1 rounded border border-black" />
            </div>
            {/* Slider */}
            <Slider
                min={0}
                max={maxPrice}
                value={priceRange}
                onChange={handlePriceChange}
                onBeforeChange={() => setIsDragging(true)}
                onAfterChange={() => setIsDragging(false)}
                trackStyle={{background: '#EBCBAE', border: 'none'}}
                handleStyle={{background: '#EBCBAE', border: 'none'}}
                range
                className="w-full z-10"
                style={{ marginTop: "20px" }} // Add some margin to separate the slider from the histogram
            />
            <div className="flex flex-col justify-start mt-3">    
            <label> 
                <input 
                    type="radio" 
                    value={"Below 100"} 
                    className="cursor-pointer w-4 h-4 text-beige checked:bg-beige focus:ring-transparent outline-none p-1"
                    checked={radioSelected === "Below 100"}
                    onChange={handleRadio}
                /> 
                <span className="ml-2">Below 100€</span>
            </label>

            <label> 
                <input 
                    type="radio" 
                    value={"100-200"} 
                    className="cursor-pointer w-4 h-4 text-beige checked:bg-beige ring-transparent outline-none p-1"
                    checked={radioSelected === "100-200"}
                    onChange={handleRadio}
                /> 
                <span className="ml-2">100 - 200€</span>
            </label>

            <label> 
                <input 
                    type="radio" 
                    value={"Above 200"} 
                    className="cursor-pointer w-4 h-4 text-beige checked:bg-beige focus:ring-transparent outline-none p-1"
                    checked={radioSelected === "Above 200"}
                    onChange={handleRadio}
                /> 
                <span className="ml-2">Above 200€</span>
            </label>

            </div>
            {/* <div className="absolute top-0 left-0 right-0 transform">
                {quantity.map((value, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center bg-grey-300"
                        style={{
                            width: `${80 / quantity.length}%`,
                            position: 'absolute',
                            left: `${(index * (100 / (quantity.length - 1)))}%`, // Adjusted left position to start from the slider
                            bottom: '100%',
                            height: `${(value * 6) / 100}px`,
                            border: '1px solid white',
                            boxSizing: 'border-box',
                            zIndex: 1 // Ensure the histogram is below the slider
                        }}
                    />
                ))}
            </div> */}
        </div>
    );
}

export default PriceSlider;
