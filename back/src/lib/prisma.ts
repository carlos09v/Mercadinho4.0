import { PrismaClient } from '@prisma/client'

// Conectar com o DB
export const prisma = new PrismaClient({
    log: ['query']
})