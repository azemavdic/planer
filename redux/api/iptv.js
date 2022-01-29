import { emptySplitApi } from './emptySplitApi'

const iptvApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getIptv: build.query({
      query: () => 'racun/iptv',
      providesTags: (result) =>
        result
          ? [
              //   ...result.map(({ id }) => ({ type: 'Posao', id })),
              { type: 'Iptv', id: 'LIST' },
            ]
          : [{ type: 'Iptv', id: 'LIST' }],
    }),
    dodajIptv: build.mutation({
      query: (body) => ({
        url: 'racun/iptv',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Iptv', id: 'LIST' }],
    }),
    izbrisiIptv: build.mutation({
      query: ({ id }) => ({
        url: `racun/Iptv/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Iptv', id: 'LIST' }],
    }),
    updateIptv: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `racun/iptv/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Iptv', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetIptvQuery,
  useDodajIptvMutation,
  useIzbrisiIptvMutation,
  useUpdateIptvMutation,
} = iptvApi
