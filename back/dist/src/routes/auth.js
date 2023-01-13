"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const authenticate_1 = require("../plugins/authenticate");
const authRoutes = async (fastify) => {
    fastify.get('/me', {
        onRequest: [authenticate_1.authenticate]
    }, async (req) => {
        const userToken = req.user;
        const userDB = await prisma_1.prisma.user.findUnique({
            where: {
                email: req.user.email
            }
        });
        return { userToken, userDB };
    });
    fastify.post('/users', async (req, res) => {
        const getUserParams = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(6, 'A senha precisa ter no minimo 6 caracteres').max(20, 'A senha precisa ter até 20 caracteres !').trim()
        });
        const { email, password } = getUserParams.parse(req.body);
        const check = await prisma_1.prisma.user.findUnique({
            where: {
                email
            },
            select: {
                password: true
            }
        });
        if (!check)
            res.status(403).send({ message: 'Email não encontrado !' });
        if (password !== check?.password)
            res.status(403).send({ message: 'Senha Incorreta !' });
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                email
            }
        });
        const userDataSchema = zod_1.z.object({
            id: zod_1.z.string(),
            email: zod_1.z.string().email().trim(),
            password: zod_1.z.string().min(6, 'A senha precisa ter no minimo 6 caracteres').max(20, 'A senha precisa ter até 20 caracteres !').trim(),
            createdAt: zod_1.z.date()
        });
        const userInfo = userDataSchema.parse(user);
        const token = fastify.jwt.sign({
            email: userInfo.email,
            name: user?.name,
            avatarUrl: user?.avatarUrl
        }, {
            sub: userInfo.id,
            expiresIn: '1 days'
        });
        return { token };
    });
    fastify.delete('/confirm-payout', {
        onRequest: [authenticate_1.authenticate]
    }, async (req, res) => {
        try {
            await prisma_1.prisma.cart.deleteMany({
                where: {
                    userId: req.user.sub
                }
            });
            res.status(200).send({ message: 'Pagamento efetuado com sucesso !' });
        }
        catch (err) {
            console.log(err);
        }
    });
};
exports.authRoutes = authRoutes;
