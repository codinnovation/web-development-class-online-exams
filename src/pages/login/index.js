import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../styles/login.module.css";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Index() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let data = {
      email: user.email,
      password: user.password,
    };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Login successful");
        router.push("/exams");
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      toast.error("Error Occurred");
    } finally {
    }
  };

  const resetPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address");
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Please check your email.");
    } catch (error) {
      toast.error("Error sending password reset email");
    }
  };

  return (
    <>
      <Head>
        <title>Please Login Into Your Account</title>
        <link rel="icon" href="/logo-2.png" />
      </Head>
      <div className={styles.loginContainer}>
        <div className={`${styles.backgroundImage} ${styles.image1}`}></div>
        <div className={`${styles.backgroundImage} ${styles.image2}`}></div>

        <div className={styles.loginFormContainer}>
          <div className={styles.loginContainerHeader}>
            <h1>Login Into Your Account</h1>
          </div>
          <form onSubmit={handleLogin}>
            <div className={styles.inputField}>
              <EmailIcon className={styles.icon} />
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.inputField}>
              <PasswordIcon className={styles.icon} />
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.submitButton}>
              <button type="submit">Login</button>
              <button onClick={resetPassword}>Reset Password</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Index;
