import React, { useContext } from "react";
import "../DashboardContainer.css";
import { WeatherContext } from "../../../context/WeatherContext/WeatherContext";

 function DashboardCity() {
  const { newWeather } = useContext(WeatherContext);


  return (
    <div className="dashboard-city">
      <h3 className="dashboard-city-title">
        {newWeather.name} | {newWeather.main.temp.toFixed()}°C
      </h3>
    </div>
  );
}


export default React.memo(DashboardCity);