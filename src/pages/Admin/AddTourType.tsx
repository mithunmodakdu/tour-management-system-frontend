import { useGetTourTypeQuery } from "@/redux/features/tour/tour.api";

export default function AddTourType() {
  const {data} = useGetTourTypeQuery(undefined);
  console.log(data)
  return (
    <div>
      AddTourType Component
    </div>
  );
}