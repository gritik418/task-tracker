import z from "zod";

const createTaskSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  description: z.string().trim().optional(),
  status: z.enum(["Todo", "In Progress", "Done"]).optional(),
  priority: z.enum(["High", "Medium", "Low"]).optional(),
});

const updateTaskSchema = createTaskSchema.partial();

export { createTaskSchema, updateTaskSchema };
