import React from "react";
import axios from "axios";

import classes from "./WeatherDisplay.module.css";
import Title from "../../Title/Title";
import ZipCode from "../../ZipCode/ZipCode";
import Button from "../../Button/Button";
import CurrentWeather from "../../CurrentWeather/CurrentWeather";
import FutureWeather from "../../FutureWeather/FutureWeather";

class WeatherDisplay extends React.Component {
  state = {
    digits: [null, null, null, null, null],
    activeDigitIndex: 0,
    weather: {
      coord: { lon: -157.74, lat: 21.41 },
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }
      ],
      base: "stations",
      main: {
        temp: 71.33,
        feels_like: 75.9,
        temp_min: 66.2,
        temp_max: 73.4,
        pressure: 1016,
        humidity: 88
      },
      visibility: 16093,
      wind: { speed: 3.36, deg: 250 },
      clouds: { all: 75 },
      dt: 1584555515,
      sys: {
        type: 1,
        id: 7877,
        country: "US",
        sunrise: 1584549370,
        sunset: 1584592886
      },
      timezone: -36000,
      id: 0,
      name: "Kailua",
      cod: 200
    }
  };

  componentDidMount() {
    this.axiosInstance = axios.create({
      baseURL: "https://api.openweathermap.org/data/2.5"
    });
  }

  digitChangedHandler = (e, digitIndex) => {
    const copyDigits = [...this.state.digits]; //avoid changing state directly
    copyDigits[digitIndex] = e.target.value;
    const digitIsEmpty = copyDigits[digitIndex] === "";
    const newDigitIndex = digitIsEmpty ? digitIndex : digitIndex + 1;
    this.setState({ digits: copyDigits, activeDigitIndex: newDigitIndex });
  };

  searchClickHandler = () => {
    const searchZipCode = this.state.digits.join("");
    //will need to send to api and get back data
    this.axiosInstance
      .get("/weather?zip=96734,us&appid=")
      .then(response => {
        this.setState({ weather: response.data });
      })
      .catch(error => {
        alert("Error in searchClickHandler in WeatherDisplay.jsx");
      });
  };

  render() {
    let displayFields = null;
    let searchFields = (
      <React.Fragment>
        <Title> What's the weather? </Title>
        <ZipCode
          digits={this.state.digits}
          digitChanged={this.digitChangedHandler}
          activeDigitIndex={this.state.activeDigitIndex}
        />
        <Button click={this.searchClickHandler}>Search</Button>
      </React.Fragment>
    );

    if (this.state.weather) {
      searchFields = null;
      displayFields = (
        <React.Fragment>
          <Title>Here's the weather in {this.state.weather.name}:</Title>
          <CurrentWeather weather={this.state.weather} />
          <FutureWeather weather={this.state.weather} />
        </React.Fragment>
      );
    }

    return (
      <div className={classes.WeatherDisplay}>
        {searchFields}
        {displayFields}
      </div>
    );
  }
}

export default WeatherDisplay;
