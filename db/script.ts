import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: "sally12",
      password: "i<3seashell",
    },
  });
  await prisma.user.create({
    data: {
      username: "johnathan",
      password: "amex22",
    },
  });
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
