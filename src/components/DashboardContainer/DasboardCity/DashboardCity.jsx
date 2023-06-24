import React, { useContext } from "react";
import "../DashboardContainer.css";
import { WeatherContext } from "../../../context/WeatherContext/WeatherContext";

export default function DashboardCity() {
  const { weather } = useContext(WeatherContext);

  return (
    <div className="dashboard-city">
      <h3 className="dashboard-city-title">
        {weather.name} | {weather.main.temp.toFixed()}°C
      </h3>
    </div>
  );
}
