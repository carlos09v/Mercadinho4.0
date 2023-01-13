"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/lib/prisma");
async function main() {
    const user = await prisma_1.prisma.user.create({
        data: {
            name: 'Testee',
            email: 'testee@gmail.com',
            password: 'testee'
        }
    });
    await prisma_1.prisma.cart.create({
        data: {
            productName: 'Banana',
            productPrice: 3.76,
            userId: user.id
        }
    });
}
main();
