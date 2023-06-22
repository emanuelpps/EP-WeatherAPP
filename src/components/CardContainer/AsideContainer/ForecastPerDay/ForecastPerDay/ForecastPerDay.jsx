import React, { useContext } from 'react';
import "./ForecastPerDay.css";
//import { BsFillCloudFill } from "react-icons/bs";
import { WeatherContext } from '../../../../../context/WeatherContext/WeatherContext';

export default function ForecastPerDay() {


  const { forecastSelected } = useContext(WeatherContext);

  const ForecastIcon = forecastSelected[0].weather[0].icon;
  //const ForecastMaxTemp = forecast[0].main.temp_max.toFixed();
  //const ForecastMinTemp = forecast[0].main.temp_min.toFixed();


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
      <p>{forecastSelected[0].main.temp.toFixed()}/t°</p>
      </div>
    </div>
  )
}
