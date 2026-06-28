import Filters from "./components/Filters";
import Navbar from "./components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-8">
          <section className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">My Tasks</h2>

              <p className="mt-2 text-slate-500">
                Stay organized and keep track of your daily work.
              </p>
            </div>

            <button className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
              + Add Task
            </button>
          </section>

          <Filters />
        </div>
      </main>
    </>
  );
};

export default Home;
