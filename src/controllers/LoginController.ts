import 'dotenv/config';

import { Request, Response } from 'express';
import { Client } from '../types/ClientType';
import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken';

export async function login(req: Request, res: Response) {
    const { email, password } = req.body as Client

    const client = await prisma.client.findFirst({
        where: {
            email,
            password
        }
    })

    if (!client) return res.status(404).json({ messageError: 'Client not found' })
    if (client.email !== email) return res.status(401).json({ messageError: 'Invalid email' })
    
    try {
        const isMatch = await bcrypt.compare(password, client.password);
        if (!isMatch) return res.status(401).json({ messageError: 'Invalid password' })

        const secret = process.env.SECRET as jwt.Secret
        const token = jwt.sign({ id: 1 }, secret)

        res.cookie("authLogin", token, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            path: '/',
        })

        return res.status(200).send({ message: "Authentication completed successfully" })

    } catch (error) {
        res.status(500).json({ messageError: 'Internal Server Error' })
        console.log(error)
    }
}