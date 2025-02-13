const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

const userData = require('./test-data/users.json');
const bulkFuelData = require('./test-data/fuelData.json');
const fuelSitesData = require('./test-data/fuelSites.json');
const usrMainData = require('./test-data/usrMain.json');

async function importData(){
    await prisma.user.createMany({
        data: userData,
        skipDuplicates: true,
    })
    await prisma.uSR_MAIN.createMany({
        data: usrMainData,
        skipDuplicates: true,
      })
    await prisma.lOC_MAIN.createMany({
        data: fuelSitesData,
        skipDuplicates: true,
    })
    await prisma.fTK_bulkfuel.createMany({
        data: bulkFuelData,
        skipDuplicates: true,
    })
}

importData().catch(e => {
    console.error(e);
    process.exit(1);
});
