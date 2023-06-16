import React from 'react';
import "./AsideContainer.css";
import CitySelection from './CitySelection/CitySelection';
import TempAndWind from './TempAndWind/TempAndWind';
import ForecastContainer from './ForecastPerDay/ForecastContainer';

export default function AsideContainer() {
  return (
    <div className='aside-container'>
        <CitySelection/>
        <TempAndWind/>
        <ForecastContainer/>
    </div>
  )
}
