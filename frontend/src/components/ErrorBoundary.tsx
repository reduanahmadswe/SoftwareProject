import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full text-center border border-white/20">
                        <div className="text-red-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
                        <p className="text-blue-100 mb-6">
                            We're sorry, but something unexpected happened. Please try refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                            Refresh Page
                        </button>
                        {import.meta.env.DEV && this.state.error && (
                            <details className="mt-4 text-left">
                                <summary className="text-sm text-blue-300 cursor-pointer">Error Details</summary>
                                <pre className="mt-2 text-xs text-red-300 bg-black/20 p-2 rounded overflow-auto">
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary