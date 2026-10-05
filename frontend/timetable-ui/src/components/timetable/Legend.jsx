import Icon from '../common/Icon'

export default function Legend() {
  return (
    <div className="mt-3 flex items-center justify-between gap-2 text-label-sm text-on-surface-variant">
      <div className="flex flex-wrap items-center gap-4">
        <span className="font-semibold text-on-surface">Categories:</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-indigo-600" /> Core Theory (1 hr)</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-purple-600" /> Laboratory / Practical (2 hrs block)</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-teal-600" /> Tutorial / Seminar (1 hr)</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm border border-amber-400 bg-amber-200" /> Fixed Lunch (13:00 - 14:00)</span>
        <span className="inline-flex items-center gap-1.5"><Icon name="lock" className="text-sm text-amber-600" /> Locked Slot</span>
      </div>
      <div className="hidden items-center gap-2 lg:flex"><Icon name="info" className="text-sm" /><span>Adhering to standard university timeline (08:00 - 17:00). 2-hour labs strictly contiguous.</span></div>
    </div>
  )
}
