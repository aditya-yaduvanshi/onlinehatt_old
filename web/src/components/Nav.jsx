import React, {useState} from "react";
import Link from "next/link";
import Fetch from "./Fetch";
import styles from "../styles/components/Nav.module.scss";

const Modal = React.lazy(() =>
  import("./Modal")
    .then((Modal) => Modal)
    .catch((err) => console.log(err))
);
const Signin = React.lazy(() =>
  import("../pages/signin")
    .then((Signin) => Signin)
    .catch((err) => console.log(err))
);
const Register = React.lazy(() =>
  import("../pages/register")
    .then((Register) => Register)
    .catch((err) => console.log(err))
);

const sm = (
  <>
    <span className={`${styles.dots} ${styles.sm_top}`}></span>
    <span className={`${styles.dots} ${styles.sm_middle}`}></span>
    <span className={`${styles.dots} ${styles.sm_bottom}`}></span>
  </>
);

const md = (
  <>
    <span className={styles.md_top}>
      <span className={`${styles.dots} ${styles.md_left}`}></span>
      <span className={`${styles.dots} ${styles.md_right}`}></span>
    </span>
    <span className={styles.md_middle}>
      <span className={`${styles.dots} ${styles.md_left}`}></span>
      <span className={`${styles.dots} ${styles.md_right}`}></span>
    </span>
    <span className={styles.md_bottom}>
      <span className={`${styles.dots} ${styles.md_left}`}></span>
      <span className={`${styles.dots} ${styles.md_right}`}></span>
    </span>
  </>
);

const lg = (
  <>
    <span className={styles.lg_top}>
      <span className={`${styles.dots} ${styles.lg_top_left}`}></span>
      <span className={`${styles.dots} ${styles.lg_top_middle}`}></span>
      <span className={`${styles.dots} ${styles.lg_top_right}`}></span>
    </span>
    <span className={styles.lg_middle}>
      <span className={`${styles.dots} ${styles.lg_middle_left}`}></span>
      <span className={`${styles.dots} ${styles.lg_middle_middle}`}></span>
      <span className={`${styles.dots} ${styles.lg_middle_right}`}></span>
    </span>
    <span className={styles.lg_bottom}>
      <span className={`${styles.dots} ${styles.lg_bottom_left}`}></span>
      <span className={`${styles.dots} ${styles.lg_bottom_middle}`}></span>
      <span className={`${styles.dots} ${styles.lg_bottom_right}`}></span>
    </span>
  </>
);

function Nav(props) {
  const toggles = ["md", "sm", "lg"];
  const [current, setCurrent] = useState(0);
  const [modals, setModals] = useState({
    signin: false,
    register: false,
  });

  const toggle = (e) => {
    e.preventDefault();
    setCurrent(current !== 2 ? current + 1 : 0);
  };

  const signOut = (event) => {
    e.preventDefault();
    //this.props.signout();
  };
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.brand}>
          <button
            className={`${styles.sidebar_toggle} ${styles.nav_link}`}
            onClick={toggle}
            type="button"
          >
            {toggles[current] === "lg" && lg}
            {toggles[current] === "md" && md}
            {toggles[current] === "sm" && sm}
          </button>
          <Link href="/" className={styles.nav_link}>
            <a className={styles.nav_link}>OnlineHatt</a>
          </Link>
        </div>
        <div className={styles.nav_links}>
          <Link href="/" exact={true} activeClassName="nav-link-active">
            <a className={styles.nav_link}>Home</a>
          </Link>
          {props.signedin ? (
            <>
              <Link href="/account" activeClassName="nav-link-active">
                <a className={styles.nav_link}>{this.props.username}</a>
              </Link>
              <Link href="#!" type="button" onClick={signOut}>
                <a className={`${styles.nav_link} ${styles.signout}`}>
                  SignOut
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signin" activeClassName="nav-link-active">
                <a className={`${styles.nav_link} ${styles.signin}`}>Signin</a>
              </Link>
              <Link href="/register" activeClassName="nav-link-active">
                <a className={`${styles.nav_link} ${styles.register}`}>
                  Register
                </a>
              </Link>
            </>
          )}
        </div>
      </nav>
      {props.loading && <Fetch />}
    </>
  );
}

export default Nav;
