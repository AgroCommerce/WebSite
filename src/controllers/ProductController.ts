import { Request, Response } from 'express';
import { Product } from "@prisma/client";
import { prisma } from '../lib/prisma'

export async function registerProduct(req:Request, res:Response) {
    const { description, title, price, quantity, keyWords } = req.body as Product
    const { producerId } = req.params
    const apartWords = keyWords.split(',')

    if(!description || !title || !price || !quantity || !keyWords) return res.status(400).json({error: 'All fields must be filled'})
    if(apartWords.length > 5 || apartWords.length < 3) return res.status(400).json({error: 'KeyWords must have a maximum of 5 words and a minimum of 3'})

    try {
        const producer = await prisma.producer.findUnique({
            where: {
                id: producerId
            }
        })

  
        if(!producer) return res.status(404).json({error: 'Producer not found'})
        
        await prisma.product.create({
            data: {
                description,
                title,
                price,
                quantity,
                keyWords,
                producerId,
            }
        })

        res.status(201).json({message: 'Product created successfully'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Internal Server Error'})
    }
}

export async function addShoppingCart(req:Request, res:Response) {
    const { clientId } = req.params
    

}
