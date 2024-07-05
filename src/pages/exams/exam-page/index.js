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
import { ref, get, set, push } from "firebase/database";

function Index() {
  const [openMenu, setopenMenu] = useState(false);
  const [examsQuestions, setExamsQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 2;
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins in seconds

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  });

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

  const calculateScore = () => {
    let score = 0;
    examsQuestions.forEach((question) => {
      if (selectedAnswers[question.key] === question.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    const total = examsQuestions.length;

    try {
      const resultRef = push(ref(db, "examResults"));
      const resultKey = resultRef.key;
      await set(resultRef, {
        email: user?.email || "anonymous",
        score: score,
        total: total,
      });

      toast.success("Exam submitted successfully!");

      router.push({
        pathname: "exams/exam-score",
        query: { score, total },
      });
    } catch (error) {
      console.error("Error submitting exam results:", error);
      toast.error("Error occurred while submitting the exam.");
    }
  };

  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = examsQuestions.slice(startIndex, endIndex);

  const formateTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
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
            <h1>{user?.name || "Student"}</h1>
          </div>

          <div className={styles.headerTwo}>
            <h1>Time Left: </h1>
            <h1>{formateTime(timeLeft)}mins</h1>
          </div>

          <div className={styles.menuIcon}>
            <MenuIcon onClick={() => setopenMenu(true)} />
          </div>
        </div>

        <div className={styles.instructionsHeader}>
          <h1>Instructions:</h1>
          <h1>
            The exam will last for 10 minutes, and you will need to answer all
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
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>

      {openMenu && (
        <>
          <div className={styles.menuContainer}>
            <h1>{user?.name || "Student"}</h1>
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

  if (user) {
    return {
      props: {
        user: user,
      },
    };
  }
  return {
    props: {
      user: user,
    },
  };
});
