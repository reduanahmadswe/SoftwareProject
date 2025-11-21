import { z } from 'zod'

export const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  universityId: z.string().min(3, 'University ID is required').max(50, 'University ID is too long'),
  semester: z.string().min(1, 'Semester is required'),
  batch: z.string().min(1, 'Batch is required').max(50, 'Batch name is too long'),
  email: z.string().min(1, 'Email address is required').email('Invalid email address'),
  whatsapp: z.string()
    .regex(/^[\d\s\+\-\(\)]+$/, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number is too long'),
  github: z.string()
    .min(1, 'GitHub account is required')
    .refine(
      (val) => val.includes('github.com') || !val.includes('/'),
      'Please provide a valid GitHub username or URL'
    ),
})

export type RegistrationFormData = z.infer<typeof registrationSchema>
