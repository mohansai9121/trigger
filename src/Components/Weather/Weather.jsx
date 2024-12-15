import { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const url = "https://api.openweathermap.org/data/2.5/";
  const apiKey = "47426df0e4d2962b6e7b3873fb8ec359";

  const [longitude, setLogitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [weatherCondition, setWeatherCondition] = useState("");
  const [temperature, setTemperature] = useState("");
  const [place, setPlace] = useState("");
  const [wind, setWind] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLatitude(pos.coords.latitude);
        setLogitude(pos.coords.longitude);
      });
      if (latitude && longitude) {
        console.log("latitude:", JSON.stringify(latitude));
        console.log("longitude:", JSON.stringify(longitude));
        await axios(
          `${url}weather/?lat=${latitude}&lon=${longitude}&APPID=${apiKey}`
        )
          .then((res) => {
            console.log(JSON.stringify(res.data));
            setWeatherCondition(
              JSON.stringify(res.data.weather[0].description)
            );
            setTemperature(Math.round(res.data.main.feels_like - 273.15));
            setPlace(JSON.stringify(res.data.name));
            setWind(JSON.stringify(res.data.wind.speed * 3.6));
            setSunrise(
              JSON.stringify(
                new Date(res.data.sys.sunrise)
                  .toLocaleTimeString()
                  .split(" ")[0]
              )
            );
            setSunset(
              JSON.stringify(
                new Date(res.data.sys.sunset).toLocaleTimeString().split(" ")[0]
              )
            );
          })
          .catch((err) => console.log(err));
      }
    };
    fetchWeather();
  }, [latitude, longitude]);

  return (
    <div>
      <pre>Weather Condition:{weatherCondition}</pre>
      <pre>temperature:{temperature} ~celcius</pre>
      <pre>Place:{place}</pre>
      <pre>Sunrise:{sunrise} am</pre>
      <pre>Sunset:{sunset} pm</pre>
      <pre>Wind:{wind} km/hr</pre>
    </div>
  );
};

export default Weather;
