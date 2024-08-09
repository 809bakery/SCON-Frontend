import axios from 'axios'
// import { cookies } from 'next/headers'

import { ROOT_API_URL } from '@/api/config/requestUrl.ts'
import { getAccessToken } from '@/utils/cookie/index.ts'

export const privateApi = axios.create({
  baseURL: ROOT_API_URL,
  headers: {
    ContentType: 'application/json',
  },
  withCredentials: true,
})

privateApi.interceptors.request.use(
  (config) => {
    const authHeader = config.headers['x-auth-not-required']
    if (authHeader) return config

    const accessToken = getAccessToken()
    if (!accessToken) return config
    config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/* refreshToken으로 accessToken재발급 ----------------------------------------- */
// async function postRefreshToken() {
//   const cookieStore = cookies()
//   // TODO: refreshToken 재발급 URL을 입력해주세요.
//   const response = await privateApi.post('accessToken-재발급-URL', {
//     refreshToken: cookieStore.get('refresh_token'),
//   })
//   return response
// }

/* RESPONSE INTERCEPTORS ---------------------------------------------------- */
privateApi.interceptors.response.use(
  // 응답 데이터가 있는 작업 수행 : STATUS CODE 2XX
  (response) => {
    return response
  },
  // 응답 오류가 있는 작업 수행 : STATUS CODE WITHOUT 2XX
  async (error) => {
    // TODO: refreshToken 재발급 로직 수행 후 에러 핸들링 로직 추가해주세요.
    return Promise.reject(error)
  },
)
