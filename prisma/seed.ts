import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

const products = [
    {
      "description": "Arroz produzido com ótima qualidade, sustentável e saudável",
      "title": "Arroz de ótima qualidade",
      "price": 22.00,
      "quantity": 40,
      "keyWords": "Arroz,Qualidade,Sustentável,Saudável",
      "imgUrl": [""],
      "productCost": 10.00,
      "offer": 0.0
    },
    {
      "description": "Feijão carioca de alta qualidade, orgânico e sustentável",
      "title": "Feijão Carioca Orgânico",
      "price": 15.00,
      "quantity": 60,
      "keyWords": "Feijão,Carioca,Orgânico,Sustentável",
      "imgUrl": [""],
      "productCost": 7.00,
      "offer": 0.0
    },
    {
      "description": "Milho fresco, colhido diretamente de produtores locais",
      "title": "Milho Fresco",
      "price": 12.50,
      "quantity": 100,
      "keyWords": "Milho,Fresco,Produtores Locais",
      "imgUrl": [""],
      "productCost": 5.50,
      "offer": 0.0
    },
    {
      "description": "Batata doce orgânica, excelente fonte de energia natural",
      "title": "Batata Doce Orgânica",
      "price": 9.80,
      "quantity": 75,
      "keyWords": "Batata Doce,Orgânico,Saudável,Energia Natural",
      "imgUrl": [""],
      "productCost": 4.20,
      "offer": 0.15
    },
    {
      "description": "Tomate maduro e fresco, direto da horta",
      "title": "Tomate Maduro Fresco",
      "price": 8.00,
      "quantity": 50,
      "keyWords": "Tomate,Maduro,Fresco,Horta",
      "imgUrl": [""],
      "productCost": 3.80,
      "offer": 0.0
    },
    {
      "description": "Cenoura crocante, cultivada sem uso de agrotóxicos",
      "title": "Cenoura Orgânica",
      "price": 6.90,
      "quantity": 90,
      "keyWords": "Cenoura,Orgânico,Saudável,Crocante",
      "imgUrl": [""],
      "productCost": 2.70,
      "offer": 0.1
    },
    {
      "description": "Alface americana, fresca e crocante",
      "title": "Alface Americana",
      "price": 4.00,
      "quantity": 200,
      "keyWords": "Alface,Americana,Fresca,Crocante",
      "imgUrl": [""],
      "productCost": 1.50,
      "offer": 0.0
    },
    {
      "description": "Cebola roxa de excelente qualidade, rica em antioxidantes",
      "title": "Cebola Roxa Orgânica",
      "price": 5.00,
      "quantity": 120,
      "keyWords": "Cebola,Roxa,Orgânico,Antioxidantes",
      "imgUrl": [""],
      "productCost": 2.00,
      "offer": 0.05
    },
    {
      "description": "Azeite de oliva extravirgem, puro e saboroso",
      "title": "Azeite de Oliva Extravirgem",
      "price": 30.00,
      "quantity": 30,
      "keyWords": "Azeite,Oliva,Extravirgem,Puro,Saboroso",
      "imgUrl": [""],
      "productCost": 15.00,
      "offer": 0.0
    },
    {
      "description": "Ovos caipiras frescos, de galinhas criadas soltas",
      "title": "Ovos Caipiras",
      "price": 12.00,
      "quantity": 150,
      "keyWords": "Ovos,Caipira,Fresco,Galinhas Soltas",
      "imgUrl": [""],
      "productCost": 5.50,
      "offer": 0.0
    },
    {
      "description": "Abóbora moranga fresca e doce, ideal para sopas e doces",
      "title": "Abóbora Moranga",
      "price": 18.00,
      "quantity": 50,
      "keyWords": "Abóbora,Moranga,Fresca,Doce,Sopas,Doces",
      "imgUrl": [""],
      "productCost": 9.00,
      "offer": 0.0
    },
    {
      "description": "Pepino japonês crocante, ideal para saladas",
      "title": "Pepino Japonês Orgânico",
      "price": 7.80,
      "quantity": 70,
      "keyWords": "Pepino,Japonês,Orgânico,Crocante,Saladas",
      "imgUrl": [""],
      "productCost": 3.50,
      "offer": 0.2
    },
    {
      "description": "Abobrinha verde fresca, excelente para grelhar ou assar",
      "title": "Abobrinha Verde",
      "price": 5.60,
      "quantity": 100,
      "keyWords": "Abobrinha,Verde,Fresca,Grelhar,Assar",
      "imgUrl": [""],
      "productCost": 2.50,
      "offer": 0.0
    },
    {
      "description": "Mel de abelhas orgânico, 100% natural e saboroso",
      "title": "Mel Orgânico",
      "price": 25.00,
      "quantity": 40,
      "keyWords": "Mel,Orgânico,Natural,Saboroso",
      "imgUrl": [""],
      "productCost": 12.00,
      "offer": 0.0
    },
    {
      "description": "Queijo minas frescal artesanal, produzido com leite orgânico",
      "title": "Queijo Minas Frescal",
      "price": 22.00,
      "quantity": 30,
      "keyWords": "Queijo,Minas,Frescal,Orgânico,Artesanal",
      "imgUrl": [""],
      "productCost": 10.00,
      "offer": 0.1
    },
    {
      "description": "Leite integral orgânico, produzido sem conservantes",
      "title": "Leite Integral Orgânico",
      "price": 6.50,
      "quantity": 200,
      "keyWords": "Leite,Integral,Orgânico,Sem Conservantes",
      "imgUrl": [""],
      "productCost": 3.00,
      "offer": 0.0
    },
    {
      "description": "Açúcar mascavo orgânico, extraído de forma natural",
      "title": "Açúcar Mascavo Orgânico",
      "price": 10.00,
      "quantity": 80,
      "keyWords": "Açúcar,Mascavo,Orgânico,Natural",
      "imgUrl": [""],
      "productCost": 4.50,
      "offer": 0.0
    },
    {
      "description": "Café moído orgânico, cultivado nas montanhas",
      "title": "Café Orgânico Moído",
      "price": 28.00,
      "quantity": 40,
      "keyWords": "Café,Orgânico,Moído,Montanhas",
      "imgUrl": [""],
      "productCost": 14.00,
      "offer": 0.0
    },
    {
      "description": "Farinha de trigo integral orgânica, ideal para pães e bolos",
      "title": "Farinha de Trigo Integral",
      "price": 8.50,
      "quantity": 90,
      "keyWords": "Farinha,Trigo,Integral,Orgânico",
      "imgUrl": [""],
      "productCost": 3.90,
      "offer": 0.0
    },
    {
      "description": "Banana prata orgânica, colhida diretamente do produtor",
      "title": "Banana Prata Orgânica",
      "price": 6.80,
      "quantity": 150,
      "keyWords": "Banana,Prata,Orgânico,Fresca",
      "imgUrl": [""],
      "productCost": 2.80,
      "offer": 0.05
    },
    {
      "description": "Uva passa orgânica, sem conservantes, ideal para lanches",
      "title": "Uva Passa Orgânica",
      "price": 12.00,
      "quantity": 60,
      "keyWords": "Uva Passa,Orgânico,Sem Conservantes,Lanche",
      "imgUrl": [""],
      "productCost": 5.00,
      "offer": 0.1
    },
    {
      "description": "Coco fresco ralado, excelente para receitas",
      "title": "Coco Fresco Ralado",
      "price": 14.00,
      "quantity": 80,
      "keyWords": "Coco,Fresco,Ralado,Receitas",
      "imgUrl": [""],
      "productCost": 6.50,
      "offer": 0.0
    }
  ]
  

async function seed() {
    // const hashedPassword = await bcrypt.hash("123456", 10);

    // const defaultProducers = [
    //     {
    //         name: "default-producer1",	
    //         email: "defaultProducer1@agrocommerce.com",
    //         cpf: "19737191005",
    //         password: hashedPassword,
    //         birthDate: new Date("1990-01-01"),
    //     },
    //     {
    //         name: "default-producer2",	
    //         email: "defaultProducer2@agrocommerce.com",
    //         cpf: "19737191005",
    //         password: hashedPassword,
    //         birthDate: new Date("1990-01-01"),
    //     },
    //     {
    //         name: "default-producer3",	
    //         email: "defaultProducer3@agrocommerce.com",
    //         cpf: "94905382050",
    //         password: hashedPassword,
    //         birthDate: new Date("1990-01-01"),
    //     },
    //     {
    //         name: "default-producer4",	
    //         email: "defaultProducer4@agrocommerce.com",
    //         cpf: "35111838040",
    //         password: hashedPassword,
    //         birthDate: new Date("1990-01-01"),
    //     },
    //     {
    //         name: "default-producer5",	
    //         email: "defaultProducer5@agrocommerce.com",
    //         cpf: "40153188030",
    //         password: hashedPassword,
    //         birthDate: new Date("1990-01-01"),
    //     },
    // ]
    // // Seed default producers
    // for (const producer of defaultProducers) {
    //     const existingProducerByCnpj = await prisma.user.findUnique({
    //         where: { cpf: producer.cpf }
    //     });

    //     if (existingProducerByCnpj) {
    //         console.log(`Produtor com CNPJ ${producer.cpf} já existe. Pulando...`);
    //         continue;
    //     }

    //     await prisma.user.create({
    //         data: {
    //             name: producer.name,
    //             email: producer.email,
    //             cpf: producer.cpf,
    //             password: producer.password,
    //             birthDate: producer.birthDate,
    //         }
    //     })
    // }

    // const users = await prisma.user.findMany()
    // const producerData = [
    //     {
    //         cnpj: 41329667000110,
    //         companyName: 'Bacalahu com Arroz',
    //         telephone: 159930335762
    //     },
    //     {
    //         cnpj: 12345678000199,
    //         companyName: 'Frutas Tropicais',
    //         telephone: 11987654321
    //     },
    //     {
    //         cnpj: 98765432000188,
    //         companyName: 'Verduras Frescas',
    //         telephone: 21987654321
    //     },
    //     {
    //         cnpj: 19283746000177,
    //         companyName: 'Laticínios da Serra',
    //         telephone: 31987654321
    //     },
    //     {
    //         cnpj: 56473829000166,
    //         companyName: 'Carnes Nobres',
    //         telephone: 41987654321
    //     }
    // ];

    // for (const producer of producerData) {
    //     // Verificar se o CNPJ já existe
    //     const existingProducerByCnpj = await prisma.producer.findUnique({
    //         where: { cnpj: producer.cnpj }
    //     });

    //     if (existingProducerByCnpj) {
    //         console.log(`Produtor com CNPJ ${producer.cnpj} já existe. Pulando...`);
    //         continue;
    //     }

    //     // Selecionar aleatoriamente um usuário
    //     let randomUser;
    //     let existingProducerByUserId;

    //     do {
    //         randomUser = users[Math.floor(Math.random() * users.length)];
    //         existingProducerByUserId = await prisma.producer.findUnique({
    //             where: { userId: randomUser.id }
    //         });
    //     } while (existingProducerByUserId);

    //     // Atualizar o cargo do usuário para 'PRODUCER' se ele já tem um relacionamento
    //     if (existingProducerByUserId) {
    //         await prisma.user.update({
    //             where: { id: randomUser.id },
    //             data: { role: 'PRODUCER' }
    //         });
    //     } else {
    //         // Criar o produtor e atualizar o cargo do usuário para 'PRODUCER'
    //         await prisma.producer.create({
    //             data: {
    //                 userId: randomUser.id,
    //                 cnpj: producer.cnpj,
    //                 companyName: producer.companyName,
    //                 telephone: producer.telephone
    //             }
    //         });

    //         await prisma.user.update({
    //             where: { id: randomUser.id },
    //             data: { role: 'PRODUCER' }
    //         });
    //     }
    // }

    // console.log('Produtores criados e cargos atualizados com sucesso!');

    const producers = await prisma.producer.findMany();

    for (const product of products) {
        const randomProducer = producers[Math.floor(Math.random() * producers.length)];
        await prisma.product.create({
            data: {
                description: product.description,
                title: product.title,
                price: product.price,
                quantity: product.quantity,
                keyWords: product.keyWords,
                imgUrl: product.imgUrl,
                productCost: product.productCost,
                offer: product.offer,
                producer: {
                    connect: { id: randomProducer.id } // Assuming you have a producer with id 1 in your database
                }
            }
        })
    }
}

seed().then(() => {
    console.log('Seed completed successfully!');
    prisma.$disconnect();
}).catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
})