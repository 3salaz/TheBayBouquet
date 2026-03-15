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
        <Card className="overflow-hidden p-0">
            <img
                src={image}
                alt={name}
                className="h-56 w-full object-cover"
            />

            <div className="space-y-3 p-5">
                <h3 className="text-lg font-semibold">{name}</h3>

                <p className="text-sm text-neutral-600">{description}</p>

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

                <p className="font-medium">${price}</p>
            </div>
        </Card>
    )
}