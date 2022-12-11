import { FastifyRequest } from 'fastify'

export const authenticate = async(req: FastifyRequest) => {
    // Validar Token
    await req.jwtVerify()
}