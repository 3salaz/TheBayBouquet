import { cn } from "../../lib/utils"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary"
}

export default function Button({
    className,
    variant = "primary",
    ...props
}: Props) {
    const base =
        "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition"

    const styles = {
        primary:
            "bg-rose-500 text-white hover:bg-rose-600",
        secondary:
            "bg-rose-100 text-rose-700 hover:bg-rose-200",
    }

    return (
        <button
            className={cn(base, styles[variant], className)}
            {...props}
        />
    )
}