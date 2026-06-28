import {
  Search,
  ChevronDown,
  SlidersHorizontal,
  AlertCircle,
  ArrowUpDown,
} from "lucide-react";

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  status: "Todo" | "In Progress" | "Done" | null;
  setStatus: (status: "Todo" | "In Progress" | "Done" | null) => void;
  priority: "High" | "Medium" | "Low" | null;
  setPriority: (priority: "High" | "Medium" | "Low" | null) => void;
  sort: "newest" | "oldest" | null;
  setSort: (sort: "newest" | "oldest" | null) => void;
}

const Filters = ({
  searchQuery,
  setSearchQuery,
  status,
  setStatus,
  priority,
  setPriority,
  sort,
  setSort,
}: Props) => {
  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-5 shadow-md backdrop-blur-xs transition-all duration-300 hover:border-slate-700/80 hover:bg-slate-900/50">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="h-11 w-full rounded-xl border border-slate-800 bg-slate-900/50 pl-10 pr-4 text-sm font-medium text-slate-200 outline-hidden transition-all duration-200 placeholder:text-slate-400/50 focus:border-blue-500 focus:bg-slate-900 focus:ring-3 focus:ring-blue-500/10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative flex items-center">
          <SlidersHorizontal className="absolute left-3.5 h-4 w-4 text-blue-400/80 pointer-events-none" />
          <select
            className="h-11 w-full appearance-none rounded-xl border border-slate-800 bg-slate-900/50 pl-10 pr-10 text-sm font-medium text-slate-200 outline-hidden transition-all duration-200 cursor-pointer focus:border-blue-500 focus:bg-slate-900 focus:ring-3 focus:ring-blue-500/10"
            value={status || ""}
            onChange={(e) =>
              setStatus(
                e.target.value as "Todo" | "In Progress" | "Done" | null,
              )
            }
          >
            <option value="" className="bg-slate-900 text-slate-200">
              All Statuses
            </option>
            <option value="Todo" className="bg-slate-900 text-slate-200">
              Todo
            </option>
            <option value="In Progress" className="bg-slate-900 text-slate-200">
              In Progress
            </option>
            <option value="Done" className="bg-slate-900 text-slate-200">
              Done
            </option>
          </select>
          <ChevronDown className="absolute right-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Priority Dropdown */}
        <div className="relative flex items-center">
          <AlertCircle className="absolute left-3.5 h-4 w-4 text-amber-400/80 pointer-events-none" />
          <select
            className="h-11 w-full appearance-none rounded-xl border border-slate-800 bg-slate-900/50 pl-10 pr-10 text-sm font-medium text-slate-200 outline-hidden transition-all duration-200 cursor-pointer focus:border-blue-500 focus:bg-slate-900 focus:ring-3 focus:ring-blue-500/10"
            value={priority || ""}
            onChange={(e) =>
              setPriority(e.target.value as "High" | "Medium" | "Low" | null)
            }
          >
            <option value="" className="bg-slate-900 text-slate-200">
              All Priorities
            </option>
            <option value="High" className="bg-slate-900 text-slate-200">
              High Priority
            </option>
            <option value="Medium" className="bg-slate-900 text-slate-200">
              Medium Priority
            </option>
            <option value="Low" className="bg-slate-900 text-slate-200">
              Low Priority
            </option>
          </select>
          <ChevronDown className="absolute right-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Sort Dropdown */}
        <div className="relative flex items-center">
          <ArrowUpDown className="absolute left-3.5 h-4 w-4 text-emerald-400/80 pointer-events-none" />
          <select
            className="h-11 w-full appearance-none rounded-xl border border-slate-800 bg-slate-900/50 pl-10 pr-10 text-sm font-medium text-slate-200 outline-hidden transition-all duration-200 cursor-pointer focus:border-blue-500 focus:bg-slate-900 focus:ring-3 focus:ring-blue-500/10"
            value={sort || ""}
            onChange={(e) =>
              setSort(e.target.value as "newest" | "oldest" | null)
            }
          >
            <option value="newest" className="bg-slate-900 text-slate-200">
              Newest First
            </option>
            <option value="oldest" className="bg-slate-900 text-slate-200">
              Oldest First
            </option>
          </select>
          <ChevronDown className="absolute right-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default Filters;
