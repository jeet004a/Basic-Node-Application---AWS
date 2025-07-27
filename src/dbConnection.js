import mongoose from 'mongoose'
import { config } from 'dotenv'
config()
const DB_URL = process.env.DB_URL

export const dbConnection = async() => {
    try {
        await mongoose.connect(DB_URL)
        console.log('Db Connected successfully')
    } catch (error) {
        console.log('Error from db connection', error)
    }
}