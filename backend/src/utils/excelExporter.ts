import ExcelJS from 'exceljs'
import Registration from '../models/Registration.model'

class ExcelExporter {
    async exportRegistrations(): Promise<Buffer> {
        try {
            const registrations = await Registration.find().sort({ createdAt: -1 })

            const workbook = new ExcelJS.Workbook()
            const worksheet = workbook.addWorksheet('Registrations')

            // Define columns
            worksheet.columns = [
                { header: 'Name', key: 'name', width: 25 },
                { header: 'University ID', key: 'universityId', width: 20 },
                { header: 'Batch', key: 'batch', width: 10 },
                { header: 'Email', key: 'email', width: 30 },
                { header: 'WhatsApp', key: 'whatsapp', width: 20 },
                { header: 'GitHub', key: 'github', width: 30 },
                { header: 'Email Sent', key: 'emailSent', width: 15 },
                { header: 'Registration Date', key: 'createdAt', width: 20 },
            ]

            // Style header row
            worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } }
            worksheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF2563EB' }
            }
            worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }

            // Add data rows
            registrations.forEach((registration) => {
                worksheet.addRow({
                    name: registration.name,
                    universityId: registration.universityId,
                    batch: registration.batch,
                    email: registration.email || '',
                    whatsapp: registration.whatsapp,
                    github: registration.github,
                    emailSent: registration.emailSent ? 'Yes' : 'No',
                    createdAt: new Date(registration.createdAt).toLocaleString(),
                })
            })

            // Add borders to all cells
            worksheet.eachRow((row: ExcelJS.Row, rowNumber: number) => {
                row.eachCell((cell: ExcelJS.Cell) => {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    }
                })

                // Alternate row colors (except header)
                if (rowNumber > 1 && rowNumber % 2 === 0) {
                    row.eachCell((cell: ExcelJS.Cell) => {
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'FFF3F4F6' }
                        }
                    })
                }
            })

            // Generate buffer instead of file
            const buffer = await workbook.xlsx.writeBuffer()

            return Buffer.from(buffer)
        } catch (error) {
            console.error('Error exporting to Excel:', error)
            throw error
        }
    }
}

export default new ExcelExporter()
