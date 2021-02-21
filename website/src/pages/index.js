import React from 'react';
import Layout from '@theme/Layout';
import useThemeContext from '@theme/hooks/useThemeContext';

import styles from '../css/header.module.css';
import CopySvg from '@site/static/svg/copy.svg';
import DarkImage from '@site/static/img/masked-dark-phone.png';
import LightImage from '@site/static/img/masked-light-phone.png';

import Link from '@docusaurus/Link';

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
              A performant, easy to use
              <strong>hold to open context menu</strong> for React Native
              powered by Reanimated.
            </h2>
            <div className={`${styles.flex} ${styles.buttonsWrapper}`}>
              <div className={styles.flexItem}>
                <Link className={styles.button} to="/docs">
                  Get Started
                </Link>
              </div>
              <div className={styles.flexItem}>
                <button
                  className={styles.copyPaste}
                  onClick={() =>
                    navigator.clipboard.writeText(
                      'yarn add react-native-hold-menu'
                    )
                  }
                >
                  yarn add react-native-hold-menu
                  <CopySvg className={styles.copyIcon} />
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
