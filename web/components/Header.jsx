import React, {useState} from "react";
import Image from "next/image";
import styles from "../styles/components/Header.module.scss";
import defaultHatt from "/public/img/hatt.png";
import Fetch from "./Fetch";

const Modal = React.lazy(() =>
  import("./Modal")
    .then((com) => com)
    .catch((err) => console.log(err))
);

function Header(props) {
  const [display, setDisplay] = useState(false);

  const changeModal = (e) => {
    e.preventDefault();
    setDisplay(!display);
  };

  return (
    <>
      <header className={styles.header}>
        <div
          className={styles.header_display}
          onClick={props.clickable ? changeModal : null}
        >
          <Image
            className={styles.header_display_img}
            src={props.img ? props.img : defaultHatt}
            alt="Hatt"
          />
        </div>
        <React.Suspense fallback={<Fetch />}>
          <Modal open={display} onClose={changeModal}>
            <Image
              className={styles.header_display_img}
              src={props.img ? props.img : defaultHatt}
              alt="Hatt"
            />
          </Modal>
        </React.Suspense>
      </header>
    </>
  );
}

export default Header;
