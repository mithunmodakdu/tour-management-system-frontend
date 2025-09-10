import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm();
  console.log(form);

  const onSubmit = (data) => {
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Mithun Kumer Modak" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Already have an account? <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
}
