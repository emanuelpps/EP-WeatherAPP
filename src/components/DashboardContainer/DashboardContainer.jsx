import React, { useContext, useEffect, useRef, useState } from "react";
import CardContainer from "../CardContainer/CardContainer";
import "./DashboardContainer.css";
import DashboardTitle from "./DashboardTitle/DashboardTitle";
import DashboardYear from "./DashboardYear/DashboardYear";
import DashboardTemp from "./DashboardTemp/DashboardTemp";
import DashboardCity from "./DasboardCity/DashboardCity";
import { WeatherContext } from "../../context/WeatherContext/WeatherContext";
import Loader from "../Loader/Loader";
import cloudy from "../../assets/cloudy.jpg";
import fog from "../../assets/fog.jpg";
import partlyCloudy from "../../assets/partly-cloudy.jpg";
import snowy from "../../assets/snowy.gif";
import storm from "../../assets/storm.gif";
import sunny from "../../assets/sunny.jpg";
import rain from "../../assets/rain.gif";

export default function DashboardContainer() {
  const [backgroundImage, setBackgroundImage] = useState();
  const { weather } = useContext(WeatherContext);
  const dashboardBackgroundRef = useRef();

  useEffect(() => {
    const dashboardBackground = dashboardBackgroundRef.current;
    const backgroundElements = [
      cloudy,
      fog,
      partlyCloudy,
      snowy,
      storm,
      sunny,
      rain,
    ];

    const getCloudBackgroundById = () => {
      if (
        weather?.weather?.[0]?.id >= "200" &&
        weather?.weather?.[0]?.id < "300"
      ) {
        setBackgroundImage(backgroundElements[4]);
        return backgroundElements[4];
      } else if (
        weather?.weather?.[0]?.id >= "600" &&
        weather?.weather?.[0]?.id < "622"
      ) {
        setBackgroundImage(backgroundElements[3]);
        return backgroundElements[3];
      } else if (
        weather?.weather?.[0]?.id >= "300" &&
        weather?.weather?.[0]?.id < "600"
      ) {
        setBackgroundImage(backgroundElements[6]);
        return backgroundElements[6];
      } else if (
        weather?.weather?.[0]?.id >= "700" &&
        weather?.weather?.[0]?.id < "800"
      ) {
        setBackgroundImage(backgroundElements[1]);
        return backgroundElements[1];
      } else if (
        weather?.weather?.[0]?.id >= "800" &&
        weather?.weather?.[0]?.id < "801"
      ) {
        setBackgroundImage(backgroundElements[5]);
        return backgroundElements[5];
      } else if (
        weather?.weather?.[0]?.id >= "801" &&
        weather?.weather?.[0]?.id <= "802"
      ) {
        setBackgroundImage(backgroundElements[2]);
        return backgroundElements[2];
      } else if (
        weather?.weather?.[0]?.id >= "803" &&
        weather?.weather?.[0]?.id < "805"
      ) {
        setBackgroundImage(backgroundElements[0]);
        return backgroundElements[0];
      }
    };
    dashboardBackground.style.backgroundImage = `url(${getCloudBackgroundById()})`;

    return () => {
      // Limpieza del efecto
      dashboardBackground.style.backgroundImage = "none";
    };
  }, [weather]);

  return (
    <div className="dashboardAndCard" ref={dashboardBackgroundRef}>
      {typeof weather.main !== "undefined" ? (
        <div className="dashboard-container">
          <DashboardTitle />
          <DashboardYear />
          <CardContainer backgroundImage={backgroundImage} />
          <DashboardTemp />
          <DashboardCity />
        </div>
      ) : (
        <div>
        <Loader className="text-center mx-auto" />
        <p className="text-center"><b>RECORDÁ ACTIVAR TU GEOLOCALIZACIÓN</b></p>
        </div>
      )}
    </div>
  );
}
