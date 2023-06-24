import React, { useContext } from "react";
import "./TempAndWind.css";
import { WeatherContext } from "../../../../context/WeatherContext/WeatherContext";

export default function TempAndWind() {
  const { weather } = useContext(WeatherContext);

  const windDirection = () => {
    return weather.wind.deg >= 20 && weather.wind.deg < 70
    ? "Viento Noreste"
    : weather.wind.deg >= 70 && weather.wind.deg < 110
    ? "Viento Este"
    : weather.wind.deg >= 110 && weather.wind.deg < 160
    ? "Viento Sureste"
    : weather.wind.deg >= 160 && weather.wind.deg < 200
    ? "Viento Sur"
    : weather.wind.deg >= 200 && weather.wind.deg < 250
    ? "Viento Suroeste"
    : weather.wind.deg >= 250 && weather.wind.deg < 290
    ? "Viento Oeste"
    : "Viento Norte";
  };

  return (
    <div className="temp-wind">
      <h2 className="title-city">{weather.name}</h2>
      <h2>{weather.main.temp.toFixed()}°C</h2>
      <h5>
        {windDirection()} | {weather.wind.speed.toFixed()} Km/h
      </h5>
    </div>
  );
}
