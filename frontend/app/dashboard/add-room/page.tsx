import { getUser } from '@/lib/api'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AddRoomForm from '@/components/AddRoomForm'

const AddRoomPage = async () => {
    const user = await getUser()

    if (!user) redirect('/auth')
    if (user.role !== 'hotelOwner') redirect('/become-owner')

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Add New Room</h1>
                <Link href="/dashboard/rooms" className="text-sm text-gray-500 hover:underline">
                    ← Back to Rooms
                </Link>
            </nav>

            <main className="max-w-lg mx-auto px-6 py-10">
                <div className="bg-white rounded-lg shadow p-8">
                    <AddRoomForm />
                </div>
            </main>
        </div>
    )
}

export default AddRoomPage
