import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { canDelete, convertDays } from "@/lib/utils";
import { UserType } from "@/schemas/auth.schema";
import { ProjectType } from "@/schemas/project.schema";
import { Pencil, Trash } from "lucide-react";
import { useState, useTransition } from "react";

import { deleteProjectAction } from "@/actions/project.actions";
import Modal from "@/components/ui/modal";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AddOrEditProjectForm from "./add-edit-project-form";
import { Badge } from "@/components/ui/badge";

type ProjectProps = {
  project: ProjectType;
};
const Project = ({ project }: ProjectProps) => {
  const [currentUser] = useLoaderData() as [UserType];
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const canUserDelete = canDelete(currentUser.userId, project.userId!);
  const handleDeletion = async () => {
    startTransition(() => {
      deleteProjectAction(project.id!, currentUser.token).then((res) => {
        if (res?.error) {
          toast.error(res.message);
        }
        if (res?.project) {
          toast.success("Project deleted successfully");
          navigate("/");
        }
      });
    });
  };

  const timeElapsed =
    project.status === "active"
      ? Math.floor(
          (new Date().getTime() - new Date(project.createdAt!).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  return (
    <>
      <Card className="flex flex-col gap-4 p-4 hover:shadow-md w-[500px] border-4 ">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {project.name}
            <div>
              {currentUser?.token ? (
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="text-accent-foreground"
                  disabled={isPending}
                  onClick={() => setShowModal(true)}
                >
                  <Pencil className="h-5 w-5" />
                </Button>
              ) : null}
              {canUserDelete ? (
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  disabled={isPending}
                  className="text-accent-foreground"
                  onClick={handleDeletion}
                >
                  <Trash className="h-5 w-5" />
                </Button>
              ) : null}
            </div>
          </CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge>
                {project.status === "active"
                  ? "Active"
                  : project.status === "suspended"
                  ? "Suspended"
                  : "Completed"}
              </Badge>

              {project.status === "active" && (
                <span className="text-sm text-muted-foreground">
                  {convertDays(timeElapsed)}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Modal
        title="Edit Project"
        description="Update the project details below"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <AddOrEditProjectForm
          onClosed={() => setShowModal(false)}
          project={project}
        />
      </Modal>
    </>
  );
};

export default Project;
