import { zodResolver } from "@hookform/resolvers/zod";

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

import { signUpUserAction } from "@/actions/auth.actions";
import { SignUpSchema, SignUpType } from "@/schemas/auth.schema";
import { useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const handleSubmission = async (values: SignUpType) => {
    startTransition(() => {
      signUpUserAction(values).then((res) => {
        if (res?.error) {
          toast.error(res.message);
        }
        if (res?.token) {
          toast.success("Your account has been created successfully.");
          navigate("/");
        }
      });
    });
  };

  const form = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "coucou",
      email: "b@b.com",
      password: "12345678",
    },
    mode: "onBlur",
  });

  return (
    <div className="flex flex-col md:w-full items-center justify-center space-y-6  w-[300px]">
      <div className="text-center">
        <h1 className="text-3xl mb-3">Create an account</h1>
      </div>
      <Form {...form}>
        <form
          className="w-[250px] flex flex-col space-y-4"
          onSubmit={form.handleSubmit(handleSubmission)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder={"Username"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{"Email"}</FormLabel>
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
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
      <p className="pr-8 text-center text-sm text-muted-foreground w-[300px]">
        By clicking continue, you agree to our{" "}
        <Link
          to="/auth/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          to="/auth/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default SignUpForm;
