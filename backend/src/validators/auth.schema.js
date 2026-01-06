const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .max(120, { message: "Email must not exceed 120 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be more than 7 characters" })
    .max(120, { message: "Password must not exceed 120 characters" }),
});

module.exports = {loginSchema };
