import { emptySplitApi } from './emptySplitApi'

const vodaApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
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
    dodajVoda: build.mutation({
      query: (body) => ({
        url: 'racun/voda',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Voda', id: 'LIST' }],
    }),
    izbrisiVoda: build.mutation({
      query: ({ id }) => ({
        url: `racun/voda/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Voda', id: 'LIST' }],
    }),
    updateVoda: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `racun/voda/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Voda', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetVodaQuery,
  useDodajVodaMutation,
  useIzbrisiVodaMutation,
  useUpdateVodaMutation,
} = vodaApi
