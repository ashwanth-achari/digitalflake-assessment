const { z } = require("zod");

const categorySchema = z.object({
  name: z
    .string({ required_error: "Category name is required" })
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(100, "Category name must not exceed 100 characters"),

  image: z
    .string({ required_error: "Category image is required" })
    .trim()
    .min(1, "Category image is required"),

  status: z
    .enum(["active", "inactive"])
    .optional(),
});

module.exports = { categorySchema };
