import { Logo } from "@/components/logo";
import NoResults from "@/components/no-results";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ProjectType } from "@/schemas/project.schema";
import { StopwatchIcon } from "@radix-ui/react-icons";
import { Activity, Check, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddOrEditProjectForm from "./add-edit-project-form";
import Project from "./project-card";
import ProjectStatusLink from "./project-status";
import UserProfileCta from "./user-profile-cta";

type ProjectsListContent = {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  projects: ProjectType[];
  filteredProjects: ProjectType[];
};

const ProjectsListContent = ({
  selectedStatus,
  setSelectedStatus,
  projects,
  filteredProjects,
}: ProjectsListContent) => {
  const [showModal, setShowModal] = useState(false);
  if (!filteredProjects.length) {
    return (
      <NoResults
        content={`No products found for the status "${selectedStatus}"`}
      />
    );
  }

  return (
    <div className="flex flex-col mt-[9rem] sm:mt-2">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                to="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Logo className="h-6 my-4" />
              </Link>
              <ProjectStatusLink
                status="active"
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                icon={<Activity className="h-4 w-4" />}
                text="Active Projects"
                count={
                  projects.filter((project) => project.status === "active")
                    .length
                }
              />
              <ProjectStatusLink
                status="suspended"
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                icon={<StopwatchIcon className="h-4 w-4" />}
                text="Suspended Projects"
                count={
                  projects.filter((project) => project.status === "suspended")
                    .length
                }
              />
              <ProjectStatusLink
                status="completed"
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                icon={<Check className="h-4 w-4" />}
                text="Completed Projects"
                count={
                  projects.filter((project) => project.status === "completed")
                    .length
                }
              />
            </nav>
            <div className="mt-auto">
              <UserProfileCta />
            </div>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {selectedStatus === "active"
              ? "Active"
              : selectedStatus === "suspended"
              ? "Suspended"
              : "Completed"}{" "}
            Projects
          </h2>
          <Button onClick={() => setShowModal(true)}>Add Project</Button>
        </div>
        <div className="grid  md:grid-cols-2 xl:grid-cols-3 mt-10 gap-6">
          {filteredProjects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      </main>
      <Modal
        title="Add New Project"
        description="Create a new project by filling out the form below"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <AddOrEditProjectForm onClosed={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};

export default ProjectsListContent;
