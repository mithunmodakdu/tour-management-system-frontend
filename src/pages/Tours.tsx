import { Button } from "@/components/ui/button";
import {
  useGetAllToursQuery,
  useGetTourTypeQuery,
} from "@/redux/features/tour/tour.api";
import { Link } from "react-router";
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
import { useState } from "react";

export default function Tours() {
  const [selectedDivision, setSelectedDivision] = useState<string | undefined>(undefined);
  const [selectedTourType, setSelectedTourType] = useState<string | undefined>(undefined);
  // console.log(selectedDivision)

  const { data } = useGetAllToursQuery({division: selectedDivision, tourType: selectedTourType});
  // console.log(data);

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

  const handleClearFilter = () =>{
    setSelectedDivision(undefined);
    setSelectedTourType(undefined)
  }

  return (
    <div className="flex gap-10">
      <div className="col-span-3 w-1/4 h-[500px] border border-muted rounded-md p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h1>Filters</h1>
          <Button onClick={handleClearFilter} size="sm" variant="outline">
            Clear Filter
          </Button>
        </div>
        <div>
          <Label className="mb-2">Division to visit</Label>
          <Select
            onValueChange={(value) => setSelectedDivision(value)}
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
            onValueChange={(value) => setSelectedTourType(value)}
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
      <div className="container mx-auto px-5 py-8 grid grid-cols-12 gap-5">
        <div className="col-span-9 w-full">
          {data?.map((item) => (
            <div
              key={item.slug}
              className="border border-muted rounded-lg shadow-md overflow-hidden mb-6 flex"
            >
              <div className="w-2/5 bg-red-500 flex-shrink-0">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="object-cover w-full h-full "
                />
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-3">{item.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-primary">
                    From ৳{item?.costFrom?.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Max {item.maxGuest} guests
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-medium">From:</span>{" "}
                    {item.departureLocation}
                  </div>
                  <div>
                    <span className="font-medium">To:</span>{" "}
                    {item.arrivalLocation}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span>{" "}
                    {item.tourPlan.length} days
                  </div>
                  <div>
                    <span className="font-medium">Min Age:</span> {item.minAge}+
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {item.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted/50 text-primary text-xs rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                  {item.amenities.length > 3 && (
                    <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                      +{item.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <Button asChild className="w-full">
                  <Link to={`/tours/${item._id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
