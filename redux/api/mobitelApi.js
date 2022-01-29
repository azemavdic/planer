import { emptySplitApi } from './emptySplitApi'

const mobitelApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getMobitel: build.query({
      query: () => 'racun/mobitel',
      providesTags: (result) =>
        result
          ? [
              //   ...result.map(({ id }) => ({ type: 'Posao', id })),
              { type: 'Mobitel', id: 'LIST' },
            ]
          : [{ type: 'Mobitel', id: 'LIST' }],
    }),
    dodajMobitel: build.mutation({
      query: (body) => ({
        url: 'racun/mobitel',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Mobitel', id: 'LIST' }],
    }),
    izbrisiMobitel: build.mutation({
      query: ({ id }) => ({
        url: `racun/mobitel/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Mobitel', id: 'LIST' }],
    }),
    updateMobitel: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `racun/mobitel/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Mobitel', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetMobitelQuery,
  useDodajMobitelMutation,
  useIzbrisiMobitelMutation,
  useUpdateMobitelMutation,
} = mobitelApi
