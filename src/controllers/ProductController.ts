import { Request, Response } from 'express';
import { Product } from "@prisma/client";
import { prisma } from '../lib/prisma'

import { getProducerId, getUserId } from '../utils/getHeaderData'

//add update stock
export async function registerProduct(req: Request, res: Response) {
    const { description, title, price, quantity, keyWords } = req.body as Product
    const userId = getUserId(req.headers)

    const apartWords = keyWords.split(',')
    if(!userId) return res.status(401).json({ messageError: 'You must be logged in to register a product' })

    if (!description || !title || !price || !quantity || !keyWords) return res.status(400).json({ error: 'All fields must be filled' })
    if (apartWords.length > 5 || apartWords.length < 3) return res.status(400).json({ error: 'KeyWords must have a maximum of 5 words and a minimum of 3' })

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                producer: true
            }
        })
        
        const producerId = user?.producer?.id
        if (!producerId) return res.status(404).json({ error: 'Producer not found' })

        await prisma.product.create({
            data: {
                description,
                title,
                price,
                quantity, 
                keyWords,
                imgUrl: 'teste',
                producerId,
            }
        })

        return res.status(201).json({ message: 'Product created successfully' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function updateStock(req: Request, res: Response) {
    const productId: Product['id'] = req.body.productId
    const quantity: number = req.body.quantity
    const producerId = getProducerId(req.headers)

    if(!producerId) return res.status(401).json({ messageError: 'You must be logged in to update a product' })
    if (!productId || !quantity) return res.status(400).json({ error: 'Invalid body' })

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        })

        if (!product) return res.status(404).json({ error: 'Product not found' })

        await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                quantity: product.quantity + quantity
            }
        })

        return res.status(200).json({ message: 'Stock updated successfully' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function addShoppingCart(req: Request, res: Response) {
    const userId = getUserId(req.headers)
    const productId: Product['id'] = req.body.productId
    const quantity:number = req.body.quantity

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

        const shoppingCart = await prisma.shoppingCart.findFirst({
            where: {
                productId,
                AND: {
                    userId
                }
            }
        })

        if (!shoppingCart) {
            await prisma.shoppingCart.create({
                data: {
                    userId: user.id,
                    productId: product.id,
                }
            })
        } else {
            return res.status(400).json({ error: 'Product already in shopping cart' })
        }

        return res.status(201).json({ message: 'Product added to shopping cart' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function removeShoppingCart(req: Request, res: Response) {
    const userId = getUserId(req.headers)
    const productId: Product['id'] = req.body.productId

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

        const shoppingCart = await prisma.shoppingCart.findFirst({
            where: {
                productId,
                AND: {
                    userId
                }
            }
        })

        if (!shoppingCart) {
            return res.status(400).json({ error: 'Product not in shopping cart' })
        } else {
            await prisma.shoppingCart.delete({
                where: {
                    id: shoppingCart.id
                }
            })
        }

        return res.status(201).json({ message: 'Product removed from shopping cart' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function getShoppingCart(req: Request, res: Response) {
    const userId = getUserId(req.headers)

    if(!userId) return res.status(401).json({ messageError: 'You must be a logged' })

    const shoppingCart = await prisma.shoppingCart.findMany({
        where: {
            userId
        },
        include: {
            product: true
        }
    })

    if(shoppingCart.length === 0) return res.status(404).json({ messageError: 'Shopping cart is empty' })
    return res.status(200).json(shoppingCart)
}

export async function getProducts(req: Request, res: Response) {
    const products = await prisma.product.findMany()
    return res.status(200).json(products)
}

export async function getProductById(req: Request, res: Response) {
    const { productId } = req.params

    if(!productId) return res.status(400).json({ messageError: 'Invalid body' })

    const product = await prisma.product.findUnique({
        where: {
            id: Number(productId) 
        }
    })

    return res.status(200).json(product)
}

export async function getProductsByProducer(req: Request, res: Response) {
    const { producerId } = req.params

    if(!producerId) return res.status(401).json({ messageError: 'You must be a logged' })

    const products = await prisma.product.findMany({
        where: {
            producerId
        }
    })

    return res.status(200).json(products)
}


