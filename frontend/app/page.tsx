'use client'

import { useAuth } from "@/wrapper/useAuth"

const Page = () => {

  const { userData, logout } = useAuth()

  
  if (!userData) {
    return <p>Loading...</p>
  }


  return (
    <div>
      <p>hi {userData.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Page