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
import {useGetDivisionBySlugQuery } from "@/redux/features/division/division.api";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  slug: string;
}

export function EditDivisionModal(props: IProps) {

  // console.log(props)

  const [image, setImage] = useState<File | null>(null);
  console.log("inside division edit modal", image)
  
  const {data} = useGetDivisionBySlugQuery(props.slug);
  console.log(data)

  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: `${data?.data?.name}` || "",
      description: `${data?.data?.description}` || "",
    },
  });

 

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="size-sm">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Division</DialogTitle>
          <DialogDescription>
            Please fill in the form here. Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="add-division"
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={data?.data?.name} />
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
                      {...field}
                      value={data?.data?.description}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <SingleImageUploader onChange={setImage} />
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={!image} form="edit-division" type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
