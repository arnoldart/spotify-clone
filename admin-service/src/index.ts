import express from "express"
import dotenv from "dotenv"
import { sql } from "./config/db.js"
import adminRoutes from "./route.js"
import cloudinary from "cloudinary"

dotenv.config()

cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_API_Key,
    api_secret: process.env.Cloud_API_Secret
})

const app = express()
app.use(express.json())
const PORT = process.env.PORT

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

        console.log("Initilize database is successfull")
    } catch (error) {
        console.error("Error InitDB", error)
    }
}

app.use("/api/v1/", adminRoutes)

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running in port ${PORT}`)
    })
})