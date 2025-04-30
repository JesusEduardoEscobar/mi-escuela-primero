/*
Comprobar si el usuario ingresado existe
*/
"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRequiereAuth = () => {
  const router = useRouter(); // 🔹 Se coloca fuera de useEffect

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/"); // Redirecciona si no hay token
      }
    }
  }, [router]); // 🔹 Se pasa router como dependencia

};