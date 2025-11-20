import { Router } from 'express'
import {
  getAllRegistrations,
  exportRegistrationsCSV,
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

// GET /api/admin/export?format=csv - Export registrations as CSV
router.get('/export', authenticateAdmin, exportRegistrationsCSV)

// GET /api/admin/stats - Get registration statistics
router.get('/stats', authenticateAdmin, getRegistrationStats)

// DELETE /api/admin/registrations/:id - Delete a registration
router.delete('/registrations/:id', authenticateAdmin, deleteRegistration)

export default router
