type Props = {
    title: string
    description?: string
}

export default function SectionHeading({ title, description }: Props) {
    return (
        <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            {description ? (
                <p className="text-neutral-600">{description}</p>
            ) : null}
        </div>
    )
}