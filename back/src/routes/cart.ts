import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { authenticate } from '../plugins/authenticate'

export const cartRoutes = async(fastify: FastifyInstance) => {
    // Contagem de Produtos criados
    fastify.get('/products/count', async() => {
        const count = await prisma.cart.count()

        return { count }
    })

    // Lista de Produtos do User
    fastify.get('/cartUser', {
        onRequest: [authenticate]
    }, async(req) => {
        // Get the Cart from User
        const cart = await prisma.cart.findUnique({
            where: {
                userId: req.user.sub
            }
        })

        return { cart }
    })

    // Contagem de Produtos no carrinho do Usuário
    fastify.get('/cartUser/count', {
        onRequest: [authenticate]
    }, async(req) => {
        const countCartUser = await prisma.cart.count({
            where: {
                userId: req.user.sub
            }
        })

        return { countCartUser }
    })

    // Create Product
    fastify.post('/create-product', {
        onRequest: [authenticate]
    }, async(req, res) => {
        // Validar os dados pra ser tratado antes de enviar pro DB (utilizando o zod)
        const createCartBody = z.object({
            productName: z.string().min(2).max(16).trim(),
            productPrice: z.number().positive()
        })
        const { productName, productPrice } = createCartBody.parse(req.body)
        
        // Register
        try {
            await prisma.cart.create({
                data: {
                    productName,
                    productPrice,
                    userId: req.user.sub
                }
            })

            res.status(201).send({ 
                message: 'Produto cadastrado com sucesso no carrinho !'
            })
        } catch (err) {
            console.log(err)
        }

    })
}