import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: 'mockTicketApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://6485ba49a795d24810b73db0.mockapi.io/' }),
    endpoints: (builder) => ({
      getFlights: builder.query({
        query: (page = 1, per_page = 5) => `tickets?page=${page}&limit=${per_page}`,
      }),
    }),
  });

  
  export const { useGetFlightsQuery } = api;

