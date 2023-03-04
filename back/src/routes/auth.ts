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
        if(!check) return res.status(403).send({ message: 'Email não encontrado !'})
        if(password !== check?.password) return res.status(403).send({ message: 'Senha Incorreta !' })


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

    // Confirm Payout
    fastify.delete('/confirm-payout/:methodPayout', {
        onRequest:[authenticate]
    }, async(req, res) => {
        const confirmPayoutParam = z.object({
            methodPayout: z.string().transform(v => parseInt(v))
        })
        const confirmPayoutQuery = z.object({
            finance: z.string().transform(v => parseInt(v))
        })
        const { methodPayout } = confirmPayoutParam.parse(req.params)
        const { finance } = confirmPayoutQuery.parse(req.query)

        // Validations
        const prices = await prisma.cart.findMany({
            where: {
                userId: req.user.sub
            },
            select: {
                productPrice: true
            }
        })
        const user = await prisma.user.findUnique({
            where: {
                email: req.user.email
            },
            select: {
                cash: true
            }
        })
        let totPrice = 0
        let totValueFinance: number | null = null
        prices.forEach(p => totPrice += p.productPrice)
        switch(methodPayout) {
            case 1:
                totPrice = totPrice - (totPrice * 10 / 100)
                break
            case 2:
                totPrice = totPrice - (totPrice * 5 / 100)
                break
            case 3:
                totPrice = totPrice / 2
                break
            case 4:
                totPrice = totPrice + (totPrice * 20 / 100)
                totValueFinance = totPrice / finance
                break
            default:
                return res.status(400).send({ message: 'Error: Alejandro !'})
        }
        if(methodPayout !== 4 ? user!.cash < totPrice : totValueFinance! > user!.cash) return res.status(400).send({ messageError: 'Você não tem dinheiro suficiente na carteira :(' })

        //  Remove Cash and Add to BackupCart and Delete Cart
        try {
            const userCash = await prisma.user.update({
                where: {
                    email: req.user.email
                },
                data: {
                    cash: {
                        decrement: finance ? totPrice / finance : totPrice
                    }
                },
                select: {
                    cash: true,
                    cart: true
                }
            })
            // userCash.cart.map(cart => {
            //     if(!cart.backupCartId) {
                    
            //     }
            // })

            // await prisma.backupCart.create({
            //     data: {
            //         backupCart: {
                        
            //         }
            //     }
            // })
            
            await prisma.cart.deleteMany({
                where: {
                    userId: req.user.sub
                }
            })
            

            res.status(200).send({ 
                message: 'Pagamento efetuado com sucesso !',
                userCash
            })
        }catch (err) {
            console.log(err)
        }
    })
}