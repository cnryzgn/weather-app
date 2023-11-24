import TurkeyMap from "turkey-map-react"
export function Map() {

    return (
        <div className="map-container">
            <TurkeyMap 
                onClick={(data) => window.location.href = `/weather-app/#/weather/${data.name}`} 
                showTooltip={true} 
                customStyle={{ idleColor: "#6dd5ed", hoverColor: "#2193b0" }} />
        </div>
    )
}