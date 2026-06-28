export interface CreateTaskRequestDto {
  title: string;
  description?: string;
  priority?: "High" | "Medium" | "Low";
  status?: "Todo" | "In Progress" | "Done";
}

export interface CreateTaskResponseDto {
  success: boolean;
  message: string;
  data?: Task;
}

export interface GetTasksResponseDto {
  success: boolean;
  message: string;
  data?: Task[];
}

export interface GetTasksRequestParams {
  status?: "Todo" | "In Progress" | "Done" | null;
  priority?: "High" | "Medium" | "Low" | null;
  search?: string | null;
  sort?: "newest" | "oldest" | null;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "Todo" | "In Progress" | "Done";
  priority: "High" | "Medium" | "Low";
  createdAt: string;
  updatedAt: string;
}

export interface UpdateTaskRequestDto {
  id: string;
  data: Partial<CreateTaskRequestDto>;
}
