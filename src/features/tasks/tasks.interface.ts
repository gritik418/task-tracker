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

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "Todo" | "In Progress" | "Done";
  priority: "High" | "Medium" | "Low";
  createdAt: string;
  updatedAt: string;
}
