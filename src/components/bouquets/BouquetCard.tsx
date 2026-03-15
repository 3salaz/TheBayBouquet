import Card from "../ui/Card"

type Props = {
    name: string
    description: string
    price: number
}

export default function BouquetCard({ name, description, price }: Props) {
    return (
        <Card className="space-y-2">
            <h3 className="text-lg font-semibold">{name}</h3>

            <p className="text-sm text-neutral-600">
                {description}
            </p>

            <p className="font-medium">
                ${price}
            </p>
        </Card>
    )
}