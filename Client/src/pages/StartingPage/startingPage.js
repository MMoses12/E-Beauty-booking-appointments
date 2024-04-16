import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./style.css"

// Component Imports
import Navbar from "../../components/basicComponents/navbar/navbar.js";
import Carousel from "../../components/homePageComponents/carousel/carousel.js";
import PricingTable from "../../components/homePageComponents/priceTable/priceTable.js";
import Footer from "../../components/basicComponents/footer/footer.js";
import Wave from "./Wave.js";

//Image Imports
import WomenPhoto from "../../Photos/animatedPhoto.jpg"
import NotebookPhoto from "../../Photos/notebook.jpg"
import Moysis from "../../Photos/Moysis photo.jpg"
import Kostas from "../../Photos/Kostas1.jpg"

const StartingPage = () => {
    const [logged, setLogged] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
        axios.get("http://localhost:4000/token/check-token")
        .then(response => {
            setLogged(true)
        })
        .catch(error => {
            const refreshToken = localStorage.getItem('refreshToken');
            axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;

            axios.get("http://localhost:4000/token/refresh-token")
            .then(refreshResponse => {
                // Extract the refreshed token from the response data based on its structure
                const accessToken = refreshResponse.data.accessToken; // Adjust this based on the actual structure
                
                // Update the token in local storage
                localStorage.setItem('token', accessToken);
                setLogged(true)
            })
            .catch (error => {
                setLogged(false)
            })
        });
    }, []);

    const moysisCV = () => {
        navigate("/moysis-cv", { state: { logged: logged, homePage: true } })
    }

    return (
		<div className="starting-page">

            {/* Navbar*/}
			<div className="navbar-box absolute w-full">
				<Navbar logged={logged} homePage={true} />
			</div>

            {/* Carousel*/}
			<div className="carousel-box" id="carousel">
				<Carousel />
			</div>

            {/* Store subscription prices*/}
			<div id="priceTable">
				<h2 className="text-center text-black text-wrap mt-4 italic">Store Subscription Plans</h2>
				<PricingTable />
			</div>

            {/* About Us*/}
			<div className="bg-blue-300 flex flex-col flex-wrap items-center" id="aboutUs">
				<h2 className="mt-3 mb-1"> About Us </h2>
				<hr className="border-b border-black w-20" />
				<div class="flex flex-row p-8 px-1/4">
					<div className="flex flex-col items-center max-w-fit">
						<h3 className="font-bold italic"> Our Mission </h3>
						<p class="font-serif text-gray-700 text-lg inline-block p-2">
							At E-Beauty, our mission is to revolutionize the beauty industry <br/>
							by seamlessly integrating technology and elegance. We strive to <br/>
							empower individuals with effortless salon appointment <br/> 
							scheduling, ensuring they leave feeling rejuvenated and <br/>
							confident. With meticulous attention to detail and a commitment <br/>
							to user-centric design, we aim to redefine the beauty <br/>
							experience, one click at a time.
						</p>
					</div>
					<img src={WomenPhoto} width={350} height={350} className="mx-5"/>
				</div>
				<div className="flex flex-row p-8 px-1/4">
					<img src={NotebookPhoto} width={350} height={350} className="mx-5"/>
					<div className="flex flex-col items-center max-w-fit">	
						<h3 className="font-bold italic"> Our Story </h3>
						<p className="font-serif text-lg text-gray-700 inline-block p-2"> 
						We developed the Beauty Appointments platform out of a genuine <br />
                        need we identified as undergraduate students. In our pursuit <br />
                        of grooming services, we encountered challenges in finding <br />
                        efficient and user-friendly appointment booking systems for <br />
                        salons, barbershops, and tattoo studios. Fueled by our own <br />
                        frustrations and recognizing a gap in the market, we embarked <br />
                        on a mission to create a solution that simplifies the <br />
						booking process for both service providers and clients. Our <br />
                        goal is to empower individuals with a seamless digital <br />
                        platform that enhances their beauty and grooming experiences </p>
					</div>
				</div>
			</div>

            {/* Wave component*/}
			<Wave />

            <h2 className="text-center" id="contactUs"> Our Team </h2>
            <div className="flex flex-row flex-wrap justify-center">
                <div className="shadow m-3 card">
                    <img src={Moysis} alt="Moysis Moysis" className="w-fit"/>
                    <div className="px-4">
                        <h2 className="pt-2"> Moysis Moysis <br/> </h2>
                        <p className="text-grey"> Electrical and computer engineer </p>
                        <p> Undergraduate student in University <br/> of Thessaly </p>
                        <p> mmoysis@outlook.com <br/> <br/> </p>
                        <p className="flex justify-center place-content-end">
                            <button onClick={moysisCV} className="border-none outline-none inline-block p-1 text-white bg-black-500 text-center hover:bg-black-600" style={{width: '80%'}}> Contact </button>
                        </p>
                    </div>
                </div>

                <div className="shadow m-3 card">
                    <img src={Kostas} alt="Kafantaris Konstantinos" className="w-fit"/>
                    <div className="px-4">
                        <h2> Kafantaris <br/> Konstantinos </h2>
                        <p className="text-grey"> Electrical and computer engineer </p>
                        <p> Undergraduate student in University <br/> of Thessaly </p>
                        <p> kafantariskon@gmail.com </p>
                        <p className="flex justify-center">
                            <button className="border-none outline-none inline-block p-1 text-white bg-black-500 text-center hover:bg-black-600" style={{width: '80%'}}> Contact </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer*/}
			<div className="footer">
				<Footer />
			</div>
		</div>
	);
}

export default StartingPage;