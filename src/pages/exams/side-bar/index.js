import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../../styles/side-bar.module.css";
import CODLogo from "../../../../public/logo-2.png";
import Link from "next/link";
import DashBoard from "@mui/icons-material/Dashboard";
import Book from "@mui/icons-material/Book";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import HelpCenter from "@mui/icons-material/HelpCenter";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Index({children}) {
   const router = useRouter()
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
      <div className={styles.sideBarContainer}>
        <div className={styles.sideBarContent}>
          <div className={styles.logoContainer}>
            <Image
              alt="COD-Innovations-logo"
              src={CODLogo}
              className={styles.image}
            />
            <div className={styles.sideBarLinks}>
              <div className={styles.link}>
                <DashBoard className={styles.icon} />
                <Link href="/exams" className={styles.h1}>
                  Home
                </Link>
              </div>

              <div className={styles.link}>
                <LocalLibraryIcon className={styles.icon} />
                <Link href="/" className={styles.h1}>
                  Exams
                </Link>
              </div>

              <div className={styles.link}>
                <Book className={styles.icon} />
                <Link href="/exams/user-score/" className={styles.h1}>
                  Results
                </Link>
              </div>

              <div className={styles.link}>
                <HelpCenter className={styles.icon} />
                <Link href="/" className={styles.h1}>
                  Help
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.LogoutContainer} onClick={handleLogout}>
            <LogoutIcon />
            <h1>Logout</h1>
          </div>
        </div>
      </div>
      <ToastContainer />
      {children}
    </>
  );
}

export default Index;
