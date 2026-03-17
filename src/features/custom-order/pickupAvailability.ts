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