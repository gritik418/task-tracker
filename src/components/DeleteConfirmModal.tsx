import { AlertTriangle, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Task } from "../features/tasks/tasks.interface";
import { useDeleteTaskMutation } from "../features/tasks/tasksApi";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
}

const DeleteConfirmModal = ({
  isOpen,
  task,
  onClose,
}: DeleteConfirmModalProps) => {
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  // Reset error when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setApiError(null);
    }
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  const handleDelete = async () => {
    setApiError(null);
    try {
      const response = await deleteTask(task._id).unwrap();
      if (response.success) {
        toast.success("Task deleted successfully!");
        onClose();
      } else {
        setApiError(response.message || "Failed to delete task");
        toast.error(response.message || "Failed to delete task");
      }
    } catch (err: any) {
      const errorMsg =
        err?.data?.message || err?.message || "Failed to connect to server";
      setApiError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-red-500 via-rose-500 to-orange-500" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center mt-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/10 text-rose-500 ring-8 ring-rose-500/5 mb-4 animate-pulse">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h3 className="font-heading text-xl font-bold text-white">
            Delete Task
          </h3>
          <p className="text-sm text-slate-400 mt-2 px-2">
            Are you sure you want to delete task? This action is permanent and
            cannot be undone.
          </p>
        </div>
        {apiError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 mt-4 text-xs text-rose-450">
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-450" />
            <span>{apiError}</span>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 h-11 rounded-xl border border-slate-800 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="flex-1 h-11 rounded-xl bg-linear-to-r from-red-600 to-rose-600 text-sm font-semibold text-white shadow-lg shadow-rose-500/10 hover:from-red-700 hover:to-rose-700 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? "Deleting..." : "Delete Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
