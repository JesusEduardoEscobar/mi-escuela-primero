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
        <div className="min-h-screen bg-gradient-to-t from-green-500 to-white">
        {children}
        </div>
      </body>
    </html>
  );
}