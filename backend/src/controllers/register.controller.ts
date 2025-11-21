import { Request, Response } from 'express'
import Registration from '../models/Registration.model'
import { registrationValidationSchema } from '../utils/validation'
import emailService from '../services/email.service'

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate input
        const validatedData = registrationValidationSchema.parse(req.body)

        // Check if university ID already exists
        const existingRegistration = await Registration.findOne({
            universityId: validatedData.universityId,
        })

        if (existingRegistration) {
            res.status(400).json({
                success: false,
                message: 'This University ID is already registered',
            })
            return
        }

        // Create new registration
        const registration = new Registration({
            name: validatedData.name,
            universityId: validatedData.universityId,
            whatsapp: validatedData.whatsapp,
            batch: validatedData.batch,
            github: validatedData.github,
            email: validatedData.email,
        })

        await registration.save()

        // Send confirmation email (non-blocking) only if a valid email was provided
        // In a production app, you might want to use a job queue for this
        if (registration.email) {
            emailService
                .sendConfirmationEmail(registration.name, registration.email)
                .then((emailSent) => {
                    if (emailSent) {
                        registration.emailSent = true
                        registration.save()
                    }
                })
                .catch((error) => {
                    console.error('Failed to send email:', error)
                })
        } else {
            console.warn('No email provided for registration; skipping confirmation email.')
        }

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: {
                id: registration._id,
                name: registration.name,
                universityId: registration.universityId,
            },
        })
    } catch (error: any) {
        // Validation error
        if (error.name === 'ZodError') {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error.errors,
            })
            return
        }

        // Duplicate key error
        if (error.code === 11000) {
            res.status(400).json({
                success: false,
                message: 'This University ID is already registered',
            })
            return
        }

        console.error('Registration error:', error)
        res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again later.',
        })
    }
}
