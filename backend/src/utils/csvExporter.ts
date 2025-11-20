import { createObjectCsvWriter } from 'csv-writer'
import Registration from '../models/Registration.model'
import path from 'path'
import fs from 'fs'

interface CSVRecord {
    name: string
    university_id: string
    whatsapp: string
    batch: string
    github: string
    email: string
}

class CSVExporter {
    async exportRegistrations(): Promise<string> {
        try {
            // Fetch all registrations
            const registrations = await Registration.find().sort({ createdAt: -1 })

            // Create CSV file path
            const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0]
            const fileName = `registrations-${timestamp}.csv`
            const filePath = path.join(process.cwd(), 'exports', fileName)

            // Ensure exports directory exists
            const exportsDir = path.join(process.cwd(), 'exports')
            if (!fs.existsSync(exportsDir)) {
                fs.mkdirSync(exportsDir, { recursive: true })
            }

            // Prepare CSV data
            const csvData: CSVRecord[] = registrations.map((reg: any) => ({
                name: reg.name,
                university_id: reg.universityId,
                whatsapp: reg.whatsapp,
                batch: reg.batch,
                github: reg.github,
                email: reg.email || '',
            }))

            // Create CSV writer
            const csvWriter = createObjectCsvWriter({
                path: filePath,
                header: [
                    { id: 'name', title: 'Name' },
                    { id: 'university_id', title: 'University ID' },
                    { id: 'whatsapp', title: 'WhatsApp' },
                    { id: 'batch', title: 'Batch' },
                    { id: 'github', title: 'GitHub' },
                    { id: 'email', title: 'Email' },
                ],
            })

            // Write to CSV
            await csvWriter.writeRecords(csvData)

            return filePath
        } catch (error) {
            console.error('CSV export error:', error)
            throw new Error('Failed to export CSV')
        }
    }

    async cleanupOldExports(daysOld: number = 7): Promise<void> {
        try {
            const exportsDir = path.join(process.cwd(), 'exports')
            if (!fs.existsSync(exportsDir)) return

            const files = fs.readdirSync(exportsDir)
            const now = Date.now()
            const maxAge = daysOld * 24 * 60 * 60 * 1000

            files.forEach((file: string) => {
                const filePath = path.join(exportsDir, file)
                const stats = fs.statSync(filePath)

                if (now - stats.mtimeMs > maxAge) {
                    fs.unlinkSync(filePath)
                    console.log(`Deleted old export: ${file}`)
                }
            })
        } catch (error) {
            console.error('Cleanup error:', error)
        }
    }
}

export default new CSVExporter()
