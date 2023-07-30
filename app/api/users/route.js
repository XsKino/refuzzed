import { NextResponse } from "next/server"
import { getFirestore, collection, setDoc, doc, getDoc } from "firebase/firestore"
import firebase from "lib/firebase"

const db = getFirestore(firebase)
const users = collection(db, "users")

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const publicKey = searchParams.get("publicKey")

  const userDocRef = doc(users, publicKey)

  try {
    const userDocSnap = await getDoc(userDocRef)

    if (userDocSnap.exists()) {
      return NextResponse.json({ userExists: true, user: userDocSnap.data() })
    } else {
      return NextResponse.json({ userExists: false })
    }
  } catch (e) {
    console.log(e)
    return NextResponse.error(e)
  }
}

export async function POST(request) {
  const data = await request.json()
  const { publicKey, username, lootbox } = data

  const userDocRef = doc(users, publicKey)

  try {
    const userDocSnap = await getDoc(userDocRef)

    let lootBoxesArray = userDocSnap.data().lootBoxes ? userDocSnap.data().lootBoxes : []
    let lootBoxToAdd = lootBoxesArray.find(myLoot => myLoot.name === lootbox.id)
    if (lootBoxToAdd) {
      lootBoxToAdd.amount += lootbox.amount
    } else {
      lootBoxToAdd = lootbox
    }
    lootBoxesArray.filter(myLoot => myLoot.name !== lootbox.name)
    lootBoxesArray.push(lootBoxToAdd)

    if (userDocSnap.exists()) {
      return NextResponse.json({
        userExists: true,
        user: userDocSnap.data(),
        lootBoxes: lootBoxesArray,
      })
    } else {
      const newUser = await setDoc(userDocRef, { username })
      return NextResponse.json({ userExists: false, user: newUser })
    }
  } catch (e) {
    console.log(e)
    return NextResponse.error(e)
  }
}
