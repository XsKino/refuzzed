import mongoose, { Schema } from 'mongoose'

const DrinkSchema = new Schema({
  name: String,
  description: String,
  rarity: Number
})

const LootTableSchema = new Schema({
  granted: Number,
  probability: Number,
  rarity: Number,
  rolls: Number
})

const LootBoxSchema = new Schema({
  name: String,
  price: Number,
  lootTable: [LootTableSchema]
})

const UserSchema = new Schema({
  username: String
})

export const Drink = mongoose.models.Drink || mongoose.model('Drink', DrinkSchema)
export const LootBox = mongoose.models.LootBox || mongoose.model('LootBox', LootBoxSchema)
export const User = mongoose.models.User || mongoose.model('User', UserSchema)
