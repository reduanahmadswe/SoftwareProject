import express, { Application, Request, Response, NextFunction } from 'express'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import registerRoutes from './routes/register.route'
import adminRoutes from './routes/admin.route'

// Load environment variables
dotenv.config()

console.log('EMAIL_HOST:', process.env.EMAIL_HOST);

const app: Application = express()
const PORT = process.env.PORT || 4000

// Trust proxy - required for Render and other reverse proxies
app.set('trust proxy', 1)

// Middleware
app.use(helmet()) // Security headers
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/register', registerRoutes)
app.use('/api/admin', adminRoutes)

// Health check
app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' })
})

// 404 Handler
// Serve frontend static files and enable SPA fallback for client-side routes
// This ensures reloads like /thank-you return index.html instead of 404.
const clientBuildPath = path.join(__dirname, '..', '..', 'frontend', 'dist')
app.use(express.static(clientBuildPath))

// If the request doesn't start with /api, serve index.html (SPA fallback)
app.get('*', (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api')) return next()

    const indexHtml = path.join(clientBuildPath, 'index.html')
    res.sendFile(indexHtml, (err) => {
        if (err) {
            // If index.html not found, fall back to JSON 404
            res.status(404).json({ success: false, message: 'Route not found' })
        }
    })
})

// Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error:', err.message)
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    })
})

// Database Connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.DATABASE_URL || 'mongodb://localhost:27017/git-github-workshop'
        await mongoose.connect(mongoURI)
        console.log('✅ MongoDB connected successfully')
    } catch (error) {
        console.error('❌ MongoDB connection error:', error)
        process.exit(1)
    }
}

// Start Server
const startServer = async () => {
    await connectDB()

    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`)
        console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
    })
}

startServer()

export default app
