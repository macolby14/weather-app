import React from "react";

import Digit from "./Digit/Digit";
import classes from "./ZipCode.module.css";

const ZipCode = (props) => {
  const digits = props.digits.map((e, i) => {
    const shouldHaveFocus = props.activeDigitIndex === i;

    return (
      <Digit
        key={i}
        value={e}
        digitChanged={(e) => {
          props.digitChanged(e, i);
        }}
        hasFocus={shouldHaveFocus}
      />
    );
  });

  return (
    <div className={classes.ZipCode}>
      <div className={classes.EnterText}>Enter your Zip Code</div>
      {digits}
    </div>
  );
};

export default ZipCode;
