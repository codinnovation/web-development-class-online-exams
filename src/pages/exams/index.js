import React from "react";
import styles from "../../styles/exams.module.css";
import withSession from "../api/session";
import SideBar from "./side-bar";
import Head from "next/head";
import ExamPage from "./exam-page";

function Index() {
  return (
    <>
      <Head>
        <title>Welcome to Examination Page</title>
        <link rel="icon" href="/logo-2.png" />
      </Head>
      <div>
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
