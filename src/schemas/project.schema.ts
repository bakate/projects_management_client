import { z } from "zod";

const nameMinLength = 3;
const nameMaxLength = 50;
const descriptionMinLength = 10;
const descriptionMaxLength = 500;

export const TaskSchema = z.object({
  title: z.string(),
  projectId: z.string(),
  status: z.enum(["in_progress", "completed"]),
  createdAt: z.string(),
});

export const ProjectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(nameMinLength).max(nameMaxLength),
  description: z.string().min(descriptionMinLength).max(descriptionMaxLength),
  userId: z.string().optional(),
  status: z.enum(["active", "suspended", "completed"]),
  projectId: z.string().optional(),
  createdAt: z.string(),
  tasks: z.array(TaskSchema).optional(),
});

const TaskWithoutMetadata = TaskSchema.omit({ createdAt: true });
export const ProjectWithoutMetadata = ProjectSchema.omit({
  createdAt: true,
});

export type TaskType = z.infer<typeof TaskWithoutMetadata>;
export type ProjectType = z.infer<typeof ProjectWithoutMetadata>;
