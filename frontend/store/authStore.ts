
import { create } from 'zustand'

type User = {
    id: string
    name: string
    email: string
} | null

type AuthStore = {
    isLoggedIn: boolean
    userData: User
    setIsLoggedIn: (value: boolean) => void
    setUserData: (value: User) => void
    getUserData: () => Promise<void>
    logout: () => Promise<void>
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: false,
    userData: null,

    setIsLoggedIn: (value) => set({ isLoggedIn: value }),
    setUserData: (value) => set({ userData: value }),

    getUserData: async () => {
        try {
            const res = await fetch(`${backendUrl}/user/data`, {
                credentials: 'include'
            })
            const data = await res.json()


            if (data.success) {
                set({ userData: data.userData, isLoggedIn: true })
            }



        } catch (error) {
            console.log(error)
        }
    },

    logout: async () => {
        try {
            await fetch(`${backendUrl}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            })
            set({ isLoggedIn: false, userData: null })
        } catch (error) {
            console.log(error)
        }
    }
}))