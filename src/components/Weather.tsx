import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


// Helper Functions
import { kelvinToCelsius, fahrenheitToCelcius } from '../helpers/CelciusConverter'
import { convertDay, convertTime, getCurrentDate } from '../helpers/TimeConverter'

// Interfaces
import { CurrentWeather, ForecastWeather } from '../Interfaces/Interface'
import { weather, forecast } from '../data/static/DemoData'

// Context
import { DataContext, useContext } from '../context/DataContext'

export default function Weather() {
    const { apiKey }: any = useContext(DataContext)
    const { city } = useParams()

    // WeatherData contains Current!
    const [forecastData, setForecastData] = useState<ForecastWeather[]>([])

    // WeatherData contains Current!
    const [weatherData, setWeatherData] = useState<CurrentWeather>({
        main: '',
        description: '',
        icon: '',
        temperature: 0,
        day: '',
        time: '',
    })

    // API DATA
    useEffect(() => {
        const api_key = localStorage.getItem('apiKey')

        if (api_key !== null && (city !== '' || city !== null)) {
            axios.all([
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},tr&APPID=${api_key}`),
                axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},tr&APPID=${api_key}&cnt=5`)
            ])
                .then(axios.spread((weatherResponse, forecastResponse) => {

                    // // Api Weather Data
                    setWeatherData((prevState: any) => (
                        {
                            ...prevState,
                            main: weatherResponse.data.weather[0].main,
                            description: weatherResponse.data.weather[0].description,
                            icon: weatherResponse.data.weather[0].icon,
                            temperature: kelvinToCelsius(weatherResponse.data.main.temp),
                            day: convertDay(new Date().getDay()),
                            time: convertTime(new Date())
                        }
                    ))

                    // Api Forecast Data
                    forecastResponse.data.list.map((data: any) => {
                        if (forecastData.length < 5) {
                            setForecastData((prevState: any) => [...prevState, {
                                day: convertDay(data.dt_txt),
                                time: convertTime(data.dt_txt),
                                icon: data.weather[0].icon,
                                mainDescription: data.weather[0].main,
                                temperature: kelvinToCelsius(data.main.temp),
                            }])
                        }
                    })
                }))
        }
    }, [city, apiKey])


    // JSON FILE DATA
    useEffect(() => {
        // Check api key
        const isDemo = sessionStorage.getItem('isDemo')
        const api_key = localStorage.getItem('apiKey')

        if (isDemo === null && api_key === null) {
            window.location.href = '/weather-app/#/api-key-entrance'
        }

        // Get Static Data for Demo
        if (isDemo !== null) {
            // Static weather data
            setWeatherData((prevState: any) => (
                {
                    ...prevState,
                    main: weather.weather[0].main,
                    description: weather.weather[0].description,
                    icon: weather.weather[0].icon,
                    temperature: kelvinToCelsius(weather.main.temp),
                    day: convertDay(new Date().getDay()),
                    time: convertTime(new Date())
                }
            ))

            // Static forecast data
            forecast.list.map((subData: any) => {
                if (forecastData.length < 5) {
                    setForecastData((prevState: any) => [...prevState, {
                        day: convertDay(subData.dt_txt),
                        time: convertTime(subData.dt_txt),
                        icon: subData.weather[0].icon,
                        mainDescription: subData.weather[0].main,
                        temperature: kelvinToCelsius(subData.main.temp),
                    }])
                }
            })
        }
    }, [])


    function backToPrevPage(path?: string) {
        return window.history.back()
    }

    return (
        <div className='weather-container'>
            <div className="current-weather">
                <div className='left'>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.icon || '03n'}@2x.png`} alt="weather-icon" />
                    {weatherData.temperature} &#8451;
                </div>

                <div className="prev-page-btn-wrapper">
                    <i onClick={() => backToPrevPage()} className="fa-solid fa-angle-left"></i>
                    <span id="tooltip">Back to the list of cities</span>
                </div>


                <div className='right'>
                    <h1>{weatherData.main}</h1>
                    <h3>{weatherData.day}  {weatherData.time}</h3>
                    <h3>{weatherData.description}</h3>
                </div>
            </div>


            <div className='center-weather'>
                {
                    sessionStorage.getItem('isDemo') !== null &&
                    <h3 style={{ color: 'brown', textDecoration: 'underline' }}>DEMO DATA</h3>
                }
                <h1>{city}</h1>
                <h2>{weatherData.temperature} ℃</h2>
                <h3>{weatherData.main}</h3>
            </div>


            <div className="weather-forecast">
                {
                    forecastData &&
                    forecastData.map((data: any, i: any) => (
                        <div key={i} className='weather'>
                            <div id='day'>{data.day}</div>
                            <div id='time'>{data.time}</div>
                            <div id='weather-icon'>
                                <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt={'weather-icon'} />
                            </div>
                            <div id='description'>{data.mainDescription}</div>
                            <div id='temp'>{data.temperature} &#8451;</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}