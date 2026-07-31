import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
 
const prisma = new PrismaClient();
 
async function main() {
 
  const passwordHash = await bcrypt.hash(
    "Mazda2933",
    10
  );
 
 
  await prisma.admin.upsert({
 
    where: {
      username: "NeyshaburChess2933"
    },
 
    update: {
      password: passwordHash
    },
 
    create: {
      username: "NeyshaburChess2933",
      password: passwordHash
    }
 
  });
 
 
  console.log("Admin password updated");
 
}
 
 
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
 
    console.error(e);
 
    await prisma.$disconnect();
 
    process.exit(1);
 
  });
 