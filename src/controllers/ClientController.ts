import 'dotenv/config';

import { Request, Response } from 'express';
import { Client } from '../types/ClientType';
import { prisma } from '../lib/prisma'

import bcrypt from 'bcryptjs'

// post
export async function registerClient(req: Request, res: Response) {
    const { name, email, cpf, password } = req.body as Client

    if (!name || !email || !cpf || !password) return res.status(400).json({ messageError: 'Invalid body' })
    if (password.length < 6) return res.status(400).json({ messageError: 'Password must have at least 6 characters' })
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const teste = await prisma.client.create({
            data: {
                name,
                email,
                CPF: cpf,
                password: hashedPassword
            }
        })
        console.log(teste)
        return res.status(201).json({ message: 'Client created successfully' })
    } catch (error) {
        return res.status(500).json({ messageError: 'Internal Server Error' })
    }
}

export async function getClients(req: Request, res: Response) {
    const clients = await prisma.client.findMany()
    return res.status(200).json(clients)
}