import KpiCards from "../../components/dashboard/KpiCards";
import SolverStatus from "../../components/dashboard/SolverCard";
import Analytics from "../../components/dashboard/Analytics";
import ActivityHub from "../../components/dashboard/ActivityHub";

export default function Dashboard({ onOptimize, onAction }) {
  return (
    <main className="flex-1 overflow-y-auto bg-surface p-6">
      <div className="space-y-6">

        {/* Dashboard Header */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-headline-lg text-on-surface">
                Good morning, Dr. Rajesh Rao
              </h1>

              <span className="px-2 py-0.5 rounded bg-surface-container-high text-label-sm text-primary font-semibold">
                Active Solver Session
              </span>
            </div>

            <p className="text-body-md text-on-surface-variant mt-1">
              Here is an overview of your college scheduling system and
              optimization engine.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button className="px-4 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest">
              Import Data
            </button>

            <button className="px-4 py-2 rounded-lg bg-surface-container-high text-tertiary">
              Run AI Assistant
            </button>

            <button
              onClick={onOptimize}
              className="px-4 py-2 rounded-lg bg-primary-container text-on-primary"
            >
              Generate Timetable
            </button>

          </div>
        </section>

        {/* KPI SECTION */}
        <KpiCards />

        {/* AI SOLVER */}
        <SolverStatus />

        {/* ANALYTICS */}
        <Analytics />

        {/* ACTIVITY + QUICK ACTIONS */}
        <ActivityHub onAction={onAction} />

      </div>
    </main>
  );
}