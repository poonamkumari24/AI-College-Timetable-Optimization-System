import Icon from '../common/Icon'
import { kpis } from '../../data/dashboardData'

export default function KpiCards() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <span className="text-label-md text-on-surface-variant">{kpi.label}</span>
            <span className={`rounded-lg bg-surface-container-low p-2 ${kpi.label === 'Optimization Runs' ? 'text-tertiary' : 'text-primary'}`}>
              <Icon filled={kpi.label === 'Scheduling Conflicts'}>{kpi.icon}</Icon>
            </span>
          </div>
          <div className="mt-3">
            <div className="text-headline-lg text-on-surface">{kpi.value}</div>
            <div className="mt-1 flex items-center gap-1.5 text-label-sm text-on-surface-variant">
              {kpi.trend === 'up' && <Icon className="text-sm font-bold text-primary">arrow_upward</Icon>}
              {kpi.trend === 'check' && <Icon className="text-sm font-bold text-primary">check</Icon>}
              <span>{kpi.detail}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}