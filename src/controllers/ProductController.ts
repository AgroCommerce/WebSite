import 'dotenv/config';

import { Request, Response } from 'express';
import { Product } from "@prisma/client";
import { prisma } from '../lib/prisma'
import { z } from 'zod'

/*
id         
description 
title       
price       
quantity   
keyWords    
createdAt

*/

export async function registerProduct(req:Request, res:Response) {
    const { description, title, price, quantity, keyWords } = req.body as Product
    const { producerId } = req.params

    if(!description || !title || !price || !quantity || !keyWords) return res.status(400).json({error: 'All fields must be filled'})
    if(keyWords.length > 5 || keyWords.length < 3) return res.status(400).json({error: 'KeyWords must have a maximum of 5 words and a minimum of 3'})

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
                producer: {
                    connect: {
                        id: producer.id
                    }
                }
            }
        })
    } catch (error) {
        return res.status(500).json({error: 'Internal Server Error'})
    }
}