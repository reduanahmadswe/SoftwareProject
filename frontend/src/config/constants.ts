export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  ENDPOINTS: {
    REGISTER: '/api/register',
    ADMIN_LOGIN: '/api/admin/login',
    ADMIN_REGISTRATIONS: '/api/admin/registrations',
    ADMIN_EXPORT: '/api/admin/export',
    ADMIN_STATS: '/api/admin/stats',
  },
}

export const APP_CONFIG = {
  DISCORD_INVITE: import.meta.env.VITE_DISCORD_INVITE || 'https://discord.gg/yourinvite',
  SITE_NAME: 'Git & GitHub Workshop',
  GITHUB_SIGNUP_URL: 'https://github.com/signup',
  GITHUB_DOCS_URL: 'https://docs.github.com',
}
