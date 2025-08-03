import { create } from "domain";
import { prisma } from "~/lib/db";
import z, { itemBodySchema, uuidSchema } from "~/server/utils/zodUtils";

export default defineEventHandler(async (event) => {
  const {
    user: { userId },
  } = (await requireUserSession(event)) as any;

  // const id = event.context.params?.id;
	const params = await getValidatedRouterParams(event, uuidSchema.safeParseAsync);
  const body = await readValidatedBody(event, itemBodySchema.parse);

	if (!params) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation Error",
      message: params,
      stack: undefined,
    });
  }
  const item = await prisma.item.update({
    where: { id: params.id, userId: userId },
    data: body,
  });
  if (!item) throw createError({ statusCode: 404, message: "Item not found" });

  return item;
});
