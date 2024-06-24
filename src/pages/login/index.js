import React from "react";
import Head from "next/head";
import styles from "../../styles/login.module.css";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";

function index() {
  return (
    <>
      <Head>
        <title>Please Login Into Your Account</title>
      </Head>
      <div className={styles.loginContainer}>
        <div className={`${styles.backgroundImage} ${styles.image1}`}></div>
        <div className={`${styles.backgroundImage} ${styles.image2}`}></div>

        <div className={styles.loginFormContainer}>
          <div className={styles.loginContainerHeader}>
            <h1>Login Into Your Account</h1>
          </div>
          <form>
            <div className={styles.inputField}>
              <EmailIcon className={styles.icon} />
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className={styles.inputField}>
              <PasswordIcon className={styles.icon} />
              <input type="password" placeholder="Enter your password" />
            </div>

            <div className={styles.submitButton}>
              <button type="submit">Login</button>
              <button type="submit">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default index;
