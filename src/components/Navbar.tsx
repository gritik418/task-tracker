import React from "react";
import { CheckCircle2 } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
            <CheckCircle2 className="text-white" size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">Task Tracker</h1>
            <p className="text-xs text-slate-300">Organize. Track. Complete.</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur md:flex">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-sm font-medium text-slate-100">
            Stay Productive
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
