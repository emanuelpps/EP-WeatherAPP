
import "./ForecastPerDay.css";
//import { BsFillCloudFill } from "react-icons/bs";

export default function ForecastPerDay({item}) {

  const dayArray = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ];

  //const date = forecastSelected.dt_txt;
  const dayDisplayIndex = new Date(item.dt_txt).getDay();
  const dayDisplay = dayArray[dayDisplayIndex];
  //console.log(dayDisplay);

  const ForecastIcon = item.weather[0].icon;
  //const ForecastMaxTemp = forecast[0].main.temp_max.toFixed();
  //const ForecastMinTemp = forecast[0].main.temp_min.toFixed();

  
    <div class="spinner-border" role="status">
    <span >Loading...</span>
  </div>;

  const ForecastURL = `https://openweathermap.org/img/wn/${ForecastIcon}.png`

  return (
    <div className='forecast-per-day-card'>
      <div>
       <img src={ForecastURL} alt='icon'/>
      </div>
      <div>
      <p className='day-display'>{dayDisplay}</p>
      </div>
      <div> 
      <p>{item.main.temp_max.toFixed()}°</p>
      </div>
    </div>
  )
}
