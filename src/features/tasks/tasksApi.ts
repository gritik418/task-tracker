import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants";
import type {
  CreateTaskRequestDto,
  CreateTaskResponseDto,
  GetTasksRequestParams,
  GetTasksResponseDto,
} from "./tasks.interface";

const tasksApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/tasks`,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  tagTypes: ["Tasks"],
  endpoints: (build) => ({
    createTask: build.mutation<CreateTaskResponseDto, CreateTaskRequestDto>({
      query: (data: CreateTaskRequestDto) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),

    getTasks: build.query<GetTasksResponseDto, GetTasksRequestParams>({
      query: (params: GetTasksRequestParams) => {
        const searchParams = new URLSearchParams();

        if (params.status) {
          searchParams.set("status", params.status);
        }

        if (params.priority) {
          searchParams.set("priority", params.priority);
        }

        if (params.search) {
          searchParams.set("search", params.search);
        }

        if (params.sort) {
          searchParams.set("sort", params.sort);
        }

        return { url: "/", method: "GET", params: searchParams };
      },
      providesTags: ["Tasks"],
    }),
  }),
});

export const { useCreateTaskMutation, useGetTasksQuery } = tasksApi;

export default tasksApi;
