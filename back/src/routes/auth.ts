import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { authenticate } from '../plugins/authenticate'

export const authRoutes = async(fastify: FastifyInstance) => {
    // Return User
    fastify.get('/me', {
        onRequest: [authenticate]
    }, async req => {
        const userToken = req.user
        const userDB = await prisma.user.findUnique({
            where: {
                email: req.user.email
            }
        })

        return { userToken, userDB }
    })

    // Return Token
    fastify.post('/users', async(req, res) => {
        const getUserParams = z.object({
            email: z.string().email(),
            password: z.string().min(6, 'A senha precisa ter no minimo 6 caracteres').max(20, 'A senha precisa ter até 20 caracteres !').trim()
        })
        const { email, password } = getUserParams.parse(req.body)

        const check = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                password: true
            }
        })

        // Validate Email e Password in DB
        if(!check) res.status(403).send({ message: 'Email não encontrado !'})
        if(password !== check?.password) res.status(403).send({ message: 'Senha Incorreta !' })


        // --- PENSAVA Q PRECISAVA GUARDAR O TOKEN NO DB ---- 
        // // Verificar se o user possui o Token
        // let user = await prisma.user.findUnique({
        //     where: {
        //         token: userInfo.token
        //     }
        // })

        // // Cadastrar o usuario no DB caso ñ possua Token
        // if(!user) {
        //     user = await prisma.user.create({
        //         data: {
        //             token: access_token,
        //             email: userInfo.email,
        //             password: userInfo.password
        //         }
        //     })
        // }

        
        // Get the User
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        const userDataSchema = z.object({
            id: z.string(),
            email: z.string().email().trim(),
            password: z.string().min(6, 'A senha precisa ter no minimo 6 caracteres').max(20, 'A senha precisa ter até 20 caracteres !').trim(),
            // avatarUrl: z.string().url(),
            // name: z.string(),
            createdAt: z.date()
        })
        const userInfo = userDataSchema.parse(user)


        // Gerar Token
        const token = fastify.jwt.sign({
            email: userInfo.email,
            name: user?.name,
            avatarUrl: user?.avatarUrl
        }, {
            sub: userInfo.id, // Qm gerou o Token
            expiresIn: '1 days' // Qndo o Token expirar, o usuario é deslogado !
            // Refresh Token -> pra ser um Token sem expirar
        })

        return { token }
    })
}