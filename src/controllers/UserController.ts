import { Request, Response } from 'express';
import { User, Producer, UserAddress, Product, Role } from "@prisma/client";
import { prisma } from '../lib/prisma'
import { CpfCnpjUtils } from '../utils/validator'

import { getUserId } from '../utils/getHeaderData'
import bcrypt from 'bcryptjs'

// post
export async function registerUser(req: Request, res: Response) {
    const { name, email, cpf, password } = req.body as User

    if (!name || !email || !cpf || !password) return res.status(400).json({ messageError: 'Invalid body' })
    if (password.length < 6) return res.status(400).json({ messageError: 'Password must have at least 6 characters' })
    if (!CpfCnpjUtils.isCpfValid(cpf.toString())) return res.status(401).json({ messageError: 'Invalid CPF' })
    if (typeof cpf !== 'number') return res.status(401).json({ messageError: 'CPF must to be a number' })

    try {

        const user = await prisma.user.findFirst({
            where: { 
                OR: [
                    { cpf },
                    { email }
                ]
            }
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
        console.log(error)
        return res.status(500).json({ messageError: 'Internal Server Error' })
    }
}

export async function registerProducer(req: Request, res: Response) {
    const { cnpj, companyName, telephone } = req.body as Producer
    const userId = getUserId(req.headers)

    if (!cnpj || !companyName || !telephone) return res.status(400).json({ messageError: 'Invalid body' })
    if (!CpfCnpjUtils.isCnpjValid(cnpj.toString())) return res.status(401).json({ messageError: 'Invalid CNPJ' })
    if (typeof cnpj !== 'number') return res.status(401).json({ messageError: 'CNPJ must to be a number' })

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                producer: true
            }
        })
        if (!user) return res.status(404).json({ messageError: 'User not found' })
        if(user.producer) return res.status(409).json({ messageError: 'User already is a producer' })

        await prisma.producer.create({
            data: {
                cnpj,
                companyName,
                telephone,
                user: {
                    connect: {
                        id: user.id,
                    }
                }
            }
        })

        await prisma.user.update({
            where: { id: userId },
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
    const userId = getUserId(req.headers)

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
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

export async function addLikedProducts(req:Request, res:Response) {
    const userId = getUserId(req.headers)
    const productId: Product['id'] = req.body.productId

    console.log(userId, productId)
    if(!productId) return res.status(400).json({ messageError: 'Invalid body' })
    if(!userId) return res.status(401).json({ messageError: 'You must' })

    try {
        const [product, user] = await Promise.all([
            prisma.product.findUnique({
                where: {
                    id: productId
                }
            }),
            prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
        ])

        console.log(user, product)

        if (!product) return res.status(404).json({ error: 'Product not found' })
        if (!user) return res.status(404).json({ error: 'User not found' })

        const shoppingCart = await prisma.likedProducts.findFirst({
            where: {
                productId,
                AND: {
                    userId
                }
            }
        })

        if (!shoppingCart) {
            await prisma.likedProducts.create({
                data: {
                    userId: user.id,
                    productId: product.id
                }
            })
        } else {
            return res.status(400).json({ error: 'Product already in liked products' })
        }

        return res.status(201).json({ message: 'Product added to liked products' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function getUserById(req:Request, res:Response) {
    const userId = getUserId(req.headers)
    console.log(req.headers, userId)
    if(!userId) return res.status(401).json({ messageError: 'You must to be a logged' })

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            userAddress: true
        }
    })

    if (!user) return res.status(404).json({ error: 'User not found' })
        
    const userJson = JSON.stringify(user, toObject);
    return res.status(200).json(JSON.parse(userJson))
}

export function toObject(key: string, value: any) {
    return typeof value === 'bigint'
        ? value.toString()
        : value; // return everything else unchanged
}