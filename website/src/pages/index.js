import React from "react";
import Layout from "@theme/Layout";
import useThemeContext from "@theme/hooks/useThemeContext";

import styles from "../css/header.module.css";
import LightMenu from "@site/static/img/light-phone.png";
import DarkImage from "@site/static/img/masked-dark-phone.png";
import LightImage from "@site/static/img/masked-light-phone.png";

function Content() {
  const { isDarkTheme } = useThemeContext();

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <section className={styles.hero}>
          <div className={styles.phoneImageWrapperOnLeft}>
            <img
              src={isDarkTheme ? DarkImage : LightImage}
              style={{ maxHeight: 450 }}
            />
          </div>
          <div className={styles.heroWrapper}>
            <h1 className={styles.heading}>
              Make your components more interactable
            </h1>
            <h2 className={styles.subHeading}>
              A performant, easy to use and extensible{" "}
              <strong>hold to open context menu</strong> for React Native
              powered by Reanimated.
            </h2>
            <div className={`${styles.flex} ${styles.buttonsWrapper}`}>
              <div className={styles.flexItem}>
                <button className={styles.button}>Get Started</button>
              </div>
              <div className={styles.flexItem}>
                <button className={styles.copyPaste}>
                  yarn add react-native-hold-menu
                </button>
              </div>
            </div>
          </div>
          <div className={styles.phoneImageWrapper}>
            <img
              src={isDarkTheme ? DarkImage : LightImage}
              style={{ maxHeight: 450 }}
            />
          </div>
        </section>
      </div>
    </header>
  );
}

function Home() {
  return (
    <Layout>
      <Content />
    </Layout>
  );
}

export default Home;
