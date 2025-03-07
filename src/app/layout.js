import { Montserrat } from "next/font/google";

import "./globals.css";

const montserrat = Montserrat ({
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
        className={montserrat.className}
      >
        {children}
      </body>
    </html>
  );
}