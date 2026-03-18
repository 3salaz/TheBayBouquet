// src/pages/AdminDashboardPage.tsx

import AdminLayout from "../features/admin/layout/AdminLayout"

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Dashboard</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <p className="text-sm text-neutral-500">Total Orders</p>
            <p className="text-2xl font-bold">—</p>
          </div>

          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <p className="text-sm text-neutral-500">Pending Requests</p>
            <p className="text-2xl font-bold">—</p>
          </div>

          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <p className="text-sm text-neutral-500">Today’s Pickups</p>
            <p className="text-2xl font-bold">—</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}