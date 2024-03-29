import { ProjectType } from "@/schemas/project.schema";
import { Activity, Ban, Check } from "lucide-react";
import ProjectStatusLink from "./project-status";

const SidebarNavigation = ({
  selectedStatus,
  setSelectedStatus,
  projects,
}: {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  projects: ProjectType[];
}) => (
  <nav className="grid items-start px-2 text-sm font-medium lg:px-4 mt-28">
    <ProjectStatusLink
      status="active"
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
      icon={<Activity className="h-4 w-4" />}
      text="Active Projects"
      count={projects.filter((project) => project.status === "active").length}
    />
    <ProjectStatusLink
      status="suspended"
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
      icon={<Ban className="h-4 w-4" />}
      text="Suspended Projects"
      count={
        projects.filter((project) => project.status === "suspended").length
      }
    />
    <ProjectStatusLink
      status="completed"
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
      icon={<Check className="h-4 w-4" />}
      text="Completed Projects"
      count={
        projects.filter((project) => project.status === "completed").length
      }
    />
  </nav>
);

export default SidebarNavigation;
