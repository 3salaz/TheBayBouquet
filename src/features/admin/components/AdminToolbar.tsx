import { useNavigate } from "react-router-dom"
import { signOutAdmin } from "../auth/service"

export default function AdminTopbar() {
  const navigate = useNavigate()

  async function handleSignOut() {
    try {
      await signOutAdmin()
      navigate("/admin/sign-in")
    } catch (err) {
      console.error("Failed to sign out:", err)
    }
  }

  return (
    <header className="border-b border-neutral-200 bg-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-medium">Admin Dashboard</h1>

      <button
        onClick={handleSignOut}
        className="text-sm text-neutral-600 hover:text-black"
      >
        Sign out
      </button>
    </header>
  )
}