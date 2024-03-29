import { ProjectType } from "@/schemas/project.schema";

type ProjectProps = {
  project: ProjectType;
};
const Project = ({ project }: ProjectProps) => {
  return (
    <div
      key={project.id}
      className="bg-white shadow-lg rounded-lg m-4 p-6 w-80"
    >
      <h2 className="text-xl font-semibold">{project.name}</h2>
      <p className="text-gray-500 mt-2">{project.description}</p>
    </div>
  );
};

export default Project;
