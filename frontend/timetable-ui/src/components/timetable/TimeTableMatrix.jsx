import Icon from '../common/Icon'
import { timeSlots } from '../../data/timetableData'

function CourseCell({ cell, onSelect, matchesSearch }) {
  const isTeal = cell.palette === 'teal'
  const isPurple = cell.palette === 'purple'
  const isSelected = cell.selected

  const mainClass = isTeal
    ? 'border-teal-600 bg-teal-50/50'
    : isPurple
      ? 'border-purple-600 bg-purple-50/50'
      : 'border-indigo-600 bg-indigo-50/40'

  const titleClass = isTeal
    ? 'text-teal-900'
    : isPurple
      ? 'text-purple-900'
      : 'text-primary'

  return (
    <button
      type="button"
      onClick={() => onSelect(cell)}
      aria-label={`${cell.code}${cell.room ? ` in ${cell.room}` : ''}`}
      className={`flex min-h-0 min-w-0 flex-col p-1 text-left transition-colors ${matchesSearch ? 'opacity-100' : 'opacity-25'} ${isSelected ? 'rounded-sm bg-surface-container-high ring-2 ring-primary ring-offset-1 shadow-md' : 'bg-surface-container-lowest hover:bg-surface-container-high'}`}
    >
      <div className={`h-full rounded-r border border-outline-variant border-l-4 p-1.5 flex flex-col justify-between ${mainClass}`}>
        <div className="flex min-w-0 items-start justify-between gap-1">
          <div className="min-w-0">
            <span className={`block truncate text-label-sm font-bold ${titleClass}`}>{cell.code}</span>
            {cell.room && <span className="block truncate text-[10px] text-on-surface-variant">{cell.room}</span>}
          </div>
          <div className="flex shrink-0 items-center gap-0.5">
            {cell.locked && <Icon name="lock" className="text-xs text-amber-600" title="Slot locked" />}
            <span className={`rounded px-1 py-0.5 text-[9px] font-semibold ${isTeal ? 'border border-teal-200 bg-teal-100 text-teal-800' : isPurple ? 'bg-purple-100 text-purple-800' : 'bg-indigo-100 text-indigo-800'}`}>
              {cell.type}
            </span>
          </div>
        </div>
        {cell.faculty && <div className={`flex items-center justify-between text-[11px] ${isTeal ? 'text-teal-900' : 'text-secondary'}`}>
          <span className="truncate">{cell.faculty}</span>
          {cell.attended && <span className="ml-1 shrink-0 text-[10px] font-semibold text-emerald-700">{cell.attended}</span>}
        </div>}
      </div>
    </button>
  )
}

function LabCell({ cell, matchesSearch, onSelect }) {
  return (
    <button type="button" onClick={() => onSelect(cell)} aria-label={`${cell.code} lab, ${cell.time}`} className={`${cell.colSpan === 3 ? 'col-span-3' : 'col-span-2'} flex min-h-0 min-w-0 flex-col p-1 text-left transition-colors ${matchesSearch ? 'opacity-100' : 'opacity-25'} bg-surface-container-lowest hover:bg-surface-container-high`}>
      <div className="h-full rounded-r border border-outline-variant border-l-4 border-purple-600 bg-purple-50/60 p-1.5">
        <div className="flex h-full flex-col justify-between gap-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate text-label-sm font-bold text-purple-900">{cell.code}</span>
                <span className="shrink-0 rounded border border-purple-200 bg-purple-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-purple-800">Lab (2 hrs)</span>
              </div>
              <span className="block truncate text-[11px] text-on-surface-variant">{cell.detail}</span>
            </div>
            <span className="shrink-0 rounded bg-purple-200 px-1.5 py-0.5 text-[10px] font-semibold text-purple-900">{cell.time}</span>
          </div>
          <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-purple-950">
            <span className="truncate">{cell.faculty}</span>
            <span className="shrink-0 text-[10px] font-medium text-emerald-700">{cell.status}</span>
          </div>
        </div>
      </div>
    </button>
  )
}

function FreeCell({ cell }) {
  return (
    <div className="flex min-w-0 items-center justify-center bg-surface-bright p-1 text-center">
      <div className="min-w-0">
        <span className={`block truncate text-xs italic text-outline ${cell.sub ? 'font-semibold text-secondary' : ''}`}>{cell.text}</span>
        {cell.sub && <span className="block truncate text-[10px] text-outline">{cell.sub}</span>}
      </div>
    </div>
  )
}

export default function TimetableMatrix({ timetable, search, onSelect, selectedCode }) {
  return (
    <div className="timetable-scroll min-w-0 max-w-full overflow-auto rounded-lg border border-outline-variant bg-surface-container-lowest shadow-sm">
      <div className="min-w-[1450px]">
        <div className="sticky top-0 z-10 grid grid-cols-timetable divide-x divide-outline-variant border-b border-outline-variant bg-surface-container text-label-sm font-label-sm">
        <div className="flex flex-col items-center justify-center p-2.5 text-center">
          <span className="font-bold">Day / Time</span>
          <span className="text-[10px] font-normal text-on-surface-variant">08:00 - 17:00</span>
        </div>
        {timeSlots.map((slot) => (
          <div key={slot.id} className={`p-2 text-center ${slot.id === 'lunch' ? 'bg-amber-50 text-amber-900' : ''}`}>
            <div className="font-bold">{slot.label}</div>
            <div className="text-[10px] text-on-surface-variant">{slot.sub}</div>
          </div>
        ))}
        </div>

        {timetable.map((row) => (
          <div key={row.day} className="grid min-h-[94px] grid-cols-timetable divide-x divide-outline-variant border-b border-outline-variant">
            <div className="flex flex-col items-center justify-center border-r border-outline-variant bg-surface-container-low p-2 text-center">
              <span className="text-label-md font-bold text-on-surface">{row.day}</span>
              <span className="text-[10px] font-normal text-on-surface-variant">{row.summary}</span>
            </div>

            {row.cells.map((cell, idx) => {
              const searchable = `${cell.code ?? ''} ${cell.faculty ?? ''} ${cell.room ?? ''} ${cell.type ?? ''} ${cell.text ?? ''}`.toLowerCase()
              const matchesSearch = !search || searchable.includes(search.toLowerCase())

              if (cell.kind === 'lunch') {
                return (
                  <div key={`${row.day}-${idx}`} className="flex min-w-0 flex-col items-center justify-center border-x border-outline-variant bg-amber-50/70 p-1 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Lunch</span>
                    <span className="text-[9px] text-amber-700">1:00-2:00 PM</span>
                  </div>
                )
              }
              if (cell.kind === 'free') return <FreeCell key={`${row.day}-${idx}`} cell={cell} />
              if (cell.kind === 'break') {
                return (
                  <div key={`${row.day}-${idx}`} className="col-span-3 flex items-center justify-center border-outline-variant bg-surface-container-low/60 p-2 text-center">
                    <div>
                      <span className="block text-xs font-medium text-on-surface-variant">{cell.text}</span>
                      <span className="text-[10px] text-outline">{cell.sub}</span>
                    </div>
                  </div>
                )
              }
              if (cell.kind === 'lab') return <LabCell key={`${row.day}-${idx}`} cell={cell} matchesSearch={matchesSearch} onSelect={onSelect} />
              return <CourseCell key={`${row.day}-${idx}`} cell={cell} onSelect={onSelect} matchesSearch={matchesSearch} />
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
