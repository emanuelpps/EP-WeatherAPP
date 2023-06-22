import { createContext, useContext, useState, useEffect } from "react";
import {
  WEATHER_API_KEY,
  WEATHER_API_URL,
} from "../../api/WeatherApi/WeatherApi";
import { addDays, format } from "date-fns";

export const WeatherContext = createContext("");

const { Provider } = WeatherContext;

const useApiContext = () => useContext(WeatherContext);

export const WeatherContextProvider = ({ children }) => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [localTime, setLocalTime] = useState();
  const [forecastAside, setForecastAside] = useState([]);
  const [forecastSelected, setForecastSelected] = useState([]);
  const [locationLoaded, setLocationLoaded] = useState(false);

  //const WeatherURL = `${WEATHER_API_URL}weather/?lat=${lat}&lon=${long}&units=metric&APPID=${WEATHER_API_KEY}`;

  //const WeatherURLForecast = `${WEATHER_API_URL}forecast?id=${weather.id}&units=metric&APPID=${WEATHER_API_KEY}`;

  //obtener geolocalizacion actual del browser
  useEffect(() => {
    const fetchDataLocation = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        setLocationLoaded(true); // Marcamos que se han cargado los datos de geolocalización
      });
    };

    const fetchWeatherData = async () => {
      // Fetch de la API del clima usando las coordenadas
      if (
        lat !== null &&
        lat !== undefined &&
        long !== null &&
        long !== undefined
      ) {
        const weatherResponse = await fetch(
          `${WEATHER_API_URL}weather/?lat=${lat}&lon=${long}&units=metric&APPID=${WEATHER_API_KEY}`
        );
        const weatherData = await weatherResponse.json();
        setWeather(weatherData);
      }
    };
    const fetchLocalTime = () => {
      if (weather !== null || weather !== undefined) {
        setLocalTime(new Date(weather.dt * 1000));
      }
    };

    if (lat !== null && long !== null && locationLoaded) {
      // Se han cargado las coordenadas de geolocalización
      fetchWeatherData();
      fetchLocalTime();

      fetchForecastData(); // Llamar a fetchForecastData() después de establecer el estado weather
    } else {
      // Aún se están obteniendo las coordenadas de geolocalización
      fetchDataLocation();
    }
  }, [lat, long, locationLoaded]);

  const fetchForecastData = async () => {
    if (weather !== null || weather !== undefined) {
      const forecastResponse = await fetch(
        `${WEATHER_API_URL}forecast?id=${weather.id}&units=metric&APPID=${WEATHER_API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      setForecast(forecastData.list);
      //console.log('forecast.list', forecastData.list);
      getForecast(); // Llamar a getForecast() después de establecer el estado forecast
      getForecastWeek();
    }
  };

  // crear funcion con booleano

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

  //reconfiguro la fecha actual para que coincida con la que devuelve la API
  //obtengo los siguientes 5 dias de la semana segun el dia actual
  const getForecastWeek = () => {
    const currentDate = new Date();

    const actualDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");

    const nextDays = [];
    for (let i = 1; i <= 5; i++) {
      const nextDate = addDays(currentDate, i);
      const formattedDate = format(nextDate, "yyyy-MM-dd 00:00:00");
      nextDays.push(formattedDate);
    }

    console.log("actualDate", actualDate);

    setForecastAside(nextDays);
    console.log(forecastAside);
    getForecast();
  };

  const getForecast = () => {
    const forecastStateDefined = forecast || [];
    const filteredForecast = forecastStateDefined.filter((element) => {
      const forecastDate = element.dt_txt; // Extraer la fecha de dt_txt en el formato "yyyy-MM-dd"w

      return forecastAside.includes(forecastDate);
    });
    setForecastSelected(filteredForecast);
  };

  const context = {
    weather,
    getCloudsConditions,
    localTime,
    forecast,
    getCloudsConditionsIcon,
    getForecastWeek,
    getForecast,
    forecastSelected,
  };

  console.log("weather", weather);
  console.log("forecast", forecast);
  console.log("forecastSelected", forecastSelected);
  console.log("forecastAside", forecastAside);
  console.log("weather.dt", weather.dt);
  console.log("localTime", localTime);
  return <Provider value={context}>{children}</Provider>;
};

export default useApiContext;
