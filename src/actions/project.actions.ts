import { fetcher } from "@/lib/utils";
import { ProjectType } from "@/schemas/project.schema";

export const createProjectAction = async (data: ProjectType) => {
  return fetcher(import.meta.env.VITE_API_ENDPOINT + "projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getAllProjectsAction = async () => {
  return fetcher(import.meta.env.VITE_API_ENDPOINT + "projects");
};

export const getProjectAction = async (projectId: string) => {
  return fetcher(import.meta.env.VITE_API_ENDPOINT + `projects/${projectId}`);
};

export const updateProjectAction = async (data: ProjectType) => {
  return fetcher(
    import.meta.env.VITE_API_ENDPOINT + `projects/${data.projectId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
};

export const deleteProjectAction = async (projectId: string) => {
  return fetcher(import.meta.env.VITE_API_ENDPOINT + `projects/${projectId}`, {
    method: "DELETE",
  });
};
