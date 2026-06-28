import {
  Calendar,
  Trash2,
  Edit3,
  CheckCircle2,
  Circle,
  AlertCircle,
} from "lucide-react";
import type { Task } from "../types";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../features/tasks/tasksApi";
import { toast } from "sonner";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  const isDone = task.status === "Done";
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const priorityStyles = {
    High: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  const statusStyles = {
    Todo: "bg-slate-800/80 text-slate-400 border-slate-700/50",
    "In Progress": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    Done: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  const accentBorderStyles = {
    High: "bg-linear-to-b from-rose-500 to-red-600",
    Medium: "bg-linear-to-b from-amber-500 to-orange-500",
    Low: "bg-linear-to-b from-blue-500 to-indigo-500",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/30 p-5 shadow-md backdrop-blur-xs transition-all duration-300 hover:border-slate-700/80 hover:bg-slate-900/50 hover:shadow-lg hover:shadow-blue-500/2">
      <div
        className={`absolute top-0 left-0 bottom-0 w-1.5 ${accentBorderStyles[task.priority]}`}
      />

      <div className="pl-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusStyles[task.status]}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  task.status === "Done"
                    ? "bg-emerald-400"
                    : task.status === "In Progress"
                      ? "bg-indigo-400 animate-pulse"
                      : "bg-slate-400"
                }`}
              />
              {task.status}
            </span>

            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${priorityStyles[task.priority]}`}
            >
              <AlertCircle className="h-3 w-3" />
              {task.priority}
            </span>
          </div>

          <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              onClick={() => onEdit(task)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
              title="Edit Task"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={async () => {
                if (
                  window.confirm("Are you sure you want to delete this task?")
                ) {
                  try {
                    await deleteTask(task._id).unwrap();
                    toast.success("Task deleted successfully");
                  } catch (err: any) {
                    toast.error(
                      err?.data?.message ||
                        err?.message ||
                        "Failed to delete task",
                    );
                  }
                }
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors cursor-pointer"
              title="Delete Task"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-3">
          <button
            onClick={async () => {
              try {
                const newStatus = isDone ? "Todo" : "Done";
                await updateTask({
                  id: task._id,
                  data: { status: newStatus },
                }).unwrap();
                toast.success(`Task marked as ${newStatus.toLowerCase()}`);
              } catch (err: any) {
                toast.error(
                  err?.data?.message ||
                    err?.message ||
                    "Failed to update status",
                );
              }
            }}
            className="mt-1 shrink-0 text-slate-500 hover:text-blue-500 transition-colors cursor-pointer"
            title={isDone ? "Mark incomplete" : "Mark complete"}
          >
            {isDone ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-500/10" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h4
              className={`font-heading font-semibold text-slate-200 transition-all ${
                isDone
                  ? "line-through text-slate-500"
                  : "group-hover:text-white"
              }`}
            >
              {task.title}
            </h4>
            <p
              className={`mt-1.5 text-sm leading-relaxed ${
                isDone ? "text-slate-600 line-through" : "text-slate-400"
              }`}
            >
              {task.description}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-800/60 pt-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-600" />
            <span>
              Last Updated:{" "}
              <span className="text-slate-200 font-semibold">
                {" "}
                {new Date(task.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
