import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.model'

export interface AuthRequest extends Request {
  user?: {
    email: string
    id: string
  }
}

export const authenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
      })
      return
    }

    const token = authHeader.substring(7)
    const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'

    const decoded = jwt.verify(token, jwtSecret) as { email: string; id: string }

      ; (req as AuthRequest).user = { email: decoded.email, id: decoded.id }

    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required',
      })
      return
    }

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() })

    if (!admin) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
      return
    }

    // Compare password
    const isPasswordValid = await admin.comparePassword(password)

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
      return
    }

    const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'
    const token = jwt.sign(
      { email: admin.email, id: admin._id },
      jwtSecret,
      { expiresIn: '24h' }
    )

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Login failed',
    })
  }
}
