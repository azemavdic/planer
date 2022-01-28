import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_MY_URL}/api/`,
  }),
  // reducerPath: 'posaoApi',
  tagTypes: [
    'Posao',
    'Mama',
    'Struja',
    'Voda',
    'Smece',
    'Mobitel',
    'Kablovska',
    'Iptv',
  ],
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
  useDodajStrujaMutation,
  useIzbrisiStrujaMutation,
  useUpdateStrujaMutation,
  useGetVodaQuery,
} = api
