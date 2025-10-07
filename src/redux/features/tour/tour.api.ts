import { baseApi } from "@/redux/baseApi";


export const tourApi = baseApi.injectEndpoints(
  {
    endpoints: (builder) => ({
      addTourType: builder.mutation(
        {
          query: (tourTypeName) =>({
            url: "/tour/create-tour-type",
            method: "POST",
            data: tourTypeName
          }),
          invalidatesTags: ["TOUR"],
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
  useAddTourTypeMutation,
  useGetTourTypeQuery
} = tourApi;
