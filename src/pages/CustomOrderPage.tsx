import SectionHeading from "../components/ui/SectionHeading"

export default function CustomOrderPage() {
    return (
        <section className="space-y-8">
            <SectionHeading
                title="Custom Bouquet Request"
                description="Tell us what you have in mind and we’ll prepare a bouquet tailored to your occasion, colors, and preferences."
            />

            <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
                <p className="text-sm text-neutral-600">
                    This form will allow customers to request a completely custom bouquet.
                    We'll add fields for occasion, flower preferences, wrapping style,
                    pickup date, and message details next.
                </p>
            </div>
        </section>
    )
}