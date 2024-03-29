import { fetcher } from "@/lib/utils";
import { ProjectSchema, ProjectType } from "@/schemas/project.schema";

export const createProjectAction = async (data: ProjectType, token: string) => {
  const res = await fetcher(import.meta.env.VITE_API_ENDPOINT + "projects", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const validateResponse = ProjectSchema.safeParse(res);

  if (!validateResponse.success) {
    return {
      error: res.error,
      message: res.message,
      statusCode: res.statusCode,
    } as const;
  }

  return {
    project: res,
  } as const;
};

export const getAllProjectsAction = async () => {
  return fetcher(import.meta.env.VITE_API_ENDPOINT + "projects");
};

export const getProjectAction = async (projectId: string) => {
  return fetcher(import.meta.env.VITE_API_ENDPOINT + `projects/${projectId}`);
};

export const updateProjectAction = async (
  projectId: string,
  data: ProjectType,
  token: string
) => {
  const res = await fetcher(
    import.meta.env.VITE_API_ENDPOINT + `projects/${projectId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const validateResponse = ProjectSchema.safeParse(res);

  if (!validateResponse.success) {
    return {
      error: res.error,
      message: res.message,
      statusCode: res.statusCode,
    } as const;
  }

  return {
    project: res,
  } as const;
};

export const deleteProjectAction = async (projectId: string, token: string) => {
  const res = await fetcher(
    import.meta.env.VITE_API_ENDPOINT + `projects/${projectId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const validateResponse = ProjectSchema.safeParse(res);

  if (!validateResponse.success) {
    return {
      error: res.error,
      message: res.message,
      statusCode: res.statusCode,
    } as const;
  }

  return {
    project: res,
  } as const;
};
