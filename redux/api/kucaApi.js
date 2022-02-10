import { emptySplitApi } from './emptySplitApi'

const kucaApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getAllKucaAktivnosti: build.query({
      query: () => 'kuca',
      providesTags: (result) =>
        result
          ? [
              //   ...result.map(({ id }) => ({ type: 'Posao', id })),
              { type: 'Kuca', id: 'LIST' },
            ]
          : [{ type: 'Kuca', id: 'LIST' }],
    }),
    addKucaAktivnost: build.mutation({
      query: (body) => ({
        url: 'kuca',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Kuca', id: 'LIST' }],
    }),
    izbrisiKucaAktivnost: build.mutation({
      query: ({ id }) => ({
        url: `kuca/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Kuca', id: 'LIST' }],
    }),
    updateKucaAktivnost: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `kuca/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Kuca', id: 'LIST' }],
    }),
    toggleZavrsenKuca: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `kuca/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Kuca', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllKucaAktivnostiQuery,
  useAddKucaAktivnostMutation,
  useIzbrisiKucaAktivnostMutation,
  useUpdateKucaAktivnostMutation,
  useToggleZavrsenKucaMutation,
} = kucaApi
