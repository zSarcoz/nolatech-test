"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/(pages)/(store)/authStore"

export default function useStates() {
  const login = useAuthStore((state) => state.login)
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // dispatch(login({ username, password }))
  }

  const handleLogin = async () => {
    try {
      // const response = await fetch("http://localhost:3001/users")
      // const users = await response.json()
      const user = users.find(
        (u) => u.username === username && u.password === password
      )

      if (user) {
        login(user.username, user.password)
        router.push("/dashboard")
      } else {
        setError("Invalid username or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    }
  }

  const users = [
    {
      id: 1,
      username: "user",
      password: "user"
    },
    {
      id: 2,
      username: "admin",
      password: "admin"
    }
  ]
  return {
    router,
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    error,
    handleSubmit,
    handleLogin,
    users
  }
}
