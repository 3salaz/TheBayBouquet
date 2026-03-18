// src/features/admin/auth/ProtectedAdminRoute.tsx

import { Navigate } from "react-router-dom"

type Props = {
  children: React.ReactNode
  isAuthenticated: boolean
}

export default function ProtectedAdminRoute({
  children,
  isAuthenticated,
}: Props) {
  if (!isAuthenticated) {
    return <Navigate to="/admin/sign-in" replace />
  }

  return <>{children}</>
}