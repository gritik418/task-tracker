import { useState, useEffect } from "react";
import { X, AlertCircle, Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateTaskMutation } from "../features/tasks/tasksApi";
import { createTaskSchema } from "../validations/task.validation";
import type { Task } from "../features/tasks/tasks.interface";
import z from "zod";
import { toast } from "sonner";

interface UpdateTaskModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
}

type TaskFormValues = z.infer<typeof createTaskSchema>;

const UpdateTaskModal = ({ isOpen, task, onClose }: UpdateTaskModalProps) => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(createTaskSchema),
  });

  useEffect(() => {
    if (isOpen && task) {
      reset({
        title: task.title,
        description: task.description || "",
        status: task.status,
        priority: task.priority,
      });
      setApiError(null);
    }
  }, [isOpen, task, reset]);

  if (!isOpen || !task) return null;

  const onSubmit = async (data: TaskFormValues) => {
    setApiError(null);

    try {
      const response = await updateTask({
        id: task._id,
        data: {
          title: data.title,
          description: data.description?.trim() || "",
          status: data.status,
          priority: data.priority,
        },
      }).unwrap();

      if (response.success) {
        toast.success("Task updated successfully!");
        onClose();
      } else {
        const errorMsg = (response as any)?.message || "Failed to update task";
        toast.error(errorMsg);
      }
    } catch (err: any) {
      if (err?.data?.errors) {
        if (err?.data?.errors?.title) {
          setError("title", {
            type: "server",
            message: err?.data?.errors?.title,
          });
        }
        if (err?.data?.errors?.description) {
          setError("description", {
            type: "server",
            message: err?.data?.errors?.description,
          });
        }
        if (err?.data?.errors?.status) {
          setError("status", {
            type: "server",
            message: err?.data?.errors?.status,
          });
        }
        if (err?.data?.errors?.priority) {
          setError("priority", {
            type: "server",
            message: err?.data?.errors?.priority,
          });
        }
      } else {
        const errorMsg =
          err?.data?.message || err?.message || "Failed to connect to server";
        setApiError(errorMsg);
        toast.error(errorMsg);
      }
    }
  };

  const priorityColors = {
    High: {
      bg: "bg-rose-500/10",
      text: "text-white",
      border: "border-rose-500/30",
      activeBg: "bg-rose-500 text-white border-rose-500",
      dot: "bg-rose-500",
    },
    Medium: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/30",
      activeBg: "bg-amber-500 text-slate-950 border-amber-500 font-bold",
      dot: "bg-amber-500",
    },
    Low: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/30",
      activeBg: "bg-blue-500 text-white border-blue-500",
      dot: "bg-blue-500",
    },
  };

  const statusColors = {
    Todo: {
      activeBg: "bg-slate-800 text-slate-200 border-slate-700",
      dot: "bg-slate-400",
    },
    "In Progress": {
      activeBg: "bg-indigo-600 text-white border-indigo-500",
      dot: "bg-indigo-400 animate-pulse",
    },
    Done: {
      activeBg: "bg-emerald-600 text-white border-emerald-500",
      dot: "bg-emerald-400",
    },
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-2">
          <div>
            <h3 className="font-heading text-2xl font-bold text-white">
              Update Task
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Modify the details of this task.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* API Error Alert */}
          {apiError && (
            <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3.5 text-sm text-rose-400 animate-in slide-in-from-top-2 duration-200">
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
              <span>{apiError}</span>
            </div>
          )}

          {/* Title Field */}
          <div>
            <label
              htmlFor="task-title"
              className="block text-sm font-semibold text-slate-300 mb-1.5"
            >
              Task Title <span className="text-rose-500">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              autoFocus
              {...register("title")}
              placeholder="e.g. Design user onboarding flow"
              className={`h-11 w-full rounded-xl border bg-slate-950/50 px-4 text-sm font-medium text-slate-200 outline-none transition-all placeholder:text-slate-500/50 focus:bg-slate-950 focus:ring-4 focus:ring-blue-500/10 ${
                errors.title
                  ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
                  : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/10"
              }`}
            />
            {errors.title && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-400">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="task-desc"
              className="block text-sm font-semibold text-slate-300 mb-1.5"
            >
              Description
            </label>
            <textarea
              id="task-desc"
              rows={3}
              {...register("description")}
              placeholder="Add key requirements or details..."
              className={`w-full rounded-xl border bg-slate-950/50 px-4 py-3 text-sm font-medium text-slate-200 outline-none transition-all placeholder:text-slate-500/50 focus:bg-slate-950 focus:ring-4 focus:ring-blue-500/10 ${
                errors.description
                  ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
                  : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/10"
              }`}
            />
            {errors.description && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-400">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Side by Side Selectors */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Status Selector */}
            <div>
              <span className="block text-sm font-semibold text-slate-300 mb-2">
                Status
              </span>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/40 p-1">
                    {(["Todo", "In Progress", "Done"] as const).map((s) => {
                      const isActive = field.value === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => field.onChange(s)}
                          className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold border border-transparent transition-all cursor-pointer ${
                            isActive
                              ? statusColors[s].activeBg + " shadow-sm"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusColors[s].dot}`}
                          />
                          {s}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
            </div>

            {/* Priority Selector */}
            <div>
              <span className="block text-sm font-semibold text-slate-300 mb-2">
                Priority
              </span>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-2 flex-col">
                    {(["High", "Medium", "Low"] as const).map((p) => {
                      const isActive = field.value === p;
                      const colors = priorityColors[p];
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => field.onChange(p)}
                          className={`flex-1 flex items-center justify-center gap-1 rounded-xl border py-2 text-xs font-semibold transition-all cursor-pointer ${
                            isActive
                              ? colors.activeBg
                              : `${colors.bg} ${colors.text} ${colors.border} hover:brightness-110`
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isActive ? "bg-current" : colors.dot
                            }`}
                          />
                          {p}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-800/60 pt-5 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="h-11 px-5 rounded-xl border border-slate-800 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="h-11 px-6 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 hover:from-blue-700 hover:to-indigo-700 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLoading ? "Updating..." : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
