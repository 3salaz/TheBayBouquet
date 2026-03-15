import Card from "../components/ui/Card";

export default function BouquetsPage() {
    return (
        <section className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight">Bouquets</h1>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <h3 className="text-lg font-semibold">Sunset Roses</h3>
                    <p className="text-sm text-neutral-600">
                        A warm bouquet of red and orange roses.
                    </p>
                    <p className="mt-2 font-medium">$45</p>
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold">Spring Garden</h3>
                    <p className="text-sm text-neutral-600">
                        Soft pastel flowers perfect for celebrations.
                    </p>
                    <p className="mt-2 font-medium">$55</p>
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold">Classic Romance</h3>
                    <p className="text-sm text-neutral-600">
                        Deep red roses for anniversaries and romance.
                    </p>
                    <p className="mt-2 font-medium">$60</p>
                </Card>
            </div>
        </section>
    )
}