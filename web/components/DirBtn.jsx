import React from "react";
import styles from "../styles/components/DirBtn.module.scss";

function DirButton(props) {
  const top = Object.entries(styles).find(
    (className) => className === `dir_bar_top_${props.dir}`
  );
  const middle = Object.entries(styles).find(
    (className) => className === `dir_bar_middle_${props.dir}`
  );
  const bottom = Object.entries(styles).find(
    (className) => className === `dir_bar_bottom_${props.dir}`
  );
  return (
    <>
      <button
        className={`${styles.dir_btn} ${props.className}`}
        type="button"
      >
        <span className={`${styles.dir_bar} ${top}`}></span>
        <span className={`${styles.dir_bar} ${middle}`}></span>
        <span className={`${styles.dir_bar} ${bottom}`}></span>
      </button>
    </>
  );
}

export default DirButton;
