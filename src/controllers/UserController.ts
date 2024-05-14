import 'dotenv/config';

import { Request, Response } from 'express';
import { User, Producer, UserAddress } from "@prisma/client";
import { prisma } from '../lib/prisma'
import { cpf as cpfValidator, cnpj as cnpjValidator} from 'cpf-cnpj-validator';

import bcrypt from 'bcryptjs'

// post
export async function registerClient(req: Request, res: Response) {
    const { name, email, cpf, password } = req.body as User

    if (!name || !email || !cpf || !password) return res.status(400).json({ messageError: 'Invalid body' })
    if (password.length < 6) return res.status(400).json({ messageError: 'Password must have at least 6 characters' })
    if (!cpfValidator.isValid(cpf)) return res.status(401).json({ messageError: 'Invalid CPF' })

    try {
        const user = await prisma.user.findFirst({
            where: { cpf }
        })
        if (user) return res.status(409).json({ messageError: 'User already exists' })

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                name,
                email,
                cpf,
                password: hashedPassword
            }
        })

        return res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        return res.status(500).json({ messageError: 'Internal Server Error' })
    }
}

export async function registerProducer(req: Request, res: Response) {
    const { cnpj, companyName, telephone } = req.body as Producer
    const { id } = req.params

    if (!cnpj || !companyName || !telephone) return res.status(400).json({ messageError: 'Invalid body' })
    if(!cnpjValidator.isValid(cnpj)) return res.status(401).json({ messageError: 'Invalid CNPJ' })

    try {
        const user = await prisma.user.findUnique({
            where: { id }
        })
        if (!user) return res.status(404).json({ messageError: 'User not found' })

        await prisma.producer.create({
            data: {
                cnpj,
                companyName,
                telephone,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })

        await prisma.user.update({
            where: { id },
            data: {
                roles: {
                    set: 'PRODUCER'
                }
            }
        })

        return res.status(201).json({ message: 'Producer created successfully' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ messageError: 'Internal Server Error' })
    }
}

export async function addUserAddress(req: Request, res: Response) {
    const { cep, address, city, country, district, estate, numberAddress } = req.body as UserAddress
    const { id } = req.params

    const user = await prisma.user.findUnique({
        where: { id }
    })

    if (!user) return res.status(404).json({ messageError: 'User not found' })

    try {
        await prisma.userAddress.create({
            data: {
                cep,
                address,
                city,
                country,
                district,
                estate,
                numberAddress,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })

        return res.status(201).json({ message: 'Address added successfully' })
    } catch (error) {
        return res.status(500).json({ messageError: 'Internal Server Error' })
    }
}
