import React from 'react'
import Link from 'next/link'
import { getUser } from '@/lib/api'
import LogoutButton from './LogoutButton'

const Navbar = async () => {
    const user = await getUser()

    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">

                    <div className="flex items-center">
                        <Link href="/" className="text-3xl font-black text-indigo-600 tracking-tighter">
                            Hotel<span className="text-gray-900">Booking</span>
                        </Link>
                    </div>

                    {user ? (
                        <div className="flex items-center gap-8">
                            <div className="hidden md:flex items-center gap-8">
                                <span className="text-base font-medium text-gray-500">
                                    Hi, <span className="text-gray-900 font-bold">{user.name}</span>
                                </span>
                                <Link
                                    href="/my-bookings"
                                    className="text-base font-bold text-gray-700 hover:text-indigo-600 transition-colors"
                                >
                                    My Bookings
                                </Link>
                            </div>

                            <div className="flex items-center gap-4 border-l pl-8 border-gray-200">
                                {user.role === 'admin' && (
                                    <Link
                                        href="/admin"
                                        className="text-base bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-700 transition-all shadow-sm"
                                    >
                                        Admin
                                    </Link>
                                )}

                                {user.role === 'hotelOwner' && (
                                    <Link
                                        href="/dashboard"
                                        className="text-base bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                                    >
                                        Dashboard
                                    </Link>
                                )}

                                {user.role === 'user' && (
                                    <Link
                                        href="/become-owner"
                                        className="text-base bg-white text-indigo-600 border-2 border-indigo-600 px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-50 transition-all"
                                    >
                                        Become Owner
                                    </Link>
                                )}

                                <LogoutButton />
                            </div>
                        </div>
                    ) : (
                        <Link
                            href="/auth"
                            className="text-base bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-sm"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
