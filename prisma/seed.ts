import { prisma } from '../src/lib/prisma';

async function seed() {
    
}

seed().then(() => {
    console.log('Seed completed successfully!');
    prisma.$disconnect();
}).catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
})