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
  const [proposal, setProposal] = useState(null)
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

  const optimize = async () => {
    if (optimizing) return
    setOptimizing(true)
    showToast('Loading academic data and asking the round-robin scheduler…')
    try {
      const get = async (path) => {
        const response = await fetch(`http://localhost:8080${path}`)
        if (!response.ok) throw new Error(`${path} returned ${response.status}`)
        return response.json()
      }
      const [timetables, sections, semesters, programs, subjects, faculty, rooms, slots, entries] = await Promise.all([
        get('/api/timetables'), get('/api/sections'), get('/api/semesters'), get('/api/programs'),
        get('/api/subjects'), get('/api/faculty'), get('/api/rooms'), get('/api/time-slots'), get('/api/timetable-entries'),
      ])
      if (!timetables.length || !sections.length || !subjects.length || !faculty.length || !rooms.length || !slots.length) {
        throw new Error('Add timetables, sections, subjects, faculty, rooms, and time slots in Academic before generating.')
      }
      const programsById = new Map(programs.map((item) => [item.id, item]))
      const semestersById = new Map(semesters.map((item) => [item.id, item]))
      const requirements = sections.flatMap((section) => {
        const semester = semestersById.get(section.semesterId)
        const departmentId = programsById.get(semester?.programId)?.departmentId
        const applicableSubjects = subjects.filter((subject) => !departmentId || subject.departmentId === departmentId)
        const eligibleFaculty = faculty.filter((person) => !departmentId || person.departmentId === departmentId)
        const eligibleRooms = rooms.filter((room) => !room.departmentId || !departmentId || room.departmentId === departmentId)
        return applicableSubjects.filter((subject) => subject.weeklyHours > 0).map((subject) => ({
          section_id: section.id, subject_id: subject.id, weekly_hours: subject.weeklyHours,
          faculty_ids: eligibleFaculty.map((person) => person.id), room_ids: eligibleRooms.map((room) => room.id),
        })).filter((item) => item.faculty_ids.length && item.room_ids.length)
      })
      if (!requirements.length) throw new Error('No valid subject, faculty, and room assignments found. Check department setup.')
      const timetableId = timetables[0].id
      const existing = entries.filter((entry) => entry.timetableId === timetableId).map((entry) => ({
        section_id: entry.sectionId, subject_id: entry.subjectId, faculty_id: entry.facultyId,
        room_id: entry.roomId, slot_id: entry.timeSlotId,
      }))
      const response = await fetch('http://localhost:8080/api/schedule/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slots: slots.map((slot) => ({ id: slot.id, day: slot.dayOfWeek, period: slot.periodNumber })),
          requirements, existing, preserve_existing: true, random_change_count: 0,
        }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.detail?.message ?? result.error ?? 'The scheduler could not make a conflict-free timetable.')
      setProposal(result.entries.map((entry) => ({
        section: sections.find((item) => item.id === entry.section_id)?.name ?? entry.section_id,
        subject: subjects.find((item) => item.id === entry.subject_id)?.name ?? entry.subject_id,
        faculty: faculty.find((item) => item.id === entry.faculty_id)?.name ?? entry.faculty_id,
        room: rooms.find((item) => item.id === entry.room_id)?.name ?? entry.room_id,
        slot: slots.find((item) => item.id === entry.slot_id),
      })))
      setRunId((id) => id + 1)
      setSoftScore(100)
      showToast(`Proposal ready: ${result.count} classes, no section/faculty/room clashes. Review before saving.`)
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Could not reach the timetable services.')
    } finally {
      setOptimizing(false)
    }
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
            {proposal && <section className="mx-4 mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 sm:mx-5">
              <div className="mb-2 flex items-center justify-between"><div><h2 className="text-sm font-bold text-emerald-950">Round-robin proposal</h2><p className="text-xs text-emerald-800">{proposal.length} classes generated. Preview only; not saved.</p></div><button className="rounded border border-emerald-300 px-2 py-1 text-xs" onClick={() => setProposal(null)}>Dismiss</button></div>
              <div className="max-h-48 overflow-auto rounded border border-emerald-200 bg-white"><table className="w-full text-left text-xs"><thead className="sticky top-0 bg-emerald-100"><tr><th className="p-2">Section</th><th className="p-2">Subject</th><th className="p-2">Faculty</th><th className="p-2">Room</th><th className="p-2">Day / Period</th></tr></thead><tbody>{proposal.map((item, index) => <tr key={`${item.section}-${item.subject}-${index}`} className="border-t"><td className="p-2">{item.section}</td><td className="p-2">{item.subject}</td><td className="p-2">{item.faculty}</td><td className="p-2">{item.room}</td><td className="p-2">{item.slot?.dayOfWeek} / {item.slot?.periodNumber}</td></tr>)}</tbody></table></div>
            </section>}
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


