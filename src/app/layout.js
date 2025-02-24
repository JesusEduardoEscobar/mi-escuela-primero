import { Urbanist } from "next/font/google";

import Inicio from "../components/inicio"

import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
});

export const metadata = {
  title: "Mi escuela primero",
  description: "mi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={urbanist.className}
      >
        <Inicio/>
        {children}
      </body>
    </html>
  );
}
