import React from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/exam-score.module.css";

function ExamScore() {
  const router = useRouter();
  const { score, total } = router.query;

  return (
    <>
      <div className={styles.examScoreContainer}>
        <div className={styles.examScoreContent}>
          <h1>Examination Scores</h1>
          <p>{score}/{total}</p>
        </div>
      </div>
    </>
  );
}

export default ExamScore;
