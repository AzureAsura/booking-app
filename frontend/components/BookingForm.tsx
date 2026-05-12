'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const BookingForm = ({ roomId, pricePerNight }: { roomId: string; pricePerNight: number }) => {
    const router = useRouter()
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(1)
    const [loading, setLoading] = useState(false)

    const nights = checkIn && checkOut
        ? Math.max(0, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)))
        : 0

    const totalPrice = nights * pricePerNight
    const today = new Date().toISOString().split('T')[0]

    const handleBook = async (e: React.FormEvent) => {
        e.preventDefault()

        if (nights <= 0) {
            toast.error('Check-out must be after check-in')
            return
        }

        setLoading(true)
        try {
            // step 1: cek availability dulu
            const checkRes = await fetch(`${backendUrl}/bookings/check-availability`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ room: roomId, checkInDate: checkIn, checkOutDate: checkOut })
            })
            const checkData = await checkRes.json()

            if (!checkData.success) {
                toast.error(checkData.message)
                return
            }

            if (!checkData.isAvailable) {
                toast.error('Room is not available for the selected dates')
                return
            }

            // step 2: book
            const bookRes = await fetch(`${backendUrl}/bookings/book`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ room: roomId, checkInDate: checkIn, checkOutDate: checkOut, guests })
            })
            const bookData = await bookRes.json()

            if (bookData.success) {
                toast.success('Booking confirmed!')
                router.push('/my-bookings')
                router.refresh()
            } else {
                toast.error(bookData.message)
            }
        } catch {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleBook} className="flex flex-col gap-4">
            <div>
                <label className="block text-sm font-medium mb-1">Check-in</label>
                <input
                    type="date" required
                    min={today}
                    value={checkIn}
                    onChange={e => setCheckIn(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Check-out</label>
                <input
                    type="date" required
                    min={checkIn || today}
                    value={checkOut}
                    onChange={e => setCheckOut(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Guests</label>
                <input
                    type="number" required min={1} max={10}
                    value={guests}
                    onChange={e => setGuests(Number(e.target.value))}
                    className="w-full border rounded px-3 py-2 text-sm"
                />
            </div>

            {nights > 0 && (
                <div className="bg-blue-50 rounded p-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">
                            Rp {pricePerNight.toLocaleString('id-ID')} × {nights} night{nights > 1 ? 's' : ''}
                        </span>
                        <span className="font-bold text-gray-900">
                            Rp {totalPrice.toLocaleString('id-ID')}
                        </span>
                    </div>
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-2 rounded text-sm font-medium disabled:opacity-50"
            >
                {loading ? 'Checking availability...' : 'Book Now'}
            </button>
        </form>
    )
}

export default BookingForm
