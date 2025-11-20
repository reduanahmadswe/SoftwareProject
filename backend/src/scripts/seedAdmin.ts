import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Admin from '../models/Admin.model'

dotenv.config()

const seedAdmin = async () => {
    try {
        // Connect to MongoDB
        const mongoURI = process.env.DATABASE_URL || 'mongodb://localhost:27017/git-github-workshop'
        await mongoose.connect(mongoURI)
        console.log('✅ MongoDB connected successfully')

        // Check if admin already exists
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
        const existingAdmin = await Admin.findOne({ email: adminEmail })

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists')
            console.log(`   Email: ${existingAdmin.email}`)
            process.exit(0)
        }

        // Create admin user
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
        const admin = new Admin({
            email: adminEmail,
            password: adminPassword,
            name: 'Administrator',
            role: 'admin',
        })

        await admin.save()

        console.log('✅ Admin user created successfully!')
        console.log(`   Email: ${admin.email}`)
        console.log(`   Password: ${adminPassword}`)
        console.log('\n⚠️  Please change the default password after first login!')

        process.exit(0)
    } catch (error) {
        console.error('❌ Error seeding admin:', error)
        process.exit(1)
    }
}

seedAdmin()
