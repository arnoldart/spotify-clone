import dotenv from "dotenv"
dotenv.config()

import express from "express"
import { sql } from "./config/db.js"
import adminRoutes from "./route.js"
import cloudinary from "cloudinary"
import redis from "redis"
import cors from "cors"

export const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379')
    }
})

// Handle Redis connection errors
redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err)
})

redisClient.on('connect', () => {
    console.log('Redis Client Connected')
})

redisClient.on('ready', () => {
    console.log('Redis Client Ready')
})

// Connect to Redis
const connectRedis = async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect()
            console.log("Redis client connected successfully")
        }
    } catch (err) {
        console.error("Failed to connect to Redis:", err)
        console.log("Server will continue without Redis caching")
    }
}

cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_API_Key,
    api_secret: process.env.Cloud_API_Secret
})

const app = express()

app.use(cors())
app.use(express.json())

async function initDB() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS albums(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `

        await sql`
        CREATE TABLE IF NOT EXISTS songs(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255),
            audio VARCHAR(255) NOT NULL,
            album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `

        console.log("Initialize database is successful")
    } catch (error) {
        console.error("Error InitDB", error)
    }
}

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Admin Service"
    })
})

app.use("/api/v1/", adminRoutes)

// Initialize connections
let initialized = false

const initialize = async () => {
    if (!initialized) {
        await connectRedis()
        await initDB()
        initialized = true
    }
}

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 7000
    initialize().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
}

// For Vercel serverless
export default async (req: any, res: any) => {
    await initialize()
    return app(req, res)
}