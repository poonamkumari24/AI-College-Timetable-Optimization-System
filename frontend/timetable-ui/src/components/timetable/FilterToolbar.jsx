import Icon from '../common/Icon'

const tabs = ['Weekly Section View', 'Faculty View', 'Room Utilization']

export default function FilterToolbar({ view, setView, locked, setLocked, onExport, onAdd }) {
  return (
    <div className="flex flex-shrink-0 flex-wrap items-center justify-between gap-3 border-b border-outline-variant bg-surface-container-lowest px-6 py-2.5">
      <div className="flex flex-wrap items-center gap-2">
        {[
          ['Dept:', 'Computer Science & Engineering'],
          ['Sem/Sec:', 'Sem 5 - Section A (CS-501..506)'],
          ['Year:', '2024-2025'],
        ].map(([label, value]) => (
          <button key={label} className="flex items-center rounded border border-outline-variant bg-surface-container-lowest px-2.5 py-1 text-label-sm font-label-sm text-on-surface">
            <span className="mr-1.5 text-on-surface-variant">{label}</span>
            <span className="font-semibold">{value}</span>
            <Icon name="arrow_drop_down" className="ml-1.5 text-xs text-on-surface-variant" />
          </button>
        ))}
        <div className="ml-2 flex items-center rounded border border-outline-variant bg-surface-container p-0.5">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setView(tab)} className={`rounded px-2.5 py-0.5 text-label-sm ${view === tab ? 'bg-surface-container-lowest font-semibold text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button onClick={() => setLocked((v) => !v)} className="flex items-center gap-1 rounded border border-outline-variant px-2.5 py-1 text-label-sm text-on-surface hover:bg-surface-container">
          <Icon name={locked ? 'lock_open' : 'lock'} className="text-sm text-on-surface-variant" />
          <span>{locked ? 'Unlock Timetable' : 'Lock Timetable'}</span>
        </button>
        <button onClick={onExport} className="flex items-center gap-1 rounded border border-outline-variant px-2.5 py-1 text-label-sm text-on-surface hover:bg-surface-container">
          <Icon name="file_download" className="text-sm text-on-surface-variant" />
          <span>Export (PDF/Excel)</span>
        </button>
        <button className="flex items-center gap-1 rounded border border-outline-variant px-2.5 py-1 text-label-sm text-on-surface hover:bg-surface-container">
          <Icon name="filter_list" className="text-sm text-on-surface-variant" />
          <span>Filter by Lab/Theory</span>
        </button>
        <button onClick={onAdd} className="flex items-center gap-1 rounded bg-primary px-2.5 py-1 text-label-sm font-semibold text-on-primary shadow-sm hover:bg-primary-container">
          <Icon name="add" className="text-sm" />
          <span>Add Manual Class</span>
        </button>
      </div>
    </div>
  )
}
