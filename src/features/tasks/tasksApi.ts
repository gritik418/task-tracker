import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants";
import type {
  CreateTaskRequestDto,
  CreateTaskResponseDto,
} from "./tasks.interface";

const tasksApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/tasks`,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  endpoints: (build) => ({
    createTask: build.mutation<CreateTaskResponseDto, CreateTaskRequestDto>({
      query: (data: CreateTaskRequestDto) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateTaskMutation } = tasksApi;

export default tasksApi;
