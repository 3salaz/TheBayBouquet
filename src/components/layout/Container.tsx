type Props = {
    children: React.ReactNode
}

export default function Container({ children }: Props) {
    return (
        <div className="mx-auto max-w-6xl rounded-md p-2">
            {children}
        </div>
    )
}