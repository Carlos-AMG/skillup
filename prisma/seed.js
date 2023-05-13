import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createOrUpdateArea(areaName) {
  const area = await prisma.area.findFirst({ where: { name: areaName } });

  if (!area) {
    return await prisma.area.create({ data: { name: areaName } });
  }

  return area;
}

async function main() {
  const social = await createOrUpdateArea('Social');
  const engineering = await createOrUpdateArea('Engineering');
  const health = await createOrUpdateArea('Health');
  const technology = await createOrUpdateArea('Technology');
  const education = await createOrUpdateArea('Education');

  console.log("Seeded areas: ", social, engineering, health, technology, education);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  