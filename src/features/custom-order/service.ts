import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../../lib/firebase"
import type { CustomOrderFormData } from "./form"

export async function createCustomOrderRequest(
    formData: CustomOrderFormData
) {
    const docRef = await addDoc(collection(db, "customOrderRequests"), {
        ...formData,
        status: "new",
        createdAt: serverTimestamp(),
    })

    return docRef.id
}