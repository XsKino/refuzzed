import { NextResponse } from 'next/server'
import { getFirestore, collection, setDoc, doc, getDocs } from 'firebase/firestore'
import firebase from 'lib/firebase'

const db = getFirestore(firebase)
const drinksCollection = collection(db, 'drinks')
const usersColletions = collection(db, 'users')
const lootBoxesColletions = collection(db, 'lootBoxes')

export async function GET() {
  try {
    const drinksSnap = await getDocs(drinksCollection)
    const userSnap = await getDocs(usersColletions)
    const lootSnap = await getDocs(lootBoxesColletions)
    const drinks = drinksSnap.docs.map(doc => doc.data())
    const users = userSnap.docs.map(doc => doc.data())
    const loot = lootSnap.docs.map(doc => doc.data())
    return NextResponse.json({ drinks, users, loot })
  } catch (e) {
    console.log(e)
    return NextResponse.error(e)
  }
}
