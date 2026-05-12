
import HotelCard from '@/components/HotelCard'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import HotelList from '@/components/HotelList'

const Page = async () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <Hero/>
      <HotelList/>
    </div>
  )
}

export default Page
