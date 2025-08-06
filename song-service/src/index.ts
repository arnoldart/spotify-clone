import express from "express"
import dotenv from "dotenv"
import songRoutes from "./route.js";
import redis from "redis";

dotenv.config()

export const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379')
    }
});

// Handle Redis connection errors
redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
    console.log('Redis Client Connected');
});

redisClient.on('ready', () => {
    console.log('Redis Client Ready');
});

// Connect to Redis
const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Redis client connected successfully");
    } catch (err) {
        console.error("Failed to connect to Redis:", err);
        // Don't exit the process, just log the error
        console.log("Server will continue without Redis caching");
    }
};

connectRedis();

const app = express()

app.use(express.json())

const PORT = process.env.PORT 

app.use("/api/v1", songRoutes)

const server = app.listen(PORT, () => {
    console.log(`Song Service running on port ${PORT}`)
})

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    
    server.close(() => {
        console.log('HTTP server closed');
    });
    
    try {
        if (redisClient.isOpen) {
            await redisClient.quit();
            console.log('Redis connection closed');
        }
    } catch (err) {
        console.error('Error closing Redis connection:', err);
    }
    
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully');
    
    server.close(() => {
        console.log('HTTP server closed');
    });
    
    try {
        if (redisClient.isOpen) {
            await redisClient.quit();
            console.log('Redis connection closed');
        }
    } catch (err) {
        console.error('Error closing Redis connection:', err);
    }
    
    process.exit(0);
});

export default app