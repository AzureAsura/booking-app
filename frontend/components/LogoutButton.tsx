'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react' // Menambahkan ikon agar lebih premium

const LogoutButton = () => {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            })
            router.push('/auth')
            router.refresh()
        } catch (error) {
            console.error("Logout failed", error)
        }
    }

    return (
        <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-base bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-red-50 hover:text-red-600 transition-all active:scale-95 group"
        >
            {/* Ikon Logout opsional untuk mempercantik */}
            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
            <span>Logout</span>
        </button>
    )
}

export default LogoutButton