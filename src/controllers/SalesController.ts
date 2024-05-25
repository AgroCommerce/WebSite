import { Request, Response } from "express"
import { prisma } from "../lib/prisma"
import { User, Producer, UserAddress, Product } from "@prisma/client";

import { getUserId } from "../utils/getHeaderData"
import { Decimal } from "@prisma/client/runtime/library";

export async function sale(req:Request, res: Response) {
    const userId = getUserId(req.headers)
    const { paymentMethod } = req.body

    if(!userId) return res.status(401).json({error: 'You must be logged in to complete a sale'})

    try {
        const data = await prisma.shoppingCart.findMany({
            where: {
                userId
            },
            include: {
                user: true,
                product: true
            }
        })
        const products = data.map((product) => {
            return product.product
        })

        const user = data[0].user

        console.log('products ', products)
        console.log('user ', user)

        if(products.length === 0) return res.status(400).json({error: 'Shopping cart is empty'})

        const total:any = products.map((product) => {
            return Number(product.price) // Convert Decimal to number
        })

        const totalValue = total.reduce((total:number, value: number) => {  
            return total + value
        })
        /*
products  [
  {
    id: 3,
    description: 'Batata 10kg',
    title: 'Batata Doce',
    price: 40,
    quantity: 300n,
    keyWords: 'batata, doce, batata-doce, gostoso',
    createdAt: 2024-05-25T15:09:15.111Z,
    producerId: '0dcf014f-0a06-4ba7-a87d-20e16b0d477c',
    likedProductsId: null
  },
  {
    id: 1,
    description: 'Arroz 5Kg',
    title: 'Arroz dorival',
    price: 10,
    quantity: 100n,
    keyWords: 'arroz, dorival, bom, gostoso',
    createdAt: 2024-05-25T15:09:15.111Z,
    producerId: '0dcf014f-0a06-4ba7-a87d-20e16b0d477c',   
    likedProductsId: null
  }
]
user  {
  id: '9b0b98a9-84ff-4ec8-9462-cd6494d5a25f',
  name: 'Jorge',
  cpf: 12596182009n,
  email: 'jorge@gmail.com',
  password: '$2a$10$4rkefgz9puxfiZeoiat0ieP7/DAAbnOe/3yLsmkJlpImGGI8bS2ha',
  roles: 'USER',
  createdAt: 2024-05-25T15:10:54.798Z
}




        */
        

        return res.status(200).json({message: 'Sale completed successfully'})
    } catch (error) {
        return res.status(500).json({error: 'Internal Server Error'})
    }
}