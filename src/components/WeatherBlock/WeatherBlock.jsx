import React from "react";

import classes from "./WeatherBlock.module.css";

const WeatherBlock = props => {
  const additionalClassesStr = props.additionalClasses.reduce(
    (outputStr, currentVal) => {
      outputStr += classes[currentVal] + " ";
      return outputStr;
    },
    ""
  );

  const classList = [classes.WeatherBlock, additionalClassesStr].join(" ");

  let feelsLike = null;
  if (props.date === "Today") {
    feelsLike = (
      <p>Feels Like: {Math.round(props.weather.main.feels_like) + "°F"}</p>
    );
  }
  return (
    <div className={classList}>
      <p>
        <strong>{props.date}</strong>
      </p>
      <p>{props.weather.weather[0].main}</p>
      <img
        src={
          "http://openweathermap.org/img/wn/" +
          props.weather.weather[0].icon +
          "@2x.png"
        }
        alt={props.weather.weather[0].main}
      />
      <p>{Math.round(props.weather.main.temp) + "°F"}</p>
      {feelsLike}
    </div>
  );
};

export default WeatherBlock;
