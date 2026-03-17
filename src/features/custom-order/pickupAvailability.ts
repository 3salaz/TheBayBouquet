import type { PickupAvailabilitySettings } from "./availabilitySettings"



export function getTodayDateString() {
  return new Date().toISOString().split("T")[0]
}

function getDayOfWeek(date: string) {
  return new Date(date).getDay() // 0 = Sunday
}

export function isPickupDateAllowed(
  date: string,
  settings: PickupAvailabilitySettings
) {
  if (!date) return false

  const today = getTodayDateString()
  if (date < today) return false

  const day = getDayOfWeek(date)

  if (!settings.operatingDays.includes(day)) return false
  if (settings.closedDates.includes(date)) return false

  return true
}

export function getAvailablePickupTimes(
  date: string,
  settings: PickupAvailabilitySettings
) {
  if (!date) return []

  const day = getDayOfWeek(date)

  return settings.hoursByDay[day] || []
}

export function isRushDate(
  date: string,
  settings: PickupAvailabilitySettings
) {
  if (!date) return false

  const today = new Date()
  const selected = new Date(date)

  const diffTime = selected.getTime() - today.getTime()
  const diffDays = diffTime / (1000 * 60 * 60 * 24)

  return diffDays <= settings.rushDaysThreshold
}

export function isDateAtCapacity(
  count: number,
  settings: PickupAvailabilitySettings
) {
  return count >= settings.maxConfirmedOrdersPerDay
}