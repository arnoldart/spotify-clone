import express from "express"
import dotenv from "dotenv"
import songRoutes from "./route.js";

dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT 

app.use("/api/v1", songRoutes)

app.listen(PORT, () => {
    console.log(`Song Service running on port ${PORT}`)
})

export default app