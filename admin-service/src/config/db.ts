import {neon} from "@neondatabase/serverless"
import dotenv from "dotenv"

dotenv.config()

export const sql = new neon(process.env.DB_URL as string)