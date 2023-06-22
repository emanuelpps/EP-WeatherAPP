import React, { useContext } from "react";
import ForecastPerDay from "./ForecastPerDay/ForecastPerDay";
import "./ForecastContainer.css";
import { WeatherContext } from "../../../../context/WeatherContext/WeatherContext";

export default function ForecastContainer() {
  const { forecastSelected } = useContext(WeatherContext);
  
  console.log(forecastSelected);
    return (
      <div className="forecast-container-per-day">
        {
        forecastSelected.map((item) => (
          <ForecastPerDay key={item} />
        ))}
      </div>
    );
  }
