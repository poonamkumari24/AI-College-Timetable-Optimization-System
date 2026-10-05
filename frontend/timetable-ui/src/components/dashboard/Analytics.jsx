import { rooms, weeklyClasses, workload } from '../../data/dashboardData'
import Icon from "../common/Icon";

export default function Analytics() {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <WorkloadCard />
      <RoomCard />
      <WeeklyCard />
    </section>
  );
}

function CardShell({ icon, title, subtitle, children, footer }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
      <div>
        <div className="flex items-center justify-between border-b border-outline-variant pb-3">
          <div>
            <h3 className="text-headline-sm text-on-surface">{title}</h3>
            <p className="text-body-sm text-on-surface-variant">{subtitle}</p>
          </div>
          <Icon className="text-outline">{icon}</Icon>
        </div>
        {children}
      </div>
      {footer}
    </div>
  );
}

function WorkloadCard() {
  return (
    <CardShell
      icon="equalizer"
      title="Faculty Workload"
      subtitle="Weekly teaching distribution (184 faculty)"
      footer={<div className="mt-6 flex items-center justify-between border-t border-outline-variant pt-4 text-body-sm text-on-surface-variant"><span>Avg load: <strong className="text-on-surface">15.6 hrs/week</strong></span><button className="font-semibold text-primary hover:underline">Rebalance Workload →</button></div>}
    >
      <div className="mt-6 space-y-4">
        {workload.map((row) => (
          <div key={row.label}>
            <div className="mb-1.5 flex justify-between text-body-sm">
              <span className="font-medium text-on-surface">{row.label}</span>
              <span className={`${row.warning ? "text-error" : "text-on-surface"} font-bold`}>{row.value} <span className="font-normal text-on-surface-variant">({row.count})</span></span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-container">
              <div className={`h-full rounded-full ${row.color}`} style={{ width: row.width }} />
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function RoomCard() {
  return (
    <CardShell
      icon="domain"
      title="Room & Lab Utilization"
      subtitle="Capacity usage across facility types"
      footer={<div className="mt-6 flex items-center justify-between border-t border-outline-variant pt-4 text-body-sm text-on-surface-variant"><span>Overall Campus Rate: <strong className="font-bold text-primary">78.4%</strong></span><button className="font-semibold text-primary hover:underline">View Spatial Map →</button></div>}
    >
      <div className="mt-6 space-y-4">
        {rooms.map((row) => (
          <div key={row.label}>
            <div className="mb-1.5 flex justify-between text-body-sm">
              <span className="font-medium text-on-surface">{row.label}</span>
              <span className="font-bold text-on-surface">{row.value}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
              <div className={`h-full rounded-full ${row.color}`} style={{ width: row.width }} />
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function WeeklyCard() {
  return (
    <CardShell icon="calendar_view_week" title="Classes by Day" subtitle="Scheduled classes across academic week">
      <div className="mt-6 flex h-36 items-end justify-between border-b border-outline-variant px-2 pt-4">
        {weeklyClasses.map((row) => (
          <div key={row.day} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-label-sm font-medium text-on-surface">{row.value}</span>
            <div className={`w-7 rounded-t ${row.secondary ? "bg-secondary-fixed-dim" : "bg-primary-container"}`} style={{ height: row.height }} />
            <span className="text-label-sm text-on-surface-variant">{row.day}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between text-body-sm text-on-surface-variant">
        <span>Total Weekly Slots: <strong className="text-on-surface">1,512</strong></span>
        <span className="font-semibold text-primary">Standard 60m blocks</span>
      </div>
    </CardShell>
  );
}
