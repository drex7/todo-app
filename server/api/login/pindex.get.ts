import { prisma } from "~/lib/db";
import jwt from "jsonwebtoken";


export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, "authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw createError({ statusCode: 401, statusMessage: "No token provided" });
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, useRuntimeConfig().jwtSecret);
    if (typeof decoded !== "object" || decoded === null || !("userId" in decoded)) {
      throw createError({ statusCode: 401, statusMessage: "Invalid token" });
    }
    const user = await prisma.user.findUnique({
      where: { id: (decoded as { userId: string }).userId },
    });
    if (!user) {
      throw createError({ statusCode: 401, statusMessage: "Invalid token" });
    }
    return user;
  } catch (err) {
    throw createError({ statusCode: 401, statusMessage: "Invalid token" });
  }
});
