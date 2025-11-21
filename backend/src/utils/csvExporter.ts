import Registration from '../models/Registration.model'

class CSVExporter {
    async exportRegistrations(): Promise<string> {
        try {
            // Fetch all registrations
            const registrations = await Registration.find().sort({ createdAt: -1 })

            // Create CSV header
            const headers = ['Name', 'University ID', 'WhatsApp', 'Batch', 'GitHub', 'Email', 'Registration Date']

            // Create CSV rows
            const rows = registrations.map((reg: any) => [
                reg.name,
                reg.universityId,
                reg.whatsapp,
                reg.batch,
                reg.github,
                reg.email || '',
                new Date(reg.createdAt).toLocaleString()
            ])

            // Combine headers and rows
            const allRows = [headers, ...rows]

            // Convert to CSV string
            const csvContent = allRows
                .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
                .join('\n')

            return csvContent
        } catch (error) {
            console.error('CSV export error:', error)
            throw new Error('Failed to export CSV')
        }
    }
}

export default new CSVExporter()
