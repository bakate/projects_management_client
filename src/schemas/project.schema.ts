import { z } from "zod";

export const taskSchema = z.object({
  title: z.string(),
  projectId: z.string(),
  status: z.enum(["in_progress", "completed"]),
  createdAt: z.string(),
});

export const projectSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  userId: z.string(),
  status: z.enum(["active", "suspended", "completed"]),
  projectId: z.string(),
  createdAt: z.string(),
  tasks: z.array(taskSchema).optional(),
});

const taskWithoutMetadata = taskSchema.omit({ createdAt: true });
const projectWithoutMetadata = projectSchema.omit({
  createdAt: true,
  userId: true,
});

export type TaskType = z.infer<typeof taskWithoutMetadata>;
export type ProjectType = z.infer<typeof projectWithoutMetadata>;
