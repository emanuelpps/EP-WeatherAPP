import React, {useContext, useEffect, useState} from 'react';
import "./CardTitle.css";
//import { ApiContext } from '../../../api/apiContext';
//import { LocationContext } from '../../../context/Location/ContextLocation';
import { WeatherContext } from '../../../context/WeatherContext/WeatherContext';

export default function CardTitle() {

  const { getCloudsConditions } = useContext(WeatherContext);

 

  return (
    <div className='title-position'>
        <main className='weather-title'>
              <h1 className='title-weather'>{getCloudsConditions()}</h1>
        </main>
    </div>
  )
}
