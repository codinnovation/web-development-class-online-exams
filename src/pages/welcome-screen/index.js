import React from "react";
import styles from "../../styles/welcome-screen.module.css";

function Index() {
  return (
    <>
      <div className={styles.welcomeContainer}>
        <div className={`${styles.backgroundImage} ${styles.image1}`}></div>
        <div className={`${styles.backgroundImage} ${styles.image2}`}></div>
        <div className={styles.welcomeMessage}>
          <div className={styles.welcomeHeader}>
            <h1>Start Your Online Exam Journey with Ease and Convenience</h1>
          </div>
          <div className={styles.welcomeSubHeading}>
            <p>
              Experience the flexibility and convenience of taking exams online,
              from anywhere, at any time, without the need for physical
              presence.
            </p>
          </div>
          <div className={styles.welcomeContainerButton}>
            <button>Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
