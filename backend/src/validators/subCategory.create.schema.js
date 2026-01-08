const { z } = require("zod");

const createSubCategorySchema = z.object({
  name: z
    .string({ required_error: "Subcategory name is required" })
    .trim()
    .min(2)
    .max(100),

  categoryId: z
    .string({ required_error: "Category ID is required" })
    .min(1),

  status: z.enum(["active", "inactive"]).optional(),
});

module.exports = { createSubCategorySchema };
