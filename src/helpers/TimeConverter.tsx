import moment from "moment"

export function getCurrentDate() {
    return new Date()
}

export function convertDay(date: any): string {
    const x = typeof date == "string" ? (date.split(' '))[0] : (date.toString().split(' '))[0]
    const dt = moment(x, "YYYY-MM-DD HH:mm:ss")
    return dt.format('dddd').toString()
}

export function convertTime(date: any): string {
    const dt = moment(date, "YYYY-MM-DD HH:mm:ss")
    return dt.format('HH:mm').toString()
}
