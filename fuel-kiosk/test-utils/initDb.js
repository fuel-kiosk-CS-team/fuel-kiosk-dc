const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

const userData = require('./test-data/users.json');

async function importData(){
    await prisma.user.createMany({
        data: userData,
        skipDuplicates: true,
    })
}

importData().catch(e => {
    console.error(e);
    process.exit(1);
});
