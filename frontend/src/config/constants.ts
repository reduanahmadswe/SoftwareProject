export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://git-github-workshop-backend.vercel.app/',
  ENDPOINTS: {
    REGISTER: '/api/register',
    ADMIN_LOGIN: '/api/admin/login',
    ADMIN_REGISTRATIONS: '/api/admin/registrations',
    ADMIN_EXPORT: '/api/admin/export',
    ADMIN_STATS: '/api/admin/stats',
  },
}

export const APP_CONFIG = {
  DISCORD_INVITE: import.meta.env.VITE_DISCORD_INVITE || 'https://discord.gg/dt2yS4ET',
  SITE_NAME: 'Git & GitHub Workshop',
  GITHUB_SIGNUP_URL: 'https://github.com/signup',
  GITHUB_DOCS_URL: 'https://docs.github.com',
}
