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
    status: string
    createdAt?: Timestamp
}

export default function AdminRequestsPage() {
    const [requests, setRequests] = useState<CustomOrderRequest[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [updatingId, setUpdatingId] = useState<string | null>(null)

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
        status: "new" | "confirmed" | "ready" | "completed"
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

    return (
        <section className="space-y-8">
            <SectionHeading
                title="Admin Requests"
                description="Review incoming custom bouquet requests."
            />

            {loading ? (
                <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
                    Loading requests...
                </div>
            ) : error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
                    {error}
                </div>
            ) : requests.length === 0 ? (
                <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
                    No requests yet.
                </div>
            ) : (
                <div className="grid gap-4">
                    {requests.map((request) => (
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
                                </div>

                                <select
                                    value={request.status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            request.id,
                                            e.target.value as "new" | "confirmed" | "ready" | "completed"
                                        )
                                    }
                                    disabled={updatingId === request.id}
                                    className="rounded-full border border-rose-200 bg-white px-3 py-1 text-xs font-medium text-rose-700 outline-none disabled:opacity-60"
                                >
                                    <option value="new">new</option>
                                    <option value="confirmed">confirmed</option>
                                    <option value="ready">ready</option>
                                    <option value="completed">completed</option>
                                </select>
                            </div>

                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                                <p>
                                    <span className="font-medium">Occasion:</span> {request.occasion}
                                </p>
                                <p>
                                    <span className="font-medium">Pickup Date:</span> {request.pickupDate}
                                </p>
                                <p>
                                    <span className="font-medium">Pickup Time:</span> {request.pickupTime || "—"}
                                </p>
                                <p>
                                    <span className="font-medium">Budget:</span> {request.budget || "—"}
                                </p>
                                <p>
                                    <span className="font-medium">Flower Types:</span> {request.flowerTypes || "—"}
                                </p>
                                <p>
                                    <span className="font-medium">Colors:</span> {request.flowerColors || "—"}
                                </p>
                                <p>
                                    <span className="font-medium">Wrapping:</span> {request.wrappingStyle || "—"}
                                </p>
                                <p>
                                    <span className="font-medium">Size / Quantity:</span> {request.quantity || "—"}
                                </p>
                            </div>

                            {request.lettering ? (
                                <p className="mt-4">
                                    <span className="font-medium">Lettering:</span> {request.lettering}
                                </p>
                            ) : null}

                            {request.notes ? (
                                <p className="mt-2 text-neutral-700">
                                    <span className="font-medium">Notes:</span> {request.notes}
                                </p>
                            ) : null}
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}