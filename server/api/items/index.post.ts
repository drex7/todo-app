import { prisma } from "~/lib/db";
import { itemBodySchema } from "~/server/utils/zodUtils";

export default defineEventHandler(async (event) => {
  const {
    user: { userId },
  } = (await requireUserSession(event)) as any;
  const body = await readValidatedBody(event, itemBodySchema.parse);

  const savedItem = await prisma.item.create({
    data: {
      ...body,
      user: {
        connect: { id: userId },
      },
    },
  });

  return savedItem;
});
