import "./App.css";
import DashboardContainer from "./components/DashboardContainer/DashboardContainer";
import { WeatherContextProvider } from "./context/WeatherContext/WeatherContext";

function App() {
  return (
      <WeatherContextProvider>
        <DashboardContainer />
      </WeatherContextProvider>
  );
}

export default App;
