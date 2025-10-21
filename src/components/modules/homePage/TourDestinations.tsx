import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { Link } from "react-router";

export default function TourDestinations() {
  const { data } = useGetDivisionsQuery(undefined);

  return (
    <div className="w-9/10 mx-auto">
      <ItemGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {data?.map((division) => (
          <Item key={division._id} variant="outline">
            <ItemHeader>
              <img
                src={division?.thumbnail}
                alt={division?.name}
                // width={128}
                // height={128}
                className="w-full rounded-sm object-cover"
              />
            </ItemHeader>
            <ItemContent>
              <ItemTitle>{division?.name} Division</ItemTitle>
              <ItemDescription>{division?.description}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm" asChild>
                <Link to={`/tours?division=${division._id}`}>Explore Tours →</Link>               
              </Button>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
