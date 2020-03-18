import React from "react";

import classes from "./FutureWeather.module.css";
import WeatherBlock from "../WeatherBlock/WeatherBlock";

const FutureWeather = props => {
  return (
    <div className={classes.FutureWeather}>
      <WeatherBlock additionalClasses={["col-3", "desk-col-2"]} date="3/19" />
      <WeatherBlock additionalClasses={["col-3", "desk-col-2"]} date="3/20" />
      <WeatherBlock additionalClasses={["col-3", "desk-col-2"]} date="3/21" />
      <WeatherBlock
        additionalClasses={["desk-col-2", "desktop-only"]}
        date="3/21"
      />
      <WeatherBlock
        additionalClasses={["desk-col-2", "desktop-only"]}
        date="3/21"
      />
    </div>
  );
};

export default FutureWeather;
