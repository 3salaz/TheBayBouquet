import { useEffect, useMemo, useState } from "react"
import {
  initialCustomOrderFormData,
  type CustomOrderFormData,
} from "../form"
import {
  getAvailablePickupTimes,
  getTodayDateString,
  isDateAtCapacity,
  isPickupDateAllowed,
  isRushDate,
} from "../pickupAvailability"
import { getConfirmedOrderCountForDate } from "../availabilityService"
import type { PickupAvailabilitySettings } from "../availabilitySettings"
import { getPickupAvailabilitySettings } from "../availabilitySettingsService"
import { createCustomOrderRequest } from "../service"
import { formatTime } from "../utils"
import {
  occasionOptions,
  budgetOptions,
  flowerTypeOptions,
  flowerColorOptions,
  wrappingStyleOptions,
  quantityOptions,
} from "../options"

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
  const [settings, setSettings] = useState<PickupAvailabilitySettings | null>(
    null
  )

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getPickupAvailabilitySettings()
        setSettings(data)
      } catch (err) {
        console.error("Failed to load availability settings:", err)
      }
    }

    loadSettings()
  }, [])

  if (!settings) {
    return (
      <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
        Loading availability...
      </div>
    )
  }

  const availablePickupTimes = useMemo(
    () => getAvailablePickupTimes(formData.pickupDate, settings),
    [formData.pickupDate, settings]
  )

  const showRushNotice = isRushDate(formData.pickupDate, settings)
  const isSelectedDateFull = isDateAtCapacity(confirmedOrderCount, settings)

  const isFormInvalid =
    !formData.occasion ||
    !formData.pickupDate ||
    !formData.pickupTime ||
    !formData.customerName ||
    !formData.customerPhone ||
    !formData.customerEmail ||
    isSelectedDateFull ||
    !!pickupDateError

  useEffect(() => {
    async function checkCapacity() {
      if (
        !formData.pickupDate ||
        !isPickupDateAllowed(formData.pickupDate, settings)
      ) {
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
  }, [formData.pickupDate, settings])

  function isFieldMissing(value: string) {
    return !value || value.trim() === ""
  }

  function getOptionLabel(
    options: Array<{ value: string; label: string }>,
    value: string
  ) {
    return options.find((option) => option.value === value)?.label ?? value
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { id, value } = e.target

    setError(null)

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

        if (!isPickupDateAllowed(value, settings)) {
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
      !formData.pickupTime ||
      !formData.customerName ||
      !formData.customerPhone ||
      !formData.customerEmail
    ) {
      setError("Please fill in the required fields before submitting.")
      return
    }

    if (!isPickupDateAllowed(formData.pickupDate, settings)) {
      setError("Please choose a valid pickup date based on current availability.")
      return
    }

    if (!availablePickupTimes.includes(formData.pickupTime)) {
      setError("Please choose a valid pickup time for the selected date.")
      return
    }

    if (isSelectedDateFull) {
      setError("That pickup date is fully booked. Please choose another date.")
      return
    }

    try {
      setError(null)
      setPickupDateError(null)
      setIsSubmitting(true)

      await createCustomOrderRequest(formData)

      setIsSubmitted(true)
      setFormData(initialCustomOrderFormData)
      setConfirmedOrderCount(0)
    } catch (err) {
      console.error("Failed to submit custom order request:", err)
      setError("Something went wrong while submitting your request. Please try again.")
    } finally {
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
          We&apos;ll review the details and follow up with you shortly to confirm
          the order and pickup time.
        </p>

        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false)
            setFormData(initialCustomOrderFormData)
            setConfirmedOrderCount(0)
            setPickupDateError(null)
            setError(null)
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
            <option value="">Select an occasion</option>
            {occasionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {isFieldMissing(formData.occasion) && (
            <p className="text-xs text-red-500">Occasion is required</p>
          )}
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
            <p className="text-sm text-red-600">{pickupDateError}</p>
          )}

          {!pickupDateError && isFieldMissing(formData.pickupDate) && (
            <p className="text-xs text-red-500">Pickup date is required</p>
          )}

          {showRushNotice && isPickupDateAllowed(formData.pickupDate, settings) && (
            <p className="text-sm text-amber-600">
              This is a rush request. Orders within the next 3 days may cost more
              and will need confirmation.
            </p>
          )}

          {formData.pickupDate && isCheckingCapacity && (
            <p className="text-sm text-neutral-500">
              Checking pickup availability...
            </p>
          )}

          {formData.pickupDate &&
            !isCheckingCapacity &&
            isPickupDateAllowed(formData.pickupDate, settings) &&
            isSelectedDateFull && (
              <p className="text-sm text-red-600">
                That date is fully booked. Please choose another pickup date.
              </p>
            )}
        </div>

        <div className="space-y-2">
          <label htmlFor="pickupTime" className="text-sm font-medium">
            Preferred Pickup Time <span className="text-rose-500">*</span>
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

          {isFieldMissing(formData.pickupTime) && (
            <p className="text-xs text-red-500">Pickup time is required</p>
          )}

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
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Preferred Flower Types</label>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {flowerTypeOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm"
              >
                <input
                  type="checkbox"
                  id="flowerTypes"
                  value={option.value}
                  checked={formData.flowerTypes.includes(option.value)}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Preferred Colors</label>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {flowerColorOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm"
              >
                <input
                  type="checkbox"
                  id="flowerColors"
                  value={option.value}
                  checked={formData.flowerColors.includes(option.value)}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <span>{option.label}</span>
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
            {wrappingStyleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="quantity" className="text-sm font-medium">
            Stem Count / Size
          </label>
          <select
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
          >
            <option value="">Select a bouquet size</option>
            {quantityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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
          {isFieldMissing(formData.customerName) && (
            <p className="text-xs text-red-500">Name is required</p>
          )}
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
          {isFieldMissing(formData.customerPhone) && (
            <p className="text-xs text-red-500">Phone number is required</p>
          )}
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
          {isFieldMissing(formData.customerEmail) && (
            <p className="text-xs text-red-500">Email address is required</p>
          )}
        </div>

        <div className="md:col-span-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          <h3 className="mb-2 text-sm font-semibold text-neutral-700">
            Order Summary
          </h3>

          <div className="grid gap-2 text-sm text-neutral-600">
            <p>
              <span className="font-medium">Occasion:</span>{" "}
              {formData.occasion
                ? getOptionLabel(occasionOptions, formData.occasion)
                : "—"}
            </p>

            <p>
              <span className="font-medium">Pickup:</span>{" "}
              {formData.pickupDate
                ? `${formData.pickupDate}${
                    formData.pickupTime
                      ? ` at ${formatTime(formData.pickupTime)}`
                      : ""
                  }`
                : "—"}
            </p>

            <p>
              <span className="font-medium">Budget:</span>{" "}
              {formData.budget
                ? getOptionLabel(budgetOptions, formData.budget)
                : "—"}
            </p>

            <p>
              <span className="font-medium">Flowers:</span>{" "}
              {formData.flowerTypes.length > 0
                ? formData.flowerTypes
                    .map((value) => getOptionLabel(flowerTypeOptions, value))
                    .join(", ")
                : "—"}
            </p>

            <p>
              <span className="font-medium">Colors:</span>{" "}
              {formData.flowerColors.length > 0
                ? formData.flowerColors
                    .map((value) => getOptionLabel(flowerColorOptions, value))
                    .join(", ")
                : "—"}
            </p>

            <p>
              <span className="font-medium">Style:</span>{" "}
              {formData.wrappingStyle
                ? getOptionLabel(wrappingStyleOptions, formData.wrappingStyle)
                : "—"}
            </p>

            <p>
              <span className="font-medium">Size:</span>{" "}
              {formData.quantity
                ? getOptionLabel(quantityOptions, formData.quantity)
                : "—"}
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting || isFormInvalid}
            className="inline-flex items-center justify-center rounded-xl bg-rose-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-600 disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </>
  )
}