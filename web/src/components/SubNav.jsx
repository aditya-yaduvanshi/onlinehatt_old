import React from "react";
import Link from "next/link";
import styles from "../styles/components/SubNav.module.scss";

function SubNav() {
  return (
    <>
      <nav className={styles.subnav}>
        <Link href={`#products`} activeClassName="subnav-link-active">
          <a className={styles.subnav_link}>Products</a>
        </Link>
        <Link href={`#categories`} activeClassName="subnav-link-active">
          <a className={styles.subnav_link}>Categories</a>
        </Link>
        <Link href={`#offers`} activeClassName="subnav-link-active">
          <a className={styles.subnav_link}>Offers</a>
        </Link>
        <Link href={`#members`} activeClassName="subnav-link-active">
          <a className={styles.subnav_link}>Members</a>
        </Link>
        <Link href={`#about`} activeClassName="subnav-link-active">
          <a className={styles.subnav_link}>About</a>
        </Link>
      </nav>
    </>
  );
}

export default SubNav;
