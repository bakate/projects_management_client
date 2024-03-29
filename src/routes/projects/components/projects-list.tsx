import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { ProjectType } from "@/schemas/project.schema";
import { useEffect, useState } from "react";
import AddOrEditProjectForm from "./add-edit-project-form";
import ProjectsListContent from "./projects-list-content";
import SidebarNavigation from "./sidebar-navigation";
import UserProfileCta from "./user-profile-cta";

type ProjectsListProps = {
  projects: ProjectType[];
};

const ProjectsList = ({ projects }: ProjectsListProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("active");
  const [filteredProjects, setFilteredProjects] =
    useState<ProjectType[]>(projects);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) => project.status === selectedStatus)
    );
  }, [selectedStatus, projects]);

  if (projects.length === 0) {
    return (
      <>
        <div className="grid place-items-center place-content-center h-screen rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              There are no projects yet
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start by adding a new project
            </p>
            <Button className="mt-4" onClick={() => setShowModal(true)}>
              Add Project
            </Button>
          </div>
        </div>
        <Modal
          title="Add New Project"
          description="Create a new project by filling out the form below"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <AddOrEditProjectForm onClosed={() => setShowModal(false)} />
        </Modal>
      </>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/90 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <SidebarNavigation
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            projects={projects}
          />
          <div className="mt-auto p-4">
            <UserProfileCta />
          </div>
        </div>
      </div>
      <ProjectsListContent
        filteredProjects={filteredProjects}
        projects={projects}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
    </div>
  );
};

export default ProjectsList;
