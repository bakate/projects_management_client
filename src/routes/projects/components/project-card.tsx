import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { canDelete, cn, convertDays } from "@/lib/utils";
import { UserType } from "@/schemas/auth.schema";
import { ProjectType } from "@/schemas/project.schema";
import { AlarmClock, Check, Pencil, Trash } from "lucide-react";
import { useState, useTransition } from "react";

import { deleteProjectAction } from "@/actions/project.actions";
import { Badge } from "@/components/ui/badge";
import Modal from "@/components/ui/modal";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AddOrEditProjectForm from "./add-edit-project-form";

type ProjectProps = {
  project: ProjectType;
};
const Project = ({ project }: ProjectProps) => {
  const [currentUser] = useLoaderData() as [UserType];
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const canUserDelete = canDelete(currentUser?.userId, project.userId!);
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

  let differenceInDays = 0;

  if (project.status === "active") {
    const now = new Date();
    const createdAt = new Date(project.createdAt!);
    const differenceInMilliseconds = now.getTime() - createdAt.getTime();
    differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  }

  return (
    <>
      <Card className="flex flex-col gap-4 py-4 hover:shadow-lg  hover:border-4 transition-all md:min-w-[400px]">
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
                  <Pencil className="h-4 w-4" />
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
                  <Trash className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
          </CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-5">
            <Badge>
              {project.status === "active"
                ? "Active"
                : project.status === "suspended"
                ? "Suspended"
                : "Completed"}
            </Badge>

            {project.status === "active" && (
              <span className="text-sm text-muted-foreground">
                {convertDays(differenceInDays)}
              </span>
            )}
          </div>
          {project.tasks?.length ? (
            <div className="grid gap-3">
              <Badge className="md:mx-auto max-w-16 md:w-full">
                <span>
                  {project.tasks?.length} task
                  {project.tasks?.length > 1 ? "s" : ""}
                </span>
              </Badge>
              <div className="grid sm:grid-cols-2  gap-y-3 gap-x-2 items-center">
                {project.tasks.map((task, index) => {
                  if (typeof task === "string") {
                    return null;
                  }
                  if (index < 6) {
                    return (
                      <div
                        key={task.id}
                        className="flex items-center space-x-2"
                      >
                        {task.status === "completed" ? (
                          <Check className="h-4 w-4 text-accent-foreground" />
                        ) : (
                          <AlarmClock className="h-4 w-4 text-accent-foreground" />
                        )}
                        <span
                          className={cn(
                            "text-sm text-muted-foreground line-clamp-1",
                            task.status === "completed" ? "line-through" : ""
                          )}
                        >
                          {task.title}
                        </span>
                      </div>
                    );
                  }
                  return (
                    <Badge
                      key={task.id}
                      variant={"secondary"}
                      className="px-0 text-muted-foreground"
                    >
                      +{project.tasks ? project.tasks.length - 6 : 0} more
                    </Badge>
                  );
                })}
              </div>
            </div>
          ) : null}
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
