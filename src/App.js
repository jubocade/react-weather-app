import React, {useState} from "react";
import './App.css';

const api = {
  key: "2def17597f4f24038aab6ff73f34a2ec",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  let searchEngine = event => {
    if(event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=matric&APPID=${api.key}`)
       .then(result => result.json())
       .then(result => {
        setWeather(result);
        setQuery("");
        console.log(result);
       });
    }
  }

  const generateDate = d => {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "December",];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }
 return(
  <div className={
    (typeof weather.main != "undefined") 
    ? (((weather.main.temp - 273.15) > 15)
     ? "app sunny"
      : "app")
       : "app"
}>
    <main>
      <div className="search-container">
        <input type="text"
         className="search-bar"
          placeholder="Enter country or city..."
          onChange={event => setQuery(event.target.value)}
          value={query}
          onKeyPress={searchEngine}
         />
      </div>
      {(typeof weather.main != "undefined") ?  (
         <div>
         <div className="location-container">
           <h1 className="location">
               {weather.name}, {weather.sys.country}
           </h1>
           <h2 className="date">
               {generateDate(new Date())}
           </h2>
         </div>
         <div className="weather-container">
           <h1 className="temperature">
             {Math.round(weather.main.temp - 273.15)}°C
           </h1>
           <h1 className="weather">
             {weather.weather[0].main}
           </h1>
         </div>
         </div>
      ) : ("")}
     
    </main>
  </div>
 );
}
export default App;