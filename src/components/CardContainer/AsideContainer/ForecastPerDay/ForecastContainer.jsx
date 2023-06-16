import React, { useContext } from 'react';
import ForecastPerDay from './ForecastPerDay/ForecastPerDay';
import "./ForecastContainer.css";
import { WeatherContext } from '../../../../context/WeatherContext/WeatherContext';


export default function ForecastContainer() {

  
    const { Forecast } = useContext(WeatherContext);
  
    if(Forecast?.length < 5){
  return (
    <div className='forecast-container-per-day'>
        {Forecast.map((item) => (
          <ForecastPerDay/>
        ))}
    </div>
  )}
}
