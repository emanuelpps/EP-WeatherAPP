import React, { useContext, useState, useEffect } from "react";
import ForecastPerDay from "./ForecastPerDay/ForecastPerDay";
import "./ForecastContainer.css";
import { WeatherContext } from "../../../../context/WeatherContext/WeatherContext";
import { addDays, format } from "date-fns";

export default function ForecastContainer() {
  const { forecast } = useContext(WeatherContext);
  const [forecastAside, setForecastAside] = useState([]);
  const [forecastSelected, setForecastSelected] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    const getForecastWeek = () => {
      const currentDate = new Date();
      const actualDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");
      const nextDays = [];
      for (let i = 1; i <= 5; i++) {
        const nextDate = addDays(currentDate, i);
        const formattedDate = format(nextDate, "yyyy-MM-dd 18:00:00");
        nextDays.push(formattedDate);
      }
      setForecastAside(nextDays);
    };

    const getForecast = () => {
      const forecastStateDefined = forecast || [];
      const coincidencias = forecastStateDefined.filter((element) =>
        forecastAside.includes(element.dt_txt)
      );
      setForecastSelected(coincidencias);
    };

    const fetchData = async () => {
      if (forecast) {
        setLoading(true);
        getForecastWeek();
        getForecast();
        setLoading(false);
      }
    };

    fetchData();
  }, [forecast]);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="forecast-container-per-day">
          {forecastSelected.map((item, index) => (
            <ForecastPerDay key={index} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
