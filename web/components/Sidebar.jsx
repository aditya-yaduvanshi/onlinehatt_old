import React from "react";
import SideSnippet from "./SideSnippet";
import styles from "../styles/components/Sidebar.module.scss";

function Sidebar(props) {
  return (
    <>
      <div className={styles.sidebar}>
        {props.links.map((link) => {
          return <SideSnippet link={link} key={link} />;
        })}
      </div>
    </>
  );
}

export default Sidebar;
