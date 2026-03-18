// src/features/admin/components/AdminTopbar.tsx

export default function AdminTopbar() {
  return (
    <header className="border-b border-neutral-200 bg-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-medium">Admin Dashboard</h1>

      <button className="text-sm text-neutral-600 hover:text-black">
        Sign out
      </button>
    </header>
  )
}