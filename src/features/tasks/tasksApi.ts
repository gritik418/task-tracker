import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants";

const tasksApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/tasks`,
  }),
  endpoints: (build) => ({}),
});

export default tasksApi;
