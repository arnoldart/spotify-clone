import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT 

app.get("/", (req, res) => {
    res.json({
        message: "Song Service is running"
    })
})

app.listen(PORT, () => {
    console.log(`Song Service running on port ${PORT}`)
})

export default app