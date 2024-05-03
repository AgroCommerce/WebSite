import { Request, Response } from 'express';

interface Client {
    name: string,
    email: string,
    cpf: string,
    password: string,
}

export function registerClient(req: Request, res: Response) {
    const { name, email, cpf, password } = req.body as Client
    
    if(!name || !email || !cpf || !password) {
        return res.status(400).json({ messageError: 'Invalid body' })
    }

}