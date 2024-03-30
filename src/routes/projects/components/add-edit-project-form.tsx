import {
  createProjectAction,
  updateProjectAction,
} from "@/actions/project.actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Loader, Trash } from "lucide-react";
import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
      tasks: project ? project.tasks : [{ title: "", status: "in_progress" }],
    },
    mode: "onBlur",
  });

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
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

          <div className="flex flex-col space-y-4">
            {fields.map((project, index) => (
              <div key={project.id}>
                <FormLabel>Task {index + 1}</FormLabel>

                <div className="flex items-center">
                  <div className="flex flex-1 items-center gap-3">
                    <FormField
                      control={form.control}
                      name={`tasks.${index}.status`}
                      render={({ field }) => (
                        <FormItem className="items-center">
                          <FormControl>
                            <Checkbox
                              checked={field.value === "completed"}
                              onCheckedChange={(value) => {
                                if (value) {
                                  return field.onChange("completed");
                                } else {
                                  return field.onChange("in_progress");
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    ></FormField>
                    <FormField
                      control={form.control}
                      name={`tasks.${index}.title`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="task title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    ></FormField>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => remove(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              onClick={() => append({ title: "", status: "in_progress" })}
            >
              Add Task
            </Button>
          </div>

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
