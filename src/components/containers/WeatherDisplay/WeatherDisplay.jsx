import React from "react";
import axios from "axios";

import classes from "./WeatherDisplay.module.css";
import Title from "../../Title/Title";
import ZipCode from "../../ZipCode/ZipCode";
import Button from "../../Button/Button";

class WeatherDisplay extends React.Component {
  state = {
    digits: [null, null, null, null, null],
    activeDigitIndex: 0,
    apiData: null
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
    console.log("Button clicked - asking for weather in", searchZipCode);
    //will need to send to api and get back data
    this.axiosInstance
      .get("/weather?zip=96734,us&appid=")
      .then(response => {
        this.setState({ apiData: response.data });
      })
      .catch(error => {
        console.log(error);
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

    if (this.state.apiData) {
      searchFields = null;
      displayFields = <Title>Here's the weather for you:</Title>;
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
