import React from "react";
import classes from "./ErrorMessage.module.css";

const ErrorMessage = (props) => {
  return <div className={classes.ErrorMessage}>{props.errorMessage}</div>;
};

export default ErrorMessage;
