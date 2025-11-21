import { Request, Response } from 'express'
import Registration from '../models/Registration.model'
import csvExporter from '../utils/csvExporter'
import excelExporter from '../utils/excelExporter'

export const getAllRegistrations = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const skip = (page - 1) * limit

        const registrations = await Registration.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const total = await Registration.countDocuments()

        res.status(200).json({
            success: true,
            data: registrations,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
                limit,
            },
        })
    } catch (error) {
        console.error('Error fetching registrations:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch registrations',
        })
    }
}

export const exportRegistrationsCSV = async (_req: Request, res: Response): Promise<void> => {
    try {
        const csvContent = await csvExporter.exportRegistrations()

        // Set headers for CSV download
        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', 'attachment; filename=registrations.csv')

        // Send CSV content directly
        res.send(csvContent)
    } catch (error) {
        console.error('Error exporting CSV:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to export CSV',
        })
    }
}

export const exportRegistrationsExcel = async (_req: Request, res: Response): Promise<void> => {
    try {
        const buffer = await excelExporter.exportRegistrations()

        // Set headers for Excel download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res.setHeader('Content-Disposition', 'attachment; filename=registrations.xlsx')

        // Send buffer directly
        res.send(buffer)
    } catch (error) {
        console.error('Error exporting Excel:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to export Excel',
        })
    }
}

export const deleteRegistration = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const registration = await Registration.findByIdAndDelete(id)

        if (!registration) {
            res.status(404).json({
                success: false,
                message: 'Registration not found',
            })
            return
        }

        res.status(200).json({
            success: true,
            message: 'Registration deleted successfully',
        })
    } catch (error) {
        console.error('Error deleting registration:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to delete registration',
        })
    }
}

export const getRegistrationStats = async (_req: Request, res: Response): Promise<void> => {
    try {
        const total = await Registration.countDocuments()
        const emailSent = await Registration.countDocuments({ emailSent: true })
        const emailPending = total - emailSent

        // Get registrations by batch
        const byBatch = await Registration.aggregate([
            {
                $group: {
                    _id: '$batch',
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { count: -1 },
            },
        ])

        // Get recent registrations
        const recentRegistrations = await Registration.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name universityId batch createdAt')

        res.status(200).json({
            success: true,
            data: {
                total,
                emailSent,
                emailPending,
                byBatch,
                recentRegistrations,
            },
        })
    } catch (error) {
        console.error('Error fetching stats:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics',
        })
    }
}
