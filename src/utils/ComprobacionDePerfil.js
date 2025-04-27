import { useEffect } from "react";
import { useRouter } from "next/router";

export const useRequiereAuth = () => {
    const router = useRouter();
    useEffect( () => {
        const token = localStorage.getItem('token')
        if(!token) {
            router.push('/')
        }
    }, [])
}