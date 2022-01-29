import { emptySplitApi } from './emptySplitApi'

const kablovskaApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getKablovska: build.query({
      query: () => 'racun/kablovska',
      providesTags: (result) =>
        result
          ? [
              //   ...result.map(({ id }) => ({ type: 'Posao', id })),
              { type: 'Kablovska', id: 'LIST' },
            ]
          : [{ type: 'Kablovska', id: 'LIST' }],
    }),
    dodajKablovska: build.mutation({
      query: (body) => ({
        url: 'racun/kablovska',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Kablovska', id: 'LIST' }],
    }),
    izbrisiKablovska: build.mutation({
      query: ({ id }) => ({
        url: `racun/kablovska/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Kablovska', id: 'LIST' }],
    }),
    updateKablovska: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `racun/kablovska/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Kablovska', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetKablovskaQuery,
  useDodajKablovskaMutation,
  useIzbrisiKablovskaMutation,
  useUpdateKablovskaMutation,
} = kablovskaApi
