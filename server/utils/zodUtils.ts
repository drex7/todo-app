import * as z from "zod/v4";

// export const getZodErrorMap: z.ZodErrorMap = (err, ctx) => {
//   // if (err.code === z.ZodIssueCode.invalid_type) {
//   //   if (err.received === "undefined") {
//   //     return { message: `${err.path[0]} is required` };
//   //   }
// 	// return { message: `${err.path[0]} is ${err.message}` };
//   // }
// 	return { message: "ctx.defaultError" };
// };

// z.string().parse(undefined, { errorMap });
// z.string().min(5, {
//   error: (issue) => {
//     if (issue.code === "too_small") {
//       return `Value must be >${issue.minimum}`;
//     }
//   },
// });

z.config({ 
		customError: (iss) => {
			if (iss.code === "invalid_type")
				return `Invalid type: ${iss.path} must be ${iss.expected}`;
		} 
});

export const itemBodySchema = z.object({
	title: z.string().min(2).max(100),
	description: z.string().max(500).optional(),
	dueDate: z.coerce.date(),
	status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
	priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export const uuidSchema = z.object({
  uuid: z.uuid(),
});

export const userBodySchema = z.object({
	username: z.string().min(5),
	password: z.string().min(8),
	email: z.string().email(),
	role: z.enum(["USER", "ADMIN"]),
});

export const loginBodySchema = z.object({
	username: z.string().min(5, "Username must be at least 5 characters"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	// email: z.string().email("Invalid email address"),
});

export default z;