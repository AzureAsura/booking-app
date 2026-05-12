import { getRooms } from '@/lib/api'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const RoomDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params

    const rooms = await getRooms()
    const room = rooms.find((r: any) => r.id === id)
    if (!room) notFound()

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-10">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {/* image gallery */}
                    <div className="grid grid-cols-2 gap-1 h-72">
                        {room.images?.slice(0, 4).map((img: string, i: number) => (
                            <img
                                key={i}
                                src={img}
                                alt={`${room.roomType}-${i}`}
                                className="w-full h-full object-cover"
                            />
                        ))}
                    </div>

                    <div className="p-6 grid md:grid-cols-2 gap-8">
                        {/* room info */}
                        <div>
                            <h1 className="text-2xl font-bold mb-1">{room.roomType}</h1>
                            <p className="text-gray-500 text-sm mb-4">
                                {room.hotel?.name} · {room.hotel?.city}
                            </p>

                            <p className="text-2xl font-bold text-blue-600 mb-6">
                                Rp {room.pricePerNight.toLocaleString('id-ID')}
                                <span className="text-sm font-normal text-gray-400"> / night</span>
                            </p>

                            <h3 className="font-semibold mb-2">Amenities</h3>
                            <ul className="grid grid-cols-2 gap-1">
                                {room.amenities?.map((a: string) => (
                                    <li key={a} className="text-sm text-gray-600 flex items-center gap-1">
                                        <span className="text-green-500">✓</span> {a}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* book now */}
                        <div className="flex flex-col justify-center items-start gap-4">
                            <h3 className="font-semibold">Ready to Book?</h3>
                            <p className="text-sm text-gray-500">Select your dates and complete your booking.</p>
                            <Link
                                href={`/rooms/${id}/book`}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default RoomDetailPage
