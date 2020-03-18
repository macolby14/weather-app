import React from "react";

import classes from "./CurrentWeather.module.css";
import WeatherBlock from "../WeatherBlock/WeatherBlock";

const CurrentWeather = props => {
  return (
    <div className={classes.CurrentWeather}>
      <WeatherBlock
        weather={props.weather}
        additionalClasses="col-5"
        date="Today"
      />
    </div>
  );
};

export default CurrentWeather;
