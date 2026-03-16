import { useEffect, useState } from "react"
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    Timestamp,
} from "firebase/firestore"
import SectionHeading from "../components/ui/SectionHeading"
import { db } from "../lib/firebase"
import { updateCustomOrderStatus } from "../features/custom-order/admin-service"

type CustomOrderStatus = "new" | "confirmed" | "ready" | "completed"
type RequestFilter = "all" | CustomOrderStatus

type CustomOrderRequest = {
    id: string
    occasion: string
    pickupDate: string
    pickupTime: string
    flowerTypes: string
    flowerColors: string
    wrappingStyle: string
    quantity: string
    lettering: string
    notes: string
    budget: string
    customerName: string
    customerPhone: string
    customerEmail: string
    status: CustomOrderStatus
    createdAt?: Timestamp
}

function getStatusClasses(status: CustomOrderStatus) {
    switch (status) {
        case "new":
            return "border-yellow-200 bg-yellow-50 text-yellow-700"
        case "confirmed":
            return "border-blue-200 bg-blue-50 text-blue-700"
        case "ready":
            return "border-purple-200 bg-purple-50 text-purple-700"
        case "completed":
            return "border-green-200 bg-green-50 text-green-700"
        default:
            return "border-neutral-200 bg-white text-neutral-700"
    }
}

function formatTimestamp(timestamp?: Timestamp) {
    if (!timestamp) return "—"

    const date = timestamp.toDate()

    return date.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    })
}

export default function AdminRequestsPage() {
    const [requests, setRequests] = useState<CustomOrderRequest[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [updatingId, setUpdatingId] = useState<string | null>(null)

    const [filter, setFilter] = useState<RequestFilter>("all")
    const [search, setSearch] = useState("")

    useEffect(() => {
        const q = query(
            collection(db, "customOrderRequests"),
            orderBy("createdAt", "desc")
        )

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as CustomOrderRequest[]

                setRequests(data)
                setLoading(false)
            },
            (err) => {
                console.error("Failed to load custom order requests:", err)
                setError("Failed to load requests.")
                setLoading(false)
            }
        )

        return () => unsubscribe()
    }, [])

    async function handleStatusChange(
        requestId: string,
        status: CustomOrderStatus
    ) {
        try {
            setUpdatingId(requestId)
            await updateCustomOrderStatus(requestId, status)
        } catch (err) {
            console.error("Failed to update request status:", err)
            setError("Failed to update request status.")
        } finally {
            setUpdatingId(null)
        }
    }

    const filteredRequests = requests.filter((request) => {
        const matchesFilter = filter === "all" || request.status === filter

        const searchValue = search.trim().toLowerCase()

        const matchesSearch =
            !searchValue ||
            request.customerName.toLowerCase().includes(searchValue) ||
            request.customerEmail.toLowerCase().includes(searchValue) ||
            request.customerPhone.toLowerCase().includes(searchValue)

        return matchesFilter && matchesSearch
    })

    const newRequests = filteredRequests.filter((r) => r.status === "new")
    const otherRequests = filteredRequests.filter((r) => r.status !== "new")
    const confirmedRequests = filteredRequests.filter(
        (request) => request.status === "confirmed"
    )

    const requestCounts = {
        all: requests.length,
        new: requests.filter((r) => r.status === "new").length,
        confirmed: requests.filter((r) => r.status === "confirmed").length,
        ready: requests.filter((r) => r.status === "ready").length,
        completed: requests.filter((r) => r.status === "completed").length,
    }

    return (
        <section className="space-y-8">
            <SectionHeading
                title="Admin Requests"
                description="Review incoming custom bouquet requests."
            />

            <div className="flex flex-wrap gap-2">
                {(["all", "new", "confirmed", "ready", "completed"] as RequestFilter[]).map(
                    (value) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setFilter(value)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${filter === value
                                ? "bg-rose-500 text-white"
                                : "border border-rose-200 bg-white text-rose-700 hover:bg-rose-50"
                                }`}
                        >
                            {value} ({requestCounts[value]})
                        </button>
                    )
                )}
            </div>

            <div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email, or phone"
                    className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-400 md:max-w-md"
                />
            </div>

            {loading ? (
                <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
                    Loading requests...
                </div>
            ) : error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
                    {error}
                </div>
            ) : filteredRequests.length === 0 ? (
                <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
                    No requests yet.
                </div>
            ) : (
                <>
                    {filter === "all" && newRequests.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-rose-600">
                                New Requests ({newRequests.length})
                            </h2>

                            <div className="grid gap-4">
                                {newRequests.map((request) => (
                                    <div
                                        key={`new-${request.id}`}
                                        className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 shadow-sm"
                                    >
                                        <p className="mb-2 text-sm font-medium text-yellow-700">
                                            Needs review
                                        </p>

                                        <p className="font-semibold">{request.customerName}</p>

                                        <p className="text-sm text-neutral-600">
                                            {request.customerEmail} · {request.customerPhone}
                                        </p>

                                        <p className="mt-2 text-sm">
                                            <span className="font-medium">Occasion:</span>{" "}
                                            {request.occasion}
                                        </p>

                                        <p className="text-sm">
                                            <span className="font-medium">Pickup:</span>{" "}
                                            {request.pickupDate}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => handleStatusChange(request.id, "confirmed")}
                                            disabled={updatingId === request.id}
                                            className="mt-4 inline-flex items-center justify-center rounded-xl bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600 disabled:opacity-60"
                                        >
                                            {updatingId === request.id ? "Confirming..." : "Confirm Order"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {filter === "all" && confirmedRequests.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-blue-600">
                                Confirmed Orders ({confirmedRequests.length})
                            </h2>

                            <div className="grid gap-4">
                                {confirmedRequests.map((request) => (
                                    <div
                                        key={`confirmed-${request.id}`}
                                        className="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm"
                                    >
                                        <p className="mb-2 text-sm font-medium text-blue-700">
                                            In progress
                                        </p>

                                        <p className="font-semibold">{request.customerName}</p>

                                        <p className="text-sm text-neutral-600">
                                            {request.customerEmail} · {request.customerPhone}
                                        </p>

                                        <p className="mt-2 text-sm">
                                            <span className="font-medium">Occasion:</span> {request.occasion}
                                        </p>

                                        <p className="text-sm">
                                            <span className="font-medium">Pickup:</span> {request.pickupDate}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => handleStatusChange(request.id, "ready")}
                                            disabled={updatingId === request.id}
                                            className="mt-4 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
                                        >
                                            {updatingId === request.id ? "Updating..." : "Mark Ready"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid gap-4">
                        {(
                            filter === "all"
                                ? filteredRequests.filter(
                                    (request) =>
                                        request.status !== "new" && request.status !== "confirmed"
                                )
                                : filteredRequests
                        ).map((request) => (
                            <div
                                key={request.id}
                                className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-semibold">
                                            {request.customerName}
                                        </h2>

                                        <p className="text-sm text-neutral-600">
                                            {request.customerEmail} · {request.customerPhone}
                                        </p>

                                        <p className="mt-1 text-xs text-neutral-500">
                                            Submitted: {formatTimestamp(request.createdAt)}
                                        </p>
                                    </div>

                                    <select
                                        value={request.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                request.id,
                                                e.target.value as CustomOrderStatus
                                            )
                                        }
                                        disabled={updatingId === request.id}
                                        className={`rounded-full border px-3 py-1 text-xs font-medium outline-none disabled:opacity-60 ${getStatusClasses(
                                            request.status
                                        )}`}
                                    >
                                        <option value="new">new</option>
                                        <option value="confirmed">confirmed</option>
                                        <option value="ready">ready</option>
                                        <option value="completed">completed</option>
                                    </select>
                                </div>

                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <p>
                                        <span className="font-medium">Occasion:</span>{" "}
                                        {request.occasion}
                                    </p>

                                    <p>
                                        <span className="font-medium">Pickup Date:</span>{" "}
                                        {request.pickupDate}
                                    </p>

                                    <p>
                                        <span className="font-medium">Pickup Time:</span>{" "}
                                        {request.pickupTime || "—"}
                                    </p>

                                    <p>
                                        <span className="font-medium">Budget:</span>{" "}
                                        {request.budget || "—"}
                                    </p>

                                    <p>
                                        <span className="font-medium">Flower Types:</span>{" "}
                                        {request.flowerTypes || "—"}
                                    </p>

                                    <p>
                                        <span className="font-medium">Colors:</span>{" "}
                                        {request.flowerColors || "—"}
                                    </p>

                                    <p>
                                        <span className="font-medium">Wrapping:</span>{" "}
                                        {request.wrappingStyle || "—"}
                                    </p>

                                    <p>
                                        <span className="font-medium">Size / Quantity:</span>{" "}
                                        {request.quantity || "—"}
                                    </p>
                                </div>

                                {request.lettering && (
                                    <p className="mt-4">
                                        <span className="font-medium">Lettering:</span>{" "}
                                        {request.lettering}
                                    </p>
                                )}

                                {request.notes && (
                                    <p className="mt-2 text-neutral-700">
                                        <span className="font-medium">Notes:</span>{" "}
                                        {request.notes}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    )
}