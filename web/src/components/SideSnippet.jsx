import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/components/SideSnippet.module.scss";

function SideSnippet(props) {
  return (
    <div className={styles.side_snippet}>
      <Link href={props.link.to} className={styles.side_snippet_link}>
        <a>
          <Image
            className={styles.side_snippet_link_icon}
            src={props.link.icon}
            alt="icon"
          />
          <label className={styles.side_snippet_link_label}>
            {props.link.name}
          </label>
        </a>
      </Link>
    </div>
  );
}

export default SideSnippet;
