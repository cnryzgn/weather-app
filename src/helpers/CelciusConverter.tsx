// Convert data from kelvin to celsius
export function kelvinToCelsius(kelvin: number, twoDigit: boolean = true) {
    const result = kelvin - 273.15
    return twoDigit ? Math.round(Number(result.toFixed(2))) : twoDigit
}

// Convert data from fahrenheit to celsius
export function fahrenheitToCelcius(temp: any): string {
    return (Math.floor(temp - 273.15)).toString()
}