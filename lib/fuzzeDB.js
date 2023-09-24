/* eslint-disable no-unused-vars */
import connectMongoDB from '@/lib/dbcon'
import { Drink, LootBox, User } from '@/models/fuzze'
import { MongoClient } from 'mongodb'

async function getDrinks() {
  const client = await MongoClient.connect(process.env.MONGODB_URI)
  const db = client.db()
  const drinks = db.collection('drinks').find().toArray()

  return drinks
}

async function getUsers() {
  const client = await MongoClient.connect(process.env.MONGODB_URI)
  const db = client.db()
  const users = db.collection('users').find().toArray()

  return users
}

async function getLootboxes() {
  const client = await MongoClient.connect(process.env.MONGODB_URI)
  const db = client.db()
  const lootboxes = db.collection('lootboxes').find().toArray()

  return lootboxes
}

const exports = {
  getDrinks,
  getUsers,
  getLootboxes
}
export default exports
