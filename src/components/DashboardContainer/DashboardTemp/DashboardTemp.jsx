import React, { useState, useEffect } from "react";
import "../DashboardContainer.css";
import { format } from "date-fns";

export default function DashboardTemp() {
  const [actualDate, setActualDate] = useState(format(new Date(), "HH:mm"));

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
    <div className="dashboard-temp">
      <h3>{actualDate}</h3>
    </div>
  );
}
