import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import registerRoutes from '../src/routes/register.route'
import adminRoutes from '../src/routes/admin.route'

// Load environment variables
dotenv.config()

const app: Application = express()

// Trust proxy - required for Vercel and other reverse proxies
app.set('trust proxy', 1)

// Middleware
app.use(helmet()) // Security headers
app.use(cors({
    origin: [
        process.env.FRONTEND_URL || 'http://localhost:5173',
        /\.vercel\.app$/,
        'https://vercel.app'
    ],
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database Connection
let isConnected = false

const connectDB = async () => {
    if (isConnected) return

    try {
        const mongoURI = process.env.DATABASE_URL || 'mongodb://localhost:27017/git-github-workshop'
        await mongoose.connect(mongoURI)
        isConnected = true
        console.log('✅ MongoDB connected successfully')
    } catch (error) {
        console.error('❌ MongoDB connection error:', error)
        throw error
    }
}

// Routes
app.use('/api/register', registerRoutes)
app.use('/api/admin', adminRoutes)

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' })
})

// Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error:', err.message)
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    })
})

// Vercel serverless function export
export default async (req: Request, res: Response) => {
    await connectDB()
    return app(req, res)
}

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4000

    const startServer = async () => {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`)
        })
    }

    startServer()
}