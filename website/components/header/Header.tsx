import styles from "./header.module.css";

export default function Header() {
    return (
        <header>
            <div className={styles.wrapper}>
                <div className={styles.headerWrapper}>
                    <a className={styles.headerTitle}>React Native Hold Menu</a>
                    <nav className={styles.menu}>
                        <ul>
                            <li><a href="#">Documentation</a></li>
                            <li><a href="#">Examples</a></li>
                            <li><a href="#">Github</a></li>
                        </ul>
                    </nav>
                </div>
                <section className={styles.hero}>
                    <div className={styles.heroWrapper}>
                        <h1 className={styles.heading}>Make your components more interactable</h1>
                        <h2 className={styles.subHeading}>
                            A performant, easy to use, accessible and extensible hold to open
                            context menu for React Native powered by Reanimated.
                    </h2>
                        <div className={styles.flex}>
                            <div className={styles.flexItem}>
                                <button className={styles.button}>Get Started</button>
                            </div>
                            <div className={styles.flexItem}>
                                <button className={styles.copyPaste}>npm install react-native-hold-menu</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ width: 200, height: 200 }}></div>
                    </div>
                </section>
            </div>

        </header>
    );
}
