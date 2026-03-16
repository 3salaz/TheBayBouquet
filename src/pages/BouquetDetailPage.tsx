import { useParams, Link } from "react-router-dom"
import { bouquets } from "../data/bouquets"
import SectionHeading from "../components/ui/SectionHeading"

export default function BouquetDetailsPage() {
    const { bouquetId } = useParams()

    const bouquet = bouquets.find((item) => item.id === bouquetId)

    if (!bouquet) {
        return (
            <section>
                <SectionHeading
                    title="Bouquet not found"
                    description="That bouquet does not exist or may have been removed."
                />
            </section>
        )
    }

    return (
        <section className="grid gap-10 md:grid-cols-2">
            <div className="overflow-hidden rounded-3xl bg-white">
                <img
                    src={bouquet.image}
                    alt={bouquet.name}
                    className="h-125 w-full object-cover"
                />
            </div>

            <div className="space-y-5">
                <div className="flex flex-wrap gap-2">
                    {bouquet.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <SectionHeading
                    title={bouquet.name}
                    description={bouquet.description}
                />

                <p className="text-2xl font-semibold text-rose-600">
                    ${bouquet.price}
                </p>

                <Link
                    to={`/custom-order?bouquet=${bouquet.id}`}
                    className="inline-flex items-center justify-center rounded-xl bg-rose-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-600"
                >
                    Order This Bouquet
                </Link>
            </div>
        </section>
    )
}