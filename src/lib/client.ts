// Prisma ORM Documentation :- https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prismaclient-in-long-running-applications

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
