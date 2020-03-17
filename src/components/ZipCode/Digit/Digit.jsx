import React from "react";

import classes from "./Digit.module.css";

const Digit = props => {
  return (
    <div className={classes.Digit}>
      <input
        value={props.value}
        type="text"
        size="1"
        maxLength="1"
        onChange={props.digitChanged}
        placeholder="0"
      />
    </div>
  );
};

export default Digit;
