import React from "react";
import axios from "axios";

import classes from "./WeatherDisplay.module.css";
import Title from "../../Title/Title";
import ZipCode from "../../ZipCode/ZipCode";
import Button from "../../Button/Button";
import CurrentWeather from "../../CurrentWeather/CurrentWeather";
import FutureWeather from "../../FutureWeather/FutureWeather";
import Spinner from "../../Spinner/Spinner";

class WeatherDisplay extends React.Component {
  state = {
    digits: [null, null, null, null, null],
    activeDigitIndex: 0,
    weather: null,
    forecast: null,
    loadingCurrent: false,
    loadingForecast: false,
  };

  componentDidMount() {
    this.axiosInstance = axios.create({
      baseURL: "https://api.openweathermap.org/data/2.5",
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
    this.setState({ loadingWeather: true, loadingForecast: true });
    const searchZipCode = this.state.digits.join("");

    //api for current weather by zip code
    this.axiosInstance
      .get(
        "/weather?zip=" +
          searchZipCode +
          ",us&units=imperial&appid=" +
          process.env.REACT_APP_WEATHERID
      )
      .then((response) => {
        this.setState({ weather: response.data, loadingCurrent: false });
      })
      .catch((error) => {
        alert("Error in searchClickHandler in WeatherDisplay.jsx");
      });

    //api for future weather by zip code
    console.log("[WeatherDisplay.jsx]", process.env);
    this.axiosInstance
      .get(
        "/forecast?zip=" +
          searchZipCode +
          ",us&units=imperial&appid=" +
          process.env.REACT_APP_WEATHERID
      )
      .then((response) => {
        this.setState({
          forecast: this.processForecast(response.data),
          loadingForecast: false,
        });
      })
      .catch((error) => {
        alert("Error in searchClickHandler in WeatherDisplay.jsx");
      });
  };

  clearSearchHandler = () => {
    this.setState({ weather: null });
    this.setState({ forecast: null });
    this.setState({ digits: [null, null, null, null, null] });
  };

  processForecast = (data) => {
    const shortenedForecast = [];
    //list comes in sets of every 3 hrs, starting now
    //start at 8 sets down (24 hours in the future)
    //increment in sets of 8 (24 hours in the future) for 5 days
    for (let i = 8; i < data.list.length; i += 8) {
      shortenedForecast.push(data.list[i]);
    }
    return shortenedForecast;
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

    if (this.state.loadingCurrent || this.state.loadingForecast) {
      searchFields = (
        <React.Fragment>
          <Title> What's the weather? </Title>
          <Spinner />
        </React.Fragment>
      );
    }

    if (this.state.weather && this.state.forecast) {
      searchFields = null;
      displayFields = (
        <React.Fragment>
          <Title>Here's the weather in {this.state.weather.name}:</Title>
          <CurrentWeather weather={this.state.weather} />
          <FutureWeather forecast={this.state.forecast} />
          <Button click={this.clearSearchHandler}>Search Again</Button>
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
