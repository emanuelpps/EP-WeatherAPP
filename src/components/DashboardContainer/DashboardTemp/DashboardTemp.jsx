import React, {useContext} from 'react';
import '../DashboardContainer.css';
import { WeatherContext} from '../../../context/WeatherContext/WeatherContext';

export default function DashboardTemp() {

  const { weather } = useContext(WeatherContext);
  return (
    <div className='dashboard-temp'>
        <h3>{weather.main.temp.toFixed()}°C</h3>
    </div>
  )
}
