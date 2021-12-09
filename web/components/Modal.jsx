import React from "react";
import styles from "../styles/components/Modal.module.scss";

function Modal(props) {
  if (props.open !== true) return null;
  return (
    <div className={styles.modal}>
      <button onClick={props.onClose} type="button">
        &times;
      </button>
      {props.children}
    </div>
  );
}

export default Modal;
