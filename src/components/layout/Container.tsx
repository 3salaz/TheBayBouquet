type Props = {
    children: React.ReactNode
}

export default function Container({ children }: Props) {
    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            {children}
        </div>
    )
}