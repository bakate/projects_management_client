import { Navbar } from "@/components/navbar";
import { UserType } from "@/schemas/auth.schema";
import { ProjectType } from "@/schemas/project.schema";
import { useLoaderData } from "react-router-dom";
import ProjectsList from "./components/projects-list";

const ProjectsContainer = () => {
  const [user, projects] = useLoaderData() as [UserType, ProjectType[]];
  return (
    <div>
      <Navbar user={user} />
      <ProjectsList projects={projects} />
    </div>
  );
};

export default ProjectsContainer;
