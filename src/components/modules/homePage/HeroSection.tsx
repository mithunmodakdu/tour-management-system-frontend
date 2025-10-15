import { Button} from "@/components/ui/button";
import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";

export default function HeroSection() {

  const [selectedDivision, setSelectedDivision] = useState<string | undefined>(
    undefined
  );

  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionsQuery(undefined);

  const divisionOption = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      divisionName: item.name,
      divisionId: item._id,
    })
  );

  return (
    <section className="relative overflow-hidden py-32 min-h-screen">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="opacity-90 [mask-image:radial-gradient(75%_75%_at_center,white,transparent)]"
        />
      </div>
      <div className="container relative z-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="bg-background/30 rounded-xl p-4 shadow-sm backdrop-blur-sm">
             <Logo/>
            </div>
            <div>
              <h1 className="mb-6 text-pretty text-2xl font-bold tracking-tight lg:text-5xl">
                Explore the beauty of{" "}
                <span className="text-primary">Nature</span>
              </h1>
              <p className="text-muted-foreground mx-auto max-w-3xl lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                doloremque mollitia fugiat omnis! Porro facilis quo animi
                consequatur. Explicabo.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Select onValueChange={(value) => setSelectedDivision(value)}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Divisions</SelectLabel>
                    {divisionOption?.map(
                      (item: { divisionName: string; divisionId: string }) => (
                        <SelectItem key={item.divisionId} value={item.divisionId}>
                          {item.divisionName}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {selectedDivision ? (
                <Button asChild>
                  <Link to={`/tours?division=${selectedDivision}`}>Search</Link>
                </Button>
              ) : (
                <Button disabled>Search</Button>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};


