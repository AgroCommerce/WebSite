import 'dotenv/config';

import bcrypt from 'bcryptjs'
import { Request, Response } from 'express';
import { Producer } from '@prisma/client'
import { prisma } from '../lib/prisma'

// post
export async function registerProducer(req: Request, res: Response) {
    const { CNPJ, companyName, telephone } = req.body as Producer

    if (!telephone || !CNPJ || !companyName) return res.status(400).json({ messageError: 'Invalid body' })
    
    try {
        const producer = await prisma.producer.findFirst({
            where: { CNPJ }
        })

        if (producer) return res.status(409).json({ messageError: 'Client already exists' })

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.producer.create({
            data: {
                name,
                email,
                CPF,
                password: hashedPassword,
                CNPJ: CNPJ || '',
                companyName: companyName || '',
                telephone
            }
        })

        return res.status(201).json({ message: 'Client created successfully' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ messageError: 'Internal Server Error' })
    }
}

export async function getProducers(req: Request, res: Response) {
    const producers = await prisma.client.findMany()
    return res.status(200).json(producers)
}