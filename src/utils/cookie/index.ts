// eslint-disable-next-line import/no-extraneous-dependencies
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export function setToken(key: 'ACCESS_TOKEN' | 'REFRESH_TOKEN', token: string) {
  const accessExpires = new Date()
  const refreshExpires = new Date()
  accessExpires.setMinutes(accessExpires.getMinutes() + 30)
  refreshExpires.setDate(refreshExpires.getDate() + 14)

  cookies.set(key, token, {
    path: '/',
    expires: key === 'ACCESS_TOKEN' ? accessExpires : refreshExpires,
  })
}

export function removeToken(key: 'ACCESS_TOKEN' | 'REFRESH_TOKEN') {
  cookies.remove(key, { path: '/' })
}

export function removeTokenAll() {
  removeToken('ACCESS_TOKEN')
  removeToken('REFRESH_TOKEN')
}

export function getAccessToken() {
  return cookies.get('ACCESS_TOKEN')
}

export function getRefreshToken() {
  return cookies.get('REFRESH_TOKEN')
}
