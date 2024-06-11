import 'dotenv/config'

import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'

// interface Payload {
//     id: string
//     roles: string
//     iat: number
// }

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'] as string
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).json({ messageError: 'Unauthorized' })

    try {
        const secret = process.env.SECRET as Secret
        jwt.verify(token, secret)
        next()

    } catch (error) {
        return res.status(401).json({ messageError: 'Invalid token!' })
    }
}

export function isProducer(req: Request, res:Response ,next:NextFunction) {
    const authHeader = req.headers['authorization'] as string

    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ messageError: 'Unauthorized' })

    const decodedToken = jwt.decode(token) as JwtPayload
    if (decodedToken.roles !== 'PRODUCER') return res.status(401).json({ messageError: 'Unauthorized, you must to be a PRODUCER' })

    next()
}

/*
user produtor: 
matheus@gmail.com
123456

user cliente:
lucas@gmail.com
654321


*/