"use client"
import PrivateRoute from "@/app/_components/PrivateRoute/PrivateRoute"
import Dashboard from "./Dashboard"

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <main className="w-full h-full p-0 m-0">
        <Dashboard />
      </main>
    </PrivateRoute>
  )
}
