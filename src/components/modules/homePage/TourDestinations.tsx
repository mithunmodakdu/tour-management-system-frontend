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

export default function TourDestinations() {
  const { data } = useGetDivisionsQuery(undefined);

  return (
    <div className="flex w-full flex-col gap-6">
      <ItemGroup className="grid grid-cols-4 gap-4">
        {data.map((division) => (
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
              <Button variant="outline" size="sm" className="block">
                Explore Tours →
              </Button>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
