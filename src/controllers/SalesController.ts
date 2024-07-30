import { Request, Response } from "express"
import { prisma } from "../lib/prisma"

import { getUserId } from "../utils/getHeaderData"
import { Decimal } from "@prisma/client/runtime/library"

export async function endSale(req: Request, res: Response) {
    const userId = getUserId(req.headers)
    const paymentMethod = req.body.paymentMethod
    const userAddressId: number = req.body.userAddressId
    const quantity: Array<number> = req.body.quantity

    if (!paymentMethod || !userAddressId || !quantity) return res.status(400).json({ error: 'Invalid body! ' })
    if (!userId) return res.status(401).json({ error: 'You must be logged in to complete a sale' })
    if (quantity.length === 0) return res.status(400).json({ error: 'Quantity is empty' })

    try {
        const [data, user] = await Promise.all([
            prisma.shoppingCart.findMany({
                where: {
                    userId
                },
                include: {
                    product: true
                }
            }),
            prisma.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    userAddress: true
                }
            }),
        ])
        if (!user) return res.status(404).json({ error: 'User not found' })

        const addressId = user.userAddress.find((address) => {
            return address.id === userAddressId
        })
        if (!addressId) return res.status(404).json({ error: 'Address not found' })

        const products = data.map((product) => {
            return product.product
        })

        if (products.length === 0) return res.status(400).json({ error: 'Shopping cart is empty' })
        if (quantity.length !== products.length) return res.status(400).json({ error: 'Quantity is invalid' })

        const total: Array<number> = []
        let totalValue: number = 0

        for (let i = 0; i < quantity.length; i++) {
            if (quantity[i] > products[i].quantity) {
                return res.status(400).json({ error: 'Quantity is invalid' })
            }
            total.push(Number(products[i].price) * quantity[i])
            totalValue += total[i]
            
            await prisma.product.update({
                where: {
                    id: products[i].id
                },
                data: {
                    quantity: products[i].quantity - quantity[i]
                }
            })
        }

        await prisma.sales.create({
            data: {
                userId,
                paymentMethod,
                userAddressId,
                total: totalValue,
                products: {
                    create: products.map((product, index) => {
                        return {
                            product: { connect: { id: product.id } }, 
                            quantity: quantity[index]
                        }
                    })
                }
            },
        })

        await prisma.shoppingCart.deleteMany({
            where: {
                userId
            }
        })

        return res.status(200).json({ message: 'Sale completed successfully' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function getSalesUser(req: Request, res: Response) {
    const userId = getUserId(req.headers)
    if (!userId) return res.status(401).json({ error: 'You must be logged in to see your sales' })

    try {
        const data = await prisma.sales.findMany({
            where: {
                userId
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })
        const dataJson = JSON.stringify(data, toObject);
        console.log(data)
        return res.status(200).json(JSON.parse(dataJson))
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export function toObject(key: string, value: any) {
    return typeof value === 'bigint'
        ? value.toString()
        : value; // return everything else unchanged
}