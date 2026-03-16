import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import SectionHeading from "../components/ui/SectionHeading"
import { bouquets } from "../data/bouquets"

export default function CustomOrderPage() {
    const [searchParams] = useSearchParams()
    const bouquetId = searchParams.get("bouquet")

    const selectedBouquet = useMemo(() => {
        return bouquets.find((bouquet) => bouquet.id === bouquetId) ?? null
    }, [bouquetId])

    return (
        <section className="space-y-6">
            <SectionHeading
                title="Custom Order"
                description="Request a bouquet tailored to the occasion, color palette, and budget."
            />

            {selectedBouquet ? (
                <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.2em] text-rose-500">
                        Selected bouquet
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">{selectedBouquet.name}</h2>
                    <p className="mt-2 text-neutral-600">{selectedBouquet.description}</p>
                    <p className="mt-3 font-medium text-rose-600">${selectedBouquet.price}</p>
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-rose-200 bg-rose-50/50 p-5">
                    <p className="text-neutral-600">
                        No bouquet selected yet. You can still submit a custom request.
                    </p>
                </div>
            )}
        </section>
    )
}