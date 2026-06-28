import {
  Search,
  ChevronDown,
  SlidersHorizontal,
  AlertCircle,
  ArrowUpDown,
} from "lucide-react";

const Filters = () => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:shadow-md">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="h-11 w-full rounded-xl border border-slate-200/80 bg-slate-50/50 pl-10 pr-4 text-sm font-medium text-slate-700 outline-hidden transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-500/10"
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative flex items-center">
          <SlidersHorizontal className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
          <select className="h-11 w-full appearance-none rounded-xl border border-slate-200/80 bg-slate-50/50 pl-10 pr-10 text-sm font-medium text-slate-700 outline-hidden transition-all duration-200 cursor-pointer focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-500/10">
            <option value="">All Statuses</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <ChevronDown className="absolute right-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Priority Dropdown */}
        <div className="relative flex items-center">
          <AlertCircle className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
          <select className="h-11 w-full appearance-none rounded-xl border border-slate-200/80 bg-slate-50/50 pl-10 pr-10 text-sm font-medium text-slate-700 outline-hidden transition-all duration-200 cursor-pointer focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-500/10">
            <option value="">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <ChevronDown className="absolute right-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Sort Dropdown */}
        <div className="relative flex items-center">
          <ArrowUpDown className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
          <select className="h-11 w-full appearance-none rounded-xl border border-slate-200/80 bg-slate-50/50 pl-10 pr-10 text-sm font-medium text-slate-700 outline-hidden transition-all duration-200 cursor-pointer focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-500/10">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <ChevronDown className="absolute right-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default Filters;
