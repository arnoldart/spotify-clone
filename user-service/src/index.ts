import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from "./route"

dotenv.config()

const connectDb = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI as string, {
            dbName: "Spotify"
        })

        console.log("MonggoDB is Connected")
    } catch (error) {
        console.log(error)
    }
}

const app = express()

const port = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.send("Server is Working")
})

app.use(express.json())
app.use("/api/v1", userRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDb()
})