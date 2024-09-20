"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/(pages)/(store)/authStore"


export default function useStates() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // dispatch(login({ username, password }))
  }
  const handleLogin = ()=>{
    login("user","user")
    router.push("/dashboard")
  }
  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    router,
    handleLogin,

  }
}
