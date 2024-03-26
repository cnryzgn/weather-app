export function storage() {

    return {
        create(key: string, value: any) {
            localStorage.setItem(key, value)

            return true
        },

        get(key: string) {
            return localStorage.getItem(key) || "not found"
        },

        clear(key: string) {
            return localStorage.removeItem(key)
        } 
    }
}