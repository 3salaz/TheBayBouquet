import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="border-t  border-rose-100 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-10">
                <div className="grid gap-8 md:grid-cols-3">

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">The Bay Bouquets</h3>
                        <p className="text-sm text-neutral-600">
                            Handcrafted floral arrangements for birthdays, celebrations,
                            and everyday moments.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-700">
                            Explore
                        </h4>

                        <div className="flex flex-col gap-2 text-sm">
                            <Link to="/" className="hover:text-rose-600">Home</Link>
                            <Link to="/bouquets" className="hover:text-rose-600">Bouquets</Link>
                            <Link to="/custom-order" className="hover:text-rose-600">Custom Order</Link>
                            <Link to="/contact" className="hover:text-rose-600">Contact</Link>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-700">
                            Contact
                        </h4>

                        <p className="text-sm text-neutral-600">
                            San Francisco Bay Area
                        </p>

                        <p className="text-sm text-neutral-600">
                            orders@baybouquets.com
                        </p>
                    </div>

                </div>

                <div className="mt-10 border-t border-rose-100 pt-6 text-sm text-neutral-500">
                    © {new Date().getFullYear()} The Bay Bouquets. All rights reserved.
                </div>
            </div>
        </footer>
    )
}