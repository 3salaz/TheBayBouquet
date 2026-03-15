import BouquetCard from "../components/bouquets/BouquetCard";
import SectionHeading from "../components/ui/SectionHeading";
import { bouquets } from "../data/bouquets";

export default function BouquetsPage() {
    return (
        <section className="space-y-6">
            <SectionHeading
                title="Bouquets"
                description="Browse featured bouquet styles and signature arrangements."
            />

            <div className="grid gap-6 md:grid-cols-3">
                {bouquets.map((bouquet) => (
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