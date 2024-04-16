import React from "react"
import { Link } from "react-router-dom"

// Import photos.
// import Photo from "../../Photos/barber.jpg"
// import LogoPhoto from "../../Photos/logo2.png"

// Import icons.
import { IoStar } from "react-icons/io5";
import { LuDot } from "react-icons/lu";

import HeartButton from "./heartButton"

// One store display on the store selection screen.
function StoreItem (props) {
	return (
		<div className="max-w-sm rounded shadow-sm m-3 flex flex-col flex-wrap border hover:cursor-pointer hover:border-blue-500 transition duration-300 ease-in-out hover:bg-grey-200">
			<Link className="no-underline text-black" to="/store" state={{ id: props.id }}>
				<div className="relative select-none">
					<img src={props.backgroundPhoto} alt={props.storeName} className="w-full h-1/3" />
					<img src={props.logoPhoto} alt={`${props.storeName} logo`} className="select-none absolute top-24 left-3 z-10 rounded-full h-14 w-14 border border-b-4 border-white overflow-hidden" />
					<div className="font-bold text-2xl mt-1 text-start px-3 flex flex-row flex-wrap justify-between italic">
						{props.storeName}
						<div className="flex flex-row justify-center items-center py-[1px]">
							<IoStar className="w-5 text-beige" />
							<h4 className="text-beige text-md text-center align-middle"> {props.storeRating !== undefined && props.storeRating !== 0 ? props.storeRating : '-'} </h4>
						</div>
					</div>
					<div className="px-3 flex flex-row">
						<p className="text-sm font-bold text-grey-500 non-italic"> {props.storeType}<LuDot /></p>
						<p className="text-sm text-grey-500"> Lowest {props.lowestPrice}<LuDot />{props.storeCity} </p>
					</div>
					
				</div>
			</Link>
			<div className="flex flex-row justify-end">
				<div className="px-3 pb-2">
					<HeartButton active={props.active} id={props.id}/>
				</div>
			</div>
		</div>
	);
}

export default StoreItem;