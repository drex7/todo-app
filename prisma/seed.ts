// import { prisma } from "~/lib/db";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
      // items: {
      //   create: [
      //     {
      //       title: "Finish project",
      //       description: "Complete the web app",
      //       dueDate: new Date("2025-08-10"),
      //       status: "In Progress",
      //       priority: "High",
      //     },
      //     {
      //       title: "Plan meeting",
      //       description: "Schedule team sync",
      //       dueDate: new Date("2025-08-05"),
      //       status: "Pending",
      //       priority: "Medium",
      //     },
      //   ],
      // },
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
