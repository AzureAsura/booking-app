'use client'
import { AuthContent } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { toast } from "sonner"

const AuthForm = () => {

    const context = useContext(AuthContent)

    if (!context) {
        return null
    }

    const { backendUrl, setIsLoggedIn, getUserData } = context

    const router = useRouter()

    const [state, setState] = useState('Register')
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

                    setIsLoggedIn(true)
                    await getUserData()
                    router.push('/')
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
                    setIsLoggedIn(true)
                    await getUserData()
                    router.push('/')
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error: any) {
            toast.error(error.message)
            console.log(error)
        }
    }

    console.log(`${backendUrl}/auth/register`)

    return (
        <div>
            <h2>{state === 'Register' ? 'Create Account' : 'Login'}</h2>
            <p>{state === 'Register' ? 'Create Account New Account' : 'Login to your account'}</p>

            <form onSubmit={onSubmitHandler}>
                {state === 'Register' && (
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="text" required placeholder="Name" onChange={e => setName(e.target.value)} value={name} />
                    </div>
                )}
                <div>
                    <label htmlFor="">Email</label>
                    <input type="text" required placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" required placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
                </div>
                <button type="submit">{state}</button>
            </form>

            {state === "Register" ? (
                <p>already have account? {" "}
                    <span onClick={() => setState("Login")}>Login here</span>
                </p>

            ) : (
                <p>dont have account? {" "}
                    <span onClick={() => setState("Register")}>Register here</span>
                </p>

            )}



        </div>
    )
}

export default AuthForm