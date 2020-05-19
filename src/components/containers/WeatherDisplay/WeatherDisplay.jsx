import React from "react";
import axios from "axios";

import classes from "./WeatherDisplay.module.css";
import Title from "../../Title/Title";
import ZipCode from "../../ZipCode/ZipCode";
import Button from "../../Button/Button";
import CurrentWeather from "../../CurrentWeather/CurrentWeather";
import FutureWeather from "../../FutureWeather/FutureWeather";
import Spinner from "../../Spinner/Spinner";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

class WeatherDisplay extends React.Component {
  state = {
    digits: [null, null, null, null, null],
    activeDigitIndex: 0,
    weather: null,
    forecast: null,
    loadingCurrent: false,
    loadingForecast: false,
    errorMessage: null,
    deleting: false,
  };

  componentDidMount() {
    this.axiosInstance = axios.create({
      baseURL: "https://api.openweathermap.org/data/2.5",
    });
  }

  digitChangedHandler = (e, digitIndex) => {
    //console.log("[WeatherDisplay.jsx] digitChangedHandler(");
    let newDeleting = false;
    const copyDigits = [...this.state.digits]; //avoid changing state directly
    copyDigits[digitIndex] = e.target.value;
    const digitIsEmpty = copyDigits[digitIndex] === "";
    let newDigitIndex = digitIsEmpty ? digitIndex : digitIndex + 1;
    if (digitIsEmpty && this.state.digits[digitIndex] !== "") {
      newDigitIndex--;
      newDeleting = true;
    }
    this.setState({
      digits: copyDigits,
      activeDigitIndex: newDigitIndex,
      deleting: newDeleting,
    });
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
        this.setState({
          weather: response.data,
          loadingCurrent: false,
          errorMessage: null,
        });
      })
      .catch((error) => {
        this.handleError(error.response);
      });

    //api for f
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
          errorMessage: null,
        });
      })
      .catch((error) => {
        this.handleError(error.response);
      });
  };

  handleError = (errorResponse) => {
    let errorString = "";
    if (errorResponse.status === 400 || errorResponse.status === 404) {
      errorString = errorResponse.data.message;
      errorString = errorString
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.substring(1);
        })
        .join(" ");
    } else {
      errorString = "Something went wrong";
    }
    this.setState({
      errorMessage: errorString,
      loadingForecast: false,
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

    let error = this.state.errorMessage ? (
      <ErrorMessage errorMessage={this.state.errorMessage} />
    ) : null;

    let searchFields = (
      <React.Fragment>
        <Title> What's the weather? </Title>
        <ZipCode
          digits={this.state.digits}
          digitChanged={this.digitChangedHandler}
          activeDigitIndex={this.state.activeDigitIndex}
          deleting={this.state.deleting}
        />
        {error}
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
