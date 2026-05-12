import { getHotels } from '@/lib/api'
import React from 'react'
import HotelCard from './HotelCard'

const HotelList = async() => {
    const hotels = await getHotels()

    return (
        // Menggunakan px-4 konsisten di semua breakpoint
        <main className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                        Featured <span className="text-indigo-600">Hotels</span>
                    </h2>
                    <p className="text-gray-500 text-lg font-medium mt-2">
                        Explore our collection of {hotels.length} stays.
                    </p>
                </div>
            </div>

            {hotels.length === 0 ? (
                <div className="text-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-xl font-bold text-gray-400">No hotels available.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {hotels.map((hotel: any) => (
                        <HotelCard key={hotel.id} hotel={hotel} />
                    ))}
                </div>
            )}
        </main>
    )
}

export default HotelList