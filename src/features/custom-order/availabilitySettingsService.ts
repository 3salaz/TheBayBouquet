import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../../lib/firebase"
import {
  defaultPickupAvailabilitySettings,
  type PickupAvailabilitySettings,
} from "./availabilitySettings"

const SETTINGS_DOC_ID = "pickupAvailability"

export async function getPickupAvailabilitySettings(): Promise<PickupAvailabilitySettings> {
  const ref = doc(db, "settings", SETTINGS_DOC_ID)
  const snapshot = await getDoc(ref)

  if (!snapshot.exists()) {
    await setDoc(ref, defaultPickupAvailabilitySettings)
    return defaultPickupAvailabilitySettings
  }

  return snapshot.data() as PickupAvailabilitySettings
}