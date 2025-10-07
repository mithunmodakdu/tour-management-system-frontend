import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTourTypeQuery } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";

export default function AddTourType() {
  const { data } = useGetTourTypeQuery(undefined);
  console.log(data);
  return (
    <div className="w-full max-w-xl mx-auto px-5">
      <div className="flex justify-between my-10">
        <h1 className="text-2xl font-semibold">Tour Types</h1>
        <AddTourTypeModal/>
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item: {name: string}) => (
              <TableRow>
                <TableCell>{item?.name}</TableCell>
                <TableCell><Button className="size-sm"><Trash2/></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
