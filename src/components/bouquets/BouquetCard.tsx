import Card from "../ui/Card"

type Props = {
    name: string
    description: string
    price: number
    image: string
    tags: string[]
}

export default function BouquetCard({
    name,
    description,
    price,
    image,
    tags,
}: Props) {
    return (
        <Card className="group overflow-hidden border-rose-100 p-0 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
                />
            </div>

            <div className="space-y-4 p-5">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="space-y-1">
                    <h3 className="text-xl font-semibold tracking-tight">{name}</h3>
                    <p className="text-sm leading-6 text-neutral-600">{description}</p>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-base font-semibold text-rose-600">${price}</p>

                    <button className="rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50">
                        View Details
                    </button>
                </div>
            </div>
        </Card>
    )
}