import { getUser, getOwnerRooms } from '@/lib/api'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import RoomToggleButton from '@/components/RoomToggleButton'

const RoomsPage = async () => {
    const user = await getUser()

    if (!user) redirect('/auth')
    if (user.role !== 'hotelOwner') redirect('/become-owner')

    const rooms = await getOwnerRooms()

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">My Rooms</h1>
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-sm text-gray-500 hover:underline">← Dashboard</Link>
                    <Link href="/dashboard/add-room" className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded">
                        + Add Room
                    </Link>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-10">
                {rooms.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 mb-4">You have no rooms yet.</p>
                        <Link href="/dashboard/add-room" className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
                            Add Your First Room
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {rooms.map((room: any) => (
                            <div key={room.id} className="bg-white rounded-lg shadow p-4 flex gap-4 items-center">
                                {room.images?.[0] && (
                                    <img
                                        src={room.images[0]}
                                        alt={room.roomType}
                                        className="w-24 h-20 object-cover rounded"
                                    />
                                )}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold">{room.roomType}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                                            room.isAvailable
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            {room.isAvailable ? 'Available' : 'Unavailable'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Rp {room.pricePerNight.toLocaleString('id-ID')} / night
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {room.amenities?.join(', ')}
                                    </p>
                                </div>
                                <RoomToggleButton roomId={room.id} isAvailable={room.isAvailable} />
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}

export default RoomsPage
