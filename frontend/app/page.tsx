'use client'

import { useAuthStore } from "@/store/authStore"



const Page = () => {

  const { userData, logout } = useAuthStore()

  if (!userData) {
    return <p>Loading...</p>
  }

  console.log(userData)



  return (
    <div>
      <p>Nama: {userData.name}</p>
      <p>Email: {userData.email}</p>

      <button onClick={logout}>logout</button>
    </div>
  )
}

export default Page