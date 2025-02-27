const { PrismaClient } = require('@prisma/client');
const dotenv = require("dotenv")
dotenv.config();

console.log("DATABASE_URL inside PrismaClient: ", process.env.DATABASE_URL)
console.log("Not able to get database url lmao wat")
const prisma = new PrismaClient();


const loc_main_json = require('./test-data/LOC_MAIN.json');
const usr_main_json = require('./test-data/USR_MAIN.json');
const ftk_bulkfuel_json = require('./test-data/FTK_bulkfuel.json');

async function importData(){
    // Insert testing USR_MAIN into DB
    await prisma.uSR_MAIN.createMany({
        data: usr_main_json,
        skipDuplicates: true,
    })

    // Insert testing LOC_MAIN into DB
    await prisma.lOC_MAIN.createMany({
        data: loc_main_json,
        skipDuplicates: true,
    })

    // Insert testing FTK_bulkfuel into DB
    await prisma.fTK_bulkfuel.createMany({
        data: ftk_bulkfuel_json,
        skipDuplicates: true,
    })
}

importData().catch(e => {
    console.error(e);
    process.exit(1);
});
