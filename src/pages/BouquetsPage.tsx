import BouquetCard from "../components/bouquets/BouquetCard";
import Card from "../components/ui/Card";
import SectionHeading from "../components/ui/SectionHeading";

export default function BouquetsPage() {
    return (
        <section className="space-y-6">
            <SectionHeading
                title="Bouquets"
                description="Browse featured bouquet styles and signature arrangements."
            />

            <div className="grid gap-6 md:grid-cols-3">
                <BouquetCard
                    name="Sunset Roses"
                    description="A warm bouquet of red and orange roses."
                    price={45}
                />

                <BouquetCard
                    name="Spring Garden"
                    description="Soft pastel flowers perfect for celebrations."
                    price={55}
                />

                <BouquetCard
                    name="Classic Romance"
                    description="Deep red roses for anniversaries and romance."
                    price={60}
                />
            </div>
        </section>
    )
}