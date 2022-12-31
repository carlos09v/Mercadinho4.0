import '@fastify/jwt'

declare module '@fastify/jwt' {
    interface FastifyJWT {
        user: {
            sub: string
            email: string
            name?: string | null
            avatarUrl?: string | null
        }
    }
}