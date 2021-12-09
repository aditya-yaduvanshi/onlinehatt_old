import React from "react";
import styles from "../styles/components/Input.module.scss";

function Input(props) {
  const {type, name, value, onChange, onBlur, placeholder, required} = props;
  return (
    <>
      <div className={styles.field}>
        <input
          {...props}
          className={styles.field_input}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={name}
          required={required}
        />
        <label className={styles.field_label} htmlFor={name}>
          {placeholder}
        </label>
        <span className={styles.field_error}>{props.error}</span>
      </div>
    </>
  );
}

export default Input;
