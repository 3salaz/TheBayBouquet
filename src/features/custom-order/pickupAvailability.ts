export type PickupAvailabilityConfig = {
  operatingDays: number[]
  closedDates: string[]
  hoursByDay: Record<number, string[]>
  rushDaysThreshold: number
  maxConfirmedOrdersPerDay: number
}

export const pickupAvailabilityConfig: PickupAvailabilityConfig = {
  operatingDays: [2, 3, 4, 5, 6], // Tuesday-Saturday
  closedDates: [],
  hoursByDay: {
    2: ["10:00", "11:00", "12:00", "13:00", "14:00"],
    3: ["10:00", "11:00", "12:00", "13:00", "14:00"],
    4: ["10:00", "11:00", "12:00", "13:00", "14:00"],
    5: ["10:00", "11:00", "12:00", "13:00", "14:00"],
    6: ["10:00", "11:00", "12:00", "13:00", "14:00"],
  },
  rushDaysThreshold: 3,
  maxConfirmedOrdersPerDay: 4,
}

function toLocalDateString(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function getTodayDateString() {
  return toLocalDateString(new Date())
}

export function isFutureOrToday(dateString: string) {
  if (!dateString) return false
  return dateString >= getTodayDateString()
}

export function isClosedDate(dateString: string) {
  return pickupAvailabilityConfig.closedDates.includes(dateString)
}

export function isAllowedOperatingDay(dateString: string) {
  if (!dateString) return false

  const date = new Date(`${dateString}T00:00:00`)
  const dayOfWeek = date.getDay()

  return pickupAvailabilityConfig.operatingDays.includes(dayOfWeek)
}

export function isPickupDateAllowed(dateString: string) {
  return (
    isFutureOrToday(dateString) &&
    isAllowedOperatingDay(dateString) &&
    !isClosedDate(dateString)
  )
}

export function isRushDate(dateString: string) {
  if (!dateString) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const selectedDate = new Date(`${dateString}T00:00:00`)
  const diffMs = selectedDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  return diffDays >= 0 && diffDays <= pickupAvailabilityConfig.rushDaysThreshold
}

export function getAvailablePickupTimes(dateString: string) {
  if (!isPickupDateAllowed(dateString)) return []

  const date = new Date(`${dateString}T00:00:00`)
  const dayOfWeek = date.getDay()

  return pickupAvailabilityConfig.hoursByDay[dayOfWeek] ?? []
}