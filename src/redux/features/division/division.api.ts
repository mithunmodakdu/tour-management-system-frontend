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
          invalidatesTags: ["DIVISION"]
          
        }
      ),

      removeDivision: builder.mutation(
        {
          query: (divisionId) => ({
            url: `/division/${divisionId}`,
            method: "DELETE"
          }),
          invalidatesTags: ["DIVISION"]
        }
      ),

      getDivisions: builder.query(
        {
          query: (params) =>({
            url: "/division",
            method: "GET",
            params
          }),
          providesTags: ["DIVISION"],
          transformResponse: (response) => response.data
        }
      ),

      getDivisionBySlug: builder.query(
        {
          query: (divisionSlug) => ({
            url: `/division/${divisionSlug}`,
            method: "GET"
          }),
          providesTags: ["DIVISION"]
        }
      ),


    })
  }
);

export const {
 useAddDivisionMutation,
 useRemoveDivisionMutation,
 useGetDivisionsQuery,
 useGetDivisionBySlugQuery
} = divisionApi;
