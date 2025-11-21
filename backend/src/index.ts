import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import registerRoutes from './routes/register.route'
import adminRoutes from './routes/admin.route'

// Load environment variables
dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 4000

// Trust proxy - configured for Vercel specifically
app.set('trust proxy', 1)

// Middleware
app.use(helmet()) // Security headers
app.use(cors({
    origin: [
        process.env.FRONTEND_URL || 'https://gitgithubwordshop.vercel.app/',
        /\.vercel\.app$/,
        /\.netlify\.app$/,
        'https://localhost:5173'
    ],
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/register', registerRoutes)
app.use('/api/admin', adminRoutes)

// Root endpoint - API documentation
app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Git & GitHub Workshop Backend API',
        version: '1.0.0',
        endpoints: {
            'GET /health': 'Health check endpoint',
            'POST /api/register': 'Register for the workshop',
            'POST /api/admin/login': 'Admin authentication',
            'GET /api/admin/registrations': 'Get all registrations (admin only)',
            'GET /api/admin/stats': 'Get registration statistics (admin only)',
            'GET /api/admin/export': 'Export registrations as CSV (admin only)'
        },
        documentation: 'https://github.com/reduanahmadswe/SoftwareProject'
    })
})

// Health check
app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' })
})

// 404 Handler for API routes only (since frontend is hosted separately)
app.get('*', (_req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'API route not found',
        availableRoutes: ['/api/register', '/api/admin', '/health']
    })
})// Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error:', err.message)
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    })
})

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

// For Vercel serverless functions
export default async (req: Request, res: Response) => {
    await connectDB()
    return app(req, res)
}

// For local development
if (process.env.NODE_ENV !== 'production') {
    const startServer = async () => {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`)
            console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
        })
    }

    startServer()
}
