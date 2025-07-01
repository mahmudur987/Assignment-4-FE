import type { Book } from "@/pages/Books";
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";

export interface customError {
  data: {
    message: string;
    success: boolean;
    error: {};
  };
  status: number;
}

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://l2-a3-amber.vercel.app/api/",
  }) as BaseQueryFn<string | FetchArgs, unknown, customError>,
  tagTypes: ["book"],
  endpoints: (builder) => ({
    getBook: builder.query({
      query: () => ({ url: `/books` }),

      providesTags: ["book"],
    }),
    getBookById: builder.query({
      query: (id) => ({ url: `/books/${id}` }),

      providesTags: ["book"],
    }),
    createBook: builder.mutation({
      query: (bookData) => ({ url: `/books`, method: "POST", body: bookData }),

      invalidatesTags: ["book"],
    }),
    updateBook: builder.mutation({
      query: ({ id, bookData }: { id: string; bookData: unknown }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: bookData,
      }),

      invalidatesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({ url: `/books/${id}`, method: "DELETE" }),

      invalidatesTags: ["book"],
    }),
  }),
});

export const {
  useGetBookQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useGetBookByIdQuery,
  useUpdateBookMutation,
} = bookApi;
