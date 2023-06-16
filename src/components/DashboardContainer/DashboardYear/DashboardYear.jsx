import React from "react";
import "../DashboardContainer.css";

export default function DashboardYear() {
  const actualYear = new Date().getFullYear();

  return (
    <div className="dashboard-year">
      <h3>{actualYear}</h3>
    </div>
  );
}
