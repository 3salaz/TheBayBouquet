import Button from "../components/ui/Button";

export default function HomePage() {
    return (
        <section className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-rose-500">
                Handcrafted floral arrangements
            </p>

            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight">
                Beautiful bouquets for birthdays, events, and everyday moments.
            </h1>

            <p className="max-w-2xl text-lg text-neutral-600">
                A simple floral storefront MVP to showcase bouquet designs, accept
                custom orders, and help grow the business.
            </p>

            <div className="pt-4">
                <Button>Order Flowers</Button>
            </div>
        </section>
    )
}