import 'dotenv/config';

import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { prisma } from '../lib/prisma'

import bcrypt from 'bcryptjs'

// post
export async function registerClient(req: Request, res: Response) {
    const { name, email, cpf, password } = req.body as User

    if (!name || !email || !cpf || !password) return res.status(400).json({ messageError: 'Invalid body' })
    if (password.length < 6) return res.status(400).json({ messageError: 'Password must have at least 6 characters' })
    
    try {
        const user = await prisma.user.findFirst({
            where: { email }
        })
        if (user) return res.status(409).json({ messageError: 'Client already exists' })

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                name,
                email,
                cpf,
                password: hashedPassword
            }
        })
        return res.status(201).json({ message: 'Client created successfully' })
    } catch (error) {
        return res.status(500).json({ messageError: 'Internal Server Error' })
    }
}

export async function getUsers(req: Request, res: Response) {
    const clients = await prisma.user.findMany()
    return res.status(200).json(clients)
}