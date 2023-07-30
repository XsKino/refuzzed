import { NextResponse } from "next/server"
import { getFirestore, collection, setDoc, doc, getDocs } from "firebase/firestore"
import firebase from "lib/firebase"

const db = getFirestore(firebase)
const lootBoxesCollection = collection(db, "lootBoxes")

export async function GET() {
  try {
    const lootBoxesSnap = await getDocs(lootBoxesCollection)
    const lootBoxes = lootBoxesSnap.docs.map(doc => doc.data())
    return NextResponse.json({ lootBoxes })
  } catch (e) {
    console.log(e)
    return NextResponse.error(e)
  }
}
