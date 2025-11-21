import { CheckCircle, X } from 'lucide-react'

interface SuccessModalProps {
    isOpen: boolean
    onClose: () => void
    name: string
}

const SuccessModal = ({ isOpen, onClose, name }: SuccessModalProps) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl shadow-2xl max-w-md w-full p-8 border border-blue-700/30">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-blue-200 hover:text-white transition-colors"
                    aria-label="Close"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Success icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-green-500/20 rounded-full p-4">
                        <CheckCircle className="w-16 h-16 text-green-400" />
                    </div>
                </div>

                {/* Content */}
                <div className="text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Registration Confirmed! 🎉</h2>

                    <p className="text-blue-100 text-lg mb-6">
                        Hi <strong>{name}</strong>, thank you for registering!
                    </p>

                    <div className="bg-blue-800/30 rounded-lg p-6 mb-6 text-left">
                        <h3 className="font-bold text-lg mb-3 text-blue-200">Next Steps:</h3>
                        <ol className="space-y-2 text-blue-100">
                            <li className="flex items-start">
                                <span className="font-bold mr-2">1.</span>
                                <span><strong>Join our Discord community</strong> - Connect with instructors and participants</span>
                            </li>
                            <li className="flex items-start">
                                <span className="font-bold mr-2">2.</span>
                                <span><strong>Set up your GitHub account</strong> - Make sure it's ready for the workshop</span>
                            </li>
                            <li className="flex items-start">
                                <span className="font-bold mr-2">3.</span>
                                <span><strong>Install Git</strong> - Download from <a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline hover:text-blue-200">git-scm.com</a></span>
                            </li>
                        </ol>
                    </div>

                    <a
                        href={import.meta.env.VITE_DISCORD_INVITE || 'https://discord.gg/dt2yS4ET'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg mb-4 transition-colors"
                    >
                        Join Discord Server
                    </a>

                    <p className="text-sm text-blue-200">
                        Check your email for more details and updates.
                    </p>

                    <button
                        onClick={onClose}
                        className="mt-6 text-blue-300 hover:text-white underline transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SuccessModal
