import { Request, Response } from "express"
import { prisma } from "../lib/prisma"

export default async function sales (req:Request, res: Response) {
    try {
        
        
    } catch (error) {
        return res.status(500).json({error: 'Internal Server Error'})
    }
}