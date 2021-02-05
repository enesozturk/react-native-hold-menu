import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "../css/header.module.css";
import LightMenu from "@site/static/img/light-phone.png";
import HoldItemAndMenu from "@site/static/img/hold-item-and-menu.png";

const features = [
  {
    title: "Easy to Use",
    imageUrl: "img/undraw_docusaurus_mountain.svg",
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: "Focus on What Matters",
    imageUrl: "img/undraw_docusaurus_tree.svg",
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: "Powered by React",
    imageUrl: "img/undraw_docusaurus_react.svg",
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <header>
      <div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
          <a className={styles.headerTitle}>React Native Hold Menu</a>
          <nav className={styles.menu}>
            <ul>
              <li>
                <a href="#">Documentation</a>
              </li>
              <li>
                <a href="#">Examples</a>
              </li>
              <li>
                <a href="#">Github</a>
              </li>
            </ul>
          </nav>
        </div>
        <section className={styles.hero}>
          <div className={styles.heroWrapper}>
            <h1 className={styles.heading}>
              Make your components more interactable
            </h1>
            <h2 className={styles.subHeading}>
              A performant, easy to use, accessible and extensible{" "}
              <strong>hold to open context menu</strong> for React Native
              powered by Reanimated.
            </h2>
            <div className={styles.flex}>
              <div className={styles.flexItem}>
                <button className={styles.button}>Get Started</button>
              </div>
              <div className={styles.flexItem}>
                <button className={styles.copyPaste}>
                  npm install react-native-hold-menu
                </button>
              </div>
            </div>
          </div>
          <div
            style={{
              flex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <img src={LightMenu} style={{ maxHeight: 450 }} />
            <img
              src={HoldItemAndMenu}
              style={{
                position: "absolute",
                top: 90,
                right: 50,
                width: 250,
                height: 250,
              }}
            />
          </div>
        </section>
      </div>
    </header>
  );
}

export default Home;
