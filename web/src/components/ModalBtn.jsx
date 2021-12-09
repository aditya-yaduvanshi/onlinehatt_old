import React from "react";
import styles from "../styles/components/Nav.module.scss";

const ModalBtn = (props) => {
  return (
    <button 
      className={`${styles.nav_link} ${modal_button} ${props.className}`} 
      type="button"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default ModalBtn;