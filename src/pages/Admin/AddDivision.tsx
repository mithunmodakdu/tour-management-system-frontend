import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddDivisionModal } from "@/components/modules/Admin/Division/AddDivisionModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetDivisionsQuery, useRemoveDivisionMutation } from "@/redux/features/division/division.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AddDivision() {
  const {data} = useGetDivisionsQuery(undefined);
  const [removeDivision] = useRemoveDivisionMutation();

  const handleRemoveDivision = async (divisionId: string) => {
    const toastId = toast.loading("Removing Division...")
    try {
      const res = await removeDivision(divisionId).unwrap();
      if (res.success) {
        toast.success("Division removed successfully.", {id: toastId});
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-5">
      <div className="flex justify-between my-10">
        <h1 className="text-2xl font-semibold">Divisions</h1>
        <AddDivisionModal/>
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
            {data?.map((item: { _id: string; name: string }) => (
              <TableRow>
                <TableCell>{item?.name}</TableCell>
                <TableCell>
                  <DeleteConfirmation
                    onConfirm={() => handleRemoveDivision(item._id)}
                  >
                    <Button className="size-sm">
                      <Trash2 />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
