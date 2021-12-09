import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/components/Article.module.scss";

function Article(props) {
  return (
    <>
      <article className={`${styles.article} ${props.className}`}>
        <Link href={`/hatts/${encodeURIComponent(props.article.url)}`}>
          <a>
            <div className={styles.article_img}>
              <Image
                src={props.article.mainPic}
                alt={props.article.title}
              />
            </div>
            <div className={styles.article_body}>
              <h3 className={styles.article_title}>
                {props.article.title}
              </h3>
              <p className={styles.article_text}>{props.article.body}</p>
            </div>
          </a>
        </Link>
      </article>
    </>
  );
}

export default Article;
