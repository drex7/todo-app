import { prisma } from "~/lib/db";
import auth from "~/server/middleware/auth";

export default defineEventHandler(async (event) => {
  await auth(event);

  const { user: { userId } } = await requireUserSession(event) as any;
  const id = event.context.params?.id;

  await prisma.item.delete({
    where: { id: id, userId },
  });

  return { message: "Item Deleted" };
});
