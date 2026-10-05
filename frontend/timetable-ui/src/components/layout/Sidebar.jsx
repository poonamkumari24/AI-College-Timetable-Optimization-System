import Icon from "../common/Icon";
import { navItems } from "../../data/dashboardData";

export default function Sidebar({ activeNav, onNavChange, onOptimize, role }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-shrink-0 flex-col justify-between border-r border-outline-variant bg-surface-container-lowest p-4 shadow-sm">
      <div className="flex flex-col gap-4 overflow-y-auto pr-1">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container text-on-primary shadow-sm">
            <Icon>school</Icon>
          </div>
          <div className="flex flex-col">
            <span className="text-headline-sm font-bold text-primary">AI Timetable Optimizer</span>
            <span className="text-body-sm text-on-surface-variant">Academic Operations Hub</span>
          </div>
        </div>

        <div className="px-2 pt-1">
          <button
            onClick={onOptimize}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-3 py-2.5 text-label-md text-on-primary shadow-sm transition hover:opacity-95"
          >
            <Icon filled>auto_awesome</Icon>
            <span>Run AI Optimizer</span>
          </button>
        </div>

        <nav className="mt-2 flex flex-col gap-1" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => onNavChange(item.label)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-all duration-150 ${
                  isActive
                    ? "border-l-4 border-primary bg-surface-container-high font-semibold text-primary"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className={isActive ? "text-primary" : item.tertiary ? "text-tertiary" : "text-outline"} filled={isActive && item.label === "Dashboard"}>
                    {item.icon}
                  </Icon>
                  <span className="text-label-md">{item.label}</span>
                </span>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 text-[10px] font-semibold ${item.tertiary ? "rounded bg-tertiary-container text-on-tertiary" : "rounded-full bg-secondary-container text-on-secondary-fixed"}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-1 border-t border-outline-variant pt-3">
        <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-surface-container">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-container text-label-md font-bold text-on-secondary-fixed">RR</div>
          <div className="min-w-0 flex-1">
            <span className="block truncate text-label-md text-on-surface">Dr. Rajesh Rao</span>
            <span className="block truncate text-label-sm text-on-surface-variant">{role === "Administrator" ? "Academic Dean & Admin" : "Scheduling Coordinator"}</span>
          </div>
        </div>
        <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-error transition-colors hover:bg-error-container">
          <Icon className="text-error">logout</Icon>
          <span className="text-label-md">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
