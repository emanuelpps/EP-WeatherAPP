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
  const { Weather } = useContext(WeatherContext);

  return (
    <div>
      {typeof Weather.main != "undefined" ? (
        <div className="dashboard-container">
          <DashboardTitle />
          <DashboardYear />
          <CardContainer />
          <DashboardTemp />
          <DashboardCity />
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
}
