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
import {useEditDivisionMutation, useGetDivisionBySlugQuery } from "@/redux/features/division/division.api";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  slug: string;
}



export function EditDivisionModal(props: IProps) {

  // console.log(props)

  const [image, setImage] = useState<File | null>(null);
  // console.log("inside division edit modal", image)
  
  const {data:divisionBySlugData } = useGetDivisionBySlugQuery(props.slug);
  console.log(divisionBySlugData)

  const [editDivision] = useEditDivisionMutation();

  const [open, setOpen] = useState(false);

  const form = useForm();

  const onSubmit = async (data) => {
    // console.log(data)

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File );
    // console.log(formData.get("data"))
    // console.log(formData.get("file"))

    const toastId = toast.loading("Updating division info...");

    const divisionId = divisionBySlugData?._id;
    const updateData = {
      divisionId,
      formData
    }

    try {
      const res = await editDivision(updateData).unwrap();
      // console.log(res)
      if(res.success){
        toast.success("Division info updated successfully", {id: toastId});
        setOpen(false);
      }
    } catch (error) {
      console.error(error)
    }


  };

 

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
            Please edit or update division info here. Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="edit-division"
            className="space-y-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Name</FormLabel>
                  <FormControl>
                    <Input defaultValue={divisionBySlugData?.name}  {...field}  />
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
                      defaultValue={divisionBySlugData?.description}
                      {...field}
                    
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <SingleImageUploader thumbnail={divisionBySlugData?.thumbnail} onChange={setImage} />
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
