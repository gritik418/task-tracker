import { Heart, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-900 bg-slate-950/60 py-6 mt-12 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-linear-to-br from-blue-500 to-indigo-600 shadow-md">
            <CheckCircle2 className="text-white" size={13} />
          </div>
          <span>
            © {currentYear}{" "}
            <span className="text-slate-300 font-semibold">Task Tracker</span>.
            All rights reserved.
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="flex items-center gap-1">
            Built with{" "}
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500/20" /> for
            productivity.
          </span>

          <span className="hidden h-3 w-px bg-slate-800 sm:inline" />

          <div className="flex gap-4">
            <a
              href="https://github.com/gritik418"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-slate-350 transition-colors"
            >
              <FaGithub className="text-lg" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
