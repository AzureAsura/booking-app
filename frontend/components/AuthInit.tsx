'use client'

import { useEffect } from "react"
import { useAuthStore } from "@/store/authStore"

const AuthInit = () => {
    const getUserData = useAuthStore((state) => state.getUserData)

    useEffect(() => {
        getUserData()
    }, [])

    return null
}

export default AuthInit