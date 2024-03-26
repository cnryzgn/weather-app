import { useEffect, useState } from "react"
import { DataContext, useContext } from "../context/DataContext"

export default function CityList() {
    const [search, setSearch] = useState<string>('')
    const { cities }: any = useContext(DataContext)
    const [citiesData, setCitiesData] = useState<any[]>([])

    // When page onload
    useEffect(() => {
        const prevPositionY = localStorage.getItem("positionY") ?? ''

        window.scroll({
            top: parseInt(prevPositionY)
        })

        localStorage.removeItem("positionY")
    } , [])

    useEffect(() => {
        console.log(cities.length)
        cities.length > 0 &&
        setCitiesData(cities)
    }, [cities])

    useEffect(() => {
        filterSearch(search)
    }, [search])

    function filterSearch(search: any) {
        if (search === '') {
            setCitiesData(cities)
        } else {
            let searchResults = cities?.filter((city: any) => {
                const convertedCityNameEng = convertToEnglishChars(city.name)
                return convertedCityNameEng.toLowerCase().startsWith(convertToEnglishChars(search).toLowerCase())
            })
            setCitiesData(searchResults)
        }
    }

    function storeScrollPosition() {
        const positionY = window.scrollY
        localStorage.setItem("positionY", positionY.toString())
    }

    function convertToEnglishChars(cityName: string) {
        const turkishChars = 'çÇğĞıİöOşŞüÜ'
        const englishChars = 'cCgGiIoOsSuU'

        const charMap: Record<string, string> = Object.fromEntries([...turkishChars].map((char:string, index: number) => [char, englishChars[index]]))
        return cityName.replace(/[çÇğĞıİöÖşŞüÜ]/g, (match) => charMap[match] || match)
    }


    return (
        <div className="cities-container">
            <input 
                type="text" 
                id="city-searchbar" 
                placeholder="Search city by name"
                defaultValue={''}
                lang="tr"
                onChange={(e: any) => setSearch(e.target.value)} 
            />
            <ul className="cities-wrapper">
                {
                    citiesData.length > 0 &&
                    citiesData.map((city: any) => (
                        <a 
                            key={city.id}
                            href={`/weather/${city.name}`} 
                            onClick={() => storeScrollPosition()}
                        >
                            <span className="id">{city.id} </span> 
                            {city.name}
                        </a>
                    ))
                }
            </ul>
        </div>
    )
}