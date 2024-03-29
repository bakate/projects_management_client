import {
  createProjectAction,
  updateProjectAction,
} from "@/actions/project.actions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserType } from "@/schemas/auth.schema";
import { ProjectSchema, ProjectType } from "@/schemas/project.schema";
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
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: project ? project.name : ``,
      description: project ? project.description : "",
      status: project ? project.status : "active",
    },
    mode: "onBlur",
  });

  const handleSubmission = async (data: ProjectType) => {
    startTransition(() => {
      if (project) {
        updateProjectAction(project.id!, data, user.token).then((res) => {
          if (res?.error) {
            toast.error(res.message);
          }
          if (res.project) {
            toast.success("Project updated successfully");
            onClosed();
            navigate("/");
          }
        });
      } else {
        createProjectAction(data, user.token).then((res) => {
          if (res?.error) {
            toast.error(res.message);
          }
          if (res.project) {
            toast.success("Project created successfully");
            onClosed();
            navigate("/");
          }
        });
      }
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
          {project ? (
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
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
              {project ? "Update Project" : "Create Project"}
              {isPending ? <Loader className="ml-2 animate-spin" /> : ""}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddOrEditProjectForm;
