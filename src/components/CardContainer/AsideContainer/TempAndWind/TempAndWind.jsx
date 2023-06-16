import React, { useContext } from "react";
import "./TempAndWind.css";
import { WeatherContext } from "../../../../context/WeatherContext/WeatherContext";

export default function TempAndWind() {
  const { Weather } = useContext(WeatherContext);

  const windDirection = () => {
    return Weather.wind.deg >= 20 && Weather.wind.deg < 70
    ? "Viento Noreste"
    : Weather.wind.deg >= 70 && Weather.wind.deg < 110
    ? "Viento Este"
    : Weather.wind.deg >= 110 && Weather.wind.deg < 160
    ? "Viento Sureste"
    : Weather.wind.deg >= 160 && Weather.wind.deg < 200
    ? "Viento Sur"
    : Weather.wind.deg >= 200 && Weather.wind.deg < 250
    ? "Viento Suroeste"
    : Weather.wind.deg >= 250 && Weather.wind.deg < 290
    ? "Viento Oeste"
    : "Viento Norte";
  };

  return (
    <div className="temp-wind">
      <h2 className="title-city">{Weather.name}</h2>
      <h2>{Weather.main.temp.toFixed()}°C</h2>
      <h5>
        {windDirection()} | {Weather.wind.speed.toFixed()}Km/H
      </h5>
    </div>
  );
}
