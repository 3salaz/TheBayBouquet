import { Link, Outlet } from "react-router-dom"

export default function App() {
  return (
    <div className="min-h-screen bg-[#fffaf8] text-[#2d1f1f]">
      <header className="border-b border-rose-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-semibold tracking-tight">
            The Bay Bouquets
          </Link>

          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className="hover:opacity-70">
              Home
            </Link>
            <Link to="/bouquets" className="hover:opacity-70">
              Bouquets
            </Link>
            <Link to="/custom-order" className="hover:opacity-70">
              Custom Order
            </Link>
            <Link to="/contact" className="hover:opacity-70">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <Outlet />
      </main>
    </div>
  )
}