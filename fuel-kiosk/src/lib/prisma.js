import { PrismaClient } from '@prisma/client'

const globalForPrisma = global;

exports.prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = exports.prisma;
