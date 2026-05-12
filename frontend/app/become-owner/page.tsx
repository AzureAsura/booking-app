import { getUser, getMyHotel } from '@/lib/api'
import { redirect } from 'next/navigation'
import BecomeOwnerForm from '@/components/BecomeOwnerForm'

const BecomeOwnerPage = async () => {
    const user = await getUser()

    if (!user) redirect('/auth')
    if (user.role === 'hotelOwner') redirect('/dashboard')

    const hotel = await getMyHotel()

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow p-8 w-full max-w-md">
                {hotel?.status === 'pending' && (
                    <>
                        <h1 className="text-2xl font-bold mb-1">Pending Review</h1>
                        <p className="text-gray-500 text-sm">Your hotel <strong>{hotel.name}</strong> is waiting for admin approval.</p>
                    </>
                )}
                {hotel?.status === 'rejected' && (
                    <>
                        <h1 className="text-2xl font-bold mb-1 text-red-600">Submission Rejected</h1>
                        <p className="text-gray-500 text-sm mb-2">Your hotel <strong>{hotel.name}</strong> was rejected.</p>
                        {hotel.rejectionReason && <p className="text-sm text-red-500">Reason: {hotel.rejectionReason}</p>}
                    </>
                )}
                {!hotel && (
                    <>
                        <h1 className="text-2xl font-bold mb-1">Register Your Hotel</h1>
                        <p className="text-gray-500 text-sm mb-6">Fill in your hotel details to become an owner</p>
                        <BecomeOwnerForm />
                    </>
                )}
            </div>
        </div>
    )
}

export default BecomeOwnerPage
