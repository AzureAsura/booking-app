'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const ROOM_TYPES = ['Single', 'Double', 'Deluxe', 'Suite', 'Family']
const AMENITY_OPTIONS = ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Room Service', 'Swimming Pool', 'Gym Access', 'Parking']

const AddRoomForm = () => {
    const router = useRouter()
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const [roomType, setRoomType] = useState(ROOM_TYPES[0])
    const [pricePerNight, setPricePerNight] = useState('')
    const [amenities, setAmenities] = useState<string[]>([])
    const [images, setImages] = useState<File[]>([])
    const [loading, setLoading] = useState(false)

    const toggleAmenity = (amenity: string) => {
        setAmenities(prev =>
            prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
        )
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []).slice(0, 4)
        setImages(files)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (images.length === 0) {
            toast.error('Upload at least 1 image')
            return
        }

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('roomType', roomType)
            formData.append('pricePerNight', pricePerNight)
            formData.append('amenities', JSON.stringify(amenities))
            images.forEach(img => formData.append('images', img))

            const res = await fetch(`${backendUrl}/rooms`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            const data = await res.json()
            if (data.success) {
                toast.success('Room added!')
                router.push('/dashboard/rooms')
                router.refresh()
            } else {
                toast.error(data.message)
            }
        } catch {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
                <label className="block text-sm font-medium mb-1">Room Type</label>
                <select
                    value={roomType}
                    onChange={e => setRoomType(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                >
                    {ROOM_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Price per Night (Rp)</label>
                <input
                    type="number" required min="1"
                    value={pricePerNight}
                    onChange={e => setPricePerNight(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="500000"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Amenities</label>
                <div className="grid grid-cols-2 gap-2">
                    {AMENITY_OPTIONS.map(amenity => (
                        <label key={amenity} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                checked={amenities.includes(amenity)}
                                onChange={() => toggleAmenity(amenity)}
                            />
                            {amenity}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Room Images (max 4)</label>
                <input
                    type="file" accept="image/*" multiple
                    onChange={handleImageChange}
                    className="w-full text-sm"
                />
                {images.length > 0 && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {images.map((img, i) => (
                            <img
                                key={i}
                                src={URL.createObjectURL(img)}
                                alt={`preview-${i}`}
                                className="w-20 h-16 object-cover rounded border"
                            />
                        ))}
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-2 rounded text-sm font-medium disabled:opacity-50"
            >
                {loading ? 'Adding Room...' : 'Add Room'}
            </button>
        </form>
    )
}

export default AddRoomForm
