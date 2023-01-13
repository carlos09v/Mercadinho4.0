"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const user_1 = require("./routes/user");
const auth_1 = require("./routes/auth");
const cart_1 = require("./routes/cart");
async function bootstrap() {
    const fastify = (0, fastify_1.default)({
        logger: true
    });
    await fastify.register(cors_1.default, {
        origin: 'https://mercadinho4-0.vercel.app/',
        credentials: true,
        methods: ['POST', 'PUT', 'GET', 'DELETE']
    });
    await fastify.register(jwt_1.default, {
        secret: process.env.JWT_SECRET_KEY
    });
    const PORT = process.env.PORT || 3333;
    await fastify.register(auth_1.authRoutes);
    await fastify.register(user_1.userRoutes);
    await fastify.register(cart_1.cartRoutes);
    await fastify.listen({ PORT });
}
bootstrap();
