import Icon from "../common/Icon";

export default function SolverCard({ running, runNumber, onRerun, onDetails }) {
  return (
    <section className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm">
      <div className="flex flex-col justify-between gap-4 border-b border-outline-variant p-6 lg:flex-row lg:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-high text-primary">
            <Icon>memory</Icon>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-headline-sm text-on-surface">AI Constraint Solver Status</h2>
              <span className={`rounded-full border px-2.5 py-0.5 text-label-sm font-bold ${running ? "border-tertiary-fixed bg-tertiary-fixed text-tertiary" : "border-surface-variant bg-surface-container-high text-primary"}`}>
                {running ? "RUNNING" : `OPTIMAL (Run #${runNumber} - Today, 08:30 AM)`}
              </span>
            </div>
            <p className="mt-1 text-body-sm text-on-surface-variant">
              Engine powered by Google OR-Tools CP-SAT (Integer Programming &amp; Constraint Optimization)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onDetails} className="rounded-lg border border-outline-variant px-3 py-1.5 text-label-md text-on-surface transition-colors hover:bg-surface-container">
            View Optimization Details
          </button>
          <button onClick={onRerun} disabled={running} className="flex items-center gap-2 rounded-lg bg-primary-container px-3.5 py-1.5 text-label-md text-on-primary shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60">
            <Icon className={running ? "animate-spin text-base" : "text-base"}>refresh</Icon>
            <span>{running ? "Running..." : "Re-run Engine"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 border-b border-outline-variant bg-surface-container-low p-6 md:grid-cols-4">
        <Stat label="Solver Runtime" value={running ? "…" : "4.2s"} helper={running ? "Optimizing constraints" : "99.8% convergence speed"} />
        <Stat label="Hard Violations" value="0 Hard" helper="No faculty/room clashes" primary />
        <Stat label="Soft Constraint Score" value={running ? "…" : <>94.8 <span className="text-body-sm font-normal text-on-surface-variant">/ 100</span></>} helper="Preference alignment high" />
        <Stat label="Scheduled Sections" value="1,512 / 1,512" helper="100% courses mapped" />
      </div>

      <div className="bg-surface-container-lowest p-6">
        <span className="mb-3 block text-label-md font-semibold text-on-surface">Solver Pipeline Stages</span>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
          {[
            ["Step 1", "Preparing Data", "check_circle"],
            ["Step 2", "Constraint Validation", "check_circle"],
            ["Step 3", "Core CP-SAT Solver", "check_circle"],
            ["Step 4", "Soft Score Optimization", "check_circle"],
            ["Final Status", running ? "Optimizing…" : "Completed & Validated", running ? "sync" : "verified"]
          ].map(([step, title, icon], index) => (
            <div key={step} className={`flex items-center justify-between rounded-lg border p-3 ${index === 4 ? "border-surface-variant bg-surface-container-high" : "border-outline-variant bg-surface-container-lowest"}`}>
              <div>
                <div className={`text-label-sm ${index === 4 ? "text-primary" : "text-on-surface-variant"}`}>{step}</div>
                <div className={`text-label-md ${index === 4 ? "font-bold text-primary" : "font-medium text-on-surface"}`}>{title}</div>
              </div>
              <Icon className={`text-lg ${index === 4 && running ? "animate-spin text-tertiary" : "text-primary"}`} filled={!running || index < 4}>{icon}</Icon>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, helper, primary = false }) {
  return (
    <div>
      <span className="text-label-sm uppercase tracking-wider text-on-surface-variant">{label}</span>
      <div className={`mt-1 text-headline-md font-bold ${primary ? "text-primary" : "text-on-surface"}`}>{value}</div>
      <span className={`text-body-sm font-medium ${primary ? "text-on-surface-variant" : "text-primary"}`}>{helper}</span>
    </div>
  );
}
