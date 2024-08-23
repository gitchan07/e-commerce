import React from 'react'
import { useRouter } from 'next/router'
const RegisterButton = () => {
  const router = useRouter()
  const handleLogin = () => {
    router.push('/Login')
  }
  return (
    <button onClick={handleLogin} className="px-4 py-2 bg-gradient-to-r from-sky-600 to-sky-400 text-white rounded-xl hover:bg-gradient-to-r hover:from-sky-700 hover:to-sky-500 shadow-lg transition-transform transform hover:scale-105">
        Register/Login
    </button>
  )
}

export default RegisterButton
