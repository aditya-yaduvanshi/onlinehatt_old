import React from "react";
import DirBtn from "./DirBtn";
import styles from "../styles/components/Section.module.scss";

function Section(props) {
  return (
    <>
      <section className={styles.section}>
        <h2 className={styles.section_title}>{props.title}</h2>
        <DirBtn
          className={`${styles.section_dir_btn} ${styles.section_dir_btn_left}`}
          key={`${props.title}-left`}
          dir="left"
        />
        <DirBtn
          className={`${styles.section_dir_btn} ${styles.section_dir_btn_right}`}
          key={`${props.title}-right`}
          dir="right"
        />
        <div className={styles.section_articles}>{props.children}</div>
      </section>
    </>
  );
}

export default Section;
