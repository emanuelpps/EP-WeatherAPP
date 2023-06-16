import { createContext, useContext, useState, useEffect } from "react";
import {
  WEATHER_API_KEY,
  WEATHER_API_URL,
  API_LANG,
} from "../../api/WeatherApi/WeatherApi";
//import { GEO_API_URL } from "../../api/CitiesApi/CitiesApi";
//import { GEO_TIME_API_URL } from "../../api/CitiesApi/CityTimeApi";

export const WeatherContext = createContext("");

const { Provider } = WeatherContext;

const useApiContext = () => useContext(WeatherContext);

export const WeatherContextProvider = ({ children }) => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [Weather, setWeather] = useState([]);
  const [Forecast, setForecast] = useState([]);
  const [localTime, setLocalTime] = useState();

  const WeatherURL = `${WEATHER_API_URL}weather/?lat=${lat}&lon=${long}&units=metric&APPID=${WEATHER_API_KEY}&lang=${API_LANG}`;

  const WeatherURLForecast = `${WEATHER_API_URL}forecast?id=${Weather.id}&units=metric&APPID=${WEATHER_API_KEY}`;

  useEffect(() => {
    const fetchDataLocation = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(WeatherURL)
        .then((res) => res.json())
        .then((result) => {
          //console.log(result)
          setWeather(result);
          console.log(result);
        });
      await fetch(WeatherURLForecast)
        .then((resp) => resp.json())
        .then((response) => {
          console.log(response);
          setForecast(response.list);
          console.log(Forecast);
        });
    };
    fetchDataLocation();
    setLocalTime(new Date(Weather.dt * 1000));
    getCloudsConditions();
  }, [lat, long]);

  const getCloudsConditions = () => {
    return Weather.weather[0].id >= 200 && Weather.weather[0].id <= 232
      ? (Weather.weather[0].main = "Tormenta")
      : Weather.weather[0].id >= 300 && Weather.weather[0].id <= 321
      ? (Weather.weather[0].main = "Llovizna")
      : Weather.weather[0].id >= 500 && Weather.weather[0].id <= 531
      ? (Weather.weather[0].main = "Lluvia")
      : Weather.weather[0].id >= 600 && Weather.weather[0].id <= 622
      ? (Weather.weather[0].main = "Nevadas")
      : Weather.weather[0].id >= 701 && Weather.weather[0].id <= 781
      ? (Weather.weather[0].main = "Visibilidad Reducida")
      : Weather.weather[0].id === 800
      ? (Weather.weather[0].main = "Cielo Despejado")
      : Weather.weather[0].id === 801
      ? (Weather.weather[0].main = "Parcialmente Despejado")
      : Weather.weather[0].id === 802
      ? (Weather.weather[0].main = "Nubes Dispersas")
      : Weather.weather[0].id === 803
      ? (Weather.weather[0].main = "Parcialmente Nublado")
      : Weather.weather[0].id === 804
      ? (Weather.weather[0].main = "Nublado")
      : "Estado desconocido";
  };

  const getCloudsConditionsIcon = () => {
    const weatherIconsImg = [
      { clear: "https://openweathermap.org/img/wn/01d.png" },
      { fewClouds: "https://openweathermap.org/img/wn/02d.png" },
      { scattedClouds: "https://openweathermap.org/img/wn/03d.png" },
      { brokenClouds: "https://openweathermap.org/img/wn/04d.png" },
      { rain: "https://openweathermap.org/img/wn/09d.png" },
      { drizzle: "https://openweathermap.org/img/wn/10d.png" },
      { thunderstorm: "https://openweathermap.org/img/wn/11d.png" },
      { snow: "https://openweathermap.org/img/wn/13d.png" },
      { haze: "https://openweathermap.org/img/wn/50d.png" },
    ];

    let weatherIcon = Object.keys(Forecast);
    console.log(Forecast);
    for (let i = 0; i < weatherIcon.length; i++) {
      let icon = weatherIcon[i];
      console.log('la ' + Forecast[icon].weather[0].icon);
      return Forecast[icon].weather[0].icon >= 200 &&
        Forecast[icon].weather[0].icon <= 232
        ? (Forecast[icon].weather[0].icon = weatherIconsImg.thunderstorm)
        : Forecast[icon].weather[0].icon >= 300 &&
          Forecast[icon].weather[0].icon <= 321
        ? (Weather.weather[0].main = weatherIconsImg.drizzle)
        : Forecast[icon].weather[0].icon >= 500 &&
          Forecast[icon].weather[0].icon <= 531
        ? (Weather.weather[0].main = weatherIconsImg.rain)
        : Forecast[icon].weather[0].icon >= 600 &&
          Forecast[icon].weather[0].icon <= 622
        ? (Weather.weather[0].main = weatherIconsImg.snow)
        : Forecast[icon].weather[0].icon >= 701 &&
          Forecast[icon].weather[0].icon <= 781
        ? (Weather.weather[0].main = weatherIconsImg.haze)
        : Forecast[icon].weather[0].icon === 800
        ? (Weather.weather[0].main = weatherIconsImg.clear)
        : Forecast[icon].weather[0].icon === 801
        ? (Weather.weather[0].main = weatherIconsImg.fewClouds)
        : Forecast[icon].weather[0].icon === 802
        ? (Weather.weather[0].main = weatherIconsImg.scattedClouds)
        : Forecast[icon].weather[0].icon === 803
        ? (Weather.weather[0].main = weatherIconsImg.brokenClouds)
        : Forecast[icon].weather[0].icon === 804
        ? (Weather.weather[0].main = weatherIconsImg.brokenClouds)
        : "Estado desconocido";
    }
  };

  const context = {
    Weather,
    getCloudsConditions,
    localTime,
    Forecast,
    getCloudsConditionsIcon,
  };

  return <Provider value={context}>{children}</Provider>;
};

export default useApiContext;
