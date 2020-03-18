import React from "react";

import classes from "./CurrentWeather.module.css";
import WeatherBlock from "../WeatherBlock/WeatherBlock";

const CurrentWeather = props => {
  return (
    <div className={classes.CurrentWeather}>
      <WeatherBlock
        weather={props.weather}
        additionalClasses={["col-6", "desk-col-3"]}
        date="Today"
      />
    </div>
  );
};

export default CurrentWeather;
