import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import { auth } from "../../../lib/firebase"

export async function signInAdmin(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password)
  return credential.user
}

export async function signOutAdmin() {
  await signOut(auth)
}

export function subscribeToAdminAuth(
  callback: (user: User | null) => void
) {
  return onAuthStateChanged(auth, callback)
}