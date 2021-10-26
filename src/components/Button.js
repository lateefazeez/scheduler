import React from "react";
import classNames from "classnames"

import "components/Button.scss";

export default function Button(props) {
  const { children, onClick, disabled } = props

  const buttonClass = classNames({
    "button": true,
    "button--confirm": props.confirm,
    "button--danger": props.danger
  })

   return (
    <button 
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      >
      {children}
    </button>
   );
}
