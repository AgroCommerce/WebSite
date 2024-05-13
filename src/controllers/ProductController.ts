import 'dotenv/config';

import { Request, Response } from 'express';
import { Product } from "@prisma/client";
import { prisma } from '../lib/prisma'

import bcrypt from 'bcryptjs'

export async function registerProduct(req:Request, res:Response) {
    const { description, price, quantity, title, keyWords } = req.body as Product
    const { producerId } = req.params

    try {
        const producer = await prisma.producer.findUnique({
            where: {
                id: producerId
            }
        })
        if(!producer) return res.status(400).json({error: 'Producer not found'})
        
        await prisma.product.create({
            data: {
                description,
                keyWords,
                price,
                title,
                quantity,
                producerId,
            }
        })
    } catch (error) {
        return res.status(500).json({error: 'Internal Server Error'})
    }
}