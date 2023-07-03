import { createContext, useContext, useState, useEffect } from "react";
import {
  WEATHER_API_KEY,
  WEATHER_API_URL,
} from "../../api/WeatherApi/WeatherApi";
import Swal from "sweetalert2";

export const WeatherContext = createContext("");

const { Provider } = WeatherContext;

const useApiContext = () => useContext(WeatherContext);

export const WeatherContextProvider = ({ children }) => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [newLat, setNewLat] = useState([]);
  const [newLong, setNewLong] = useState([]);
  const [newWeather, setNewWeather] = useState([]);
  const [inputCityName, setInputCityName] = useState("");
  const [citySearch, setCitySearch] = useState([]);

  //obtener geolocalizacion actual del browser
  useEffect(() => {
    const fetchDataLocation = async () => {
      const isGeoLocationEnabled = "geolocation" in navigator;
      if (!isGeoLocationEnabled) {
        Swal.fire({
          title: "Geolocalización no habilitada",
          text: "La geolocalización no está habilitada en tu navegador. Por favor, habilita la geolocalización en la configuración del navegador para continuar.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        navigator.geolocation.getCurrentPosition(function (position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
          setLocationLoaded(true); // Marcamos que se han cargado los datos de geolocalización
        });
      }
    };

    const fetchWeatherData = async () => {
      // Fetch de la API del clima usando las coordenadas
      const weatherResponse = await fetch(
        `${WEATHER_API_URL}weather/?lat=${lat}&lon=${long}&units=metric&APPID=${WEATHER_API_KEY}`
      );
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
      setNewWeather(weatherData);
    };

    if (locationLoaded) {
      // Se han cargado las coordenadas de geolocalización
      fetchWeatherData();
      fetchForecastData();
    } else {
      // Aún se están obteniendo las coordenadas de geolocalización
      fetchDataLocation();
    }
  }, [lat, long, locationLoaded]);

  const fetchForecastData = async () => {
    console.log("weather.id:", weather.id);
    console.log("newWeather.id", newLong);

    if (weather.id === newWeather.id) {
      const forecastResponse = await fetch(
        `${WEATHER_API_URL}forecast?lat=${lat}&lon=${long}&units=metric&appid=${WEATHER_API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      setForecast(forecastData.list);
    } else {
      const forecastResponse = await fetch(
        `${WEATHER_API_URL}forecast?lat=${newLat}&lon=${newLong}&units=metric&appid=${WEATHER_API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      setForecast(forecastData.list);
    }
  };

  useEffect(() => {
    fetchForecastData();
  }, [newLat, newLong, lat, long, weather]);

  // crear funcion que busque la ciudad ingresada en el buscador y obtenga las coordenadas las almacene
  const fetchCitySearch = async (coordinates) => {
    try {
      const cityResponse = await fetch(
        `${WEATHER_API_URL}weather/?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&APPID=${WEATHER_API_KEY}`
      );
      console.log("forecast.list", cityResponse);
      const cityData = await cityResponse.json();
      setNewLat(cityData.coord.lat);
      setNewLong(cityData.coord.lon);
      setWeather(cityData);
      setInputCityName(cityData.name);
      fetchForecastData();
    } catch (error) {
      console.error("Error fetching city data:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lugar no encontrado",
      });
    }
  };
  console.log("newLat:", newLat);
  console.log("newLong:", newLong);

  const realoadCityInformation = (coordinates) => {
    fetchForecastData();
  };
  //Paso las condiciones meteorologicas segun devuelva la API de ingles al espanol
  //luego llamo esta funcion en el title de la card y renderizo el resultado
  const getCloudsConditions = () => {
    const weatherConditions = {
      200: "Tormenta",
      201: "Tormenta",
      202: "Tormenta",
      210: "Tormenta",
      211: "Tormenta",
      212: "Tormenta",
      221: "Tormenta",
      230: "Tormenta",
      231: "Tormenta",
      232: "Tormenta",
      300: "Llovizna",
      301: "Llovizna",
      302: "Llovizna",
      310: "Llovizna",
      311: "Llovizna",
      312: "Llovizna",
      313: "Llovizna",
      314: "Llovizna",
      321: "Llovizna",
      500: "Lluvia",
      501: "Lluvia",
      502: "Lluvia",
      503: "Lluvia",
      504: "Lluvia",
      511: "Lluvia",
      520: "Lluvia",
      521: "Lluvia",
      522: "Lluvia",
      531: "Lluvia",
      600: "Nevadas",
      601: "Nevadas",
      602: "Nevadas",
      611: "Nevadas",
      612: "Nevadas",
      613: "Nevadas",
      615: "Nevadas",
      616: "Nevadas",
      620: "Nevadas",
      621: "Nevadas",
      622: "Nevadas",
      701: "Visibilidad Reducida",
      711: "Visibilidad Reducida",
      721: "Visibilidad Reducida",
      731: "Visibilidad Reducida",
      741: "Visibilidad Reducida",
      751: "Visibilidad Reducida",
      761: "Visibilidad Reducida",
      762: "Visibilidad Reducida",
      771: "Visibilidad Reducida",
      781: "Visibilidad Reducida",
      800: "Cielo Despejado",
      801: "Parcialmente Despejado",
      802: "Nubes Dispersas",
      803: "Parcialmente Nublado",
      804: "Nublado",
    };
    const weatherId = weather.weather[0].id;
    return weatherConditions[weatherId] || "Estado desconocido";
  };

  //aplico el icon al forecast correspondiente segun la informacion que devuelva la API
  const getCloudsConditionsIcon = () => {
    const weatherIconsImg = {
      "01d": "https://openweathermap.org/img/wn/01d.png",
      "02d": "https://openweathermap.org/img/wn/02d.png",
      "03d": "https://openweathermap.org/img/wn/03d.png",
      "04d": "https://openweathermap.org/img/wn/04d.png",
      "09d": "https://openweathermap.org/img/wn/09d.png",
      "10d": "https://openweathermap.org/img/wn/10d.png",
      "11d": "https://openweathermap.org/img/wn/11d.png",
      "13d": "https://openweathermap.org/img/wn/13d.png",
      "50d": "https://openweathermap.org/img/wn/50d.png",
    };

    const forecastIcons = {};

    if (forecast) {
      forecast.forEach((item) => {
        const weatherId = item.weather[0].icon;
        forecastIcons[weatherId] = weatherIconsImg[weatherId];
      });
    }

    return forecastIcons;
  };

  const context = {
    weather,
    getCloudsConditions,
    forecast,
    getCloudsConditionsIcon,
    newWeather,
    fetchCitySearch,
    realoadCityInformation,
    citySearch,
  };

  console.log("weather", weather);
  console.log("forecast", forecast);
  console.log("weather.dt", weather.dt);
  return <Provider value={context}>{children}</Provider>;
};

export default useApiContext;
