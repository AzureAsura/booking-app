import { getHotelById } from '@/lib/api'
import { redirect } from 'next/navigation'
import RoomCard from '@/components/RoomCard'
import Navbar from '@/components/Navbar'
import { MapPin, Phone, Star } from 'lucide-react'

const HotelDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params

    const hotel = await getHotelById(id)
    if (!hotel) redirect('/')

        console.log(hotel)

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="relative w-full aspect-video md:h-[500px] overflow-hidden rounded-3xl shadow-lg mb-10">
                    <img 
                        src={hotel.image} 
                        alt={hotel.name} 
                        className="w-full h-full object-cover transition-transform duration-700" 
                    />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-gray-100 pb-12">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-[#ffb700] text-[#ffb700]" />
                                ))}
                            </div>
                            <span className="text-sm font-black text-gray-900 uppercase tracking-widest ml-2">Handpicked Luxury</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter leading-none">
                            {hotel.name}
                        </h1>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-lg font-medium text-gray-500 pt-2">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-indigo-600" />
                                <span>{hotel.address}, {hotel.city}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-5 h-5 text-indigo-600" />
                                <span>{hotel.contact}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl hidden lg:block">
                        <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-1">Status</p>
                        <p className="text-xl font-black text-indigo-900">Available Today</p>
                    </div>
                </div>

                <div className="mt-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                            Select <span className="text-indigo-600">Your Room</span>
                        </h2>
                        <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">
                            {hotel.rooms.length} Options Available
                        </p>
                    </div>

                    {hotel.rooms.length === 0 ? (
                        <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <p className="text-xl font-bold text-gray-400">No rooms available at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {hotel.rooms.map((room: any) => (
                                <RoomCard key={room.id} room={room} city={hotel.city}/>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default HotelDetailPage