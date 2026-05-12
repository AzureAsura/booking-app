import Link from 'next/link'
import { Heart, Star } from 'lucide-react'

const HotelCard = ({ hotel }: { hotel: any }) => {
    return (
        <div className="group flex flex-col gap-3">
            <Link href={`/hotels/${hotel.id}`} className="block overflow-hidden rounded-2xl relative aspect-[15:10]">

                <button className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                    <Heart className="w-4 h-4 text-gray-900" />
                </button>
                
                <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover transition-transform duration-700 " 
                />
            </Link>

            <div className="flex flex-col gap-1">
                <h3 className="font-black text-xl text-gray-900 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors truncate">
                    {hotel.name}
                </h3>

                <p className="text-base font-medium text-gray-400 truncate">
                    {hotel.city}
                </p>

                <div className="flex items-center gap-1 mt-0.5">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#ffb700] text-[#ffb700]" />
                        ))}
                    </div>
                    <span className="text-xs font-bold text-gray-900 ml-1">
                        (1.2k)
                    </span>
                </div>
            </div>
        </div>
    )
}

export default HotelCard