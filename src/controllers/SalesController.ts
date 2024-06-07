import { Request, Response } from "express"
import { prisma } from "../lib/prisma"

import { getUserId } from "../utils/getHeaderData"
import { Decimal } from "@prisma/client/runtime/library"

export async function endSale(req: Request, res: Response) {
    const userId = getUserId(req.headers)
    const paymentMethod = req.body.paymentMethod
    const userAddressId: number = req.body.userAddressId
    const quantity: number = req.body.quantity

    if (!paymentMethod || !userAddressId) return res.status(400).json({ error: 'Invalid body! ' })
    if (!userId) return res.status(401).json({ error: 'You must be logged in to complete a sale' })

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

        const products = data.map((product) => {
            return product.product
        })

        if (products.length === 0) return res.status(400).json({ error: 'Shopping cart is empty' })

        const productsId = products.map((product) => {
            return product.id
        })

        const total: any = products.map((product) => {
            return Number(product.price) // Convert Decimal to number
        })

        const totalValue = total.reduce((total: number, value: number) => {
            return total + value
        })

        if (!user) return res.status(404).json({ error: 'User not found' })

        const addressId = user.userAddress.find((address) => {
            return address.id === userAddressId
        })

        if (!addressId) return res.status(404).json({ error: 'Address not found' })


        const teste = await prisma.sales.create({
            data: {
                userId,
                paymentMethod,
                userAddressId: addressId.id,
                total: totalValue as Decimal,
                products: {
                    connect: productsId.map((id) => {
                        return { id }
                    })
                }
            }
        })
        await prisma.sales.create({
            data: {
                userId,
                paymentMethod,
                userAddressId: addressId.id,
                total: totalValue as Decimal,
                products: {
                    create: [
                        {
                            Product: { connect: { id: productsId[0] } },
                            quantity: quantity
                        }
                    ]
                }
            },
        })

        console.log(teste)

        return res.status(200).json({ message: 'Sale completed successfully' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}