import { Request, Response } from 'express';
import { User, Producer, UserAddress, Product, Role } from "@prisma/client";
import { prisma } from '../lib/prisma'
import { CpfCnpjUtils } from '../utils/validator'

import { getUserId } from '../utils/getHeaderData'
import bcrypt from 'bcryptjs'

// post
export async function registerUser(req: Request, res: Response) {
    const { name, email, cpf, password, birthDate } = req.body as User
    console.log(name, email, cpf, password, birthDate)
    if (!name || !email || !cpf || !password || !birthDate) return res.status(400).json({ messageError: 'Invalid body' })
    if (password.length < 6) return res.status(400).json({ messageError: 'Password must have at least 6 characters' })
    if (!CpfCnpjUtils.isCpfValid(cpf)) return res.status(401).json({ messageError: 'Invalid CPF' }) //deu erro de string aqui

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
        const formatDate = new Date(birthDate)
        const isAdult = new Date().getFullYear() - formatDate.getFullYear() >= 18
        if (!formatDate || !isAdult) return res.status(400).json({ messageError: 'Invalid birth date' })

        await prisma.user.create({
            data: {
                name,
                email,
                cpf,
                password: hashedPassword,
                birthDate: formatDate,
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

    if (!userId) return res.status(401).json({ messageError: 'You must to be a logged' })

    if (!cnpj || !companyName || !telephone) return res.status(400).json({ messageError: 'Invalid body' })
    if (!CpfCnpjUtils.isCnpjValid(cnpj.toString())) return res.status(401).json({ messageError: 'Invalid CNPJ' })
    if (typeof cnpj !== 'number') return res.status(401).json({ messageError: 'CNPJ must to be a number' })

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId, },
            include: {
                producer: true
            }
        })
        if (!user) return res.status(404).json({ messageError: 'User not found' })
        if (user.producer) return res.status(409).json({ messageError: 'User already is a producer' })

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
                role: {
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
    const { cep, address, city, country, district, state, numberAddress, receiverName, typeAddress } = req.body as UserAddress
    const userId = getUserId(req.headers)

    if(!userId) return res.status(401).json({ messageError: 'You must to be a logged' })
    if(!cep || !address || !city || !country || !district || !state || !numberAddress || !receiverName || !typeAddress) return res.status(400).json({ messageError: 'Invalid body' })
        
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
                state,
                numberAddress,
                receiverName,
                typeAddress,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })

        return res.status(201).json({ message: 'Address added successfully' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ messageError: 'Internal Server Error' })
    }
}

export async function addLikedProducts(req: Request, res: Response) {
    const userId = getUserId(req.headers)
    const productId: Product['id'] = req.body.productId

    console.log(userId, productId)
    if (!productId) return res.status(400).json({ messageError: 'Invalid body' })
    if (!userId) return res.status(401).json({ messageError: 'You must' })

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

export async function getUserById(req: Request, res: Response) {
    const userId = getUserId(req.headers)
    console.log(req.headers, userId)
    if (!userId) return res.status(401).json({ messageError: 'You must to be a logged' })

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

export async function updateUser(req: Request, res: Response) {
    const userId = getUserId(req.headers)
    const { cellphone, gender, name } = req.body as User

    if (!userId) return res.status(401).json({ messageError: 'You must to be a logged' })

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user) return res.status(404).json({ messageError: 'User not found' })
        const OldName = user.name
        const OldCellphone = user.cellphone
        const OldGender = user.gender
        console.log(cellphone?.toString().replace(/\D/g, ''))
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                cellphone: cellphone ? Number(cellphone.toString().replace(/\D/g, '')) : OldCellphone,
                name: name ? name : OldName,
                gender: gender ? gender : OldGender,
            }
        })

        return res.status(200).json({ message: 'User updated successfully' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ messageError: 'iInternal Server Error' })
    }
}