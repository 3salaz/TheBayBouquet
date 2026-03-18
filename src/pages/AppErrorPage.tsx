import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom"

export default function AppErrorPage() {
    const error = useRouteError()
    const navigate = useNavigate()

    let title = "Something went wrong"
    let message =
        "An unexpected error occurred. Please try again or go back to the home page."

    if (isRouteErrorResponse(error)) {
        title = `${error.status} ${error.statusText}`

        if (typeof error.data === "string") {
            message = error.data
        }
    } else if (error instanceof Error) {
        message = error.message
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
            <section className="w-full max-w-2xl space-y-6 rounded-2xl border border-rose-100 bg-white p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    <p className="text-sm uppercase tracking-[0.2em] text-rose-500">
                        Oops
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
                    <p className="text-neutral-600">{message}</p>
                </div>

                <div className="flex justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                    >
                        Go Back
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
                    >
                        Home
                    </button>
                </div>
            </section>
        </div>
    )
}