import React, { useContext, useEffect, useState } from "react";
import "../DashboardContainer.css";
import { WeatherContext } from "../../../context/WeatherContext/WeatherContext";
import { format } from "date-fns";

export default function DashboardCity() {
  const [actualDate, setActualDate] = useState(format(new Date(), "HH:mm"));
  const { weather } = useContext(WeatherContext);



  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const updatedActualDate = format(currentDate, "HH:mm");
      setActualDate(updatedActualDate);
    }, 60000); // Actualizar cada minuto (60000 milisegundos)

    return () => {
      clearInterval(interval); // Limpiar el intervalo al desmontar el componente
    };
  }, []);

  return (
    <div className="dashboard-city">
      <h3 className="dashboard-city-title">
        {weather.name} | {actualDate}
      </h3>
    </div>
  );
}
