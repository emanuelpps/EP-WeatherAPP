import React from "react";
import "./CardContainer.css";
import CardDate from "./CardDate/CardDate";
import CardTitle from "./CardTitle/CardTitle";
import ForecastPerHourContainer from "./ForecastPerHourContainer/ForecastPerHourContainer";
import AsideContainer from "./AsideContainer/AsideContainer";

export default function CardContainer({ backgroundImage }) {
  return (
    <div className="card-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <CardDate />
      <CardTitle />
      <ForecastPerHourContainer/>
      <AsideContainer/>
    </div>
  );
}
