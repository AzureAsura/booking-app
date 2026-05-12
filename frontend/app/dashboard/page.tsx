import { getUser, getHotelDashboard } from '@/lib/api'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

const DashboardPage = async () => {
    const user = await getUser()

    if (!user) redirect('/auth')
    if (user.role !== 'hotelOwner') redirect('/become-owner')

    const dashboard = await getHotelDashboard()

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Owner Dashboard</h1>
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/rooms" className="text-sm text-blue-600 hover:underline">My Rooms</Link>
                    <Link href="/dashboard/add-room" className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded">+ Add Room</Link>
                    <Link href="/" className="text-sm text-gray-500 hover:underline">Home</Link>
                    <LogoutButton />
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-10">
                <h2 className="text-xl font-semibold mb-6">Overview</h2>

                <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
                        <p className="text-3xl font-bold">{dashboard?.totalBookings ?? 0}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                        <p className="text-3xl font-bold">
                            Rp {(dashboard?.totalRevenue ?? 0).toLocaleString('id-ID')}
                        </p>
                    </div>
                </div>

                <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
                {!dashboard?.bookings?.length ? (
                    <p className="text-gray-400 text-sm">No bookings yet.</p>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-4 py-3 font-medium">Guest</th>
                                    <th className="text-left px-4 py-3 font-medium">Room</th>
                                    <th className="text-left px-4 py-3 font-medium">Check-in</th>
                                    <th className="text-left px-4 py-3 font-medium">Check-out</th>
                                    <th className="text-left px-4 py-3 font-medium">Total</th>
                                    <th className="text-left px-4 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboard.bookings.map((b: any) => (
                                    <tr key={b.id} className="border-b last:border-0">
                                        <td className="px-4 py-3">{b.user?.name ?? '-'}</td>
                                        <td className="px-4 py-3">{b.room?.roomType ?? '-'}</td>
                                        <td className="px-4 py-3">{new Date(b.checkInDate).toLocaleDateString('id-ID')}</td>
                                        <td className="px-4 py-3">{new Date(b.checkOutDate).toLocaleDateString('id-ID')}</td>
                                        <td className="px-4 py-3">Rp {b.totalPrice.toLocaleString('id-ID')}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                    b.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {b.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    )
}

export default DashboardPage
