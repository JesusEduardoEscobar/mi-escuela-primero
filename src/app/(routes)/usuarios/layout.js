import { Merriweather } from "next/font/google";
import Navbar from '@/components/navbar';
import Header from '@/components/header'
import "../../globals.css";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "700"]
});

export const metadata = {
  title: "Mi escuela primero",
  description: "mi",
};

export default function RootLayout({ children }) {
  return (
    <div className={`min-h-screen ${merriweather.className}`}>
      <Header />
      <Navbar />
      {children}
    </div>
  );
}
