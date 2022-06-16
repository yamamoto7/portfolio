import React from "react";
// import { Link } from "react-router-dom";
import cn from "classnames";
import * as styles from "./Main.module.sass";
import getFilePath from '../../../../utils/getFilePath'

function Main() {
  return (
    <div className={cn("section", styles.main)}>
      <div className={cn("center ")}>
        <div className={styles.container}>
          <div className={styles.details}>
            <div className={styles.text}>Kenta Yamamoto<br />Backend, software engineer / Tokyo Japan</div>
            <div className={styles.text}>Contact me via Linkedin or Facebook.</div>
            <div className={styles.text}>
              <a href="https://github.com/yamamoto7">
                <img className={styles.social} src="https://img.shields.io/badge/github-%2324292f.svg?&style=for-the-badge&logo=github&logoColor=white" alt="github" />
              </a>
              <a href="https://www.facebook.com/kenta.yamamoto.94064176">
                <img className={styles.social} src="https://img.shields.io/badge/facebook-%231877F2.svg?&style=for-the-badge&logo=facebook&logoColor=white" alt="facebook" />
              </a>
              <a href="https://www.linkedin.com/in/kentayamamoto7/">
                <img className={styles.social} src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" alt="linkedin" />
              </a>
            </div>
            <div className={styles.text}>
              <a href="https://github.com/yamamoto7/yamamoto7/blob/master/RESUME.md">
                <button className={cn("button button-border", styles.button)}>履歴書 - 日本語</button>
              </a><br /><br />
              <a href="https://github.com/yamamoto7/yamamoto7/blob/master/RESUME-en.md">
                <button className={cn("button button-border", styles.button)}>Resume - English</button>
              </a>

            </div>
          </div>
          <div className={styles.preview}>
            <img className={styles.pic} src={getFilePath("main-pic.png")} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
