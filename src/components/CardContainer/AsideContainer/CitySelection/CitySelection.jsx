import React, { useContext, useState } from "react";
import "./CitySelection.css";
import { BsSearch } from "react-icons/bs";
import { AsyncPaginate } from "react-select-async-paginate";
import { WeatherContext } from "../../../../context/WeatherContext/WeatherContext";
import { WEATHER_API_KEY } from "../../../../api/WeatherApi/WeatherApi";

export default function CitySelection() {
  const [cityName, setCityName] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const { fetchCitySearch } = useContext(WeatherContext);

 

  const loadOptions = async (inputValue, loadedOptions) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&lang=ES&appid=${WEATHER_API_KEY}`
      );
      const data = await response.json();

      const options = data.map((city) => ({
        value: `${city.lat} ${city.lon}`,
        label: `${city.name} , ${city.state === undefined ? city.country : city.state} | ${city.country}`,
      }));
      
      return {
        options: options,
        hasMore: false,
      };
    } catch (error) {
      console.log(error);
      return {
        options: [],
        hasMore: false,
      };
    }
  };

  

  const handleOnChange = (selectedOption) => {
    setCityName(selectedOption);
    onSearchChange(selectedOption);
  };

  const onSearchChange = (selectedOption) => {
    const [lat, lon] = selectedOption.value.split(" ");
    setCoordinates([lat, lon]);
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetchCitySearch(coordinates);
    console.log('coord',coordinates);
  };

  return (
    <nav className="navbar navbar-expand-lg search-container">
      <form className="d-flex search-inner" role="search">
        <AsyncPaginate
          className="input"
          placeholder="Buscar Ciudad..."
          debounceTimeout={600}
          value={cityName}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        />
        <button
          className="btn btn-outline-light"
          type="submit"
          onClick={handleClick}
        >
          <BsSearch />
        </button>
      </form>
    </nav>
  );
}
