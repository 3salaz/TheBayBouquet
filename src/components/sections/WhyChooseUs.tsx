const items = [
    {
        title: "Handcrafted Designs",
        description:
            "Each bouquet is arranged with care to feel thoughtful, balanced, and personal.",
    },
    {
        title: "Custom Orders",
        description:
            "Bouquets can be tailored to the occasion, preferred colors, and budget.",
    },
    {
        title: "Local Service",
        description:
            "A simple, personal ordering experience with direct communication and flexible requests.",
    },
]

export default function WhyChooseUs() {
    return (
        <section className="space-y-8">
            <div className="max-w-2xl space-y-2">
                <p className="text-sm uppercase tracking-[0.2em] text-rose-500">
                    Why choose <span className="bg-rose-500 text-white p-1 rounded-md">us</span>
                </p>
                <h2 className="text-3xl font-semibold tracking-tight">
                    Flowers that feel personal, not mass produced.
                </h2>
                <p className="text-neutral-600">
                    This section helps explain the value behind the bouquets and gives the
                    business a little more trust out of the gate.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {items.map((item) => (
                    <div
                        key={item.title}
                        className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm"
                    >
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-neutral-600">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}