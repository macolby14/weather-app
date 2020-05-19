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
        deleting={props.deleting}
        hasFocus={shouldHaveFocus}
      />
    );
  });

  return (
    <React.Fragment>
      <div className={classes.EnterText}>Enter your Zip Code</div>
      <div className={classes.ZipCode}>{digits}</div>
    </React.Fragment>
  );
};

export default ZipCode;
