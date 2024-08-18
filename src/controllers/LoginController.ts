import { Request, Response } from 'express';
import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken';
/*
{
  id: 'b6603c52-801c-4f3e-9df1-b0042019f727',
  roles: 'PRODUCER',
  iat: 1716426021
}
*/

export async function login(req: Request, res: Response) {
    const { email, password } = req.body
    1!
    try {
        let user = await prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                producer: true
            }
        })


        if (!user) return res.status(404).json({ messageError: 'Client not found' })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ messageError: 'Invalid password' })

        const secret = process.env.SECRET as jwt.Secret
        const token = jwt.sign({ id: user.id, role: user.role, producerId: user.producer?.id  }, secret)

        res.cookie("a54", token, {
            maxAge: 1209600000,
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            path: '/',
        })

        console.log(token)
        return res.status(200).send({ message: "Authentication completed successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ messageError: 'Internal Server Error' })
    }
}