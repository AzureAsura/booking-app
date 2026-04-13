import { PrismaPg } from '@prisma/adapter-pg';
import pkg from '../generated/prisma/index.js';
const { PrismaClient } = pkg;

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});


const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"] : ["error"]
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('db connected');
    } catch (error) {
        console.log('error connecting to db');
        console.log(error);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    await prisma.$disconnect();
};

export { prisma, connectDB, disconnectDB };