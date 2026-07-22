import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, { message: "Minimum 2 characters" }),
  description: z.string().min(10, { message: "Minimum 10 characters" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.coerce.number().min(0, "Price must be non-negative"),
  stock: z.coerce.number().int().min(0, "Stock must be non-negative"),
  artisanName: z.string().min(1, { message: "Artisan name is required" }),
});

export type ProductFormData = z.infer<typeof productSchema>;

export const slugify = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
