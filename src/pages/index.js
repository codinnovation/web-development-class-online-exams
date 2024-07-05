import Head from "next/head";
import { useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import WelcomeScreen from "../pages/welcome-screen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Home() {

  const handleLogout = async (e) => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Logout successful");
        router.push("/");
      } else {
        toast.error("logout Failed");
      }
    } catch (error) {
      toast.error("Error Occurred");
    } finally {
    }
  };


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="COD Web Development - Online Exams" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-2.png" />
      </Head>
      <main>
        <WelcomeScreen />
      </main>
      <ToastContainer />
    </>
  );
}
