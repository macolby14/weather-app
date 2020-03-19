import React from "react";

import classes from "./FutureWeather.module.css";
import WeatherBlock from "../WeatherBlock/WeatherBlock";

const FutureWeather = props => {
  const weatherBlocks = props.forecast.map((dayWeather, i) => {
    //determine the date to display at top of each WeatherBlock component
    //could process this in the WeatherBlock to make cleaner
    const weatherDate = new Date(dayWeather.dt * 1000);
    const dateAsStr = weatherDate.getMonth() + 1 + "/" + weatherDate.getDate();

    //determine howmany to display... 3 or 4 base on the screen size by adding classes
    const additionalClasses =
      i < 3 ? ["col-3", "desk-col-2"] : ["desk-col-2", "desktop-only"];

    let iconStr = dayWeather.weather[0].icon;
    iconStr = iconStr.replace("n", "d");
    dayWeather.weather[0].icon = iconStr;

    return (
      <WeatherBlock
        weather={dayWeather}
        additionalClasses={additionalClasses}
        date={dateAsStr}
        key={dateAsStr}
      />
    );
  });

  return <div className={classes.FutureWeather}>{weatherBlocks}</div>;
};

export default FutureWeather;
