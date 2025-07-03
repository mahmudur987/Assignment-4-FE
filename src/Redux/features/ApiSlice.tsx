import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
} from "@reduxjs/toolkit/query/react";

export interface customError {
  error: {
    data: {
      message: string;
      success: boolean;
      error: {};
    };
  };
  status: number;
}

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://l2-a3-amber.vercel.app/api/",
  }) as BaseQueryFn<unknown, customError>,
  tagTypes: ["book", "borrow"],
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
    createBorrow: builder.mutation({
      query: (data) => ({ url: `/borrow`, method: "POST", body: data }),
      invalidatesTags: ["book", "borrow"],
    }),
    getBorrow: builder.query({
      query: () => ({ url: `/borrow` }),
      providesTags: ["borrow"],
    }),
  }),
});

export const {
  useGetBookQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useGetBookByIdQuery,
  useUpdateBookMutation,
  useCreateBorrowMutation,
  useGetBorrowQuery,
} = bookApi;
