import { prisma } from '../src/lib/prisma'

// Seed - Dados Iniciais
async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Testee',
            email: 'testee@gmail.com',
            password: 'testee'
        }
    })

    await prisma.cart.create({
        data: {
            productName: 'Banana',
            productPrice: 3.76,
            userId: user.id
        }
    })
}

main()