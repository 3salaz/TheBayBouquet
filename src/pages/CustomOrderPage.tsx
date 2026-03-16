import SectionHeading from "../components/ui/SectionHeading"
import CustomOrderForm from "../features/custom-order/components/CustomOrderForm"

export default function CustomOrderPage() {
    return (
        <section className="space-y-8">
            <SectionHeading
                title="Custom Bouquet Request"
                description="Tell us what you have in mind and we’ll prepare a bouquet tailored to your occasion, colors, and preferences."
            />

            <CustomOrderForm />
        </section>
    )
}