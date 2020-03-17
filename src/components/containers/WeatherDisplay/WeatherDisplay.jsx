import React from "react";

import Title from "../../Title/Title";
import ZipCode from "../../ZipCode/ZipCode";

class WeatherDisplay extends React.Component {
  state = {
    digits: [0, 0, 0, 0, 0],
    activeDigitIndex: 0
  };

  digitChangedHandler = (e, digitIndex) => {
    const copyDigits = [...this.state.digits]; //avoid changing state directly
    copyDigits[digitIndex] = e.target.value;
    this.setState({ digits: copyDigits });
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
