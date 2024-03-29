import { createProjectAction } from "@/actions/project.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserType } from "@/schemas/auth.schema";
import { ProjectType, ProjectWithoutMetadata } from "@/schemas/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type AddOrEditProjectFormProps = {
  project?: ProjectType;
  onClosed: () => void;
};
const AddOrEditProjectForm = ({
  onClosed,
  project,
}: AddOrEditProjectFormProps) => {
  const [user] = useLoaderData() as [UserType];

  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const form = useForm<ProjectType>({
    resolver: zodResolver(ProjectWithoutMetadata),
    defaultValues: {
      name: project
        ? project.name
        : ``,
      description: project
        ? project.description
        : "",
      status: project ? project.status : "active",
    },
    mode: "onBlur",
  });

  const handleSubmission = async (data: ProjectType) => {
    startTransition(() => {
      createProjectAction(data, user.token).then((res) => {
        if (res?.error) {
          toast.error(res.message);
        }
        if (res.project) {
          toast.success(project ? "Project updated successfully" : "Project created successfully");
          onClosed();
          navigate("/");
        }
      });
    });
  };
  return (
    <div className="flex flex-col w-full">
      <Form {...form}>
        <form
          className="min-w-[400px] flex flex-col space-y-4"
          onSubmit={form.handleSubmit(handleSubmission)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="project name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-x-4">
                    <Textarea
                      disabled={isPending}
                      placeholder={"project description"}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-8 flex justify-between w-full space-x-4">
            <Button
              type="button"
              variant={"secondary"}
              className="w-full"
              disabled={isPending}
              onClick={onClosed}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full" disabled={isPending}>
              Create Project
              {isPending ? <Loader className="ml-2 animate-spin" /> : ""}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddOrEditProjectForm;
