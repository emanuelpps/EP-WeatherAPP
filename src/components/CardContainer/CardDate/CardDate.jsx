import React, { useContext, useEffect, useState } from "react";
import "./CardDate.css";
import { WeatherContext } from "../../../context/WeatherContext/WeatherContext";

export default function CardDate() {
  const [localTime, setLocalTime] = useState(null);
  const { weather } = useContext(WeatherContext);

  useEffect(() => {
    const fetchData = () => {
      const dateDate = new Date();
      const timeZone = weather.timezone / 3600;
      const correctDate = new Date(dateDate.getTime() - timeZone * 1000);
      setLocalTime(correctDate);
    };
    fetchData();
    const intervalId = setInterval(fetchData, 1000); // Actualizar cada segundo
    return () => {
      clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    };
  }, [weather]);
  const spanishMonths = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const spanishDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  const currentDate = new Date(localTime);

  const minutes = () => {
    if (currentDate.getMinutes() < 10) {
      return "0" + currentDate.getMinutes();
    } else {
      return currentDate.getMinutes();
    }
  };

  const hours = () => {
    if (currentDate.getHours() < 10) {
      return "0" + currentDate.getHours();
    } else {
      return currentDate.getHours();
    }
  };

  const nowDate =
    spanishDays[currentDate.getDay()] +
    ", " +
    currentDate.getDate() +
    " de " +
    spanishMonths[currentDate.getMonth()] +
    " de " +
    currentDate.getFullYear() +
    " | " +
    hours() +
    ":" +
    minutes();

  return (
    <div className="card-date">
      <header className="date">{nowDate}</header>
    </div>
  );
}
