import { getUser, getPendingHotels } from '@/lib/api'
import { redirect } from 'next/navigation'
import AdminHotelActions from '@/components/AdminHotelActions'

const AdminPage = async () => {
    const user = await getUser()
    if (!user) redirect('/auth')
    if (user.role !== 'admin') redirect('/')

    const hotels = await getPendingHotels()

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-2xl font-bold mb-6">Admin — Pending Hotel Approvals</h1>
                {hotels.length === 0 ? (
                    <p className="text-gray-400">No pending submissions.</p>
                ) : (
                    <div className="flex flex-col gap-6">
                        {hotels.map((hotel: any) => (
                            <div key={hotel.id} className="bg-white rounded-lg shadow p-5 flex gap-4">
                                <img src={hotel.image} alt={hotel.name} className="w-32 h-24 object-cover rounded" />
                                <div className="flex-1">
                                    <h2 className="font-semibold text-lg">{hotel.name}</h2>
                                    <p className="text-sm text-gray-500">{hotel.city} — {hotel.address}</p>
                                    <p className="text-sm text-gray-400">Owner: {hotel.owner.name} ({hotel.owner.email})</p>
                                    <AdminHotelActions hotelId={hotel.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminPage
