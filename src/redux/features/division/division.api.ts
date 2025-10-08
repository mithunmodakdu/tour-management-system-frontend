import { baseApi } from "@/redux/baseApi";


export const divisionApi = baseApi.injectEndpoints(
  {
    endpoints: (builder) => ({
      addDivision: builder.mutation(
        {
          query: (divisionData) =>({
            url: "/division/create",
            method: "POST",
            data: divisionData
          }),
          
        }
      ),


      getTourType: builder.query(
        {
          query: () =>({
            url: "/tour/tour-types",
            method: "GET"
          }),
          providesTags: ["TOUR"],
          transformResponse: (response) => response.data
        }
      )

    })
  }
);

export const {
 useAddDivisionMutation
} = divisionApi;
