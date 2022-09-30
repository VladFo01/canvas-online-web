import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ImageRequest, ImageResponse } from '../../types';

const baseQuery = fetchBaseQuery({
    baseUrl: `http://${import.meta.env.VITE_API_BASE}`
});

export const apiSlice = createApi({
    baseQuery,
    endpoints: ({ mutation, query }) => ({
        uploadImage: mutation<ImageResponse, ImageRequest>({
            query: ({ image, sessionId }) => ({
                url: '/image',
                method: 'POST',
                params: { id: sessionId },
                body: { image }
            })
        }),
        getImage: query<ImageRequest, { sessionId: string }>({
            query: ({ sessionId }) => ({
                url: '/image',
                params: { sessionId }
            })
        })
    })
})

export const {
    useUploadImageMutation,
    useGetImageQuery,
} = apiSlice;
export const {
    getImage
} = apiSlice.endpoints;