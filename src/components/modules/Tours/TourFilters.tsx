import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypeQuery } from "@/redux/features/tour/tour.api";
import { useSearchParams } from "react-router";

export default function TourFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("division"))
  // console.log(searchParams.get("tourType"))

  const selectedDivision = searchParams.get("division") || undefined;
  const selectedTourType = searchParams.get("tourType") || undefined;

  const { data: divisionData, isLoading: divisionLoading } = useGetDivisionsQuery(undefined);
  const { data: tourTypeData, isLoading: tourTypeLoading } = useGetTourTypeQuery(undefined);

  const divisionOptions = divisionData?.map(
    (item: { name: string; _id: string }) => ({
      divisionName: item.name,
      divisionId: item._id,
    })
  );
  
  const tourTypeOptions = tourTypeData?.map(
    (item: { name: string; _id: string }) => ({
      tourTypeName: item.name,
      tourTypeId: item._id,
    })
  );

 const handleDivisionChange = (value: string) => {
  const params = new URLSearchParams(searchParams);
  params.set("division", value);
  // console.log(params.get("division"))
  setSearchParams(params)
 };

 const handleTourTypeChange = (value: string) => {
  const params = new URLSearchParams(searchParams);
  params.set("tourType", value);
  // console.log(params.get("tourType"))
  setSearchParams(params);

 };

 const handleClearFilters = () => {
  const params = new URLSearchParams(searchParams);
  params.delete("division");
  params.delete("tourType");
  setSearchParams(params);
 };

  return (
    <div className="col-span-3 w-1/4 h-[500px] border border-muted rounded-md p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h1>Filters</h1>
          <Button onClick={handleClearFilters} size="sm" variant="outline">
            Clear Filter
          </Button>
        </div>
        <div>
          <Label className="mb-2">Division to visit</Label>
          <Select
            onValueChange={(value) => handleDivisionChange(value)}
            value={selectedDivision? selectedDivision : ""}
            disabled= {divisionLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Divisions</SelectLabel>
                {divisionOptions?.map(
                  (item: { divisionName: string; divisionId: string }) => (
                    <SelectItem key={item.divisionId} value={item.divisionId}>
                      {item.divisionName}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2">Tour Type</Label>
          <Select
            onValueChange={handleTourTypeChange}
            value={selectedTourType? selectedTourType : ""}
            disabled={tourTypeLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tour Type</SelectLabel>
                {tourTypeOptions?.map(
                  (item: { tourTypeId: string; tourTypeName: string }) => (
                    <SelectItem key={item.tourTypeId} value={item.tourTypeId}>
                      {item.tourTypeName}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
  );
}