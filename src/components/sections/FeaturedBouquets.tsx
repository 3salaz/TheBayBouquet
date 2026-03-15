import { Link } from "react-router-dom"
import BouquetCard from "../bouquets/BouquetCard"
import SectionHeading from "../ui/SectionHeading"
import Button from "../ui/Button"
import { bouquets } from "../../data/bouquets"

export default function FeaturedBouquets() {
    return (
        <section className="space-y-8">
            <div className="flex items-end justify-between gap-4">
                <SectionHeading
                    title="Featured Bouquets"
                    description="A few signature arrangements to highlight the style and attract early orders."
                />

                <Link to="/bouquets" className="shrink-0">
                    <Button variant="secondary">View All</Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {bouquets.slice(0, 3).map((bouquet) => (
                    <BouquetCard
                        key={bouquet.id}
                        name={bouquet.name}
                        description={bouquet.description}
                        price={bouquet.price}
                        image={bouquet.image}
                        tags={bouquet.tags}
                    />
                ))}
            </div>
        </section>
    )
}