import React from 'react'
import { useRouter } from 'next/router'
const RegisterButton = () => {
  const router = useRouter()
  const handleLogin = () => {
    router.push('/Login')
  }
  return (
    <button onClick={handleLogin}>
        Register/Login
    </button>
  )
}

export default RegisterButton
