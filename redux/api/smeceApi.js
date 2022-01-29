import { emptySplitApi } from './emptySplitApi'

const smeceApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getSmece: build.query({
      query: () => 'racun/smece',
      providesTags: (result) =>
        result
          ? [
              //   ...result.map(({ id }) => ({ type: 'Posao', id })),
              { type: 'Smece', id: 'LIST' },
            ]
          : [{ type: 'Smece', id: 'LIST' }],
    }),
    dodajSmece: build.mutation({
      query: (body) => ({
        url: 'racun/smece',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Smece', id: 'LIST' }],
    }),
    izbrisiSmece: build.mutation({
      query: ({ id }) => ({
        url: `racun/smece/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Smece', id: 'LIST' }],
    }),
    updateSmece: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `racun/smece/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Smece', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetSmeceQuery,
  useDodajSmeceMutation,
  useIzbrisiSmeceMutation,
  useUpdateSmeceMutation,
} = smeceApi
