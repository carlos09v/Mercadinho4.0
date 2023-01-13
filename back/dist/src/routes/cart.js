"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
const authenticate_1 = require("../plugins/authenticate");
const cartRoutes = async (fastify) => {
    fastify.get('/products/count', async () => {
        const count = await prisma_1.prisma.cart.count();
        return { count };
    });
    fastify.get('/cartUser', {
        onRequest: [authenticate_1.authenticate]
    }, async (req) => {
        const cart = await prisma_1.prisma.user.findUnique({
            where: {
                email: req.user.email
            },
            select: {
                cart: true
            }
        });
        return { cart };
    });
    fastify.get('/cartUser/count', {
        onRequest: [authenticate_1.authenticate]
    }, async (req) => {
        const countCartUser = await prisma_1.prisma.cart.count({
            where: {
                userId: req.user.sub
            }
        });
        return { countCartUser };
    });
    fastify.post('/create-product', {
        onRequest: [authenticate_1.authenticate]
    }, async (req, res) => {
        const createCartBody = zod_1.z.object({
            productName: zod_1.z.string().min(2).max(16).trim(),
            productPrice: zod_1.z.number().positive()
        });
        const { productName, productPrice } = createCartBody.parse(req.body);
        try {
            await prisma_1.prisma.cart.create({
                data: {
                    productName,
                    productPrice,
                    userId: req.user.sub
                }
            });
            res.status(201).send({
                message: 'Produto cadastrado com sucesso no carrinho !'
            });
        }
        catch (err) {
            console.log(err);
        }
    });
    fastify.delete('/delete-product/:productId', {
        onRequest: [authenticate_1.authenticate]
    }, async (req, res) => {
        const idParams = zod_1.z.object({
            productId: zod_1.z.string().cuid()
        });
        const { productId } = idParams.parse(req.params);
        try {
            await prisma_1.prisma.cart.delete({
                where: {
                    id: productId
                }
            });
            res.status(200).send({ message: 'Produto apagado/excluido !' });
        }
        catch (err) {
            console.log(err);
            res.status(400).send({ errorMessage: 'Algo deu errado ao tentar excluir !' });
        }
    });
};
exports.cartRoutes = cartRoutes;
