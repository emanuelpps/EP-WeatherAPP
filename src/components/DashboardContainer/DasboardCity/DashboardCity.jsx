import React, { useContext } from 'react';
import '../DashboardContainer.css';
import { WeatherContext} from '../../../context/WeatherContext/WeatherContext';

export default function DashboardCity() {

  const { Weather, localTime } = useContext(WeatherContext);

  return (
    <div className='dashboard-city'>
        <h3> {Weather.name}  | {localTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</h3>
    </div>
  )
}
