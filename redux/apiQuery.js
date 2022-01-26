import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_MY_URL}/api/`,
  }),
  // reducerPath: 'posaoApi',
  tagTypes: ['Posao', 'Mama', 'Struja', 'Voda'],
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
    updatePosao: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `posao/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Posao', id: 'LIST' }],
    }),
    toggleZavrsen: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `posao/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Posao', id: 'LIST' }],
    }),
    getAllMamaAktivnosti: build.query({
      query: () => 'mama',
      providesTags: (result) =>
        result
          ? [
              //   ...result.map(({ id }) => ({ type: 'Posao', id })),
              { type: 'Mama', id: 'LIST' },
            ]
          : [{ type: 'Mama', id: 'LIST' }],
    }),
    addMamaAktivnost: build.mutation({
      query: (body) => ({
        url: 'mama',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Mama', id: 'LIST' }],
    }),
    izbrisiMamaAktivnost: build.mutation({
      query: ({ id }) => ({
        url: `mama/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Mama', id: 'LIST' }],
    }),
    updateMamaAktivnost: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `mama/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Mama', id: 'LIST' }],
    }),
    toggleZavrsenMama: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `mama/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Mama', id: 'LIST' }],
    }),
    getStruja: build.query({
      query: () => 'racun/struja',
      providesTags: (result) =>
        result
          ? [
              //   ...result.map(({ id }) => ({ type: 'Posao', id })),
              { type: 'Struja', id: 'LIST' },
            ]
          : [{ type: 'Struja', id: 'LIST' }],
    }),
    getVoda: build.query({
      query: () => 'racun/voda',
      providesTags: (result) =>
        result
          ? [
              //   ...result.map(({ id }) => ({ type: 'Posao', id })),
              { type: 'Voda', id: 'LIST' },
            ]
          : [{ type: 'Voda', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetAllPosaoQuery,
  useAddPosaoMutation,
  useIzbrisiPosaoMutation,
  useUpdatePosaoMutation,
  useToggleZavrsenMutation,
  useGetAllMamaAktivnostiQuery,
  useAddMamaAktivnostMutation,
  useIzbrisiMamaAktivnostMutation,
  useToggleZavrsenMamaMutation,
  useUpdateMamaAktivnostMutation,
  useGetStrujaQuery,
  useGetVodaQuery,
} = api
