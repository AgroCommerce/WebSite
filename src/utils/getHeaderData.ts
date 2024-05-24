import cookie from 'cookie'
import jwt from 'jsonwebtoken'

interface Cookie {
    id: string,
    producerId: string | undefined,
    roles: string,
    iat: number
}

export function getUserId(headers: any) {
    const cookies = cookie.parse(headers.cookie || '')
    const token = cookies.authLogin

    if (!token) return undefined

    const decoded = jwt.decode(token) as Cookie
    console.log(decoded, "awdaw", token)
    return decoded.id
}

export function getProducerId(headers: any) {
    const cookies = cookie.parse(headers.cookie || '')
    const token = cookies.authLogin

    if (!token) return undefined

    const decoded = jwt.decode(token) as Cookie
    return decoded.producerId
}