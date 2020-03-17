import React, { useRef, useEffect } from "react";

import classes from "./Digit.module.css";

const Digit = props => {
  const textInput = useRef(null);

  useEffect(() => {
    if (props.hasFocus) {
      textInput.current.focus();
      textInput.current.selectionStart = 0;
    }
  });

  return (
    <div className={classes.Digit}>
      <input
        selectionstart={0}
        value={props.value ? props.value : ""}
        type="text"
        size="1"
        /*maxLength="1"*/
        onInput={e => {
          if (e.target.value) {
            e.target.value = e.target.value[0];
          }
          if (e.target.value && isNaN(e.target.value)) {
            e.target.value = null;
          }
          props.digitChanged(e);
        }}
        onChange={() => {
          /*To remove warning, onInput is used because it will change focus when the 
        user types the exact same value for better UI*/
        }}
        placeholder="0"
        ref={textInput}
      />
    </div>
  );
};

export default Digit;
