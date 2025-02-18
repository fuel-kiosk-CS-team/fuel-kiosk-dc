const { PrismaClient } = require("@prisma/client");
// Database Initialization

const dotenv = require("dotenv")
dotenv.config()

console.log("DATABASE_URL inside PrismaClient:", process.env.DATABASE_URL);


const prisma = new PrismaClient();

const sites = [
  { value: "site-1", label: "ADMIN--FUEL SITE ADMINISTRATOR" },
  { value: "site-2", label: "CBARC-M--COLUMBIA BASIN AG RESEARCH-MOR" },
  { value: "site-3", label: "CBARC-P--COLUMBIA BASIN AG RESEARCH-PEN" },
  { value: "site-4", label: "COAREC--CENTRAL OREGON AG RES EXT" },
  { value: "site-5", label: "DAIRY--CORVALLIS" },
  { value: "site-6", label: "EOARC-B--EASTERN OREGON AG RESEARCH" },
  { value: "site-7", label: "EOARC-U--EASTERN OREGON AG RESEARCH" },
  { value: "site-8", label: "HAREC--HERMISTON AG RESEARCH STATION" },
  { value: "site-9", label: "KBREC--KLAMATH BASIN EXPERIMENT STA" },
  { value: "site-10", label: "MES--MALHEUR EXPERIMENT STATION" },
  { value: "site-11", label: "NWREC--NORTH WILLAMETTE RES EXTEN CTR" },
  { value: "site-12", label: "SOREC--SOUTHERN OREGON RES EXT CTR" },
];

async function seedDatabase() {
console.log("Seeding database...")
try{

    
    for (const site of sites) {
        const [operOperNo, _] = site.label.split("--");
        // like 'admin'
        const oper_no_lower = operOperNo.toLowerCase();
        // Right now just makes up some random four digit code as the 'password'
        // const disabled_reason = Math.floor(1000 + Math.random() * 9000).toString();
        // Temp const password for all fuel sites for testing purposes
        const disabled_reason = 1111;
        
        await prisma.uSR_MAIN.create({
            data: {
                USR_userid: site.label, // Using label as the unique user ID
                oper_oper_no: oper_no_lower, // Extracted and converted to lowercase
                disabled_reason: disabled_reason,
            },
        });
        
        await prisma.lOC_MAIN.create({
            data: {
                LOC_loc_code: oper_no_lower,
                name: `${operOperNo} Location`, // Generic name placeholder
                email_addr: `${oper_no_lower}@oregonstate.edu`, // Generic email
                is_fuel_site: true,
            },
        });
    }
    console.log("Success!")
} catch (error) {
    console.error("Seeding error:" , error)
} finally {
    await prisma.$disconnect();
}
}

seedDatabase();
//   .catch((error) => console.error(error))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
