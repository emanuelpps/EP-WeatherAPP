import React, { useContext } from "react";
import CardContainer from "../CardContainer/CardContainer";
import "./DashboardContainer.css";
import DashboardTitle from "./DashboardTitle/DashboardTitle";
import DashboardYear from "./DashboardYear/DashboardYear";
import DashboardTemp from "./DashboardTemp/DashboardTemp";
import DashboardCity from "./DasboardCity/DashboardCity";
import { WeatherContext } from "../../context/WeatherContext/WeatherContext";
import Loader from "../Loader/Loader";

export default function DashboardContainer() {
  const { weather } = useContext(WeatherContext);

  return (
    <div>
      {typeof weather.main != "undefined" ? (
        <div className="dashboard-container">
          <DashboardTitle />
          <DashboardYear />
          <CardContainer />
          <DashboardTemp />
          <DashboardCity />
        </div>
      ) : (
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
