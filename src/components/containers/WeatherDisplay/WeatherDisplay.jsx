import React from "react";

import Title from "../../Title/Title";
import ZipCode from "../../ZipCode/ZipCode";

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

  render() {
    return (
      <div className="WeatherDisplay">
        <Title> What's the weather? </Title>
        <ZipCode
          digits={this.state.digits}
          digitChanged={this.digitChangedHandler}
          activeDigitIndex={this.state.activeDigitIndex}
        />
        <h5>Go Button</h5>
      </div>
    );
  }
}

export default WeatherDisplay;
