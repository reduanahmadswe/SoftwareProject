import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { registerUser } from '../controllers/register.controller'

const router = Router()

// Rate limiting: 60 requests per 10 minutes
const registerLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 60, // limit each IP to 60 requests per windowMs
  message: {
    success: false,
    message: 'Too many registration attempts. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Skip rate limiting validation warnings for Vercel
  validate: {
    trustProxy: false,
    xForwardedForHeader: false,
  },
})

// POST /api/register - Register a new user
router.post('/', registerLimiter, registerUser)

export default router
