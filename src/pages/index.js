import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import WelcomeScreen from "../pages/welcome-screen";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="COD Web Development - Online Exams" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <WelcomeScreen />
      </main>
    </>
  );
}
