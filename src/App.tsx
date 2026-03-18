import { Link, Outlet } from "react-router-dom"
import Container from "./components/layout/Container"
import Footer from "./components/layout/Footer"

export default function App() {
  return (
    <>
      <div className="min-h-screen h-[80svh] bg-blue-300 bg-[#fffaf8] text-[#2d1f1f] flex flex-col">
        <header className="border-b border-rose-100 bg-white/80 backdrop-blur shadow-xl">
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

        <main className="flex-grow">
          <Container>
            <Outlet />
          </Container>
        </main>
      </div>

      <Footer />
    </>
  )
}