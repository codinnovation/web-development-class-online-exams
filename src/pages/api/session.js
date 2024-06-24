import { withIronSession } from "next-iron-session";

export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "cod_web_dev_online_exams",

    cookieOptions: {
      maxAge: 1800,
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: true,
    },
  });
}
