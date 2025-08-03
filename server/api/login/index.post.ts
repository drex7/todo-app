import { loginBodySchema } from "~/server/utils/zodUtils";

import { prisma } from "~/lib/db";
import { comparePassword, createToken } from "~/server/utils/auth";


export default defineEventHandler(async (event) => {
  // try {
    const { data, error } = await readValidatedBody(
      event,
      loginBodySchema.safeParseAsync
    );

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation Error",
        message: JSON.parse(error.message)[0].message,
        stack: undefined,
      });
    }
    
    const { username, password } = data;

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !(await comparePassword(password, user.password))) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid credentials",
        stack: undefined
      });
    }
    console.log("jwtSecret ===> ", useRuntimeConfig().jwtSecret);

    const token = createToken({
      userId: user.id,
      role: user.role,
    });

    await setUserSession(event, {
      user: {
        name: user.username,
        userId: user.id,
        role: user.role,
      },
    });

    // TODO: Revisit this to check if cookie is still needed
    // after implementing session
    setCookie(event, "token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });
    return { message: "Login successful" };
  // } 
  // catch (error: any) {
  //   console.error("Error logging in:", error);
  //   console.dir(JSON.parse(error.message)[0].message);
  //   if (error instanceof z.ZodError) {
  //     throw createError ({
  //       statusCode: 400,
  //       statusMessage: "Bad request",
  //       message: JSON.parse(error.message)[0].message,
  //       data: error,
  //     });
  //   }
  //   else {
  //     throw createError({
  //       statusCode: 500,
  //       statusMessage: "Internal Server Error",
  //     });
  //   }
  // }
});
