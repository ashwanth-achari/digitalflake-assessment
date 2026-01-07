const { z } = require("zod");

const updateCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .optional(),

  status: z.enum(["active", "inactive"]).optional(),
});

module.exports = { updateCategorySchema };
