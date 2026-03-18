import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { subscribeToAdminAuth } from "./service"
import type { User } from "firebase/auth"

type Props = {
  children: React.ReactNode
}

export default function ProtectedAdminRoute({ children }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToAdminAuth((firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  if (loading) {
    return <div className="p-6">Checking authentication...</div>
  }

  if (!user) {
    return <Navigate to="/admin/sign-in" replace />
  }

  return <>{children}</>
}