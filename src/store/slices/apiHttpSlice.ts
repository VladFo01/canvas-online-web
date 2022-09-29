import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `http://${import.meta.env.VITE_API_BASE}`
});

const apiSlice = createApi({
    baseQuery,
    endpoints: ({ mutation, query }) => ({
    })
})