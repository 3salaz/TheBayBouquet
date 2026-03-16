import { useState } from "react"
import {
    initialCustomOrderFormData,
    type CustomOrderFormData,
} from "../form"

export default function CustomOrderForm() {
    const [formData, setFormData] = useState<CustomOrderFormData>(
        initialCustomOrderFormData
    )
    const [isSubmitted, setIsSubmitted] = useState(false)

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        const { id, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }))
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        console.log("Custom Order Request:", formData)
        setIsSubmitted(true)
        setFormData(initialCustomOrderFormData)
    }

    if (isSubmitted) {
        return (
            <div className="space-y-4 rounded-2xl border border-green-200 bg-green-50 p-6 text-green-800">
                <p className="text-lg font-semibold">
                    Your custom bouquet request has been submitted.
                </p>

                <p>
                    We'll review the details and follow up with you shortly to confirm the
                    order and pickup time.
                </p>

                <button
                    onClick={() => {
                        setIsSubmitted(false)
                        setFormData(initialCustomOrderFormData)
                    }}
                    className="inline-flex items-center justify-center rounded-xl bg-rose-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-600"
                >
                    New Request
                </button>
            </div>
        )
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="grid gap-6 rounded-2xl border border-rose-100 bg-white p-6 shadow-sm md:grid-cols-2"
        >
            <div className="space-y-2">
                <label htmlFor="occasion" className="text-sm font-medium">
                    Occasion
                </label>
                <select
                    id="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
                >
                    <option value="" disabled>
                        Select an occasion
                    </option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Graduation</option>
                    <option>Wedding</option>
                    <option>Baby Shower</option>
                    <option>Sympathy</option>
                    <option>Just Because</option>
                    <option>Other</option>
                </select>
            </div>

            <div className="space-y-2">
                <label htmlFor="pickupDate" className="text-sm font-medium">
                    Pickup Date
                </label>
                <input
                    id="pickupDate"
                    type="date"
                    className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
                    value={formData.pickupDate}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="pickupTime" className="text-sm font-medium">
                    Preferred Pickup Time
                </label>
                <input
                    id="pickupTime"
                    type="time"
                    className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
                    value={formData.pickupTime}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="budget" className="text-sm font-medium">
                    Budget
                </label>
                <input
                    id="budget"
                    type="text"
                    placeholder="$50 - $100"
                    className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
                    value={formData.budget}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="flowerTypes" className="text-sm font-medium">
                    Preferred Flower Types
                </label>
                <input
                    id="flowerTypes"
                    type="text"
                    placeholder="Roses, tulips, lilies..."
                    className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
                    value={formData.flowerTypes}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="flowerColors" className="text-sm font-medium">
                    Preferred Colors
                </label>
                <input
                    id="flowerColors"
                    type="text"
                    placeholder="Pink, white, red..."
                    className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
                    value={formData.flowerColors}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="wrappingStyle" className="text-sm font-medium">
                    Wrapping Style
                </label>
                <input
                    id="wrappingStyle"
                    type="text"
                    placeholder="Elegant, rustic, modern..."
                    className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
                    value={formData.wrappingStyle}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-medium">
                    Bouquet Size / Amount of Flowers
                </label>
                <input
                    id="quantity"
                    type="text"
                    placeholder="Small, medium, 24 roses..."
                    className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
                    value={formData.quantity}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2 md:col-span-2">
                <label htmlFor="lettering" className="text-sm font-medium">
                    Lettering or Custom Words
                </label>
                <input
                    id="lettering"
                    type="text"
                    placeholder='Example: "Happy Birthday Mom"'
                    className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
                    value={formData.lettering}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2 md:col-span-2">
                <label htmlFor="notes" className="text-sm font-medium">
                    Extra Notes
                </label>
                <textarea
                    id="notes"
                    rows={5}
                    placeholder="Describe the bouquet you want, any flowers to avoid, wrapping preferences, inspiration, etc."
                    className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
                    value={formData.notes}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="customerName" className="text-sm font-medium">
                    Your Name
                </label>
                <input
                    id="customerName"
                    type="text"
                    placeholder="Full name"
                    className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
                    value={formData.customerName}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="customerPhone" className="text-sm font-medium">
                    Phone Number
                </label>
                <input
                    id="customerPhone"
                    type="tel"
                    placeholder="(555) 555-5555"
                    className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
                    value={formData.customerPhone}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2 md:col-span-2">
                <label htmlFor="customerEmail" className="text-sm font-medium">
                    Email Address
                </label>
                <input
                    id="customerEmail"
                    type="email"
                    placeholder="email@example.com"
                    className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
                    value={formData.customerEmail}
                    onChange={handleChange}
                />
            </div>

            <div className="md:col-span-2">
                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl bg-rose-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-600"
                >
                    Submit Request
                </button>
            </div>
        </form>
    )
}