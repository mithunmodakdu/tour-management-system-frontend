import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  name: z.string().min(3, {error: "Name is too short"}).max(50),
  email: z.email(),
  password: z.string().min(8, {error: "Password is too short"}),
  confirmPassword: z.string().min(8, {error: "Confirm Password is too short"}),
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    console.log(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* {...props} */}

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register Now!</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details to create your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Mithun Kumer Modak" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mithunmodak@gmail.com" type="email" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="*************" type="password" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="*************" type="password" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  This is Confirm Password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Already have an account? <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
}
