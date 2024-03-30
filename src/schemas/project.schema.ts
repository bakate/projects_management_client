import { z } from "zod";

const nameMinLength = 3;
const nameMaxLength = 50;
const descriptionMinLength = 10;
const descriptionMaxLength = 500;

export const TaskSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  projectId: z.string().optional(),
  status: z.enum(["in_progress", "completed"]),
  createdAt: z.string().optional(),
});

export const ProjectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(nameMinLength).max(nameMaxLength),
  description: z.string().min(descriptionMinLength).max(descriptionMaxLength),
  userId: z.string().optional(),
  status: z.enum(["active", "suspended", "completed"]),
  projectId: z.string().optional(),
  createdAt: z.string().optional(),
  tasks: z.array(TaskSchema).optional().or(z.array(z.string())).optional(),
});

export type TaskType = z.infer<typeof TaskSchema>;
export type ProjectType = z.infer<typeof ProjectSchema>;
