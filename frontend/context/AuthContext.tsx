'use client'

import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextType = {
    backendUrl: string | undefined
    isLoggedIn: boolean
    setIsLoggedIn: (value: boolean) => void
    userData: any
    setUserData: (value: any) => void
    getUserData: () => Promise<void>
     logout: () => Promise<void> 
}

export const AuthContent = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState<any>(null)

    const getUserData = async () => {

        try {
            const res = await fetch(`${backendUrl}/user/data`, {
                method: 'GET',
                credentials: 'include'
            })

            const data = await res.json()

            if (data.success) {
                setUserData(data.userData)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const logout = async () => {
        try {
            await fetch(`${backendUrl}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            })
            setIsLoggedIn(false)
            setUserData(null)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])


    const value = {
        backendUrl,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData,
        logout
    }
    return (
        <AuthContent.Provider value={value}>
            {children}
        </AuthContent.Provider>
    )
}