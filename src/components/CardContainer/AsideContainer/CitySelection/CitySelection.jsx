import React, { useContext, useState } from "react";
import "./CitySelection.css";
import { BsSearch } from "react-icons/bs";
import { WeatherContext } from "../../../../context/WeatherContext/WeatherContext";

export default function CitySelection() {
const [ cityName, setCityName ] = useState();
const { fetchCitySearch } = useContext(WeatherContext);

function handleSearch (e){
  e.preventDefault();
  fetchCitySearch(cityName)
  console.log('cityName',cityName);
}

  return (
    <nav class="navbar navbar-expand-lg">
      <form class="d-flex" role="search">
        <input
          onChange={e => setCityName(e.target.value)}
          value={cityName}
          class="form-control me-2"
          type="search"
          placeholder="Buscar Ciudad"
          aria-label="Buscar"
        />
        <button class="btn btn-outline-light" type="submit" onClick={handleSearch}>
          <BsSearch/>
        </button>
      </form>
    </nav>
  );
}
