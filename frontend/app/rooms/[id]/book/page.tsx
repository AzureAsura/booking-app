import { getUser, getRooms } from '@/lib/api'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import BookingForm from '@/components/BookingForm'

const BookingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params

    const [user, rooms] = await Promise.all([getUser(), getRooms()])

    if (!user) redirect('/auth')

    const room = rooms.find((r: any) => r.id === id)
    if (!room) notFound()

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-2xl mx-auto px-6 py-10">
                <Link href={`/rooms/${id}`} className="text-sm text-gray-500 hover:underline">
                    ← Back to room
                </Link>

                <div className="mt-6 bg-white rounded-lg shadow p-6">
                    <h1 className="text-xl font-bold mb-1">{room.roomType}</h1>
                    <p className="text-gray-500 text-sm mb-6">
                        {room.hotel?.name} · {room.hotel?.city} &nbsp;·&nbsp;
                        <span className="font-semibold text-blue-600">
                            Rp {room.pricePerNight.toLocaleString('id-ID')}
                        </span>
                        <span className="text-gray-400"> / night</span>
                    </p>

                    <h2 className="font-semibold mb-4">Book This Room</h2>
                    <BookingForm roomId={room.id} pricePerNight={room.pricePerNight} />
                </div>
            </main>
        </div>
    )
}

export default BookingPage
