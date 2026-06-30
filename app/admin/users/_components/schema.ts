import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const base = {
  firstName: z.string().min(2, {
    message: "Minimum 2 characters",
  }),

  lastName: z.string().min(2, {
    message: "Minimum 2 characters",
  }),

  email: z.string().email({
    message: "Invalid email address",
  }),

  username: z.string().min(3, {
    message: "Minimum 3 characters",
  }),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),

  gender: z.enum(["male", "female", "other"]),

  role: z.enum(["user", "admin"]),
};

export const createUserSchema = z.object({
  ...base,

  password: z.string().min(6, {
    message: "Minimum 6 characters",
  }),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
// edit mirrors update-profile: multipart with optional image, no password
export const editUserSchema = z.object({
  ...base,
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 5MB",
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported",
    }),
});
export type EditUserFormData = z.infer<typeof editUserSchema>;
