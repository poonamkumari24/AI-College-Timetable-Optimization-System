import { useMemo, useState } from 'react';
import { facultyMembers, departments, designations, workloadOptions, workloadPercent } from '../../data/facultyData';

function Icon({ children, className = '', filled = false }) {
  return <span className={`material-symbols-outlined ${className}`} style={filled ? {fontVariationSettings: "'FILL' 1"} : undefined}>{children}</span>;
}

function Status({ value }) {
  const map = {
    Active: 'border-emerald-300 bg-emerald-100 text-emerald-800',
    'Max Load': 'border-amber-300 bg-amber-100 text-amber-900',
    Sabbatical: 'border-slate-300 bg-slate-100 text-slate-700'
  };
  const dot = { Active:'bg-emerald-600', 'Max Load':'bg-amber-600', Sabbatical:'bg-slate-400' }[value];
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${map[value]}`}><span className={`h-1.5 w-1.5 rounded-full ${dot}`}/>{value}</span>;
}

function StatCard({ label, value, suffix, icon, children }) {
  return <div className="flex items-center justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-3.5 shadow-sm">
    <div className="flex flex-col">
      <span className="text-label-sm uppercase tracking-wider text-secondary">{label}</span>
      <span className="mt-0.5 text-headline-md font-bold text-on-surface">{value} <span className="text-body-sm font-normal text-secondary">{suffix}</span></span>
      {children}
    </div>
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container text-primary"><Icon className="text-[22px]">{icon}</Icon></div>
  </div>;
}

export default function FacultyManagement({ onNavigate = () => {} }) {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('Computer Science & Eng (CSE)');
  const [designation, setDesignation] = useState('All Designations');
  const [workload, setWorkload] = useState('All Workload Status');
  const [selectedId, setSelectedId] = useState('CSE-2018-04');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => facultyMembers.filter(f => {
    const q = search.toLowerCase().trim();
    const matchesSearch = !q || [f.name,f.id,f.department,f.designation].some(v => v.toLowerCase().includes(q));
    const matchesDept = department === 'All Departments' || (department.includes('CSE') && f.department === 'CSE');
    const p = workloadPercent(f);
    const matchesWork = workload === 'All Workload Status'
      || (workload === 'Normal Load (80-95%)' && p >= 80 && p <= 95)
      || (workload === 'Near Max Load (>95%)' && p > 95)
      || (workload === 'Low Load (<70%)' && p < 70);
    const matchesDesignation = designation === 'All Designations' || f.designation === designation;
    return matchesSearch && matchesDept && matchesWork && matchesDesignation;
  }), [search, department, designation, workload]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const selected = facultyMembers.find(f => f.id === selectedId) || facultyMembers[0];

  const reset = () => { setSearch(''); setDepartment('Computer Science & Eng (CSE)'); setDesignation('All Designations'); setWorkload('All Workload Status'); setPage(1); };
  const action = (message) => window.alert(message);

  return <div className="flex h-full min-h-screen flex-col bg-background text-on-surface font-body-md">
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-4 border-b border-outline-variant bg-surface-container-lowest px-6 py-3 shadow-sm">
      <div className="flex items-center gap-4 xl:gap-6">
        <div className="hidden items-center gap-2 md:flex"><h1 className="text-headline-sm font-bold">Academic Schedule Matrix</h1><span className="text-outline-variant">|</span><span className="text-label-md font-medium text-secondary">Faculty Directory</span></div>
        <button onClick={() => action('Academic term selector opened.')} className="hidden items-center gap-1.5 rounded-full border border-outline-variant bg-surface-container px-3 py-1 text-label-md font-semibold text-primary lg:inline-flex"><Icon className="text-[16px]">calendar_today</Icon>Fall 2024 - Term 1<Icon className="text-[16px] text-secondary">arrow_drop_down</Icon></button>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => action('Faculty list export started.')} className="hidden items-center gap-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-label-md font-semibold shadow-sm hover:bg-surface-container md:inline-flex"><Icon className="text-[18px]">file_download</Icon>Export Faculty List</button>
        <button onClick={() => action('Add Faculty form opened.')} className="inline-flex items-center gap-1.5 rounded-lg bg-primary-container px-3.5 py-1.5 text-label-md font-medium text-on-primary shadow-sm hover:bg-primary"><Icon className="text-[18px]">add</Icon>+ Add Faculty</button>
        <div className="mx-1 hidden h-6 w-px bg-outline-variant sm:block"/>
        <button onClick={() => action('Notifications opened.')} className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container" title="Notifications"><Icon>notifications</Icon></button>
        <button onClick={() => action('System settings opened.')} className="hidden rounded-lg p-2 text-on-surface-variant hover:bg-surface-container sm:block" title="System Settings"><Icon>tune</Icon></button>
        <button onClick={() => action('Documentation opened.')} className="hidden rounded-lg p-2 text-on-surface-variant hover:bg-surface-container sm:block" title="Documentation Help"><Icon>help</Icon></button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-outline-variant bg-secondary-fixed text-label-md font-bold text-on-secondary-fixed">AD</div>
      </div>
    </header>

    <main className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-4">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Faculty" value="42" suffix="Professors" icon="groups"><span className="mt-1 flex items-center gap-0.5 text-label-sm text-primary"><Icon className="text-[14px]">apartment</Icon>4 Academic Depts</span></StatCard>
        <StatCard label="Active This Term" value="38" suffix="/ 42 Roster" icon="how_to_reg"><span className="mt-1 flex items-center gap-1 text-label-sm text-secondary"><span className="h-2 w-2 rounded-full bg-emerald-500"/>90.4% Available</span></StatCard>
        <StatCard label="Average Teaching Load" value="15.4" suffix="hrs/week" icon="timelapse"><span className="mt-1 flex items-center gap-1 text-label-sm text-primary"><Icon className="text-[14px]">speed</Icon>Standard cap: 16.0 hrs</span></StatCard>
        <StatCard label="Availability Status" value="36/42" suffix="Completed" icon="event_note"><div className="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-surface-container"><div className="h-1.5 rounded-full bg-primary-container" style={{width:'85%'}}/></div></StatCard>
      </section>

      <section className="flex flex-col items-center justify-between gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-3 shadow-sm md:flex-row">
        <div className="relative w-full md:w-96"><Icon className="absolute left-3 top-2.5 text-[18px] text-on-surface-variant">search</Icon><input value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}} className="w-full rounded-lg border border-outline-variant bg-surface-bright py-1.5 pl-9 pr-3 text-body-sm outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container" placeholder="Search faculty by name, ID, or department..."/></div>
        <div className="flex w-full flex-wrap items-center gap-2.5 md:w-auto">
          <select value={department} onChange={e=>{setDepartment(e.target.value);setPage(1)}} className="rounded-lg border border-outline-variant bg-surface-bright px-2.5 py-1.5 text-body-sm"><option>All Departments</option><option>Computer Science &amp; Eng (CSE)</option><option>Information Tech (IT)</option><option>Electronics (ECE)</option><option>Mechanical (MECH)</option></select>
          <select value={designation} onChange={e=>{setDesignation(e.target.value);setPage(1)}} className="rounded-lg border border-outline-variant bg-surface-bright px-2.5 py-1.5 text-body-sm">{designations.map(x=><option key={x}>{x}</option>)}</select>
          <select value={workload} onChange={e=>{setWorkload(e.target.value);setPage(1)}} className="rounded-lg border border-outline-variant bg-surface-bright px-2.5 py-1.5 text-body-sm">{workloadOptions.map(x=><option key={x}>{x}</option>)}</select>
          <button onClick={reset} className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-label-sm text-secondary hover:bg-surface-container"><Icon className="text-[16px]">restart_alt</Icon>Reset</button>
        </div>
      </section>

      <section className="grid flex-1 grid-cols-1 items-start gap-4 lg:grid-cols-12">
        <div className="flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm lg:col-span-8">
          <div className="flex items-center justify-between border-b border-outline-variant bg-surface-bright px-4 py-3"><div className="flex items-center gap-2"><span className="text-label-lg font-bold">Faculty Directory</span><span className="rounded-full bg-secondary-container px-2 py-0.5 text-label-sm text-on-secondary-container">{filtered.length} Faculty in CSE</span></div><span className="hidden items-center gap-1 text-label-sm text-secondary sm:flex"><span className="h-2 w-2 rounded-full bg-primary-container"/>Selected row is highlighted</span></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left"><thead><tr className="border-b border-outline-variant bg-surface-container-low text-label-sm uppercase tracking-wider text-secondary"><th className="px-4 py-2.5">Faculty &amp; ID</th><th className="px-3 py-2.5">Designation</th><th className="px-3 py-2.5">Assigned Courses</th><th className="px-3 py-2.5">Weekly Load</th><th className="px-3 py-2.5">Status</th><th className="px-4 py-2.5 text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-outline-variant text-body-sm">
              {visible.map(f => { const selectedRow = f.id===selectedId; const pct=workloadPercent(f); return <tr key={f.id} onClick={()=>setSelectedId(f.id)} className={`cursor-pointer transition-colors hover:bg-surface-container ${selectedRow?'border-l-4 border-primary bg-surface-container-high/60':''} ${f.status==='Sabbatical'?'opacity-75':''}`}>
                <td className="px-4 py-3"><div className="flex items-center gap-3"><div className={`flex h-9 w-9 items-center justify-center rounded-full text-label-md font-bold ${selectedRow?'bg-primary-container text-on-primary':'bg-surface-container text-primary'}`}>{f.initials}</div><div><span className="flex items-center gap-1 text-label-lg font-semibold">{f.name}{f.verified&&<Icon className="text-[16px] text-primary" filled>verified</Icon>}</span><span className="text-label-sm text-secondary">{f.id} • Dept: {f.department}</span></div></div></td>
                <td className="px-3 py-3"><span className="font-medium">{f.designation}</span><div className="text-[11px] text-secondary">{f.subtitle}</div></td>
                <td className="px-3 py-3">{f.courses.length?<div className="flex max-w-[200px] flex-wrap gap-1">{f.courses.map((c,i)=><span key={c} className={`rounded border px-2 py-0.5 text-[11px] font-medium ${c.toLowerCase().includes('lab')?'border-purple-200 bg-purple-50 text-purple-800':'border-indigo-200 bg-indigo-50 text-primary-container'}`}>{c}</span>)}</div>:<span className="text-[12px] italic text-secondary">None this term</span>}</td>
                <td className="px-3 py-3"><div className="flex w-28 flex-col gap-1"><div className="flex justify-between text-label-sm"><span className={`font-semibold ${f.status==='Max Load'?'text-error':''}`}>{f.load} / {f.maxLoad} hrs</span><span className={`font-bold ${f.status==='Max Load'?'text-error':'text-primary'}`}>{pct}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-surface-variant"><div className={`h-1.5 rounded-full ${f.status==='Max Load'?'bg-error':f.status==='Sabbatical'?'bg-secondary':'bg-primary-container'}`} style={{width:`${pct}%`}}/></div></div></td>
                <td className="px-3 py-3"><Status value={f.status}/></td>
                <td className="px-4 py-3 text-right"><div className="inline-flex items-center gap-1"><button onClick={e=>{e.stopPropagation();setSelectedId(f.id);onNavigate('Timetable')}} className="rounded p-1 text-primary hover:bg-surface-container" title="View Timetable"><Icon className="text-[18px]">table_chart</Icon></button><button onClick={e=>{e.stopPropagation();action(`Edit Details: ${f.name}`)}} className="rounded p-1 text-secondary hover:bg-surface-container" title="Edit Details"><Icon className="text-[18px]">edit</Icon></button><button onClick={e=>{e.stopPropagation();action(`Set Availability: ${f.name}`)}} className="rounded p-1 text-secondary hover:bg-surface-container" title="Set Availability"><Icon className="text-[18px]">event_available</Icon></button></div></td>
              </tr>})}
              {!visible.length&&<tr><td colSpan="6" className="px-4 py-12 text-center text-secondary">No faculty matched the current filters.</td></tr>}
            </tbody></table>
          </div>
          <div className="flex items-center justify-between border-t border-outline-variant bg-surface-bright px-4 py-2.5 text-body-sm text-secondary"><span>Showing {filtered.length ? (page-1)*pageSize+1:0} to {Math.min(page*pageSize,filtered.length)} of {filtered.length} Faculty</span><div className="flex items-center gap-1"><button disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="rounded border border-outline-variant px-2 py-1 disabled:opacity-40">Prev</button>{Array.from({length:pages},(_,i)=>i+1).map(n=><button key={n} onClick={()=>setPage(n)} className={`rounded px-2.5 py-1 ${page===n?'bg-primary-container font-bold text-on-primary':'hover:bg-surface-container'}`}>{n}</button>)}<button disabled={page===pages} onClick={()=>setPage(p=>Math.min(pages,p+1))} className="rounded border border-outline-variant px-2 py-1 disabled:opacity-40">Next</button></div></div>
        </div>

        <FacultyDetails faculty={selected} onNavigate={onNavigate} onAction={action}/>
      </section>
    </main>
  </div>;
}

function FacultyDetails({ faculty, onNavigate, onAction }) {
  const pct=workloadPercent(faculty);
  return <div className="flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm lg:col-span-4">
    <div className="flex items-center justify-between border-b border-outline-variant bg-surface-bright p-4"><div className="flex items-center gap-2"><Icon className="text-primary text-[20px]">account_box</Icon><h2 className="text-label-lg font-bold">Faculty Profile Details</h2></div><Status value={faculty.status}/></div>
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-start gap-3.5 border-b border-outline-variant pb-3"><div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-container text-headline-sm font-bold text-on-primary shadow-sm">{faculty.initials}</div><div><h3 className="text-headline-sm font-bold">{faculty.name}</h3><p className="text-body-sm text-secondary">{faculty.designation} • Dept. of {faculty.department}</p><div className="mt-1 flex flex-wrap gap-2"><span className="rounded border border-outline-variant bg-surface-container px-2 py-0.5 text-[11px]">ID: {faculty.id}</span><span className="text-label-sm text-secondary">Full-time Faculty</span></div></div></div>
      <div><div className="mb-1.5 flex items-center justify-between"><span className="text-label-md font-semibold">Weekly Teaching Load</span><span className="text-label-md font-bold text-primary">{faculty.load} hrs / {faculty.maxLoad} hrs max</span></div><div className="mb-2 h-2 overflow-hidden rounded-full bg-surface-container-high"><div className={`h-2 rounded-full ${pct>=100?'bg-error':'bg-primary-container'}`} style={{width:`${pct}%`}}/></div>{faculty.stats.length>0&&<div className="grid grid-cols-3 gap-2">{faculty.stats.map(([a,b,c])=><div key={a} className="rounded-lg border border-outline-variant bg-surface-container-low p-2 text-center"><span className="block text-[10px] font-bold uppercase text-primary">{a}</span><span className="block text-label-lg font-bold">{b}</span><span className="text-label-sm text-secondary">{c}</span></div>)}</div>}</div>
      <div className="flex flex-col gap-2 border-t border-outline-variant pt-2"><span className="flex items-center justify-between text-label-md font-semibold"><span>Assigned Classes (Fall 2024)</span><span className="text-label-sm text-primary">{faculty.classes.length ? '3 Course Codes':'Course list'}</span></span>{faculty.classes.length ? faculty.classes.map(x=><div key={x.code} className="flex flex-col gap-1 rounded-lg border border-outline-variant border-l-4 border-l-primary bg-surface-bright p-2.5"><div className="flex items-center justify-between gap-2"><span className="text-label-md font-bold">{x.code}: {x.title}</span><span className="rounded border border-indigo-200 bg-indigo-100 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-800">{x.type}</span></div><div className="flex flex-wrap gap-2 text-body-sm text-secondary"><span className="flex items-center gap-1"><Icon className="text-[14px]">groups</Icon>{x.section}</span><span>•</span><span className="flex items-center gap-1"><Icon className="text-[14px]">schedule</Icon>{x.schedule}</span></div><div className="flex items-center gap-1 text-label-sm text-primary"><Icon className="text-[14px]">{x.icon}</Icon>{x.location}</div></div>) : <div className="rounded-lg border border-dashed border-outline-variant bg-surface-container-low p-3 text-body-sm text-secondary">No assigned class preview is available for this faculty member in the supplied design.</div>}</div>
      <div className="flex flex-col gap-2 border-t border-outline-variant pt-2"><span className="flex items-center gap-1 text-label-md font-semibold"><Icon className="text-[16px] text-secondary">tune</Icon>Availability Preferences</span><div className="flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface-bright p-3"><Preference icon="check_circle" label="Preferred Slots:" value={faculty.availability}/><Preference icon="lunch_dining" label="Lunch Hour:" value={faculty.lunch}/><Preference icon="do_not_disturb_on" label="Protected Free Time:" value={faculty.protectedTime}/></div></div>
      <div className="mt-1 flex flex-col gap-2 border-t border-outline-variant pt-2"><button onClick={()=>onNavigate('Timetable')} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-3 py-2 text-label-md font-semibold text-on-primary shadow-sm hover:bg-primary"><Icon className="text-[18px]">table_chart</Icon>View Full Schedule</button><div className="grid grid-cols-2 gap-2"><button onClick={()=>onAction(`Edit Subjects: ${faculty.name}`)} className="flex items-center justify-center gap-1 rounded-lg border border-outline-variant px-2 py-1.5 text-label-sm hover:bg-surface-container"><Icon className="text-[16px]">edit_calendar</Icon>Edit Subjects</button><button onClick={()=>onAction(`Manage Availability: ${faculty.name}`)} className="flex items-center justify-center gap-1 rounded-lg border border-outline-variant px-2 py-1.5 text-label-sm hover:bg-surface-container"><Icon className="text-[16px]">event_available</Icon>Manage Availability</button></div></div>
    </div>
  </div>;
}

function Preference({ icon, label, value }) {
  return <div className="flex items-center justify-between gap-3"><span className="flex items-center gap-1 text-label-sm text-secondary"><Icon className="text-[14px]">{icon}</Icon>{label}</span><span className="text-right text-label-sm font-medium">{value}</span></div>;
}
