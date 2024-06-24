import React, { useState, useEffect } from "react";
import styles from "../../../styles/exam-page.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import withSession from "@/pages/api/session";
import Head from "next/head";

function Index() {
  const [openMenu, setopenMenu] = useState(false);
  return (
    <>
      <Head>
        <title>Welcome to Examination Page</title>
        <link rel="icon" href="/logo-2.png" />
      </Head>
      <div className={styles.examPgaeContainer}>
        <div className={styles.examPgaeHeader}>
          <div className={styles.headerOne}>
            <h1>Welcome</h1>
            <h1>Kwabena Asumadu</h1>
          </div>

          <div className={styles.headerTwo}>
            <h1>Time Left: </h1>
            <h1>13:00mins</h1>
          </div>

          <div className={styles.menuIcon}>
            <MenuIcon onClick={() => setopenMenu(true)} />
          </div>
        </div>

        <div className={styles.instructionsHeader}>
          <h1>Instructions:</h1>
          <h1>
            The exam will last for 20 minutes, and you will need to answer all
            questions within that time frame. You will not be allowed to
            navigate to another tab or window during the exam. Please stay on
            this page until you have completed all questions
          </h1>
        </div>

        <div className={styles.examsQuestions}>
          <div className={styles.questionContainer}>
            <div className={styles.question}>
              <p>Queston One</p>
              <h1>What is the purpose of the img tag in HTML?</h1>
            </div>

            <div className={styles.answers}>
              <p>Answers</p>
              <select>
                <option>Select your answer</option>
                <option>To insert a hyperlink</option>
                <option>To insert an image</option>
                <option>To insert a paragraph</option>
                <option>To insert a list</option>
              </select>
            </div>
          </div>

          <div className={styles.questionContainer}>
            <div className={styles.question}>
              <p>Queston Two</p>
              <h1>What is the purpose of the img tag in HTML?</h1>
            </div>

            <div className={styles.answers}>
              <p>Answers</p>
              <select>
                <option>Select your answer</option>
                <option>To insert a hyperlink</option>
                <option>To insert an image</option>
                <option>To insert a paragraph</option>
                <option>To insert a list</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button>Prev</button>
          <button>Next</button>
          <button>Submit</button>
        </div>
      </div>

      {openMenu && (
        <>
          <div className={styles.menuContainer}>
            <h1>Asumadu Kwabrna Asima</h1>
          </div>
        </>
      )}
    </>
  );
}

export default Index;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (user) {
    req.session.set("user", user);
    await req.session.save();
  }
  return {
    props: {
      user: user,
    },
  };
});
