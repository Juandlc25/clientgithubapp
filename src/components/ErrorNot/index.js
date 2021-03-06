import React from "react";
import "./style.css";

function ErrorNot({ msg, clear }) {
  return (
    <div className="errorNot">
      <span>{msg}</span>
      <button className="errorNot__btn" onClick={clear}>
        X
      </button>
    </div>
  );
}

export default ErrorNot;
