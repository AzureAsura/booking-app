import { cookies } from 'next/headers'

const BACKEND_URL = process.env.BACKEND_URL

export async function serverFetch(path: string, options: RequestInit = {}) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    return fetch(`${BACKEND_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Cookie: `token=${token}` } : {}),
            ...(options.headers ?? {})
        },
        cache: 'no-store'
    })
}

export async function getUser() {
    try {
        const res = await serverFetch('/user/data')
        const data = await res.json()
        return data.success ? data.userData : null
    } catch {
        return null
    }
}

export async function getRooms() {
    try {
        const res = await serverFetch('/rooms')
        const data = await res.json()
        return data.success ? data.rooms : []
    } catch {
        return []
    }
}

export async function getUserBookings() {
    try {
        const res = await serverFetch('/bookings/user')
        const data = await res.json()
        return data.success ? data.booking : []
    } catch {
        return []
    }
}

export async function getOwnerRooms() {
    try {
        const res = await serverFetch('/rooms/owner')
        const data = await res.json()
        return data.success ? data.rooms : []
    } catch {
        return []
    }
}

export async function getHotelDashboard() {
    try {
        const res = await serverFetch('/bookings/hotel')
        const data = await res.json()
        return data.success ? data.dashboardData : null
    } catch {
        return null
    }
}

export const getHotels = async () => {
    try {
        const res = await serverFetch('/hotels')
        const data = await res.json()
        return data.success ? data.hotels : []
    } catch (error) {
        return []
    }
}

export const getHotelById = async (id: string) => {
    try {
        const res = await serverFetch(`/hotels/${id}`)
        const data = await res.json()
        return data.success ? data.hotel : null
    } catch (error) {
        return null
    }
}

export const getMyHotel = async () => {
    try {
        const res = await serverFetch('/hotels/mine')
        const data = await res.json()
        return data.success ? data.hotel : null
    } catch (error) {
        return null
    }
}

export const getPendingHotels = async () => {
    try {
        const res = await serverFetch('/admin/hotels')
        const data = await res.json()
        return data.success ? data.hotels : []
    } catch (error) {
        console.log(error)

    }
}