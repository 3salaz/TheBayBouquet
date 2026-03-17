export function formatTime(time: string) {
  const [hourStr, minute] = time.split(":")
  const hour = Number(hourStr)

  const suffix = hour >= 12 ? "PM" : "AM"
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12

  return `${formattedHour}:${minute} ${suffix}`
}