import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [joke, setJoke] = useState({ setup: "Loading...", punchline: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState('English');

    const fetchJoke = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            const data = await response.json();
            setJoke({ setup: data.setup, punchline: data.punchline });
        } catch (error) {
            console.error("Error fetching joke:", error);
            setJoke({setup: "Oops! Something went wrong.", punchline: "Please try again later." });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJoke();
    }, []);

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        fetchJoke();
    };

    return (
        <div className="container">
            <div className="language-switch">
                <select id="language-select" value={language} onChange={handleLanguageChange} className="language-dropdown">
                    <option value="English">English</option>
                    <option value="Finnish">Finnish</option>
                </select>
            </div>
            <div className="jokes">
                <div className="joke-card">
                    {isLoading ? <div className="loader"></div> : <p>{joke.setup}</p>}
                </div>
                <div className="punchline-card">
                    <p>{joke.punchline}</p>
                </div>
            </div>
            <button
                className="NewJokeButton"
                onClick={fetchJoke}
                aria-label="Get another joke">
                {language === 'English' ? "Get Another Joke" : "Hanki Toinen Vitsi"}
            </button>
        </div>
    );
}

export default App;
