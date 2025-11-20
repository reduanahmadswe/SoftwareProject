import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Download,
    LogOut,
    Trash2,
    RefreshCw,
    UserPlus,
    MailCheck,
    MailWarning
} from 'lucide-react'
import { api } from '../api/client'

interface Registration {
    _id: string
    name: string
    universityId: string
    whatsapp: string
    batch: string
    github: string
    emailSent: boolean
    createdAt: string
}



const AdminDashboard = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([])
    // Removed unused stats state
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    // Removed isExporting as it is unused
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            navigate('/admin/login')
            return
        }
        fetchData()
    }, [page, navigate])

    const fetchData = async () => {
        try {
            setLoading(true)
            const regsResponse = await api.getRegistrations(page, 50)

            setRegistrations(regsResponse.data.data)
            setTotalPages(regsResponse.data.pagination.pages)
            // Fix: statsResponse.data.data may not exist, use statsResponse.data or remove if not needed
            // Removed statsResponse.data usage as it is not a valid property
        } catch (error: any) {
            if (error.response?.status === 401) {
                localStorage.removeItem('adminToken')
                navigate('/admin/login')
            }
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleExport = async () => {
        // TODO: Implement CSV export logic here
    }

    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const handleDelete = async (id: string) => {
        setDeleteId(id)
        setShowDeleteModal(true)
    }

    const confirmDelete = async () => {
        if (!deleteId) return
        try {
            await api.deleteRegistration(deleteId)
            setShowDeleteModal(false)
            setDeleteId(null)
            fetchData()
        } catch (error) {
            console.error('Delete failed:', error)
            setShowDeleteModal(false)
            setDeleteId(null)
            alert('Failed to delete registration')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen w-full relative flex items-center justify-center">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
                    }}
                />
                <div className="relative z-10 text-white text-xl">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full relative bg-[#010133]">
            {/* Azure Depths Background */}
            <div
                className="absolute inset-0 z-0 h-full min-h-screen"
                style={{
                    background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
                }}
            />

            <div className="relative z-10 min-h-screen">
                {/* Header */}
                <header className="bg-white/10 backdrop-blur-md border-b border-white/10">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={fetchData}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Refresh
                                </button>
                                <button
                                    onClick={handleExport}
                                    // removed isExporting
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
                                >
                                    <Download className="w-4 h-4" />
                                    Export CSV
                                </button>
                                <button
                                    // onClick={handleLogout} (removed, not defined)
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center border border-white/20">
                            <UserPlus className="w-8 h-8 text-blue-300 mb-2" />
                            <div className="text-2xl font-bold text-white">{registrations.length}</div>
                            <div className="text-blue-100 text-sm">Total Registrations</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center border border-white/20">
                            <MailCheck className="w-8 h-8 text-green-300 mb-2" />
                            <div className="text-2xl font-bold text-white">{registrations.filter(r => r.emailSent).length}</div>
                            <div className="text-blue-100 text-sm">Emails Sent</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center border border-white/20">
                            <MailWarning className="w-8 h-8 text-yellow-300 mb-2" />
                            <div className="text-2xl font-bold text-white">{registrations.filter(r => !r.emailSent).length}</div>
                            <div className="text-blue-100 text-sm">Emails Pending</div>
                        </div>
                    </div>

                    {/* Registrations Table */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-x-auto">
                        <div className="px-2 sm:px-6 py-4 border-b border-white/10">
                            <h2 className="text-xl font-bold text-white">All Registrations</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px] text-sm">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Name</th>
                                        <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">University ID</th>
                                        <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">WhatsApp</th>
                                        <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Batch</th>
                                        <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">GitHub</th>
                                        <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Email Status</th>
                                        <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Registered</th>
                                        <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {registrations.map((reg) => (
                                        <tr key={reg._id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-white break-all max-w-[160px]">{reg.name}</td>
                                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-blue-100 break-all max-w-[120px]">{reg.universityId}</td>
                                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-blue-100 break-all max-w-[120px]">{reg.whatsapp}</td>
                                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-blue-100 break-all max-w-[80px]">{reg.batch}</td>
                                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-blue-100 break-all max-w-[160px]">
                                                <a
                                                    href={reg.github.startsWith('http') ? reg.github : `https://github.com/${reg.github}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-300 hover:text-blue-200 underline"
                                                >
                                                    {reg.github.replace('https://github.com/', '')}
                                                </a>
                                            </td>
                                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${reg.emailSent
                                                        ? 'bg-green-500/20 text-green-300'
                                                        : 'bg-yellow-500/20 text-yellow-300'
                                                        }`}
                                                >
                                                    {reg.emailSent ? 'Sent' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-blue-100">
                                                {new Date(reg.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm">
                                                <button
                                                    onClick={() => handleDelete(reg._id)}
                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                    title="Delete registration"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                {/* Delete Confirmation Modal */}
                                                {showDeleteModal && (
                                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                                                        <div className="bg-[#181f32] rounded-2xl shadow-xl p-8 max-w-sm w-full border border-[#232b45]">
                                                            <h3 className="text-xl font-bold text-white mb-4">Delete Registration</h3>
                                                            <p className="text-blue-100 mb-6">Are you sure you want to delete this registration?</p>
                                                            <div className="flex justify-end gap-3">
                                                                <button
                                                                    onClick={() => { setShowDeleteModal(false); setDeleteId(null); }}
                                                                    className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition-colors"
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    onClick={confirmDelete}
                                                                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition-colors font-semibold"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <span className="text-blue-100">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
