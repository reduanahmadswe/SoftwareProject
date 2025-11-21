import { Router } from 'express'
import {
  getAllRegistrations,
  exportRegistrationsCSV,
  exportRegistrationsExcel,
  deleteRegistration,
  getRegistrationStats,
} from '../controllers/admin.controller'
import { authenticateAdmin, login } from '../middleware/auth.middleware'

const router = Router()

// POST /api/admin/login - Admin login
router.post('/login', login)

// Protected routes (require authentication)
// GET /api/admin/registrations - Get all registrations (paginated)
router.get('/registrations', authenticateAdmin, getAllRegistrations)

// GET /api/admin/export - Export registrations as CSV
router.get('/export', authenticateAdmin, exportRegistrationsCSV)

// GET /api/admin/export/excel - Export registrations as Excel
router.get('/export/excel', authenticateAdmin, exportRegistrationsExcel)

// GET /api/admin/stats - Get registration statistics
router.get('/stats', authenticateAdmin, getRegistrationStats)

// DELETE /api/admin/registrations/:id - Delete a registration
router.delete('/registrations/:id', authenticateAdmin, deleteRegistration)

// GET /api/admin/env-check - Check environment variables (debugging)
router.get('/env-check', (_req, res) => {
  const envCheck = {
    EMAIL_HOST: !!process.env.EMAIL_HOST,
    EMAIL_PORT: !!process.env.EMAIL_PORT,
    EMAIL_USER: !!process.env.EMAIL_USER,
    EMAIL_PASSWORD: !!process.env.EMAIL_PASSWORD,
    DATABASE_URL: !!process.env.DATABASE_URL,
    JWT_SECRET: !!process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    emailConfigured: !!(process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASSWORD)
  }

  res.json({
    success: true,
    message: 'Environment check',
    data: envCheck
  })
})

// GET /api/admin/test-email - Test email functionality
router.get('/test-email', async (_req, res) => {
  try {
    const { default: emailService } = await import('../services/email.service')

    const result = await emailService.sendConfirmationEmail(
      'Test User',
      'test@example.com'
    )

    res.json({
      success: true,
      message: 'Email test completed',
      emailSent: result
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({
      success: false,
      message: 'Email test failed',
      error: errorMessage
    })
  }
})

export default router
