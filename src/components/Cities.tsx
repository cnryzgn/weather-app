import CityList from "./CityList"
import Map from "./Map"

import { DataContext, useContext } from "../context/DataContext"
import { useEffect } from "react"

export default function Cities() {
    useEffect(() => {
        let prevOption = localStorage.getItem("option")
        const isDemo = sessionStorage.getItem('isDemo')
        const apiKey = localStorage.getItem('apiKey')

        if (!apiKey && isDemo !== 'true') {
            window.location.href = '/weather-app/#/api-key-entrance'
        }

        // default option if prev value not founded
        if (!prevOption) {
            prevOption = "list"
        }

        setShowComponent(prevOption)

    }, [])

    const { showComponent, setShowComponent }: any = useContext(DataContext)

    function storeSelectOption(opt: any) {
        return localStorage.setItem("option", opt)
    }

    return (
        <div>
            <div className="prev-page-btn-wrapper">
                <i
                    onClick={() => window.location.href = '/api-key-entrance'} // route
                    className="fa-solid fa-angle-left"
                ></i>
                <span id="tooltip">Back to the api key entrace page</span>
            </div>
            <div className='nav-list'>



                <button
                    style={{ backgroundColor: showComponent === 'list' ? '#131d2c' : 'transparent' }}
                    onClick={() => {
                        setShowComponent('list')
                        storeSelectOption("list")
                    }}
                    id='cities-btn'
                    className='nav-btn'
                >
                    List
                </button>
                <button
                    style={{ backgroundColor: showComponent === 'map' ? '#131d2c' : 'transparent' }}
                    onClick={() => {
                        setShowComponent('map')
                        storeSelectOption("map")
                    }}
                    id='map-btn'
                    className='nav-btn'
                >
                    Map
                </button>
            </div>

            {showComponent === 'list' && <h3 id='notice-line'>Listed by license plate codes.</h3>}

            {

                showComponent && showComponent === 'map' 
                    ? <Map /> 
                    : <CityList />
            }
        </div>
    )
}