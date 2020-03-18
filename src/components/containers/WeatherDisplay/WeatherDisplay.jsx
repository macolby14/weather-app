import React from "react";

import Title from "../../Title/Title";
import ZipCode from "../../ZipCode/ZipCode";
import Button from "../../Button/Button";
import classes from "./WeatherDisplay.module.css";

class WeatherDisplay extends React.Component {
  state = {
    digits: [null, null, null, null, null],
    activeDigitIndex: 0
  };

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
  };

  render() {
    return (
      <div className={classes.WeatherDisplay}>
        <Title> What's the weather? </Title>
        <ZipCode
          digits={this.state.digits}
          digitChanged={this.digitChangedHandler}
          activeDigitIndex={this.state.activeDigitIndex}
        />
        <Button click={this.searchClickHandler}>Search</Button>
      </div>
    );
  }
}

export default WeatherDisplay;
