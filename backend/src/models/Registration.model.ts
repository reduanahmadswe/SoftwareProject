import mongoose, { Schema, Document } from 'mongoose'

export interface IRegistration extends Document {
    name: string
    universityId: string
    whatsapp: string
    batch: string
    github: string
    email: string
    emailSent: boolean
    createdAt: Date
}

const RegistrationSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    universityId: {
        type: String,
        required: [true, 'University ID is required'],
        trim: true,
        unique: true,
        maxlength: [50, 'University ID cannot exceed 50 characters'],
    },
    whatsapp: {
        type: String,
        required: [true, 'WhatsApp number is required'],
        trim: true,
        maxlength: [20, 'Phone number cannot exceed 20 characters'],
    },
    batch: {
        type: String,
        required: [true, 'Batch is required'],
        trim: true,
        maxlength: [50, 'Batch cannot exceed 50 characters'],
    },
    github: {
        type: String,
        required: [true, 'GitHub account is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        maxlength: [100, 'Email cannot exceed 100 characters'],
    },
    emailSent: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

// Index for faster queries
// `unique: true` is already set on `universityId` above, so avoid declaring the same index twice.
// Keep the createdAt index for sorting queries.
RegistrationSchema.index({ createdAt: -1 })

export default mongoose.model<IRegistration>('Registration', RegistrationSchema)
