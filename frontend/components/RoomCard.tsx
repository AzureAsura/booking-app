'use client'
import Link from 'next/link'
import { Heart, Star, Wifi, Coffee, Bed, Utensils, Zap } from 'lucide-react'

type Room = {
    id: string
    roomType: string
    pricePerNight: number
    amenities: string[]
    images: string[]
    hotel: {
        name: string
        city: string
    }
}

const RoomCard = ({ room, city }: { room: Room, city: string }) => {
    return (
        <Link href={`/rooms/${room.id}`} className="group relative block aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-gray-900 shadow-2xl transition-all hover:scale-[1.02] active:scale-95 duration-500">
            <div className="absolute inset-0 z-0">
                {room.images?.[0] ? (
                    <img
                        src={room.images[0]}
                        alt={room.roomType}
                        className="h-full w-full object-cover transition-transform duration-700 "
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-800 text-gray-500">No Image</div>
                )}
                {/* Dark Gradient Overlay - Khas Screenshot 2026-05-13 at 01.13.14.jpg */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            {/* Top Badge: Rating & Wishlist */}
            <div className="absolute left-5 top-5 right-5 z-20 flex justify-between items-center">
                <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md border border-white/10">
                    <Star className="h-3.5 w-3.5 fill-[#ffb700] text-[#ffb700]" />
                    <span className="text-xs font-black text-white">4.8/5</span>
                </div>
                <button className="rounded-full bg-black/40 p-2.5 backdrop-blur-md border border-white/10 hover:bg-white transition-colors group/heart">
                    <Heart className="h-4 w-4 text-white group-hover/heart:text-black group-hover/heart:fill-black" />
                </button>
            </div>

            {/* Bottom Content Area */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex flex-col gap-4">
                <div className="space-y-1">
                    <h3 className="text-2xl font-black tracking-tight text-white leading-tight">
                        {room.roomType}
                    </h3>
                    <p className="text-sm font-medium text-gray-300 line-clamp-2 leading-relaxed">
                        Terletak di {city}, {room.roomType} menawarkan kenyamanan modern dengan desain interior premium.
                    </p>
                </div>

                {/* Amenities Pills - Berdasarkan Screenshot 2026-05-13 at 01.13.14.jpg */}
                <div className="flex flex-wrap gap-2">
                    {room.amenities.slice(0, 4).map((a) => (
                        <div key={a} className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 backdrop-blur-sm border border-white/5">
                            {/* Simple Logic for Icons */}
                            {a.toLowerCase().includes('wi-fi') && <Wifi className="h-3 w-3 text-gray-300" />}
                            {a.toLowerCase().includes('breakfast') && <Coffee className="h-3 w-3 text-gray-300" />}
                            {a.toLowerCase().includes('bed') && <Bed className="h-3 w-3 text-gray-300" />}
                            {a.toLowerCase().includes('kitchen') && <Utensils className="h-3 w-3 text-gray-300" />}
                            <span className="text-[10px] font-bold uppercase tracking-wider text-white">{a}</span>
                        </div>
                    ))}
                </div>

                {/* Pricing Area */}
                <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white tracking-tighter">
                        Rp{room.pricePerNight.toLocaleString('id-ID')}
                    </span>
                    <span className="text-sm font-bold text-gray-400">/night</span>
                </div>
            </div>
        </Link>
    )
}

export default RoomCard