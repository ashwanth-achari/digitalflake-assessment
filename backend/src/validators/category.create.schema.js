const { z } = require("zod");

const createCategorySchema = z.object({
  name: z
    .string({ required_error: "Category name is required" })
    .trim()
    .min(2)
    .max(100),

  status: z.enum(["active", "inactive"]).optional(),
});

module.exports = { createCategorySchema };
