"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
const authenticate_1 = require("../plugins/authenticate");
const userRoutes = async (fastify) => {
    fastify.get('/users/count', async () => {
        const count = await prisma_1.prisma.user.count();
        return { count };
    });
    fastify.post('/create-account', async (req, res) => {
        const createUserBody = zod_1.z.object({
            email: zod_1.z.string().email().trim(),
            password: zod_1.z.string().min(6, 'A senha precisa ter no minimo 6 caracteres').max(20, 'A senha precisa ter até 20 caracteres !').trim()
        });
        const { email, password } = createUserBody.parse(req.body);
        try {
            const idUser = await prisma_1.prisma.user.create({
                data: {
                    email,
                    password
                },
                select: {
                    id: true
                }
            });
            res.status(201).send({
                message: 'Usuário cadastrado com sucesso !',
                idUser
            });
        }
        catch (e) {
            res.status(404).send({ message: 'Email ja utilizado/criado !' });
        }
    });
    fastify.put('/update-user', {
        onRequest: [authenticate_1.authenticate]
    }, async (req, res) => {
        const createUserUpdateBody = zod_1.z.object({
            name: zod_1.z.string().max(20).trim(),
            avatarUrl: zod_1.z.string().url().trim()
        });
        const { name, avatarUrl } = createUserUpdateBody.parse(req.body);
        const user = await prisma_1.prisma.user.update({
            where: {
                email: req.user.email
            },
            data: {
                name,
                avatarUrl
            }
        });
        res.status(200).send({ user, message: 'Dados salvos com sucesso!' });
    });
    fastify.post('/forgot-password', async (req, res) => {
        const createReqBody = zod_1.z.object({
            email: zod_1.z.string().email().trim()
        });
        const { email } = createReqBody.parse(req.body);
        const passwordUser = await prisma_1.prisma.user.findUnique({
            where: {
                email
            },
            select: {
                password: true
            }
        });
        if (!passwordUser)
            res.status(404).send({ message: 'Email não encontrado !' });
        return { passwordUser };
    });
    fastify.delete('/delete-user/:email', {
        onRequest: [authenticate_1.authenticate]
    }, async (req, res) => {
        const emailParams = zod_1.z.object({
            email: zod_1.z.string().email()
        });
        const { email } = emailParams.parse(req.params);
        if (email !== req.user.email)
            res.status(404).send({ message: 'Email Incorreto ou não existe !' });
        try {
            const deleteCart = prisma_1.prisma.cart.deleteMany({
                where: {
                    userId: req.user.sub
                }
            });
            const deleteUser = prisma_1.prisma.user.delete({
                where: {
                    email
                }
            });
            await prisma_1.prisma.$transaction([deleteCart, deleteUser]);
            res.status(200).send({ message: 'Conta deletada com sucesso !' });
        }
        catch (err) {
            console.log(err);
        }
    });
};
exports.userRoutes = userRoutes;
