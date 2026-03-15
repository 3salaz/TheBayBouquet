export default function App() {
  return (
    <div className="min-h-screen bg-[#fffaf8] text-[#2d1f1f]">
      <header className="border-b border-rose-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="text-xl font-semibold tracking-tight">
            The Bay Bouquets
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <a href="#" className="hover:opacity-70">
              Home
            </a>
            <a href="#" className="hover:opacity-70">
              Bouquets
            </a>
            <a href="#" className="hover:opacity-70">
              Custom Order
            </a>
            <a href="#" className="hover:opacity-70">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <section className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-rose-500">
            Handcrafted floral arrangements
          </p>

          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight">
            Beautiful bouquets for birthdays, events, and everyday moments.
          </h1>

          <p className="max-w-2xl text-lg text-neutral-600">
            This is the starting shell for the flower business MVP. Next we’ll
            split this into real pages and components.
          </p>
        </section>
      </main>
    </div>
  )
}