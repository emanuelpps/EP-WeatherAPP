import React from "react";

export default function Loader() {
  return (
    <div className="d-flex justify-content-center mx-auto">
      <div className="spinner-border align-content-center" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
}
