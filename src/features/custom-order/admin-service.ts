import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../lib/firebase"

export async function updateCustomOrderStatus(
  requestId: string,
  status: "new" | "confirmed" | "ready" | "completed"
) {
  const requestRef = doc(db, "customOrderRequests", requestId)

  await updateDoc(requestRef, {
    status,
  })
}