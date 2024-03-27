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

import { useForm } from "react-hook-form";

import { loginUserAction } from "@/actions/auth.actions";
import { LoginSchema, LoginType } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const handleSubmission = async (values: LoginType) => {
    startTransition(() => {
      loginUserAction(values).then((res) => {
        if (res?.error) {
          toast.error(res.message);
        }
        if (res?.token) {
          toast.success("Login successful");
          navigate("/");
        }
      });
    });
  };

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "sada@sada.com",
      password: "tinkiete",
    },
    mode: "onBlur",
  });

  return (
    <div className="flex flex-col md:w-full items-center justify-center  space-y-6 mx-auto w-[300px]">
      <div className="text-center">
        <h1 className="text-3xl mb-3">Sign In</h1>
      </div>
      <Form {...form}>
        <form
          className="min-w-[250px] flex flex-col space-y-4"
          onSubmit={form.handleSubmit(handleSubmission)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-x-4">
                    <Input
                      disabled={isPending}
                      placeholder={"email@email.com"}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{"Password"}</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-x-4">
                    <Input
                      disabled={isPending}
                      placeholder={"Password"}
                      type="password"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-6 flex justify-between w-full space-x-4">
            <Button
              type="button"
              variant={"secondary"}
              className="w-full"
              asChild
            >
              <Link to="/">{"Cancel"}</Link>
            </Button>
            <Button type="submit" className="w-full" disabled={isPending}>
              Sign In
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
