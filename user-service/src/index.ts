import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from "./route"
import cors from 'cors'
import type { VercelRequest, VercelResponse } from '@vercel/node'

dotenv.config()

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            dbName: "Spotify"
        })

        console.log("✅ MongoDB is Connected")
        console.log(`📍 Database Host: ${mongoose.connection.host}`)
        console.log(`🗄️  Database Name: ${mongoose.connection.name}`)
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error)
        throw error
    }
}

const app = express()

const port = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.send("Server is Working")
})

app.get("/health", (req, res) => {
    const dbStatus = mongoose.connection.readyState
    let dbStatusText = "disconnected"
    
    switch (dbStatus) {
        case 0:
            dbStatusText = "disconnected"
            break
        case 1:
            dbStatusText = "connected"
            break
        case 2:
            dbStatusText = "connecting"
            break
        case 3:
            dbStatusText = "disconnecting"
            break
    }
    
    res.json({
        status: "OK",
        service: "user-service",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        database: {
            status: dbStatusText,
            readyState: dbStatus,
            host: mongoose.connection.host || "not connected",
            name: mongoose.connection.name || "not connected"
        },
        endpoints: {
            register: "POST /api/v1/user/register",
            login: "POST /api/v1/user/login", 
            profile: "GET /api/v1/user/me"
        }
    })
})

app.use(express.json())
app.use(cors())
app.use("/api/v1", userRoutes)

app.listen(port, async () => {
    console.log(`🚀 Server is running on port ${port}`)
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`)
    
    try {
        await connectDb()
        console.log("🎉 User Service is ready!")
    } catch (error) {
        console.error("💥 Failed to connect to database:", error)
        console.log("⚠️  Service will continue but database operations will fail")
    }
})

// Export untuk Vercel (production)
export default async (req: VercelRequest, res: VercelResponse) => {
    // Connect database untuk setiap request di serverless environment
    try {
        await connectDb()
    } catch (error) {
        console.error("Database connection failed:", error)
    }
    
    // Handle request dengan Express app
    return app(req, res)
}