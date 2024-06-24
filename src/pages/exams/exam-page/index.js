import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/exam-page.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import withSession from "@/pages/api/session";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePageVisibility from "@/pages/usePageVisibility";
import { db } from "../../../../firebase.config";
import { ref, get } from "firebase/database";

function Index() {
  const [openMenu, setopenMenu] = useState(false);
  const [examsQuestions, setExamsQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 2;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("You have been logged Out");
        router.push("/");
      } else {
        toast.error("Logout Failed");
      }
    } catch (error) {
      toast.error("Error Occurred");
    }
  };

  const isPageVisible = usePageVisibility(handleLogout);

  useEffect(() => {
    if (!isPageVisible) {
      toast.error("This is your last warning for moving to another tab.");
    }
  }, [isPageVisible]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, `examsQuestions`);
        const response = await get(dbRef);
        const data = response.val();

        if (data && typeof data === "object") {
          const dataArray = Object.entries(data).map(([key, value]) => ({
            key,
            ...value,
          }));
          setExamsQuestions(dataArray);
        } else {
          setExamsQuestions([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setExamsQuestions([]);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    if ((currentPage + 1) * questionsPerPage < examsQuestions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleChange = (questionKey, value) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionKey]: value,
    }));
  };

  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = examsQuestions.slice(startIndex, endIndex);

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
          {currentQuestions.map((question, index) => (
            <div key={question.key} className={styles.questionContainer}>
              <div className={styles.question}>
                <p>Question {startIndex + index + 1}</p>
                <h1>{question.question}</h1>
              </div>

              <div className={styles.answers}>
                <p>Answers</p>
                <select
                  value={selectedAnswers[question.key] || ""}
                  onChange={(e) => handleChange(question.key, e.target.value)}
                >
                  <option value="" disabled>
                    Select your answer
                  </option>
                  {question.answers.map((answer, answerIndex) => (
                    <option key={answerIndex} value={answer}>
                      {answer}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.actionButtons}>
          <button onClick={handlePrev} disabled={currentPage === 0}>
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={endIndex >= examsQuestions.length}
          >
            Next
          </button>
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
      <ToastContainer />
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
