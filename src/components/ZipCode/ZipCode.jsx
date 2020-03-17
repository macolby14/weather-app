import React from "react";

import Digit from "./Digit/Digit";
import classes from "./ZipCode.module.css";

const ZipCode = props => {
  const digits = props.digits.map((e, i) => {
    return (
      <Digit
        key={i}
        value={e}
        digitChanged={e => {
          props.digitChanged(e, i);
        }}
      />
    );
  });

  return <div className={classes.ZipCode}>{digits}</div>;
};

export default ZipCode;
