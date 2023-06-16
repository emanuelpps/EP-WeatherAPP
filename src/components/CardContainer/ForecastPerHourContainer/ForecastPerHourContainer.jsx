import React from 'react'
import ForecastPerHourCard from './ForecastPerHourCard/ForecastPerHourCard';
import './ForecastPerHourContainer.css';

export default function ForecastPerHourContainer() {
  return (
    <div className='forecast-card-container'>
        <ForecastPerHourCard/>
        <ForecastPerHourCard/>
        <ForecastPerHourCard/>
        <ForecastPerHourCard/>
        <ForecastPerHourCard/>
    </div>
  )
}
