// src/features/admin/components/AdminSidebar.tsx

import { Link } from "react-router-dom"

export default function AdminSidebar() {
  return (
    <aside className="w-64 border-r border-neutral-200 bg-white p-6">
      <h2 className="mb-8 text-xl font-semibold">The Bay Bouquet</h2>

      <nav className="space-y-4 text-sm">
        <Link to="/admin" className="block text-neutral-700 hover:text-black">
          Dashboard
        </Link>

        <Link to="/admin/requests" className="block text-neutral-700 hover:text-black">
          Orders
        </Link>

        <Link to="/admin/availability" className="block text-neutral-700 hover:text-black">
          Availability
        </Link>
      </nav>
    </aside>
  )
}