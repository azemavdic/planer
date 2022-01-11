import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    reducerPath: 'posaoApi',
    tagTypes: ['Posao'],
    endpoints: (build) => ({
        getAllPosao: build.query({
            query: () => 'posao',
            providesTags: (result) =>
                result
                    ? [
                          //   ...result.map(({ id }) => ({ type: 'Posao', id })),
                          { type: 'Posao', id: 'LIST' },
                      ]
                    : [{ type: 'Posao', id: 'LIST' }],
        }),
        addPosao: build.mutation({
            query: (body) => ({
                url: 'posao',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Posao', id: 'LIST' }],
        }),
        izbrisiPosao: build.mutation({
            query: ({ id }) => ({
                url: `posao/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Posao', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetAllPosaoQuery,
    useAddPosaoMutation,
    useIzbrisiPosaoMutation,
} = api;
