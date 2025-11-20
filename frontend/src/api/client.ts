import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export interface RegistrationData {
  name: string
  universityId: string
  whatsapp: string
  batch: string
  github: string
  email: string
}

const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const api = {
  register: async (data: RegistrationData) => {
    const response = await axios.post(`${API_URL}/api/register`, data)
    return response.data
  },

  adminLogin: async (email: string, password: string) => {
    return await axios.post(`${API_URL}/api/admin/login`, { email, password })
  },

  getRegistrations: async (page: number = 1, limit: number = 50) => {
    return await axios.get(`${API_URL}/api/admin/registrations?page=${page}&limit=${limit}`, {
      headers: getAuthHeader(),
    })
  },

  getStats: async () => {
    return await axios.get(`${API_URL}/api/admin/stats`, {
      headers: getAuthHeader(),
    })
  },

  exportCSV: async () => {
    const response = await axios.get(`${API_URL}/api/admin/export`, {
      headers: getAuthHeader(),
      responseType: 'blob',
    })

    // Create a blob link to download
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `registrations-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  },

  deleteRegistration: async (id: string) => {
    return await axios.delete(`${API_URL}/api/admin/registrations/${id}`, {
      headers: getAuthHeader(),
    })
  },
}
