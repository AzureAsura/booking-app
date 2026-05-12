'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const BecomeOwnerForm = () => {
    const router = useRouter()
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [city, setCity] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('address', address)
            formData.append('contact', contact)
            formData.append('city', city)
            if (image) formData.append('image', image)

            const res = await fetch(`${backendUrl}/hotels`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            const data = await res.json()
            if (data.success) {
                toast.success('Hotel submitted! Waiting for admin approval.')
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label className="block text-sm font-medium mb-1">Hotel Name</label>
                <input
                    type="text" required
                    value={name} onChange={e => setName(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="Grand Hyatt Jakarta"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                    type="text" required
                    value={city} onChange={e => setCity(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="Jakarta"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                    type="text" required
                    value={address} onChange={e => setAddress(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="Jl. MH Thamrin No. 1"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Contact (Phone)</label>
                <input
                    type="text" required
                    value={contact} onChange={e => setContact(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="08123456789"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Hotel Image</label>
                <input
                    type="file" accept="image/*" required
                    onChange={e => setImage(e.target.files?.[0] || null)}
                    className="w-full border rounded px-3 py-2 text-sm"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-2 rounded text-sm font-medium disabled:opacity-50"
            >
                {loading ? 'Submitting...' : 'Submit Hotel'}
            </button>
        </form>
    )
}

export default BecomeOwnerForm
