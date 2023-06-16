import React, { useContext } from 'react';
import "./ForecastPerDay.css";
import { BsFillCloudFill } from "react-icons/bs";
import { WeatherContext } from '../../../../../context/WeatherContext/WeatherContext';

export default function ForecastPerDay() {

  const { Forecast } = useContext(WeatherContext);

  const ForecastIcon = Forecast[0].weather[0].icon


  const ForecastURL = `https://openweathermap.org/img/wn/${ForecastIcon}.png`

  return (
    <div className='forecast-per-day-card'>
      <div>
       <img src={ForecastURL} alt='icon'/>
      </div>
      <div>
      <p>Martes</p>
      </div>
      <div> 
      <p>{Forecast[0].main.temp_max.toFixed()}° / {Forecast[0].main.temp_min.toFixed()}°</p>
      </div>
    </div>
  )
}
