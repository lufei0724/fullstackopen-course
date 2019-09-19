import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

const Form =(props) => {
  const {label, value, onChange} = props;
  return (
    <form>
      <label>
        find countries     
      </label>
      <input type="text" value={value} onChange={onChange}>
      </input>
    </form>
  );
}

const Countries =({countries, filterStr, setQueryStr}) => {
  const checkStr =(str, queryStr) => {
    const regex = new RegExp(queryStr, 'i');
    return regex.test(str);
  };

  return (
    filterStr.length === 0 
      ? <div></div>
      : <CountriesFound 
          countries = {countries
            .filter(e => checkStr(e.name, filterStr))}
          setQueryStr = {setQueryStr}
        />
  );
}

const Message =({message}) => {
  return (
    <div>
      {message}
    </div>
  );
}

const CountriesFound =({countries, setQueryStr}) => {
  switch (true) {
    case (countries.length === 0) :
      return (
        <Message 
          message='No countries match the filter'
        /> 
      );
    case (countries.length === 1):
      return (
        <Country 
          country={countries[0]}
        />
      );
    case (countries.length > 10):
      return (
        <Message 
          message="Too many matches, specify another filter" 
        /> 
      );
    default:
      return (
        countries.map(country =>
          <CountryNameList
           key={country.name} 
           country={country}
           setQueryStr={setQueryStr} 
          />
        )
      );
  }
}

const CountryNameList =({country, setQueryStr}) => {
  return (
    <div>
      {country.name}
      <button 
        onClick={()=>setQueryStr(country.name)}>
        show
      </button>
    </div>
  );
}

const Country =({country}) => {
  const [weather, setWeather] = useState();

  const params = {
    access_key: "5458090488238ea9ee3fc93a1bd38e31",
    query: country.capital + "," + country.name
  };


  const hook =() => {
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        console.log(response.data);
        setWeather(response.data);
      });
  };

  useEffect(hook, []);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language =>
          <Language 
            key={language.name}
            language={language}
          />)
        }
      </ul>
      <Flag 
        country={country}
      />
      <Weather
        weather={weather}
      />
    </div>
  );
}

const Language =({language}) => {
  return (
    <li>{language.name}</li>
  );
}

const Flag =({country}) => {
  return (
    <div>
      <img 
        src={country.flag} 
        alt={country.name}
        height="150"
        width="150">
      </img>
    </div>
  );
}

const Weather =({weather}) => {
  if (weather === undefined) {
    return <div></div>
  } else {
    return (
      <div>
        <h2>Weather in {weather.location.name}</h2>
        <p>temperature: {weather.current.temperature}</p>
        <img
          src={weather.current.weather_icons[0]}
          alt={weather.current.weather_descriptions}
        >
        </img>
        <p>
          wind: {weather.current.wind_speed} kph 
          direction {weather.current.wind_dir}
        </p>
      </div>
    );
  }
}

function App() {
  const [queryStr, setQueryStr] = useState('');
  const [countries, setCountries] = useState([]);

  const handleOnChange =(event) => {
    setQueryStr(event.target.value);
  };

  const hook = () => { axios
    .get('https://restcountries.eu/rest/v2/all')
    .then((response) => {
       setCountries(response.data);
    })
  };

  useEffect(hook, []);

  return (
    <div>
      <Form 
        label={'find countries'}
        value={queryStr}
        onChange={handleOnChange}
      />
      <Countries 
        countries={countries}
        filterStr={queryStr}
        setQueryStr={setQueryStr}
      />
    </div>
  );
}

export default App;
