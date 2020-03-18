import React from "react";

import classes from "./WeatherBlock.module.css";

const WeatherBlock = props => {
  const classList = [classes.WeatherBlock, props.additionalClasses].join(" ");

  let feelsLike = null;
  if (props.date === "Today") {
    feelsLike = <p>Feels Like: 75°F</p>;
  }

  return (
    <div className={classList}>
      <p>
        <strong>{props.date}</strong>
      </p>
      <p>Cloudy</p>
      <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" />
      <p>76°F</p>
      {feelsLike}
    </div>
  );
};

export default WeatherBlock;
