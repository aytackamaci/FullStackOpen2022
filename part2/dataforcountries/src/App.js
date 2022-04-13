import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [capital, setCapital] = useState("Ankara");

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&limit=2&appid=${apiKey}`
      )
      .then((response) => {
        setWeatherData(response.data);
      });
  }, [capital]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    if (countriesFiltered[0]) {
      setCapital(countriesFiltered[0].capital);
    }
  };

  const handleCountryChoice = (country) => {
    setSearchValue(country);
  };

  const countriesFiltered =
    searchValue === ""
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(searchValue.toLowerCase())
        );

  return (
    <div>
      <div>
        find countries:{" "}
        <input value={searchValue} onChange={handleSearchChange} />
      </div>
      <ConditionalRender
        weatherData={weatherData}
        setCapital={setCapital}
        handleCountryChoice={handleCountryChoice}
        countries={countriesFiltered}
      >
        {" "}
      </ConditionalRender>
    </div>
  );
};

const ConditionalRender = (props) => {
  const countries = props.countries;

  if (countries.length === 1) {
    const countryToShow = countries[0];

    return (
      <div>
        <Country
          name={countryToShow.name.common}
          capital={countryToShow.capital}
          area={countryToShow.area}
          languages={countryToShow.languages}
          flag={countryToShow.flags.png}
        ></Country>
        <Weather
          city={countryToShow.capital}
          icon={props.weatherData.weather[0].icon}
          temp={(props.weatherData.main.temp - 273.1).toFixed(2)}
          wind={props.weatherData.wind.speed}
        ></Weather>
      </div>
    );
  } else if (countries.length === 0) {
    return <div></div>;
  } else if (countries.length < 10) {
    return (
      <div>
        {countries.map((country) => {
          return (
            <div key={country.name.common}>
              {country.name.common}
              <button
                key={country.name.official}
                onClick={() => props.handleCountryChoice(country.name.common)}
              >
                show
              </button>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>Too many matches, specify another filter</div>;
  }
};

const Country = ({ name, capital, area, languages, flag }) => {
  return (
    <div>
      <h1>{name}</h1>
      <div>capital {capital}</div>
      <div>area {area}</div>
      <h4>languages</h4>
      <ul>
        {Object.values(languages).map((language) => (
          <Languages key={language} language={language} />
        ))}
      </ul>
      <img src={flag} alt="Country Flag" />
    </div>
  );
};

const Weather = ({ city, temp, icon, wind }) => {
  return (
    <div>
      <h3>Weather in {city}</h3>
      <div>temperature {temp} Celcius</div>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="Weather Icon"
      />
      <div>wind {wind} m/s</div>
    </div>
  );
};

const Languages = ({ language }) => {
  return <li>{language}</li>;
};

export default App;
