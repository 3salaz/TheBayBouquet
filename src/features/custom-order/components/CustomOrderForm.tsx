import { useState, useMemo, useEffect } from "react"
import {
    initialCustomOrderFormData,
    type CustomOrderFormData,
} from "../form"

import {
    getAvailablePickupTimes,
    getTodayDateString,
    isPickupDateAllowed,
    isRushDate,
    isDateAtCapacity
} from "../pickupAvailability"

import { getConfirmedOrderCountForDate } from "../availabilityService"

import { createCustomOrderRequest } from "../service"
import { formatTime } from "../utils"

export default function CustomOrderForm() {
    const [formData, setFormData] = useState<CustomOrderFormData>(
        initialCustomOrderFormData
    )

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [confirmedOrderCount, setConfirmedOrderCount] = useState(0)
    const [isCheckingCapacity, setIsCheckingCapacity] = useState(false)
    const [pickupDateError, setPickupDateError] = useState<string | null>(null)

    const availablePickupTimes = useMemo(
        () => getAvailablePickupTimes(formData.pickupDate),
        [formData.pickupDate]
    )

    const showRushNotice = isRushDate(formData.pickupDate)
    const isSelectedDateFull = isDateAtCapacity(confirmedOrderCount)

    useEffect(() => {
        async function checkCapacity() {
            if (!formData.pickupDate || !isPickupDateAllowed(formData.pickupDate)) {
                setConfirmedOrderCount(0)
                return
            }

            try {
                setIsCheckingCapacity(true)
                const count = await getConfirmedOrderCountForDate(formData.pickupDate)
                setConfirmedOrderCount(count)
            } catch (err) {
                console.error("Failed to check pickup date capacity:", err)
                setConfirmedOrderCount(0)
            } finally {
                setIsCheckingCapacity(false)
            }
        }

        checkCapacity()
    }, [formData.pickupDate])

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        const { id, value } = e.target

        if (id === "pickupDate") {
            setFormData((prev) => {
                if (!value) {
                    setPickupDateError(null)
                    return {
                        ...prev,
                        pickupDate: "",
                        pickupTime: "",
                    }
                }

                if (!isPickupDateAllowed(value)) {
                    setPickupDateError(
                        "That pickup date is not available. Please choose a future operating day."
                    )
                    return {
                        ...prev,
                        pickupDate: "",
                        pickupTime: "",
                    }
                }

                setPickupDateError(null)

                return {
                    ...prev,
                    pickupDate: value,
                    pickupTime: "",
                }
            })

            return
        }

        if (id === "flowerColors" && e.target instanceof HTMLInputElement) {
            const { checked } = e.target

            setFormData((prev) => ({
                ...prev,
                flowerColors: checked
                    ? [...prev.flowerColors, value]
                    : prev.flowerColors.filter((color) => color !== value),
            }))

            return
        }

        if (id === "flowerTypes" && e.target instanceof HTMLInputElement) {
            const { checked } = e.target

            setFormData((prev) => ({
                ...prev,
                flowerTypes: checked
                    ? [...prev.flowerTypes, value]
                    : prev.flowerTypes.filter((type) => type !== value),
            }))

            return
        }

        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }))
    }

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()

        if (
            !formData.occasion ||
            !formData.pickupDate ||
            !formData.customerName ||
            !formData.customerPhone ||
            !formData.customerEmail
        ) {
            setError("Please fill in the required fields before submitting.")
            return
        }

        if (!isPickupDateAllowed(formData.pickupDate)) {
            setError("Please choose a valid pickup date based on current availability.")
            return
        }

        if (formData.pickupTime && !availablePickupTimes.includes(formData.pickupTime)) {
            setError("Please choose a valid pickup time for the selected date.")
            return
        }

        if (isSelectedDateFull) {
            setError("That pickup date is fully booked. Please choose another date.")
            return
        }

        try {
            console.log("submit started")
            setError(null)
            setPickupDateError(null)
            setIsSubmitting(true)

            console.log("about to create request")
            const id = await createCustomOrderRequest(formData)
            console.log("request created:", id)

            setIsSubmitted(true)
            setFormData(initialCustomOrderFormData)
        } catch (err) {
            console.error("Failed to submit custom order request:", err)
            setError("Something went wrong while submitting your request. Please try again.")
        } finally {
            console.log("submit finished")
            setIsSubmitting(false)
        }
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
        <>
            <p className="text-sm text-neutral-500">
                Fields marked with <span className="text-rose-500">*</span> are required.
            </p>

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="grid gap-6 rounded-2xl border border-rose-100 bg-white p-6 shadow-sm md:grid-cols-2"
            >
                <div className="space-y-2">
                    <label htmlFor="occasion" className="text-sm font-medium">
                        Occasion <span className="text-rose-500">*</span>
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
                        Pickup Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                        id="pickupDate"
                        type="date"
                        min={getTodayDateString()}
                        className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
                        value={formData.pickupDate}
                        onChange={handleChange}
                    />

                    {pickupDateError && (
                        <p className="text-sm text-red-600">
                            {pickupDateError}
                        </p>
                    )}

                    {showRushNotice && isPickupDateAllowed(formData.pickupDate) && (
                        <p className="text-sm text-amber-600">
                            This is a rush request. Orders within the next 3 days may cost more and will need confirmation.
                        </p>
                    )}
                    {formData.pickupDate && isCheckingCapacity && (
                        <p className="text-sm text-neutral-500">
                            Checking pickup availability...
                        </p>
                    )}

                    {formData.pickupDate &&
                        !isCheckingCapacity &&
                        isPickupDateAllowed(formData.pickupDate) &&
                        isSelectedDateFull && (
                            <p className="text-sm text-red-600">
                                That date is fully booked. Please choose another pickup date.
                            </p>
                        )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="pickupTime" className="text-sm font-medium">
                        Preferred Pickup Time
                    </label>
                    <select
                        id="pickupTime"
                        value={formData.pickupTime}
                        onChange={handleChange}
                        disabled={
                            !formData.pickupDate ||
                            availablePickupTimes.length === 0 ||
                            isSelectedDateFull ||
                            isCheckingCapacity
                        }
                        className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400 disabled:opacity-60"
                    >
                        <option value="">Select a pickup time</option>
                        {availablePickupTimes.map((time) => (
                            <option key={time} value={time}>
                                {formatTime(time)}
                            </option>
                        ))}
                    </select>

                    {formData.pickupDate &&
                        !isCheckingCapacity &&
                        !isSelectedDateFull &&
                        availablePickupTimes.length === 0 && (
                            <p className="text-sm text-red-600">
                                No pickup times are available for the selected date.
                            </p>
                        )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="budget" className="text-sm font-medium">
                        Budget
                    </label>
                    <select
                        id="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
                    >
                        <option value="">Select a budget range</option>
                        <option value="under-50">Under $50</option>
                        <option value="50-100">$50 – $100</option>
                        <option value="100-150">$100 – $150</option>
                        <option value="150-250">$150 – $250</option>
                        <option value="250-plus">$250+</option>
                    </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Preferred Flower Types</label>

                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                        {[
                            "Roses",
                            "Tulips",
                            "Lilies",
                            "Sunflowers",
                            "Orchids",
                            "Carnations",
                            "Daisies",
                            "Mixed Bouquet",
                            "Designer’s Choice",
                        ].map((type) => (
                            <label
                                key={type}
                                className="flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm"
                            >
                                <input
                                    type="checkbox"
                                    id="flowerTypes"
                                    value={type}
                                    checked={formData.flowerTypes.includes(type)}
                                    onChange={handleChange}
                                    className="h-4 w-4"
                                />
                                <span>{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Preferred Colors</label>

                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                        {[
                            "Red",
                            "Pink",
                            "White",
                            "Yellow",
                            "Orange",
                            "Purple",
                            "Blue",
                            "Pastel",
                            "Neutral",
                        ].map((color) => (
                            <label
                                key={color}
                                className="flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm"
                            >
                                <input
                                    type="checkbox"
                                    id="flowerColors"
                                    value={color}
                                    checked={formData.flowerColors.includes(color)}
                                    onChange={handleChange}
                                    className="h-4 w-4"
                                />
                                <span>{color}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="wrappingStyle" className="text-sm font-medium">
                        Wrapping Style
                    </label>
                    <select
                        id="wrappingStyle"
                        value={formData.wrappingStyle}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
                    >
                        <option value="">Select a wrapping style</option>
                        <option value="classic">Classic</option>
                        <option value="elegant">Elegant</option>
                        <option value="modern">Modern</option>
                        <option value="rustic">Rustic</option>
                        <option value="luxury">Luxury</option>
                        <option value="designer-choice">Designer’s Choice</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="quantity" className="text-sm font-medium">
                        Bouquet Size
                    </label>
                    <select
                        id="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
                    >
                        <option value="">Select a bouquet size</option>
                        <option value="24-stems">24 stems</option>
                        <option value="36-stems">36 stems</option>
                        <option value="custom">Custom</option>
                    </select>
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
                        Your Name <span className="text-rose-500">*</span>
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
                        Phone Number <span className="text-rose-500">*</span>
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
                        Email Address <span className="text-rose-500">*</span>
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
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center rounded-xl bg-rose-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-600 disabled:opacity-60"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                    </button>
                </div>
            </form>
        </>
    )
}