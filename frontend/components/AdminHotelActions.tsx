'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const AdminHotelActions = ({ hotelId }: { hotelId: string }) => {
    const router = useRouter()
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const [reason, setReason] = useState('')
    const [loading, setLoading] = useState(false)

    const handle = async (action: 'approve' | 'reject') => {
        setLoading(true)
        try {
            const res = await fetch(`${backendUrl}/admin/hotels/${hotelId}/${action}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ reason })
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
        <div className="flex flex-col gap-2 mt-2">
            <input
                type="text" placeholder="Rejection reason (optional)"
                value={reason} onChange={e => setReason(e.target.value)}
                className="border rounded px-3 py-1.5 text-sm"
            />
            <div className="flex gap-2">
                <button onClick={() => handle('approve')} disabled={loading}
                    className="bg-green-600 text-white px-4 py-1.5 rounded text-sm disabled:opacity-50">
                    Approve
                </button>
                <button onClick={() => handle('reject')} disabled={loading}
                    className="bg-red-600 text-white px-4 py-1.5 rounded text-sm disabled:opacity-50">
                    Reject
                </button>
            </div>
        </div>
    )
}

export default AdminHotelActions
