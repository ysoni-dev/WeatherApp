import React, {useState} from "react";
import {fetchweather} from './api/fetchweather';
import './App.css';

const App = () =>{
    const [query, setQuery] = useState('') ;
    const [weather, setWeather] = useState({});

    const search = async(e) =>{
            if(e.key === 'Enter'){
                const data = await fetchweather(query);
                setWeather(data);
                setQuery('');
            }
    }
   
    const currenttime = new Date().getHours();
    if(document.body){
        if (7<= currenttime && currenttime < 20) {
            document.body.className ="day";
        }
        else{
            document.body.className ="night";
        }
    }

    return(
       <>
           <div className="main-container">
            <input type="text"className="search"placeholder="Search..."value={query}onChange={(e) => setQuery(e.target.value)}onKeyPress={search}/>
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                 
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                     
                    </div>
                        <div className="more">
                            <span>Pressure: {weather.main.pressure}</span><hr></hr>
                            <span>Humidity: {weather.main.humidity}</span><hr></hr>
                            <span>Wind: {weather.wind.speed}</span><hr></hr>
                            <span>Visibility: {weather.visibility}</span><hr></hr>
                            <span>Timezone: {weather.id}</span>

                            
                        </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}
                        
                        </p>
                    </div>
                </div>
            )}
        </div>
            
       </>
        
    )
};
export default App;