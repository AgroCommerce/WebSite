import { prisma } from '../lib/prisma'
import { z } from 'zod'

export function getAllClients() {
    return prisma.client.findMany()    
}

export function getClientById(id:any) {
    id = z.string().uuid()
    return prisma.client.findUnique(id)    
}

export function registerClient() {
    
}



