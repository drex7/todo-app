export default defineEventHandler(async (event) => {

  // Attach authentication event context after login
  // const {
  //   user: { userId },
  // } = (await requireUserSession(event)) as any;
/*
  const token = getCookie(event, "token");
  if (!token) return false; //throw createError({ statusCode: 401, message: "Unauthorized" });

  const { verifyToken } = await import("../utils/auth");
  const user = verifyToken(token);
  if (!user) return false //throw createError({ statusCode: 401, message: "Invalid token" });

  event.context.user = user;
  */
});
