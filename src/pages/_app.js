import "@/styles/globals.css";
import SideBar from "../pages/exams/side-bar";

export default function App({ Component, pageProps }) {
  return (
    <SideBar>
      <Component {...pageProps} />;
    </SideBar>
  );
}
