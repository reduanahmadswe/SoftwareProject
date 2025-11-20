import { z } from 'zod'

export const registrationValidationSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .trim(),
  universityId: z.string()
    .min(3, 'University ID is required')
    .max(50, 'University ID is too long')
    .trim(),
  whatsapp: z.string()
    .regex(/^(\+88)?01[0-9]{9}$|^01[0-9]{9}$|^[\d\s+\-()]+$/, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number is too long')
    .trim(),
  batch: z.string()
    .min(1, 'Batch is required')
    .max(50, 'Batch name is too long')
    .trim(),
  github: z.string()
    .min(1, 'GitHub account is required')
    .trim(),
  email: z.string()
    .email('Invalid email address')
    .min(3, 'Email is required')
    .max(100, 'Email is too long')
    .trim(),
})

export type RegistrationInput = z.infer<typeof registrationValidationSchema>
