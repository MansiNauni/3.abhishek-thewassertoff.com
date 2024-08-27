import React, { useEffect , useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import clouds_icon from '../assets/clouds.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import min_icon from '../assets/down-arrow.png'
import max_icon from '../assets/up-arrow.png'
import desc_icon from '../assets/info.png'
import direction_icon from '../assets/directions.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {

  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false);
  const [units, setUnits] = useState("metric");

  const allIcons = {
    "01d" :clear_icon,
    "01n" :clear_icon,
    "02d" :clouds_icon,
    "02n" :clouds_icon,
    "03d" :clouds_icon,
    "03n" :clouds_icon,
    "04d" :drizzle_icon,
    "04n" :drizzle_icon,
    "09d" :rain_icon,
    "09n" :rain_icon,
    "010d" :rain_icon,
    "010n" :rain_icon,
    "013d" :snow_icon,
    "013n" :snow_icon,
  }
   
  const search = async (city) =>{
    if(city === ""){
      alert("Enter City Name");
      return;
    }
     try{
      //const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${import.meta.env.VITE_APP_ID}`;

    
  



      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){+

        alert(data.message);
        return;
      }

      console.log(data);

      const icon = allIcons[data.list[0].weather[0].icon] || clear_icon;
      const icon1 = allIcons[data.list[1].weather[0].icon] || clear_icon;
      const icon2 = allIcons[data.list[2].weather[0].icon] || clear_icon;
      const icon3 = allIcons[data.list[3].weather[0].icon] || clear_icon;
      const icon4 = allIcons[data.list[4].weather[0].icon] || clear_icon;
      const icon5 = allIcons[data.list[5].weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.list[0].main.humidity,
        windSpeed: data.list[0].wind.speed,
        windDeg: data.list[0].wind.deg,
        temperature: Math.floor(data.list[0].main.temp),
        minTemp: data.list[0].main.temp_min,
        maxTemp: data.list[0].main.temp_max,
        description: data.list[0].weather[0].description,
        location: data.city.name,
        icon: icon,


        temperature1: Math.floor(data.list[1].main.temp),
        description1: data.list[1].weather[0].description,
        icon1: icon1,

        temperature2: Math.floor(data.list[2].main.temp),
        description2: data.list[2].weather[0].description,
        icon2: icon2,

        temperature3: Math.floor(data.list[3].main.temp),
        description3: data.list[3].weather[0].description,
        icon3: icon3,

        temperature4: Math.floor(data.list[4].main.temp),
        description4: data.list[4].weather[0].description,
        icon4: icon4,

        temperature5: Math.floor(data.list[5].main.temp),
        description5: data.list[5].weather[0].description,
        icon5: icon5
      })


     } catch (error){
       setWeatherData(false);
       console.error("Error in fetching weather data")
     }
  }

  
  useEffect(()=>{
     search("Delhi", units);
  },[units]);

  const unitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    console.log(currentUnit);
    
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C" ;
    setUnits(isCelsius ? "metric" : "imperial");
  }


  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search'/>
        <img src = {search_icon} alt="search icon" onClick={()=>search(inputRef.current.value)} /> 
        <button class="units_button" onClick={(e)=> unitsClick(e)}>°C</button>
      </div>


        {weatherData?<>
        <div className="weathe_box_one">

        <div className="weather-data weather-data-one">
          <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
              <p>{weatherData.humidity}</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed} km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
          <div className="col data-col">
          <img src={min_icon} alt="" />
              <div>
              <p>{weatherData.minTemp}°{units === "metric" ? "C" : "F"}</p>
              <span>Min Temp</span>
              </div>
          </div>
        </div> 

        <div className="weather-data weather-data-two">
        <img src = {weatherData.icon} className='weather-icon' alt="clear icon" />
        <p className='temperature'>{weatherData.temperature}°{units === "metric" ? "C" : "F"}</p>
        <p className='location'>{weatherData.location}</p>
        </div>

        <div className="weather-data weather-data-three">
        
          <div className="col data-col">
          <img src={max_icon} alt="" />
            <div>
              <p>{weatherData.maxTemp}°{units === "metric" ? "C" : "F"}</p>   
              <span>Max Temp</span>
            </div>
          </div>
          <div className="col data-col">
          <img src={desc_icon} alt="" />
            <div>
              <p>{weatherData.description}</p>
              <span>Description</span>
            </div>
          </div>

          <div className="col data-col">
          <img src={direction_icon} alt="" />
            <div>
              <p>{weatherData.windDeg}</p>
              <span>Direction</span>
            </div>
          </div>
        </div>

        </div>

        <div className="weather_box_two">

        <div className="weather_box">
          <p>{weatherData.temperature1}°{units === "metric" ? "C" : "F"}</p>
          <img src = {weatherData.icon1} className='box-weather-icon' alt="clear icon" />
          <p>{weatherData.description1}</p>
        </div>


        <div className="weather_box">
          <p>{weatherData.temperature2}°{units === "metric" ? "C" : "F"}</p>
          <img src = {weatherData.icon2} className='box-weather-icon' alt="clear icon" />
          <p>{weatherData.description2}</p>
        </div>


        <div className="weather_box">
          <p>{weatherData.temperature3}°{units === "metric" ? "C" : "F"}</p>
          <img src = {weatherData.icon3} className='box-weather-icon' alt="clear icon" />
          <p>{weatherData.description3}</p>
        </div>


        <div className="weather_box">
          <p>{weatherData.temperature4}°{units === "metric" ? "C" : "F"}</p>
          <img src = {weatherData.icon4} className='box-weather-icon' alt="clear icon" />
          <p>{weatherData.description4}</p>
        </div>

        <div className="weather_box">
          <p>{weatherData.temperature4}°{units === "metric" ? "C" : "F"}</p>
          <img src = {weatherData.icon4} className='box-weather-icon' alt="clear icon" />
          <p>{weatherData.description4}</p>
        </div>

        </div>

        </>:<></>}

    </div>
  )
}


export default Weather