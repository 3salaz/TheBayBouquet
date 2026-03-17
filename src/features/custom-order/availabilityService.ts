import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../lib/firebase"

type CustomOrderStatus = "new" | "confirmed" | "ready" | "completed"

type CustomOrderRequestRecord = {
  pickupDate: string
  status: CustomOrderStatus
}

export async function getConfirmedOrderCountForDate(date: string) {
  const q = query(
    collection(db, "customOrderRequests"),
    where("pickupDate", "==", date),
    where("status", "in", ["confirmed", "ready"])
  )

  const snapshot = await getDocs(q)
  return snapshot.size
}