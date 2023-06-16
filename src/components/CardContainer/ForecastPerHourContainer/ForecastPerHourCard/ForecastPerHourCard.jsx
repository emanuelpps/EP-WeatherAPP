import React from 'react';
import "./ForecastPerHourCard.css";
import { BsFillCloudFill } from "react-icons/bs";

export default function ForecastPerHourCard() {
  return (
    <div className='forecast-cards'>
        <h4>09:00</h4>
        <BsFillCloudFill/>
        <h4>15°</h4>
    </div>
  )
}
