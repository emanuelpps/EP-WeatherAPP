import React from 'react';
import "./AsideContainer.css";
import CitySelection from './CitySelection/CitySelection';
import TempAndWind from './TempAndWind/TempAndWind';
import ForecastPerDayContainer from './ForecastPerDay/ForecastPerDay';

export default function AsideContainer() {
  return (
    <div className='aside-container'>
        <CitySelection/>
        <TempAndWind/>
        <ForecastPerDayContainer/>
    </div>
  )
}
