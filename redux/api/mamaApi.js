import { emptySplitApi } from './emptySplitApi'

const mamaApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
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
  }),
  overrideExisting: false,
})

export const {
  useGetAllMamaAktivnostiQuery,
  useAddMamaAktivnostMutation,
  useIzbrisiMamaAktivnostMutation,
  useUpdateMamaAktivnostMutation,
  useToggleZavrsenMamaMutation,
} = mamaApi
