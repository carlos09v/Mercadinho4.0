import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { authenticate } from '../plugins/authenticate'
import { Categories } from '@prisma/client'

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
        const cart = await prisma.user.findUnique({
            where: {
                email: req.user.email
            },
            select: {
                cart: true
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
        const { Clothes, Eletronics, Food, Fruits, House, Video_Games, Others, Sports } = Categories
        
        // Validar os dados pra ser tratado antes de enviar pro DB (utilizando o zod)
        const createCartBody = z.object({
            productName: z.string().min(2).max(16).trim(),
            productPrice: z.number().positive().max(1000000, 'Max value is 1000000'),
            category: z.enum([Clothes, Eletronics, Food, Fruits, House, Video_Games, Others, Sports])
        })
        const { productName, productPrice, category } = createCartBody.parse(req.body)
        
        // Register
        try {
            await prisma.cart.create({
                data: {
                    productName,
                    productPrice,
                    category,
                    userId: req.user.sub
                }
            })

            res.status(201).send({ 
                message: 'Produto cadastrado com sucesso no carrinho !'
            })
        } catch (err) {
            console.log(err)
            res.status(400).send({ 
                message: 'Erro ao cadastrar produto no carrinho !'
            })
        }

    })

    // Delete Product
    fastify.delete('/delete-product/:productId', {
        onRequest: [authenticate]
    }, async(req, res) => {
        const idParams = z.object({
            productId: z.string().cuid()
        })
        const { productId } = idParams.parse(req.params)

        try {
            await prisma.cart.delete({
                where: {
                    id: productId
                }
            })

            res.status(200).send({ message: 'Produto apagado/excluido !'})
        }catch (err) {
            console.log(err)
            res.status(400).send({ errorMessage: 'Algo deu errado ao tentar excluir !'})
        }
    })
}