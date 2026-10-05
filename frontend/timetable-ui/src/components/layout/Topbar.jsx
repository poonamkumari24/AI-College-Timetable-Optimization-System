import Icon from "../common/Icon";

export default function Topbar({
  onOptimize,
  onAction,
  onSearch,
  role,
  onSwitchRole
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full flex-shrink-0 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-6 shadow-sm">
      <div className="flex min-w-0 items-center gap-4">
        <div className="hidden items-center gap-2 text-label-md text-on-surface-variant lg:flex">
          <span>Academic Operations</span>
          <span className="text-outline-variant">/</span>
          <span className="font-semibold text-on-surface">Admin Dashboard</span>
        </div>
        <div className="hidden h-4 w-px bg-outline-variant lg:block" />
        <div className="relative flex items-center">
          <Icon className="pointer-events-none absolute left-3 text-outline text-lg">search</Icon>
          <input
            onChange={(e) => onSearch(e.target.value)}
            className="h-9 w-56 rounded-lg border border-outline-variant bg-surface-container-low pl-9 pr-4 text-body-sm text-on-surface outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container xl:w-72"
            placeholder="Search courses, instructors, rooms..."
          />
        </div>
      </div>

      <div className="ml-4 flex items-center gap-2">
        <div className="hidden items-center gap-1 rounded border border-outline-variant bg-surface-container-high px-2.5 py-1 text-label-sm text-on-surface-variant md:flex">
          <Icon className="text-primary text-sm">admin_panel_settings</Icon>
          <span>Role: {role}</span>
        </div>

        <div className="hidden items-center gap-1 border-l border-outline-variant pl-2 sm:flex">
          <button onClick={() => onAction("Notifications checked")} className="relative rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface" title="Notifications">
            <Icon>notifications</Icon>
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error" />
          </button>
          <button onClick={() => onAction("Help center opened")} className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface" title="Documentation & Help">
            <Icon>help</Icon>
          </button>
          <button onClick={() => onAction("Preferences opened")} className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface" title="Preferences">
            <Icon>tune</Icon>
          </button>
        </div>

        <button
          onClick={onSwitchRole}
          className="hidden rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-label-md text-on-surface transition-colors hover:bg-surface-container md:block"
        >
          Switch Role
        </button>
        <button
          onClick={onOptimize}
          className="flex items-center gap-2 rounded-lg bg-primary-container px-3.5 py-1.5 text-label-md text-on-primary shadow-sm transition hover:opacity-95 active:scale-95"
        >
          <Icon className="text-base">bolt</Icon>
          <span className="hidden sm:inline">Optimize Schedule</span>
        </button>
      </div>
    </header>
  );
}
