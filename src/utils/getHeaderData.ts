import cookie from 'cookie'
import jwt from 'jsonwebtoken'

interface Cookie {
    id: string,
    producerId: string | undefined,
    role: string,
    iat: number
}

export function getUserId(headers: any) {
    const cookies = cookie.parse(headers.cookie || '')
    const token = cookies.a54

    if (!token) return undefined

    const decoded = jwt.decode(token) as Cookie
    return decoded.id
}

export function getProducerId(headers: any) {
    const cookies = cookie.parse(headers.cookie || '')
    const token = cookies.a54

    if (!token) return undefined

    const decoded = jwt.decode(token) as Cookie
    console.log(decoded, 'decoded')
    return decoded.producerId
}