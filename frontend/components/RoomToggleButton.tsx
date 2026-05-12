'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const RoomToggleButton = ({ roomId, isAvailable }: { roomId: string; isAvailable: boolean }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleToggle = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms/toggle-availability`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ roomId })
            })
            const data = await res.json()
            if (data.success) {
                toast.success(data.message)
                router.refresh()
            } else {
                toast.error(data.message)
            }
        } catch {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`text-xs px-3 py-1 rounded font-medium disabled:opacity-50 ${
                isAvailable
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
        >
            {loading ? '...' : isAvailable ? 'Disable' : 'Enable'}
        </button>
    )
}

export default RoomToggleButton
