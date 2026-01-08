const { z } = require("zod");

const updateSubCategorySchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  categoryId: z.string().min(1).optional(),
  status: z.enum(["active", "inactive"]).optional(),
});

module.exports = { updateSubCategorySchema };
