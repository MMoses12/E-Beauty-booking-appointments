import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// Component Imports.
import Navbar from "../../components/basicComponents/navbar/navbar"
import Pages from "../../components/storeSelectionComponents/pages"
import Footer from "../../components/basicComponents/footer/footer"
import StoreItem from "../../components/storeSelectionComponents/storeItem"
import Filters from "../../components/filters"

import Tools from "../../Photos/topImage.png"

function StoreSelection () {
    const [storeData, setStoreData] = useState([])
    const [displayStores, setDisplayStores] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [selectedGroup, setSelectedGroup] = useState('Newest first')
    
    // Use states for filters
    const [types, setTypes] = useState([])
    const [services, setServices] = useState([])
    const [cities, setCities] = useState([])
    const [search, setSearch] = useState('')

    const storesPerPage = 6

    const navigate = useNavigate()

    const changeGroup = (event) => {
        setSelectedGroup(event.target.textContent)
    }

    const frontPage = () => {
        setCurrentPage(currentPage + 1)

        let firstStore = currentPage * storesPerPage

        let lastStore = ((currentPage + 1 * storesPerPage) + storesPerPage > storeData.length) ? storeData.length : currentPage + 1 * storesPerPage + storesPerPage

        setDisplayStores(storeData.slice(firstStore, lastStore))
    }

    const backPage = () => {
        setCurrentPage(currentPage - 1)
        
        let firstStore = (currentPage - 1 * storesPerPage < 0) ? 0 : currentPage - 1 * storesPerPage

        let lastStore = firstStore + storesPerPage
        
        setDisplayStores(storeData.slice(firstStore, lastStore))
    }

    const changePage = (event) => {
        let page = parseInt(event.target.textContent, 10)
        
        setCurrentPage(page)

        let firstStore = (page - 1) * storesPerPage
        
        let lastStore = ((page - 1) * storesPerPage + storesPerPage > storeData.length) ? storeData.length : (page - 1) * storesPerPage + storesPerPage
    
        setDisplayStores(storeData.slice(firstStore, lastStore))
    }

    const changeSearch = (event) => {
        setSearch(event.target.value)
    }

    const changeTypes = (event) => {
        const type = event.target.value; // Use event.target.value to get the value of the checkbox
    
        if (types.includes(type)) {
            setTypes(types.filter(item => item !== type))
        } else {
            setTypes([...types, type])
        }
    }

    const changeServices = (event) => {
        const service = event.target.value;

        setServices(prevServices => {
            if (prevServices.includes(service)) {
                return prevServices.filter(item => item !== service);
            } else {
                return [...prevServices, service];
            }
        });
    }

    
    const changeCities = (event) => {
        const city = event.target.value; // Use event.target.value to get the value of the checkbox
    
        if (cities.includes(city)) {
            setCities(cities.filter(item => item !== city))
        } else {
            setCities([...cities, city])
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        axios.post("http://localhost:4000/store/search-stores", { 
            storeName: search, 
            groupBy: selectedGroup, 
            types: (types.length) && types,
            services: (services.length) && services,
            cities: (cities.length) && cities
        })
        .then (response => {
            setStoreData(response.data.filterStores)
                
            setMaxPage(Math.ceil(parseInt(response.data.filterStores.length, 10) / storesPerPage))

            setDisplayStores(response.data.filterStores.slice(0, 6))
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                const refreshToken = localStorage.getItem('refreshToken')
                axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`

                axios.get("http://localhost:4000/token/refresh-token")
                    .then(refreshResponse => {
                        const newToken = refreshResponse.data.accessToken;
                        localStorage.setItem('token', newToken)

                        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
                        return axios.get("http://localhost:4000/store/search-stores", { 
                            storeName: search, 
                            groupBy: selectedGroup, 
                            types: (types.length) && types,
                            services: (services.length) && services,
                            cities: (cities.length) && cities
                        })
                    })
                    .then(retryResponse => {
                        setStoreData(retryResponse.data.filterStores)
                        
                        setMaxPage(Math.ceil(parseInt(retryResponse.data.filterStores.length, 10) / storesPerPage))

                        setDisplayStores(retryResponse.data.filterStores.slice(0, 5))
                    })
                    .catch(refreshError => {
                        console.error("Error refreshing token:", refreshError)
                        navigate("/login", { replace: true })
                    });
            } else {
                console.error("Error fetching stores:", error)
                navigate("/login", { replace: true })
            }
        })
    }, [types, services, cities, search, selectedGroup])

    return (
        <div className="flex flex-col justify-center bg-grey-200">
            <div className="flex flex-col justify-center">
                <div className="navbar-box bg-white">
                    <Navbar 
                        logged={true} 
                        homePage={false} 
                        changeSearch={changeSearch}
                    />
                </div>
                <div className="w-full flex justify-center my-3 select-none">
                    <img src={Tools} alt="Tools" width={1000}/>
                </div>
                <div className="flex flex-row flex-1 justify-between">          
                    <div className="w-1/4 px-5 py-4 overflow-y-scroll max-h-screen flex flex-col justify-start items-end mx-10">
                        <Filters 
                            changeGroup={changeGroup} 
                            selectedGroup={selectedGroup} 
                            changeTypes={changeTypes}
                            changeServices={changeServices}
                            changeCities={changeCities}
                            types={types}
                            services={services}
                            cities={cities}
                        />
                    </div>
                    <div className="w-3/4 pl-4 flex flex-row flex-wrap justify-center h-fit">    
                        {displayStores.map((element, index) => (
                            <StoreItem 
                                key={index}
                                id={element.id}
                                backgroundPhoto={element.backgroundphoto}
                                logoPhoto={element.logophoto}
                                storeName={element.storename}
                                storeRating={Math.ceil(element.avg_rating * 10) / 10}
                                storeType={element.type}
                                lowestPrice={element.lowestPrice}
                                storeCity={element.city}
                                active={element.isFavourite}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <Pages 
                        back={backPage} 
                        front={frontPage}
                        currentPage={currentPage}
                        changePage={changePage}
                        maxPage={maxPage}
                    />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default StoreSelection;