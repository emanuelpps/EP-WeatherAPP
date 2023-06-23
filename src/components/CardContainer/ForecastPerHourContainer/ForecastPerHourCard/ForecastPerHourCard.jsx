import React from 'react';
import "./ForecastPerHourCard.css";

export default function ForecastPerHourCard({ itemForecast }) {
  const date = new Date(itemForecast.dt_txt);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  const forecastPerHourIcon = itemForecast.weather[0].icon;

  const ForecastPerHourURL = `https://openweathermap.org/img/wn/${forecastPerHourIcon}.png`

  return (
    <div className='forecast-cards'>
      <h4>{formattedTime}</h4>
      <div>
       <img src={ForecastPerHourURL} alt='icon'/>
      </div>
      <h4>{itemForecast.main.temp_max.toFixed()}°</h4>
    </div>
  );
}
