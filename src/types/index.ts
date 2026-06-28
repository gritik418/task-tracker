export interface Task {
  _id: string;
  title: String;
  description: String;
  status: "Todo" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  createdAt: string;
  updatedAt: string;
}
