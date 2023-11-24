export interface CurrentWeather {
    main         : string,
    description  : string,
    icon         : string,
    temperature  : number,
    day          : string,
    time         : string
}

export interface ForecastWeather {
    day             : string,
    time            : string,
    icon            : string,
    mainDescription : string,
    temperature     : number
}