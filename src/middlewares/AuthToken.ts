import 'dotenv/config'

import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken'

export const checkToken = (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers['Authorization']
    const token = authHeader && authHeader[1]

    if(!token) return res.status(401).json({ messageError: 'Unauthorized' })

    try {
        const secret = process.env.SECRET as Secret
        jwt.verify(token, secret)
        next()
        
    } catch (error) {
        return res.status(401).json({ messageError: 'Invalid token!' })
    }
}