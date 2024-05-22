import { prisma } from '../src/lib/prisma';

async function seed() {
    await prisma.user.createMany({
        data: [
            {
                id: '0f707843-e23d-48c4-bc93-51ae2593372e',
                name: 'Matheus',
                email: 'matheus@gmail.com',
                cpf: 82375001052,
                password: '$2a$10$QbRzKd3GQ6r2Q4Q1QXqV0e7lY0KsZ3z8T3J1bY2qyJ1Q9UzQ9tQ0W'
            },
            {
                id: '06112905-d580-48ec-969e-cfb8bca17967',
                name: 'Lucas',
                email: 'lucas@gmail.com',
                cpf: 81288168020,
                password: '$2a$10$QbRzKd3GQ6r2Q4Q1QXqV0e7lY0KsZ3z8T3J1bY2qyJ1Q9UzQ9tQ0W'
            }
        ]
    });

    await prisma.producer.create({
        data: {
            id: '0dcf014f-0a06-4ba7-a87d-20e16b0d477c',
            cnpj: 30504426000143,
            companyName: 'Company',
            telephone: 123456789,
            user: {
                connect: {
                    id: "0f707843-e23d-48c4-bc93-51ae2593372e",
                }
            }
        },
    });

    await prisma.product.createMany({
        data: [
            {
                description: "Arroz 5Kg",
                title: "Arroz dorival",
                price: 10.00, 
                quantity: 100,
                keyWords: "arroz, dorival, bom, gostoso",
                producerId: "0dcf014f-0a06-4ba7-a87d-20e16b0d477c"
            },
            {
                description: "Feijão 5Kg",
                title: "Feijão dorival",
                price: 20.00,
                quantity: 30,
                keyWords: "feijão, dorival, bom, gostoso",
                producerId: "0dcf014f-0a06-4ba7-a87d-20e16b0d477c"
            },
            {
                description: "Batata 10kg",
                title: "Batata Doce",
                price: 40.00,
                quantity: 300,
                keyWords: "batata, doce, batata-doce, gostoso",
                producerId: "0dcf014f-0a06-4ba7-a87d-20e16b0d477c"
            },
        ]
    });

    await prisma.likedProducts.createMany({
        data: [
            {
                userId: '0f707843-e23d-48c4-bc93-51ae2593372e',
                productId: 1
            },
            {
                userId: '0f707843-e23d-48c4-bc93-51ae2593372e',
                productId: 2
            },
            {
                userId: '06112905-d580-48ec-969e-cfb8bca17967',
                productId: 1
            },
            {
                userId: '06112905-d580-48ec-969e-cfb8bca17967',
                productId: 3
            }
        ]
    });

    await prisma.shoppingCart.createMany({
        data: [
            {
                userId: '0f707843-e23d-48c4-bc93-51ae2593372e',
                productId: 3
            },
            {
                userId: '0f707843-e23d-48c4-bc93-51ae2593372e',
                productId: 1
            },
            {
                userId: '06112905-d580-48ec-969e-cfb8bca17967',
                productId: 2
            },
            {
                userId: '06112905-d580-48ec-969e-cfb8bca17967',
                productId: 3
            }
        ]
    });

    await prisma.userAddress.createMany({
        data: [
            {
                cep: 12345678,
                address: 'Rua 1',
                city: 'São Paulo',
                country: 'Brasil',
                district: 'Centro',
                estate: 'SP',
                numberAddress: 123,
                userId: '0f707843-e23d-48c4-bc93-51ae2593372e'
            },
            {
                cep: 87654321,
                address: 'Rua 2',
                city: 'São Paulo',
                country: 'Brasil',
                district: 'Centro',
                estate: 'SP',
                numberAddress: 456,
                userId: '06112905-d580-48ec-969e-cfb8bca17967'
            }
        ]
    });

    setTimeout(async ()=> {
        await prisma.user.update({
            where: { 
                id: "0f707843-e23d-48c4-bc93-51ae2593372e" 
            },
            data: {
                roles: {
                    set: 'PRODUCER'
                }
            }
        })
    },5000)
}



seed().then(() => {
    console.log('Seed completed successfully!');
    prisma.$disconnect();
}).catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
})