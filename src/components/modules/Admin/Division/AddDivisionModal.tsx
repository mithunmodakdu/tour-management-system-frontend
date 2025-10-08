import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useState } from "react";
import { useForm } from "react-hook-form";

export function AddDivisionModal() {
  const [image, setImage] = useState<File | null>(null);
  console.log("inside division modal", image)

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    }
  });


  const onSubmit = async (data) => {
    
    console.log(data);
    
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Division</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Division</DialogTitle>
          <DialogDescription>
            Please fill in the form here. Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id="add-division" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Dhaka"
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
                  <FormLabel>Division Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Dhaka is the capital city of Bangladesh...."
                      {...field}
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <SingleImageUploader onChange={setImage}/>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button form="add-division" type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
