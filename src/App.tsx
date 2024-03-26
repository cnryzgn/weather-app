import { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Context API
import { DataContext } from './context/DataContext'

// Components
import CityList from './components/CityList'
import Map from './components/Map'
import Weather from './components/Weather'
import Cities from './components/Cities'
import NotFound from './components/404/NotFound'
import Home from './components/Home'
import ApiKeyEntrance from './components/ApiKeyEntrance'
import { cities as StaticCityData } from './data/static/DemoData'

export const App = () => {
  const [apiKey, setApiKey] = useState<string>('')
  const [cities, setCities] = useState<any>([])
  const [showComponent, setShowComponent] = useState<string>('cities')
  const [search, setSearch] = useState<string>('')
  const [weatherData, setWeatherData] = useState()

  useEffect(() => {
    // Static data <local file>
    setCities(StaticCityData)
  }, [StaticCityData])


  const contextData = { apiKey, setApiKey, search, weatherData, cities, showComponent, setShowComponent }

  return (
    <DataContext.Provider value={contextData}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/api-key-entrance' element={<ApiKeyEntrance />} />
          <Route path='/cities' element={<Cities />} />
          <Route path='/weather/:city' element={<Weather />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </DataContext.Provider>
  )
}