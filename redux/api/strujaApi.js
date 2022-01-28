import { emptySplitApi } from './emptySplitApi'

const strujaApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
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
    dodajStruja: build.mutation({
      query: (body) => ({
        url: 'racun/struja',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Struja', id: 'LIST' }],
    }),
    izbrisiStruja: build.mutation({
      query: ({ id }) => ({
        url: `racun/struja/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Struja', id: 'LIST' }],
    }),
    updateStruja: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `racun/struja/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Struja', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetStrujaQuery,
  useDodajStrujaMutation,
  useIzbrisiStrujaMutation,
  useUpdateStrujaMutation,
} = strujaApi
