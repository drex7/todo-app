import { prisma } from "~/lib/db";

import { userBodySchema } from "~/server/utils/zodUtils";

export default defineEventHandler(async (event) => {
  const { user } = (await requireUserSession(event)) as any;

  if (user.role !== "admin")
    throw createError({ statusCode: 403, message: "Forbidden" });

  const { data, error} = await readValidatedBody(event, userBodySchema.safeParseAsync);
  
	if(error) {
		throw createError({
      statusCode: 400,
      statusMessage: "Validation Error",
      message: JSON.parse(error.message)[0].message,
      stack: undefined,
    });
	}

  try {
    await prisma.user.create({
      data: data,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw createError({ statusCode: 500, message: "Internal Server Error" });
  }
  // Save user to DB (mock)
  return { message: `User created` };
});
