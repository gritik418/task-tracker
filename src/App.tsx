import { useEffect, useState } from "react";
import {
  Calendar,
  Plus,
  ClipboardList,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Filters from "./components/Filters";
import Navbar from "./components/Navbar";
import type { Task } from "./types";
import TaskCard from "./components/TaskCard";
import AddTaskModal from "./components/AddTaskModal";
import { useGetTasksQuery } from "./features/tasks/tasksApi";

const Home = () => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [status, setStatus] = useState<"Todo" | "In Progress" | "Done" | null>(
    null,
  );
  const [priority, setPriority] = useState<"High" | "Medium" | "Low" | null>(
    null,
  );
  const [sort, setSort] = useState<"newest" | "oldest" | null>(null);

  const { data, isLoading } = useGetTasksQuery({
    search: searchQuery,
    status,
    priority,
    sort,
  });

  useEffect(() => {
    if (!isLoading && data?.data) {
      setTasks(data.data);
    }
  }, [isLoading, data]);

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-7xl px-5 py-8">
          {/* Header Section */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                Workspace Dashboard
              </div>

              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                My Tasks
              </h2>

              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  {currentDate}
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-700 sm:inline" />
                <span>Stay organized and track your progress.</span>
              </div>
            </div>

            <button
              onClick={() => setIsAddTaskOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/30 active:scale-[0.98] cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          </div>

          {/* Stats Cards Section */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            {/* Total Tasks Card */}
            <div className="group rounded-2xl border border-slate-800/85 bg-slate-900/30 p-5 shadow-md backdrop-blur-xs transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Total Tasks
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                    12
                  </h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <ClipboardList className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* In Progress Card */}
            <div className="group rounded-2xl border border-slate-800/85 bg-slate-900/30 p-5 shadow-md backdrop-blur-xs transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    In Progress
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-slate-200 group-hover:text-amber-400 transition-colors">
                    4
                  </h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 transition-all duration-300 group-hover:bg-amber-600 group-hover:text-white">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Completed Card */}
            <div className="group rounded-2xl border border-slate-800/85 bg-slate-900/30 p-5 shadow-md backdrop-blur-xs transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Completed
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                    8
                  </h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>

          <Filters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
            sort={sort}
            setSort={setSort}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-8 gap-4">
            {tasks.map((task: Task) => {
              return <TaskCard key={task._id} task={task} />;
            })}
          </div>
        </div>
      </main>

      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
      />
    </>
  );
};

export default Home;
