import React from "react";
import styles from "../../styles/exams.module.css";
import withSession from "../api/session";
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

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  if (!user) {
    return {
      redirect: {
        destination: "/login",
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
