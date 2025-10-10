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
import { cn } from "@/lib/utils";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypeQuery } from "@/redux/features/tour/tour.api";
import { format, formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export function AddTour() {
  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypeQuery(undefined);
  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionsQuery(undefined);

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
    },
  });

  const onSubmit = async (data) => {
    // console.log(data);
    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate)
    }
    console.log(tourData);
    

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
                      defaultValue={field.value}
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
                            <SelectItem value={item.tourTypeId}>
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
                      defaultValue={field.value}
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
                            <SelectItem value={item.divisionId}>
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
                            date < new Date(new Date().setDate((new Date().getDate()-1)))
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
                            date < new Date(new Date().setDate((new Date().getDate()-1)))
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Discover the serene beauty of Bandarban...."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button form="add-tour" type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
