import MultipleImagesUploader from "@/components/MultipleImagesUploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import {
  useAddTourMutation,
  useGetTourTypeQuery,
} from "@/redux/features/tour/tour.api";
import { format, formatISO } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  useFieldArray,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";

export function AddTour() {
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);
  // console.log(images);

  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypeQuery(undefined);
  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionsQuery(undefined);
  const [addTour] = useAddTourMutation();

  const divisionOptions = divisionData?.map(
    (item: { name: string; _id: string }) => ({
      divisionName: item.name,
      divisionId: item._id,
    })
  );
  // console.log(divisionOptions);

  const tourTypeOptions = tourTypeData?.map(
    (item: { name: string; _id: string }) => ({
      tourTypeName: item.name,
      tourTypeId: item._id,
    })
  );
  // console.log(tourTypeOptions);

  const form = useForm({
    defaultValues: {
      title: "",
      tourType: "",
      division: "",
      startDate: "",
      endDate: "",
      description: "",
      included: [{ value: "" }],
      excluded: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "included",
  });
  // console.log(fields);

  const {
    fields: excludedFields,
    append: excludedAppend,
    remove: excludedRemove,
  } = useFieldArray({
    control: form.control,
    name: "excluded",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
      included: data.included.map((item: { value: string }) => item.value),
      excluded: data.excluded.map((item: {value: string}) => item.value)
    };
    console.log(tourData);

    const formData = new FormData();
    // console.log(formData)
    formData.append("data", JSON.stringify(tourData));
    console.log(formData.get("data"));

    images.forEach((image) => formData.append("files", image as File));
    // console.log(formData.getAll("files"))

    try {
      const res = await addTour(formData).unwrap();
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(new Date(new Date().setDate((new Date().getDate()-1))))

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Add Tour</CardTitle>
        <CardDescription>Fill in the form to create tour.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            id="add-tour"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Bandarban Hills" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="tourType"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tour Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      disabled={tourTypeLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a tour type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tourTypeOptions?.map(
                          (item: {
                            tourTypeName: string;
                            tourTypeId: string;
                          }) => (
                            <SelectItem
                              key={item.tourTypeId}
                              value={item.tourTypeId}
                            >
                              {item.tourTypeName}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Division</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      disabled={divisionLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a division of tour location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {divisionOptions?.map(
                          (item: {
                            divisionName: string;
                            divisionId: string;
                          }) => (
                            <SelectItem
                              key={item.divisionId}
                              value={item.divisionId}
                            >
                              {item.divisionName}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date <
                            new Date(
                              new Date().setDate(new Date().getDate() - 1)
                            )
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date <
                            new Date(
                              new Date().setDate(new Date().getDate() - 1)
                            )
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-1 h-full  ">
                    <FormLabel>Tour Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-52"
                        placeholder="Discover the serene beauty of Bandarban...."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex-1 mt-5">
                <MultipleImagesUploader onChange={setImages} />
              </div>
            </div>

            {/* useArrayFields for Included*/}
            <div className="my-3">
              <div className="border-t border-muted w-full border-2 my-5" />
              <div className="flex justify-between">
                <p className="font-semibold">Included</p>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => append({ value: "" })}
                >
                  <Plus />
                </Button>
              </div>
              <div className="space-y-2 mt-3">
                {fields.map((item, index) => (
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      key={item.id}
                      name={`included.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* useArrayFields for Excluded */}
            <div className="my-3">
              <div className="border-t border-muted w-full border-2 my-5" />
              <div className="flex justify-between">
                <p className="font-semibold">Excluded</p>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => excludedAppend({ value: "" })}
                >
                  <Plus />
                </Button>
              </div>
              <div className="space-y-2 mt-3">
                {excludedFields.map((item, index) => (
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      key={item.id}
                      name={`excluded.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => excludedRemove(index)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button form="add-tour" type="submit" className="w-full">
          Create Tour
        </Button>
      </CardFooter>
    </Card>
  );
}
