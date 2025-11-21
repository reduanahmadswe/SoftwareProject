// Utility to reduce console noise in production
export const logger = {
    info: (message: string, ...args: any[]) => {
        if (import.meta.env.DEV) {
            console.log(`[INFO] ${message}`, ...args)
        }
    },

    warn: (message: string, ...args: any[]) => {
        if (import.meta.env.DEV) {
            console.warn(`[WARN] ${message}`, ...args)
        }
    },

    error: (message: string, ...args: any[]) => {
        console.error(`[ERROR] ${message}`, ...args)
    },

    debug: (message: string, ...args: any[]) => {
        if (import.meta.env.DEV) {
            console.debug(`[DEBUG] ${message}`, ...args)
        }
    }
}

// Suppress specific warnings that are not critical
const suppressWarnings = () => {
    const originalWarn = console.warn
    const originalError = console.error

    console.warn = (...args: any[]) => {
        const message = args[0]?.toString() || ''

        // Filter out known non-critical warnings
        if (
            message.includes('Grammarly') ||
            message.includes('extension') ||
            message.includes('Permissions policy violation') ||
            message.includes('ERR_BLOCKED_BY_CLIENT') ||
            message.includes('X-Frame-Options may only be set via an HTTP header') ||
            message.includes('doubleclick.net') ||
            message.includes('googleads') ||
            message.includes('www-embed-player')
        ) {
            return // Suppress these warnings
        }

        originalWarn.apply(console, args)
    }

    console.error = (...args: any[]) => {
        const message = args[0]?.toString() || ''

        // Filter out extension and ad-blocker errors
        if (
            message.includes('ERR_BLOCKED_BY_CLIENT') ||
            message.includes('doubleclick.net') ||
            message.includes('googleads') ||
            message.includes('Failed to load resource') && message.includes('ERR_BLOCKED_BY_CLIENT')
        ) {
            return // Suppress these errors
        }

        originalError.apply(console, args)
    }
}

// Apply suppression in production
if (!import.meta.env.DEV) {
    suppressWarnings()
}