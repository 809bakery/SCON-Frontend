import axios from 'axios'

import { ROOT_API_URL } from '@/api/config/requestUrl.ts'

export const publicApi = axios.create({
  baseURL: ROOT_API_URL,
  headers: {
    ContentType: 'application/json',
  },
  withCredentials: true,
})
