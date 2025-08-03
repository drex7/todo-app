import { prisma } from "~/lib/db";
import auth from "~/server/middleware/auth";

export default defineEventHandler(async (event) => {
  await auth(event);
  const { user } = (await requireUserSession(event)) as any;
  try {
    const items = await prisma.item.findMany({
      where: user.role === "ADMIN" ? {} : { userId: user.userId },
    });
    return items;
  } catch (err) {
    throw createError({ statusCode: 401, statusMessage: "Invalid token" });
  }
});
