import cookie from 'cookie'
import jwt from 'jsonwebtoken'

interface Cookie {
    id: string,
    roles: string,
    iat: number
}

export function getUserId(headers: any) {
    const cookies = cookie.parse(headers.cookie || '')
    const token = cookies.authLogin

    if (!token) return undefined

    const decoded = jwt.decode(token) as Cookie
    return decoded.id
}