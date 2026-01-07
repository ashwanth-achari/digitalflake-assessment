const { z } = require("zod");

const subCategorySchema = z.object({
  name: z
    .string({ required_error: "Subcategory name is required" })
    .trim()
    .min(2, "Subcategory name must be at least 2 characters")
    .max(100, "Subcategory name must not exceed 100 characters"),

  image: z
    .string({ required_error: "Subcategory image is required" })
    .trim()
    .min(1, "Subcategory image is required"),

  categoryId: z
    .string({ required_error: "Category ID is required" })
    .min(1, "Category ID is required"),

  status: z
    .enum(["active", "inactive"])
    .optional(),
});

module.exports = { subCategorySchema };
