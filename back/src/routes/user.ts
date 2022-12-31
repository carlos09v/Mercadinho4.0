import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { authenticate } from '../plugins/authenticate'

export const userRoutes = async (fastify: FastifyInstance) => {
    // Contagem de Usuários criados
    fastify.get('/users/count', async () => {
        const count = await prisma.user.count()

        return { count }
    })

    // Create User
    fastify.post('/create-account', async (req, res) => {
        // Validar os dados pra ser tratado antes de enviar pro DB (utilizando o zod)
        const createUserBody = z.object({
            email: z.string().email().trim(),
            password: z.string().min(6, 'A senha precisa ter no minimo 6 caracteres').max(20, 'A senha precisa ter até 20 caracteres !').trim()
        })
        const { email, password } = createUserBody.parse(req.body)


        // Register and get Id
        try {
            const idUser = await prisma.user.create({
                data: {
                    email,
                    password
                },
                select: {
                    id: true
                }
            })

            res.status(201).send({
                message: 'Usuário cadastrado com sucesso !',
                idUser
            })
        } catch (e) {
            res.status(404).send({ message: 'Email ja utilizado/criado !' })
        }

    })

    // Update User
    fastify.put('/update-user', {
        onRequest: [authenticate]
    }, async (req, res) => {
        // Validar os dados pra ser tratado antes de enviar pro DB (utilizando o zod)
        const createUserUpdateBody = z.object({
            name: z.string().max(20).trim(),
            avatarUrl: z.string().url().trim()
        })
        const { name, avatarUrl } = createUserUpdateBody.parse(req.body)

        // Update and Return User
        const user = await prisma.user.update({
            where: {
                email: req.user.email
            },
            data: {
                name,
                avatarUrl
            }
        })

        res.status(200).send({ user, message: 'Dados salvos com sucesso!' })
    })

    // Forgot Password
    fastify.post('/forgot-password', async (req, res) => {
        const createReqBody = z.object({
            email: z.string().email().trim()
        })
        const { email } = createReqBody.parse(req.body)

        // Get Password
        const passwordUser = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                password: true
            }
        })
        if (!passwordUser) res.status(403).send({ message: 'Email não encontrado !' })

        return { passwordUser }
    })
}