import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { authenticate } from '../plugins/authenticate'

export const cartRoutes = async(fastify: FastifyInstance) => {
    // Contagem de Carrinhos
    fastify.get('/carts/count', async() => {
        const count = await prisma.cart.count()

        return { count }
    })

    // Create Cart
    fastify.post('/carts', {
        onRequest: [authenticate]
    }, async(req, res) => {
        // Validar os dados pra ser tratado antes de enviar pro DB (utilizando o zod)
        const createCartBody = z.object({
            productName: z.string().min(2).max(16).trim(),
            productPrice: z.number().positive()
        })
        const { productName, productPrice } = createCartBody.parse(req.body)
        
        // Register and get Id
        const idCart = await prisma.cart.create({
            data: {
                productName,
                productPrice,
                userId: req.user.sub
            },
            select: {
                id: true
            }
        })

        res.status(201).send({ 
            message: 'Carrinho cadastrado com sucesso !',
            idCart
        })
    })
}