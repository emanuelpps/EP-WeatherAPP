import React, {useContext} from 'react';
import '../DashboardContainer.css';
import { WeatherContext} from '../../../context/WeatherContext/WeatherContext';

export default function DashboardTemp() {

  const { Weather } = useContext(WeatherContext);
  return (
    <div className='dashboard-temp'>
        <h3>{Weather.main.temp.toFixed()}°C</h3>
    </div>
  )
}
