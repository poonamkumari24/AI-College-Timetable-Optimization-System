import Icon from '../common/Icon'
import { inspectorDetails } from '../../data/timetableData'

export default function Inspector({ onClose, onRemove, onMove }) {
  const data = inspectorDetails

  return (
    <aside className="inspector flex w-96 flex-shrink-0 flex-col justify-between overflow-y-auto border-l border-outline-variant bg-surface-container-lowest shadow-lg">
      <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low p-4">
        <div className="flex items-center gap-2">
          <Icon name="tune" className="text-xl text-primary" />
          <h2 className="text-headline-sm font-bold text-on-surface">Class Assignment Details</h2>
        </div>
        <button onClick={onClose} className="rounded p-1 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"><Icon name="close" className="text-lg" /></button>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary-fixed/40 p-2.5">
          <div className="flex items-center gap-2">
            <Icon name="schedule" className="text-base text-primary" />
            <span className="text-label-md font-bold text-on-surface">Friday • 10:00 - 11:00 AM</span>
          </div>
          <span className="rounded bg-primary px-2 py-0.5 text-label-sm font-semibold text-on-primary">Slot 3 (1 hr)</span>
        </div>

        <div className="rounded-lg border border-outline-variant bg-surface-bright p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-label-sm font-bold uppercase tracking-wide text-primary">Subject Code: {data.code}</span>
              <h3 className="mt-0.5 text-headline-sm font-bold text-on-surface">{data.name}</h3>
            </div>
            <span className="shrink-0 rounded bg-indigo-100 px-2 py-0.5 text-label-sm font-semibold text-indigo-800">{data.type}</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between border-t border-outline-variant pt-2 text-body-sm text-on-surface-variant">
            <span>Credits: {data.credits}</span><span>Semester: {data.semester}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface-bright p-3">
          <span className="text-label-sm font-semibold uppercase text-on-surface-variant">Assigned Faculty</span>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-fixed font-bold text-on-primary-fixed">{data.initials}</div>
            <div><h4 className="text-label-lg font-bold text-on-surface">{data.faculty}</h4><span className="text-body-sm text-on-surface-variant">{data.designation}</span></div>
          </div>
          <div className="mt-1 rounded border border-outline-variant bg-surface-container p-2">
            <div className="mb-1 flex justify-between text-label-sm"><span className="font-medium text-on-surface">Faculty Weekly Teaching Load</span><span className="font-bold text-primary">{data.load}</span></div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-outline-variant"><div className="h-full w-[87.5%] rounded-full bg-primary" /></div>
            <div className="mt-1 flex justify-between text-[11px] text-on-surface-variant"><span>{data.preference}</span><span className="font-semibold text-emerald-700">✓ Compliant</span></div>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface-bright p-3">
          <span className="text-label-sm font-semibold uppercase text-on-surface-variant">Classroom &amp; Logistics</span>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="meeting_room" className="text-xl text-primary" />
              <div><span className="block text-label-md font-bold text-on-surface">{data.room}</span><span className="text-body-sm text-on-surface-variant">{data.roomType}</span></div>
            </div>
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-label-sm font-semibold text-emerald-800">Ready</span>
          </div>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <div className="rounded bg-surface-container p-2 text-center"><span className="block text-[10px] uppercase text-on-surface-variant">Room Capacity</span><span className="text-label-lg font-bold text-on-surface">{data.capacity}</span><span className="block text-[10px] font-medium text-emerald-700">{data.enrolled}</span></div>
            <div className="rounded bg-surface-container p-2 text-center"><span className="block text-[10px] uppercase text-on-surface-variant">Smart AV System</span><span className="text-label-lg font-bold text-emerald-700">{data.equipment}</span><span className="block text-[10px] text-on-surface-variant">{data.equipmentDetail}</span></div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 rounded-lg border border-amber-200 bg-amber-50/60 p-3">
          <div className="flex items-center gap-1.5 text-label-md font-bold text-amber-900"><Icon name="lock" className="text-base text-amber-700" /> Constraint: Locked Slot</div>
          <p className="text-body-sm text-amber-950">Locked by <strong>{data.lockedBy}</strong> on {data.lockedDate}. Automated optimizer pass retains this coordinate across 08:00-17:00 schedule runs.</p>
        </div>

        <div className="flex flex-col gap-1.5 rounded-lg border border-outline-variant bg-surface-container-low p-3">
          <span className="text-label-sm font-semibold uppercase text-on-surface-variant">Engine Validation Checks</span>
          {data.validation.map((check) => <div key={check} className="flex items-center gap-2 text-label-sm text-emerald-800"><Icon name="check_circle" className="text-sm" fill /><span>{check}</span></div>)}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-outline-variant bg-surface-container-lowest p-4">
        <button className="flex w-full items-center justify-center gap-2 rounded bg-primary px-3 py-2 text-label-md font-semibold text-on-primary shadow-sm transition-all hover:bg-primary-container active:scale-95"><Icon name="auto_awesome" className="text-lg" fill />Explain with AI Assistant</button>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={onMove} className="flex w-full items-center justify-center gap-1 rounded border border-outline-variant bg-surface-container-lowest px-2 py-2 text-label-sm font-semibold text-on-surface hover:bg-surface-container"><Icon name="swap_horiz" className="text-sm" />Move Slot</button>
          <button className="flex w-full items-center justify-center gap-1 rounded border border-amber-300 bg-amber-50 px-2 py-2 text-label-sm font-semibold text-amber-900 hover:bg-amber-100"><Icon name="lock_open" className="text-sm" />Unlock</button>
        </div>
        <button onClick={onRemove} className="flex w-full items-center justify-center gap-1 rounded px-3 py-1 text-label-sm font-medium text-error transition-colors hover:bg-error-container/40"><Icon name="delete" className="text-sm" />Remove Class from Schedule</button>
      </div>
    </aside>
  )
}
