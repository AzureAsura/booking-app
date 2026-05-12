import React from 'react'
import { Search, Calendar, Users, ChevronDown } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative w-full h-[540px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop" 
          alt="Bali Landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" /> 
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-center">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Bali hotels & places to stay
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium">
            Search to compare prices and discover great deals with free cancellation
          </p>
        </div>

        <div className=" p-1 rounded-xl shadow-2xl max-w-5xl mx-auto">
            <div className="bg-white rounded-lg flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-gray-200 overflow-hidden">
                
                <div className="flex-1 flex items-center px-4 py-4 gap-3">
                    <Search className="text-gray-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Bali" 
                        className="w-full outline-none text-gray-800 font-semibold placeholder:text-gray-800 text-base"
                    />
                </div>

                <div className="flex-[0.8] flex items-center divide-x divide-gray-200">
                    <div className="flex-1 flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                        <Calendar className="text-gray-400 w-5 h-5" />
                        <span className="text-gray-400 text-sm font-bold">Check-in</span>
                    </div>
                    <div className="flex-1 flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                        <Calendar className="text-gray-400 w-5 h-5" />
                        <span className="text-gray-400 text-sm font-bold">Check-out</span>
                    </div>
                </div>

                <div className="flex-[0.7] flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <Users className="text-gray-400 w-5 h-5" />
                        <div className="text-left leading-tight">
                            <p className="text-sm font-bold text-gray-800">2 adults</p>
                            <p className="text-xs text-gray-500 font-medium">1 room</p>
                        </div>
                    </div>
                    <ChevronDown className="text-gray-400 w-4 h-4" />
                </div>

                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 font-black text-base transition-all uppercase tracking-wider">
                    Search
                </button>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Hero