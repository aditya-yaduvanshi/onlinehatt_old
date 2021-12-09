import React from "react";
import styles from "../styles/components/Button.module.scss";

function Button(props) {
  return (
    <>
      <div className={styles.field}>
        <button className={styles.field_button} {...props}>
          {props.children}
        </button>
      </div>
    </>
  );
}

export default Button;
