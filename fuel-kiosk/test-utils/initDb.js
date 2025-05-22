const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const loc_main_json = require('./test-data/LOC_MAIN.json');
const usr_main_json = require('./test-data/USR_MAIN.json');
const ftk_bulkfuel_json = require('./test-data/FTK_bulkfuel.json');

// This is essentially how the database is initialized for testing
// The main difference between the makeup of this database and the
// one that is used with the actual sites is the passwords, aka 
// 'disabled_reason', which can be found in test-data/USR_MAIN.json
// Again, this is really just for testing.

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
