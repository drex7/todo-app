import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export function createToken(payload: { userId: string; role: string }) {
  const token = jwt.sign(
			{ userId: payload.userId, role: payload.role },
			useRuntimeConfig().jwtSecret,
			{
				expiresIn: "1h",
			}
	);
	return token;
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, useRuntimeConfig().jwtSecret);
  } catch {
    return null;
  }
}

export async function comparePassword(plainPassword: string, hashedPassword: string) {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch {
    return null;
  }
}
