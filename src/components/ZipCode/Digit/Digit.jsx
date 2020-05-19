import React, { useRef, useEffect } from "react";

import classes from "./Digit.module.css";

const Digit = (props) => {
  const textInput = useRef(null);

  useEffect(() => {
    if (props.hasFocus) {
      // console.log("[Digit.jsx] useEffect()");
      // console.log(props.value);
      textInput.current.focus();
      textInput.current.selectionStart = props.value && props.deleting ? 1 : 0;
      textInput.current.selectionEnd = props.value && props.deleting ? 1 : 0;
    }
  }, [props.value, props.hasFocus, props.deleting]);

  return (
    <div className={classes.Digit}>
      <input
        selectionstart={0}
        value={props.value ? props.value : ""}
        type="text"
        size="1"
        inputMode="numeric"
        /*maxLength="1"*/
        onInput={(e) => {
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
