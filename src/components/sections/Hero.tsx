import Button from "../ui/Button"
import heroImage from "../../assets/bouquets/person-holding-bouquet-of-flowers.jpg"
import { Link } from "react-router-dom"

export default function Hero() {
    return (
        <section className="grid items-center gap-10 md:grid-cols-2">
            <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.2em] text-rose-500">
                    Handcrafted floral arrangements
                </p>

                <h1 className="text-5xl font-semibold tracking-tight">
                    Beautiful bouquets for every moment.
                </h1>

                <p className="max-w-lg text-lg text-neutral-600">
                    Thoughtfully designed flower bouquets for birthdays,
                    anniversaries, celebrations, and everyday surprises.
                </p>

                <div className="flex gap-4">
                    <Link to="/bouquets">
                        <Button>Shop Bouquets</Button>
                    </Link>

                    <Link to="/custom-order">
                        <Button variant="secondary">Custom Order</Button>
                    </Link>
                </div>
            </div>

            <div className="overflow-hidden rounded-3xl">
                <img
                    src={heroImage}
                    alt="Flower bouquet"
                    className="h-105 w-full object-cover"
                />
            </div>
        </section>
    )
}