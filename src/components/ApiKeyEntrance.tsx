import { useEffect, useState } from 'react'
import { DataContext, useContext } from '../context/DataContext'

export default function ApiKeyEntrance() {
    const { apiKey, setApiKey }: any = useContext(DataContext)
    const [apiKeyExits, setApiKeyExits] = useState<boolean>(false)
    const [error, setError] = useState({
        status: false,
        message: ''
    })

    useEffect(() => {
        const apiKey = localStorage.getItem('apiKey')
        if (apiKey) {
            setApiKeyExits(true)
        } else {
            setApiKeyExits(false)
        }
    }, [])

    function formHandler(event: React.FormEvent) {
        event.preventDefault()
    }

    function checkApiKey(apiKey: string) {
        const key = apiKey
        const exampleUri = `https://api.openweathermap.org/data/2.5/weather?q=istanbul,tr&APPID=${key}`
        fetch(exampleUri)
            .then((res: any) => {
                if (res.status === 200 && res.ok) {
                    localStorage.setItem('apiKey', apiKey)
                    sessionStorage.removeItem('isDemo')
                    window.location.href = '/cities' // route
                }

                if (res.status === 401 || res.status === 400) {
                    setError({
                        status: true,
                        message: 'Incorrect API Key!'
                    })
                }
            })
            .catch((err: any) => console.error(err))
    }

    function changeApiKey() {
        localStorage.removeItem('apiKey')
        setApiKeyExits(false)
    }

    function demoButtonHandler() {
        sessionStorage.setItem('isDemo', 'true')
        window.location.href = '/cities' // route
    }

    return (
        <div className="api-keys-entrace-container">
            {
                apiKeyExits
                    ? <div className='notification-container'>
                        <h1>You already have an API key</h1>
                        <div className="control-btns">
                            <button
                                id='api-key-change-btn'
                                onClick={changeApiKey}
                            >
                                Change Api Key
                            </button>
                            <button
                                id='show-cities-btn'
                                onClick={() => window.location.href = '/cities'} // route
                            >Show Cities</button>
                        </div>
                    </div>
                    :
                    <>
                        <div className="top-side">
                            <h1>Enter your API Key</h1>
                            <p>You must type your own <span>api-key</span> from <a href="https://openweathermap.org/api">Open Weather</a></p>
                        </div>
                        {
                            error.status === true &&
                            <div
                                id="error-message"
                                className={'show-error-message'}
                            >
                                {error.message || 'fart'}
                            </div>
                        }

                        <div className="form-wrapper">
                            <form onSubmit={formHandler}>
                                <input
                                    type="text"
                                    id="api-key"
                                    name="api-key"
                                    placeholder="Type your <API Key> here."
                                    onChange={(e) => {
                                        setApiKey(e.target.value)
                                    }}
                                />
                                <button onClick={() => checkApiKey(apiKey)}>Let's go</button>
                            </form>
                        </div>

                        <div className='demo-link-wrapper'>
                            <button id='demo-link' onClick={demoButtonHandler}>You can also try it without API key (Demo Version).</button>
                        </div>
                    </>
            }
        </div>
    )
}