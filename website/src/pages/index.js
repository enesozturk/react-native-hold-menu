import React from 'react';
import Layout from '@theme/Layout';

import styles from '../css/header.module.css';
import CopySvg from '@site/static/svg/copy.svg';
import LightImage from '@site/static/img/masked-light-phone.png';

import Link from '@docusaurus/Link';

function Content() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <section className={styles.hero}>
          <div className={styles.phoneImageWrapperOnLeft}>
            <img
              src={LightImage}
              style={{ maxHeight: 450 }}
            />
          </div>
          <div className={styles.heroWrapper}>
            <h1 className={styles.heading}>
              Lean menus for modern React Native apps
            </h1>
            <h2 className={styles.subHeading}>
              A lean, easy to use
              <strong>hold to open context menu</strong> for React Native
              powered by Reanimated 4.
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
                      'pnpm add react-native-hold-menu'
                    )
                  }
                >
                  pnpm add react-native-hold-menu
                  <CopySvg className={styles.copyIcon} />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.phoneImageWrapper}>
            <img
              src={LightImage}
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
