import Icon from '../common/Icon'

export default function StatusBanner({ runId, softScore, onWarnings, onAiAssistant }) {
  return (
    <div className="flex flex-shrink-0 items-center justify-between border-b border-outline-variant bg-surface-container-low px-6 py-2">
      <div className="flex items-center gap-6">
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-100 px-2 py-0.5 text-label-sm font-bold text-emerald-800">
          <span className="pulse-soft h-2 w-2 rounded-full bg-emerald-600" />
          OPTIMAL (Run #{runId} - Today, 08:30 AM)
        </span>
        <div className="hidden items-center gap-4 text-label-sm text-on-surface md:flex">
          <div className="flex items-center gap-1.5">
            <span className="text-on-surface-variant">Scheduled:</span>
            <span className="font-bold">100% (48/48 Slots)</span>
            <div className="ml-1 inline-block h-1.5 w-16 overflow-hidden rounded-full bg-outline-variant"><div className="h-full w-full rounded-full bg-emerald-600" /></div>
          </div>
          <div className="h-3 w-px bg-outline-variant" />
          <div className="flex items-center gap-1"><span className="text-on-surface-variant">Hard Conflicts:</span><span className="font-bold text-emerald-700">0</span></div>
          <div className="h-3 w-px bg-outline-variant" />
          <div className="flex items-center gap-1"><span className="text-on-surface-variant">Soft Constraint Score:</span><span className="font-bold text-primary">{softScore.toFixed(1)} / 100</span></div>
          <div className="h-3 w-px bg-outline-variant" />
          <div className="flex items-center gap-1"><span className="text-on-surface-variant">Locked Slots:</span><span className="flex items-center gap-0.5 font-bold text-amber-700"><Icon name="lock" className="text-xs" /> 4</span></div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onWarnings} className="hidden items-center gap-1 rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-label-sm font-medium text-amber-800 hover:bg-amber-100 sm:flex">
          <Icon name="warning" className="text-xs" /> View 2 Soft Warnings
        </button>
        <button onClick={onAiAssistant} className="flex items-center gap-1 rounded border border-outline-variant bg-surface-container-lowest px-2.5 py-0.5 text-label-sm font-semibold text-primary shadow-sm hover:bg-surface-container">
          <Icon name="auto_awesome" className="text-xs text-primary" /> Open AI Assistant
        </button>
      </div>
    </div>
  )
}
