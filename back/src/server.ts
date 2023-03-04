import Fastify from "fastify";
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { userRoutes } from './routes/user'
import { authRoutes } from './routes/auth'
import { cartRoutes } from './routes/cart'

// Criar o server
async function bootstrap() {
    const fastify = Fastify({
        logger: true // Log dos erros, alertas
    })

    await fastify.register(cors, {
        origin: 'https://mercadinho4-0.vercel.app',
        credentials: true,
        methods: ['POST', 'PUT', 'GET', 'DELETE'] // Qlquer aplicação pode acessar o back-end
        // em ambiente dev = true. Em prod é so adicionar os domínios Ex: google.com
    })

    // Em produção isso precisa ser uma variável ambiente
    await fastify.register(jwt, {
        secret: process.env.JWT_SECRET_KEY! // actually, exclamation (!) says, hey typescript, don't worry, don't check this.
    })

    // http://localhost:3333

    // Utilizar Interfaces de API pra testar. (Ex: Postman, insomnia, hoppscotch)
    // Importar Rotas
    await fastify.register(authRoutes)
    await fastify.register(userRoutes)
    await fastify.register(cartRoutes)
    
    await fastify.listen({ port: process.env.PORT || 3333, host: '0.0.0.0' })
}

bootstrap()