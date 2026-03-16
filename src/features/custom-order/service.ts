import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../../lib/firebase"
import type { CustomOrderFormData } from "./form"

export async function createCustomOrderRequest(
  formData: CustomOrderFormData
) {
  console.log("service hit", formData)

  const docRef = await addDoc(collection(db, "customOrderRequests"), {
    ...formData,
    status: "new",
    createdAt: serverTimestamp(),
  })

  console.log("doc created with id", docRef.id)
  return docRef.id
}