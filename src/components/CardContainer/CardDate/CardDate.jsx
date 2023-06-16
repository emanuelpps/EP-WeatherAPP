import React from "react";
import "./CardDate.css";

export default function CardDate() {
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

  const currentDate = new Date();

  const minutes = () => {
    if (currentDate.getMinutes() < 10) {
      return "0" + currentDate.getMinutes();
    } else {
      return currentDate.getMinutes();
    }
  };

  const hours = () => {
    if(currentDate.getHours() < 10){
      return "0" + currentDate.getHours();
    } else{
      return currentDate.getHours();
    }
  }

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
      <header>{nowDate}</header>
    </div>
  );
}
