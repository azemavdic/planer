import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_MY_URL}/api/`,
  }),

  tagTypes: [
    'Posao',
    'Kuca',
    'Mama',
    'Struja',
    'Voda',
    'Smece',
    'Mobitel',
    'Kablovska',
    'Iptv',
  ],
  endpoints: () => ({}),
})
