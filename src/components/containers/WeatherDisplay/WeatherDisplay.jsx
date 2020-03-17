import React from "react";

import Title from "../../Title/Title";
import ZipCode from "../../ZipCode/ZipCode";

class WeatherDisplay extends React.Component {
  render() {
    return (
      <div className="WeatherDisplay">
        <Title> What's the weather? </Title>
        <ZipCode />
        <h5>Go Button</h5>
      </div>
    );
  }
}

export default WeatherDisplay;
