'use client'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

const promoContent = {
    Login: {
        title: "Selamat Datang Kembali!",
        description: "Temukan kenyamanan terbaik untuk perjalanan Anda berikutnya. Login untuk mengakses pesanan dan penawaran eksklusif.",
    },
    Register: {
        title: "Mulailah Perjalanan Anda",
        description: "Gabung sekarang dan nikmati kemudahan pemesanan hotel, diskon anggota, dan kelola akomodasi Anda dengan mudah.",
    }
}

const AuthForm = () => {

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const router = useRouter()

    const [state, setState] = useState<'Login' | 'Register'>('Login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e: React.FormEvent) => {
        try {
            e.preventDefault()

            if (state === "Register") {
                const res = await fetch(`${backendUrl}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ name, email, password })
                })

                const data = await res.json()

                if (data.success) {
                    toast.success("Register berhasil")
                    router.push('/')
                    router.refresh()
                } else {
                    toast.error(data.message)
                }
            } else {
                const res = await fetch(`${backendUrl}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ email, password })
                })

                const data = await res.json()

                if (data.success) {
                    toast.success("Login berhasil")
                    router.push('/')
                    router.refresh()
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error: any) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const currentPromo = promoContent[state];

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row transition-all duration-300">
                
                {/* SISI KIRI: FORMULIR AUTH */}
                <div className="w-full md:w-1/2 p-10 lg:p-12">
                    <div className="space-y-8">
                        {/* Judul & Header */}
                        <div>
                            <Link href="/" className="inline-block mb-10">
                                <span className="text-3xl font-black text-indigo-600 tracking-tighter">
                                    Hotel<span className="text-gray-900">Booking</span>
                                </span>
                            </Link>
                            <h2 className="text-4xl font-extrabold text-gray-950 tracking-tight">
                                {state === 'Register' ? 'Create Account' : 'Sign In'}
                            </h2>
                            <p className="mt-2 text-base text-gray-600">
                                {state === 'Register' ? 'Buat akun baru untuk mulai memesan.' : 'Masuk untuk mengakses dasbor Anda.'}
                            </p>
                        </div>

                        {/* Formulir */}
                        <form onSubmit={onSubmitHandler} className="space-y-5">
                            {state === 'Register' && (
                                <div>
                                    <label className="text-sm font-semibold text-gray-900" htmlFor="name">Name</label>
                                    <input 
                                        id="name"
                                        type="text" 
                                        required 
                                        placeholder="Nama Lengkap Anda" 
                                        className="mt-1.5 w-full text-base bg-white border border-gray-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 rounded-xl px-4 py-3 font-medium text-gray-950 placeholder-gray-400 transition-all"
                                        onChange={e => setName(e.target.value)} 
                                        value={name} 
                                    />
                                </div>
                            )}
                            <div>
                                <label className="text-sm font-semibold text-gray-900" htmlFor="email">Email</label>
                                <input 
                                    id="email"
                                    type="text" 
                                    required 
                                    placeholder="your.email@example.com" 
                                    className="mt-1.5 w-full text-base bg-white border border-gray-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 rounded-xl px-4 py-3 font-medium text-gray-950 placeholder-gray-400 transition-all"
                                    onChange={e => setEmail(e.target.value)} 
                                    value={email} 
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-900" htmlFor="password">Password</label>
                                <input 
                                    id="password"
                                    type="password" 
                                    required 
                                    placeholder="••••••••••••" 
                                    className="mt-1.5 w-full text-base bg-white border border-gray-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 rounded-xl px-4 py-3 font-medium text-gray-950 placeholder-gray-400 transition-all"
                                    onChange={e => setPassword(e.target.value)} 
                                    value={password} 
                                />
                                {state === 'Login' && (
                                    <div className="text-right mt-2">
                                        <Link href="#" className="text-xs font-bold text-indigo-600 hover:underline">Lupa Password?</Link>
                                    </div>
                                )}
                            </div>
                            
                            {/* Tombol Submit */}
                            <button 
                                type="submit"
                                className="w-full text-base bg-indigo-600 text-white px-5 py-3.5 rounded-xl font-bold hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all active:scale-[0.98]"
                            >
                                {state === 'Register' ? 'Register Now' : 'Sign In'}
                            </button>
                        </form>

                        {/* Switcher Login/Register */}
                        <div className="text-center border-t border-gray-100 pt-8 mt-10">
                            {state === "Register" ? (
                                <p className="text-sm text-gray-600 font-medium">
                                    Already have an account?{" "}
                                    <span 
                                        onClick={() => setState("Login")} 
                                        className="text-indigo-600 font-bold hover:underline cursor-pointer ml-1"
                                    >
                                        Login here
                                    </span>
                                </p>
                            ) : (
                                <p className="text-sm text-gray-600 font-medium">
                                    Don't have an account?{" "}
                                    <span 
                                        onClick={() => setState("Register")} 
                                        className="text-indigo-600 font-bold hover:underline cursor-pointer ml-1"
                                    >
                                        Register here
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* SISI KANAN: GAMBAR & PROMO */}
                <div className="hidden md:block w-1/2 relative bg-indigo-50">
                    <div className="absolute inset-0 bg-indigo-700/80 z-10 flex flex-col justify-end p-12 text-white">
                        <div className="space-y-3">
                            <h3 className="text-4xl font-black tracking-tight leading-tight">
                                {currentPromo.title}
                            </h3>
                            <p className="text-lg font-medium text-indigo-100">
                                {currentPromo.description}
                            </p>
                        </div>
                    </div>
                    {/* Ganti src dengan path gambar Anda sendiri, atau biarkan URL placeholder untuk demo */}
                    <Image 
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop"
                        alt="Aesthetic Hotel Lobby" 
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </div>
    )
}

export default AuthForm
