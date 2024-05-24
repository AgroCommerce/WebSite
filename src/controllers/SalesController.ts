import { Request, Response } from "express"
import { prisma } from "../lib/prisma"

import { getUserId } from "../utils/getHeaderData"

export async function sale(req:Request, res: Response) {
    const userId = getUserId(req.headers)

    try {
        const products = await prisma.shoppingCart.findMany({
            where: {
                userId
            },
            include: {
                user: true,
                product: true
            }
        })
        console.log(products)

        return res.status(200).json({message: 'Sale completed successfully'})
    } catch (error) {
        return res.status(500).json({error: 'Internal Server Error'})
    }
}