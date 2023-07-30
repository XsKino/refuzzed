import { NextResponse } from "next/server"
import { getFirestore, collection, setDoc, doc, getDocs } from "firebase/firestore"
import firebase from "lib/firebase"

const db = getFirestore(firebase)
const drinksCollection = collection(db, "drinks")

export async function GET() {
  try {
    const drinksSnap = await getDocs(drinksCollection)
    const drinks = drinksSnap.docs.map(doc => doc.data())
    return NextResponse.json({ drinks })
  } catch (e) {
    console.log(e)
    return NextResponse.error(e)
  }
}
