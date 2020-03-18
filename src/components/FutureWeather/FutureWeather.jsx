import React from "react";

import classes from "./FutureWeather.module.css";
import WeatherBlock from "../WeatherBlock/WeatherBlock";

const FutureWeather = props => {
  return (
    <div className={classes.FutureWeather}>
      <WeatherBlock additionalClasses="col-3" date="3/19" />
      <WeatherBlock additionalClasses="col-3" date="3/20" />
      <WeatherBlock additionalClasses="col-3" date="3/21" />
    </div>
  );
};

export default FutureWeather;
