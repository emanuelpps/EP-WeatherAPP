import React, { useContext } from "react";
import "./CardTitle.css";
//import { ApiContext } from '../../../api/apiContext';
//import { LocationContext } from '../../../context/Location/ContextLocation';
import { WeatherContext } from "../../../context/WeatherContext/WeatherContext";
import { HiOutlineRefresh } from "react-icons/hi";
import { FiPlusSquare } from "react-icons/fi";


export default function CardTitle() {
  const { getCloudsConditions, weather, realoadCityInformation } = useContext(WeatherContext);


    const visibilityInKm = weather.visibility / 1000;

  return (
    <>
      <div className="title-position">
        <div className="button-group">
          <div>
            <button className="btn" type="button" onClick={() => realoadCityInformation()}>
              <HiOutlineRefresh style={{fontSize:"20px"}}/>
            </button>
          </div>
          <p>
            <a
              class="btn"
              data-bs-toggle="collapse"
              href="#multiCollapseExample1"
              role="button"
              aria-expanded="false"
              aria-controls="multiCollapseExample1"
            >
              <FiPlusSquare style={{fontSize:"20px"}} />
            </a>
          </p>
          <div class="row">
            <div class="col">
              <div class="collapse multi-collapse text-start" id="multiCollapseExample1">
                <div class="card card-body bg-transparent">
                  <ul class="list-group-flush">
                    <li class="list-group-item">
                      ST {weather.main.feels_like.toFixed()}°C
                    </li>
                    <li class="list-group-item">
                      Humedad {weather.main.humidity}%
                    </li>
                    <li class="list-group-item">
                      Presión {weather.main.pressure}hPa
                    </li>
                    <li class="list-group-item">
                      Visibilidad {visibilityInKm}Km
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="weather-title">
          <h1 className="title-weather">{getCloudsConditions()}</h1>
        </main>
      </div>
    </>
  );
}
