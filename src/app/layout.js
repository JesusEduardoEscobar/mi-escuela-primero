import { Merriweather } from "next/font/google";

import "./globals.css";

const merriweather = Merriweather ({
  subsets: ["latin"],
  weight: ["300", "700"]
});

export const metadata = {
  title: "Mi escuela primero",
  description: "mi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={merriweather.className}
      >
        {children}
      </body>
    </html>
  );
}