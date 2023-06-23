import React, { useContext, useEffect, useState } from "react";
import ForecastPerHourCard from "./ForecastPerHourCard/ForecastPerHourCard";
import "./ForecastPerHourContainer.css";
import { WeatherContext } from "../../../context/WeatherContext/WeatherContext";

export default function ForecastPerHourContainer() {
  const [selectedForecasts, setSelectedForecasts] = useState([]);
  const { forecast } = useContext(WeatherContext);

  /// Seleccionar los primeros 5 pronosticos en forecast y son guardados en otro estado
  useEffect(() => {
    const selectForecast = async () => {
      const selectedForecasts = [];
      for (let index = 0; index < forecast.length; index++) {
        if (index <= 4) {
          const forecastSelect = forecast[index];
          selectedForecasts.push(forecastSelect);
        }
      }
      setSelectedForecasts(selectedForecasts);
      console.log('selectedForecasts', selectedForecasts);
    };
  
    selectForecast();
  }, [forecast]);

  //Transformar horario de dt_txt

  /// De esos 5 pronosticos se genera un mapeo para que cree 5 cards
  return (
    <div className="forecast-card-container">
      {selectedForecasts.map((itemForecast, index) =>(
        <ForecastPerHourCard key={index} itemForecast={itemForecast} />
      ))}
    </div>
  );
}
