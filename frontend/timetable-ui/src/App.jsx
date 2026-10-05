import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import FilterToolbar from './components/timetable/FilterToolbar'
import StatusBanner from './components/timetable/StatusBanner'
import TimetableMatrix from './components/timetable/TimeTableMatrix'
import Inspector from './components/timetable/Inspector'
import Legend from './components/timetable/Legend'
import Dashboard from './pages/dashboard/Dashboard'
import FacultyManagement from './components/faculty/FacultyManagement'
import { timetable } from './data/timetableData'
import AcademicStructure from './components/academic/AcademicStructure'

const navPaths = {
  Dashboard: '/dashboard',
  Academic: '/academic',
  Faculty: '/faculty',
  'Rooms & Labs': '/rooms-labs',
  Availability: '/availability',
  Scheduling: '/scheduling',
  Timetable: '/',
  'AI Assistant': '/ai-assistant',
  Conflicts: '/conflicts',
  Analytics: '/analytics',
  Reports: '/reports',
  Settings: '/settings',
}

const navLabels = Object.fromEntries(
  Object.entries(navPaths).map(([label, path]) => [path, label]),
)

function SectionPage({ title }) {
  return (
    <main className="flex-1 overflow-y-auto bg-background p-6">
      <h1 className="text-headline-lg font-bold text-on-surface">{title}</h1>
      <p className="mt-2 text-body-md text-on-surface-variant">
        The {title} page is not available yet.
      </p>
    </main>
  )
}


function Toast({ message, onClose }) {
  if (!message) return null
  return (
    <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-lg border border-outline-variant bg-on-surface px-4 py-3 text-sm text-white shadow-xl">
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button onClick={onClose} className="text-xs text-white/70 hover:text-white">Dismiss</button>
      </div>
    </div>
  )
}

function ManualClassModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-md rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between"><h3 className="text-headline-md font-bold">Add Manual Class</h3><button onClick={onClose}><span className="material-symbols-outlined text-xl">close</span></button></div>
        <div className="grid gap-3">
          {['Course / Class', 'Faculty', 'Room'].map((label) => <label key={label} className="grid gap-1 text-sm font-semibold text-on-surface"><span>{label}</span><input className="rounded-md border border-outline-variant bg-surface-container-low px-3 py-2 font-normal outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder={`Enter ${label.toLowerCase()}`} /></label>)}
          <div className="grid grid-cols-2 gap-3"><label className="grid gap-1 text-sm font-semibold">Day<select className="rounded-md border border-outline-variant bg-surface-container-low px-3 py-2 font-normal"><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option></select></label><label className="grid gap-1 text-sm font-semibold">Slot<select className="rounded-md border border-outline-variant bg-surface-container-low px-3 py-2 font-normal"><option>08:00 - 09:00</option><option>09:00 - 10:00</option><option>10:00 - 11:00</option><option>11:00 - 12:00</option><option>12:00 - 13:00</option><option>14:00 - 15:00</option><option>15:00 - 16:00</option><option>16:00 - 17:00</option></select></label></div>
        </div>
        <div className="mt-5 flex justify-end gap-2"><button onClick={onClose} className="rounded-md border border-outline-variant px-3 py-2 text-sm">Cancel</button><button onClick={onClose} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary">Add Class</button></div>
      </div>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const activeNav = navLabels[location.pathname] ?? 'Timetable'
  const [search, setSearch] = useState('')
  const [view, setView] = useState('Weekly Section View')
  const [locked, setLocked] = useState(false)
  const [showInspector, setShowInspector] = useState(true)
  const [optimizing, setOptimizing] = useState(false)
  const [runId, setRunId] = useState(1042)
  const [softScore, setSoftScore] = useState(95.4)
  const [toast, setToast] = useState('')
  const [showManualModal, setShowManualModal] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)

  const filteredTimetable = useMemo(() => timetable, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowManualModal(false)
        setShowMobileNav(false)
        setShowInspector(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const showToast = (message) => {
    setToast(message)
    window.clearTimeout(window.__timetableToast)
    window.__timetableToast = window.setTimeout(() => setToast(''), 2600)
  }

  const optimize = () => {
    if (optimizing) return
    setOptimizing(true)
    showToast('AI optimizer started. Re-evaluating hard and soft constraints…')
    window.setTimeout(() => {
      setRunId((id) => id + 1)
      setSoftScore((score) => Math.min(99.9, score + 0.6))
      setOptimizing(false)
      showToast('Optimization complete: 48/48 slots scheduled with 0 hard conflicts.')
    }, 1200)
  }

  const onSelectClass = (cell) => {
    if (cell.code === 'DBMS (CS-501)' || cell.selected) {
      setShowInspector(true)
      showToast('Selected Friday • 10:00 - 11:00 AM')
    } else {
      setShowInspector(true)
      showToast(`${cell.code} selected. Inspector is showing the demo assignment profile.`)
    }
  }

  const navigateTo = (item) => {
    const path = navPaths[item]
    if (!path) return
    navigate(path)
    setShowMobileNav(false)
    showToast(`${item} selected`)
  }

  return (
    <div className="flex min-h-screen overflow-hidden bg-background text-on-surface">
      <Sidebar activeNav={activeNav} onNavChange={navigateTo} onOptimize={optimize} role="Administrator" />

      <div className="desktop-main-offset flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar search={search} setSearch={setSearch} onOptimize={optimize} optimizing={optimizing} onSwitchRole={() => showToast('Role switcher opened')} onToggleNav={() => setShowMobileNav((open) => !open)} mobileNavOpen={showMobileNav} />
        {activeNav === 'Dashboard' ? (
          <Dashboard onOptimize={optimize} onAction={(action) => showToast(`${action} action selected`)} />
        ) : activeNav === 'Faculty' ? (
          <FacultyManagement onNavigate={navigateTo} />
        ) : activeNav === 'Academic' ? (
          <AcademicStructure onNavigate={navigateTo} />
        ) : activeNav !== 'Timetable' ? (
          <SectionPage title={activeNav} />
        ) : (
          <>
            <FilterToolbar view={view} setView={(next) => { setView(next); showToast(`${next} selected`) }} locked={locked} setLocked={setLocked} onExport={() => showToast('Export menu opened (PDF / Excel)')} onAdd={() => setShowManualModal(true)} />
            <StatusBanner runId={runId} softScore={softScore} onWarnings={() => showToast('2 soft warnings: Friday late load and Monday room preference')} onAiAssistant={() => showToast('AI Assistant panel opened')} />

            <div className="flex min-h-0 flex-1 overflow-hidden">
              <main className="flex min-w-0 flex-1 flex-col overflow-auto bg-background p-4 sm:p-5">
                <div className="mb-2 text-xs text-on-surface-variant">Current view: <span className="font-semibold text-primary">{view}</span>{locked ? ' • Timetable locked' : ''}</div>
                <TimetableMatrix timetable={filteredTimetable} search={search} onSelect={onSelectClass} selectedCode="DBMS (CS-501)" />
                <Legend />
              </main>
              {showInspector && <Inspector onClose={() => setShowInspector(false)} onRemove={() => showToast('Remove action requested')} onMove={() => showToast('Move-slot workflow opened')} />}
            </div>
          </>
        )}
      </div>

      <Toast message={toast} onClose={() => setToast('')} />
      {showManualModal && <ManualClassModal onClose={() => setShowManualModal(false)} />}
    </div>
  )
}