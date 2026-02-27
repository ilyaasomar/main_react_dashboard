"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Github, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { styles } from "@/styles";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useNavigate } from "react-router";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email format."),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(values);
  };

  // show password input
  const PasswordInput = ({
    field,
    loading,
  }: {
    field: any;
    loading: boolean;
  }) => {
    const [show, setShow] = useState(false);

    return (
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          placeholder="Password"
          {...field}
          disabled={loading}
          id="password"
          aria-invalid={field.invalid}
          autoComplete="off"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-0"
          onClick={() => setShow(!show)}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </Button>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black p-3">
      <Card className="w-full max-w-md shadow-lg dark:bg-[#171717]">
        {/* START HERE */}
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password below to login your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="grid gap-4">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <PasswordInput field={field} loading={loading} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                form="login-form"
                disabled={loading}
                className={cn(
                  "w-full flex items-center justify-center gap-x-2 cursor-pointer",
                  styles.primaryBgColor,
                  `text-white hover:${styles.primaryBgColor}`,
                )}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
                Sign in with Email
              </Button>
            </FieldGroup>

            {/* --- Divider --- */}
            <div className="flex items-center gap-x-2 my-4">
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                OR CONTINUE WITH
              </span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
            </div>

            {/* --- Google & GitHub Buttons --- */}
            <div className="grid grid-cols-2 gap-x-3 ">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center cursor-pointer gap-x-2"
                onClick={() => {}}
                disabled={loading}
              >
                <FcGoogle size={20} className="h-5 w-5 text-red-500" />
                Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center cursor-pointer gap-x-2"
                onClick={() => {}}
                disabled={loading}
              >
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </div>
          </form>
        </CardContent>

        {/* END HERE */}
        <div className="flex flex-col items-center justify-center gap-y-2 mb-4">
          <button
            disabled={loading}
            className={cn(
              `cursor-pointer font-semibold text-sm ${styles.primaryColor} dark:text-[#10B981]`,
            )}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot your password?
          </button>
          <button
            disabled={loading}
            className={cn(
              `cursor-pointer font-semibold text-sm ${styles.primaryColor} dark:text-[#10B981]`,
            )}
            onClick={() => navigate("/register")}
          >
            Not have an account? Sign Up
          </button>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
