import React from "react";
import styles from "../../styles/exams.module.css";
import SideBar from "./side-bar";
import ExamPage from "./exam-page";

function Index() {
  return (
    <>
      <div>
        <SideBar />
        <ExamPage />
      </div>
    </>
  );
}

export default Index;
