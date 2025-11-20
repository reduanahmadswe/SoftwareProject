import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IAdmin extends Document {
    email: string
    password: string
    name: string
    role: string
    createdAt: Date
    comparePassword(candidatePassword: string): Promise<boolean>
}

const AdminSchema: Schema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    role: {
        type: String,
        default: 'admin',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

// Hash password before saving
AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password as string, salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error as Error)
    }
})

// Compare password method
AdminSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model<IAdmin>('Admin', AdminSchema)
