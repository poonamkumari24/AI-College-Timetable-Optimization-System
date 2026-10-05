import { useMemo, useState } from "react";
import {
  courseTypes,
  courses,
  departments,
  regulations,
  semesters,
} from "../../data/AcademicData";

function Icon({ children, className = "", filled = false }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={
        filled
          ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }
          : undefined
      }
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

function MetricCard({ title, value, children, icon, iconClass = "text-primary bg-surface-container" }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-body-sm text-secondary">{title}</p>
          <h2 className="mt-1 text-headline-md font-bold text-on-surface">{value}</h2>
        </div>
        <div className={`rounded-lg p-2 ${iconClass}`}>
          <Icon className="text-2xl">{icon}</Icon>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-surface-container pt-3 text-body-sm">
        {children}
      </div>
    </div>
  );
}

function CourseTypeBadge({ course }) {
  const isLab = course.type === "Practical Lab";

  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-label-sm font-semibold ${
        isLab
          ? "border-outline-variant bg-tertiary-fixed text-on-tertiary-fixed"
          : "border-outline-variant bg-surface-container-high text-primary"
      }`}
    >
      {course.type} • {course.credits} Credits
    </span>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-on-background/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-2xl">
        <div className="flex items-center justify-between border-b border-outline-variant p-5">
          <div className="flex items-center gap-2">
            <Icon className="text-primary">auto_awesome</Icon>
            <h2 className="text-headline-sm font-bold">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-xl text-secondary hover:bg-surface-container"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export default function AcademicStructure({ onNavigate = () => {} }) {
  const [activeDepartment, setActiveDepartment] = useState("CSE");
  const [semester, setSemester] = useState(semesters[0]);
  const [courseType, setCourseType] = useState(courseTypes[0]);
  const [regulation, setRegulation] = useState(regulations[0]);
  const [search, setSearch] = useState("");
  const [selectedCourseCode, setSelectedCourseCode] = useState("CS-501");
  const [modal, setModal] = useState(null);

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return courses.filter((course) => {
      const departmentMatch = course.department === activeDepartment;
      const semesterMatch = course.semester === semester;
      const regulationMatch = course.regulation === regulation;

      let typeMatch = true;
      if (courseType === "Theory (1 hr slots)") {
        typeMatch = course.type === "Theory";
      } else if (courseType === "Lab Block (2 hrs continuous)") {
        typeMatch = course.type === "Practical Lab";
      } else if (courseType === "Tutorial") {
        typeMatch = course.weekly.toLowerCase().includes("tutorial");
      }

      const queryMatch =
        !query ||
        course.code.toLowerCase().includes(query) ||
        course.name.toLowerCase().includes(query) ||
        course.lead.toLowerCase().includes(query);

      return departmentMatch && semesterMatch && regulationMatch && typeMatch && queryMatch;
    });
  }, [activeDepartment, semester, courseType, regulation, search]);

  const selectedCourse =
    courses.find((course) => course.code === selectedCourseCode) ??
    courses[0];

  const clearSearch = () => setSearch("");

  const action = (message) => {
    setModal({
      title: "Academic Operations",
      content: (
        <div className="space-y-3 text-body-md text-on-surface-variant">
          <p>{message}</p>
          <p className="rounded-lg bg-surface-container-low p-3">
            This button is ready to connect to your Spring Boot API.
          </p>
        </div>
      ),
    });
  };

  return (
    <div className="flex h-full min-h-screen flex-col bg-background font-body-md text-on-surface">
      {/* ===================== TOP NAVIGATION ===================== */}
      <header className="sticky top-0 z-30 flex min-h-16 flex-shrink-0 items-center justify-between gap-4 border-b border-outline-variant bg-surface-container-lowest px-6 py-3 shadow-sm">
        <div className="flex min-w-0 items-center gap-6">
          <h1 className="truncate text-headline-sm font-bold tracking-tight text-on-surface">
            Academic Structure &amp; Curriculum
          </h1>

          <button
            onClick={() => action("Academic term selector opened.")}
            className="hidden items-center gap-2 rounded-lg border border-outline-variant bg-surface-container px-3 py-1.5 text-label-md font-semibold text-primary transition hover:bg-surface-container-high md:flex"
          >
            <Icon className="text-base">calendar_month</Icon>
            <span>Fall 2024 - Term 1</span>
            <Icon className="text-sm">expand_more</Icon>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => action("New Branch / Semester form opened.")}
            className="hidden items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-label-md font-semibold text-on-surface shadow-sm transition hover:bg-surface-container md:inline-flex"
          >
            <Icon className="text-lg text-secondary">domain_add</Icon>
            <span>+ New Branch/Semester</span>
          </button>

          <button
            onClick={() => action("Add Course / Subject form opened.")}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-container px-3.5 py-2 text-label-md font-semibold text-on-primary shadow-sm transition hover:bg-primary active:scale-95"
          >
            <Icon className="text-lg">add_circle</Icon>
            <span>+ Add Course / Subject</span>
          </button>

          <div className="mx-1 hidden h-6 w-px bg-outline-variant sm:block" />

          <button
            onClick={() => action("Notifications opened.")}
            className="rounded-lg p-2 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface"
            title="Notifications"
          >
            <Icon className="text-xl">notifications</Icon>
          </button>

          <button
            onClick={() => action("Help & Guides opened.")}
            className="hidden rounded-lg p-2 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface sm:block"
            title="Help & Guides"
          >
            <Icon className="text-xl">help</Icon>
          </button>

          <button
            onClick={() => action("Configuration Matrix opened.")}
            className="hidden rounded-lg p-2 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface sm:block"
            title="Configuration Matrix"
          >
            <Icon className="text-xl">tune</Icon>
          </button>

          <div className="flex items-center gap-2.5 pl-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-outline-variant bg-surface-container-highest text-label-md font-bold text-primary">
              AS
            </div>
            <div className="hidden text-left xl:block">
              <p className="text-label-md leading-none">Dean&apos;s Office</p>
              <p className="mt-0.5 text-body-sm leading-tight text-secondary">Admin Ops</p>
            </div>
          </div>
        </div>
      </header>

      {/* ===================== WORKSPACE ===================== */}
      <main className="flex flex-1 flex-col gap-6 overflow-y-auto bg-background p-6">
        {/* Metrics */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Total Departments & Branches" value="6 Departments" icon="corporate_fare">
            <span className="font-medium text-secondary">CSE, ECE, ME, CE, EE, IT</span>
            <span className="rounded bg-surface-container-high px-2 py-0.5 text-label-sm font-semibold text-primary">
              18 Programs
            </span>
          </MetricCard>

          <MetricCard
            title="Active Semesters & Sections"
            value="48 Batches / Sec"
            icon="groups"
            iconClass="bg-secondary-container text-on-secondary-fixed"
          >
            <span className="text-secondary">Across 1st to 8th Semester</span>
            <span className="rounded bg-surface-container px-2 py-0.5 text-label-sm font-semibold text-secondary">
              Cohort G1-G4
            </span>
          </MetricCard>

          <MetricCard
            title="Total Curriculum Courses"
            value="142 Subjects"
            icon="menu_book"
            iconClass="bg-surface-container-high text-primary"
          >
            <div className="flex items-center gap-2 text-secondary">
              <span className="h-2 w-2 rounded-full bg-primary-container" />
              <span>94 Theory</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <span className="h-2 w-2 rounded-full bg-tertiary-container" />
              <span>48 Practical Labs</span>
            </div>
          </MetricCard>

          <MetricCard
            title="Credit Hours Scheduled"
            value="386 Weekly Hrs"
            icon="timelapse"
            iconClass="bg-surface-container-highest text-primary"
          >
            <span className="text-secondary">Compliance Status</span>
            <span className="inline-flex items-center gap-1 rounded bg-surface-container-high px-2 py-0.5 text-label-sm font-semibold text-primary">
              <Icon className="text-xs">check_circle</Icon>
              100% Validated
            </span>
          </MetricCard>
        </section>

        {/* Department Tabs + Filters */}
        <section className="flex flex-col gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto border-b border-outline-variant pb-3">
            {departments.map((department) => {
              const active = activeDepartment === department.key;

              return (
                <button
                  key={department.key}
                  onClick={() => {
                    setActiveDepartment(department.key);
                    setSearch("");
                  }}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-label-md transition ${
                    active
                      ? "bg-primary-container font-semibold text-on-primary shadow-sm"
                      : "text-secondary hover:bg-surface-container"
                  }`}
                >
                  <Icon className="text-base">{department.icon}</Icon>
                  <span>{department.label}</span>
                  <span
                    className={`ml-1 rounded px-1.5 py-0.5 text-label-sm ${
                      active
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-high text-primary"
                    }`}
                  >
                    {department.courses} Courses
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <Filter
                label="Semester:"
                value={semester}
                options={semesters}
                onChange={setSemester}
              />

              <Filter
                label="Course Type:"
                value={courseType}
                options={courseTypes}
                onChange={setCourseType}
              />

              <Filter
                label="Regulation:"
                value={regulation}
                options={regulations}
                onChange={setRegulation}
              />
            </div>

            <div className="relative w-full min-w-0 md:w-80 xl:w-96">
              <Icon className="absolute left-3 top-2.5 text-lg text-secondary">
                search
              </Icon>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-full rounded-lg border border-outline-variant bg-surface-container pl-9 pr-4 text-body-sm text-on-surface outline-none placeholder:text-secondary focus:border-primary-container focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary-container"
                placeholder="Search subject name, course code, or coordinator..."
              />
            </div>
          </div>
        </section>

        {/* Main split */}
        <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-12">
          {/* Course directory */}
          <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm xl:col-span-8">
            <div className="flex items-center justify-between border-b border-outline-variant px-5 py-4">
              <div>
                <h3 className="text-headline-sm font-bold text-on-surface">
                  Curriculum Directory: 5th Sem CSE
                </h3>
                <p className="text-body-sm text-secondary">
                  Active curriculum offerings under 2022 CBCS Scheme • {filteredCourses.length} Courses scheduled
                </p>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <button
                  onClick={() => action("Batch View opened.")}
                  className="flex items-center gap-1.5 rounded-lg border border-outline-variant px-2.5 py-1.5 text-body-sm text-secondary transition hover:bg-surface-container hover:text-on-surface"
                >
                  <Icon className="text-base">filter_list</Icon>
                  Batch View
                </button>

                <button
                  onClick={() => action("Export Scheme started.")}
                  className="flex items-center gap-1.5 rounded-lg border border-outline-variant px-2.5 py-1.5 text-body-sm text-secondary transition hover:bg-surface-container hover:text-on-surface"
                >
                  <Icon className="text-base">file_download</Icon>
                  Export Scheme
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container text-label-md text-secondary">
                    <th className="px-4 py-3">Course Code & Name</th>
                    <th className="px-4 py-3">Type & Credits</th>
                    <th className="px-4 py-3">Weekly Slots</th>
                    <th className="px-4 py-3">Lead Faculty / Assigned</th>
                    <th className="px-4 py-3">Sections Enrolled</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-surface-container text-body-sm">
                  {filteredCourses.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-12 text-center text-secondary">
                        <Icon className="mb-2 text-3xl">search_off</Icon>
                        <p>No courses matched the current filters.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredCourses.map((course) => {
                      const selected = course.code === selectedCourseCode;

                      return (
                        <tr
                          key={course.code}
                          onClick={() => setSelectedCourseCode(course.code)}
                          className={`cursor-pointer transition-colors ${
                            selected
                              ? "border-l-4 border-primary bg-surface-container-high/60"
                              : "hover:bg-surface-container-low"
                          }`}
                        >
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  course.color === "lab"
                                    ? "bg-tertiary-container"
                                    : "bg-primary-container"
                                }`}
                              />

                              <div>
                                <div
                                  className={`text-label-md font-bold ${
                                    course.color === "lab"
                                      ? "text-tertiary"
                                      : "text-primary"
                                  }`}
                                >
                                  {course.code}
                                </div>
                                <div className="text-body-md font-semibold text-on-surface">
                                  {course.name}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-4 py-3.5">
                            <CourseTypeBadge course={course} />
                          </td>

                          <td className="whitespace-nowrap px-4 py-3.5">
                            <div className="font-medium text-on-surface">
                              {course.weekly}
                            </div>
                            <div className="text-xs text-secondary">
                              {course.slotNote}
                            </div>
                          </td>

                          <td className="px-4 py-3.5">
                            <div className="text-on-surface">
                              {course.lead}
                            </div>
                            <div className="text-xs text-secondary">
                              {course.leadRole}
                            </div>
                          </td>

                          <td className="px-4 py-3.5">
                            <span className="inline-block rounded bg-surface-container px-2 py-0.5 text-xs font-medium text-on-surface">
                              {course.sections}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-4 py-3.5 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCourseCode(course.code);
                                action(`Scheduling rules opened for ${course.code}.`);
                              }}
                              className="rounded px-2 py-1 text-label-md text-primary transition hover:bg-surface-container"
                            >
                              Rules
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCourseCode(course.code);
                                action(`Edit details opened for ${course.code}.`);
                              }}
                              className="rounded px-2 py-1 text-label-md text-secondary transition hover:bg-surface-container hover:text-on-surface"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-outline-variant bg-surface-container px-4 py-3 text-body-sm text-secondary">
              <span>
                Showing {filteredCourses.length} of 7 registered subjects for CSE 5th Semester
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled
                  className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-1 text-on-surface opacity-50"
                >
                  Previous
                </button>
                <button className="rounded bg-primary px-3 py-1 font-semibold text-on-primary">
                  1
                </button>
                <button
                  disabled
                  className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-1 text-on-surface opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Course details */}
          <CourseDetails
            course={selectedCourse}
            onAction={action}
          />
        </section>
      </main>

      {modal && (
        <Modal title={modal.title} onClose={() => setModal(null)}>
          {modal.content}
        </Modal>
      )}
    </div>
  );
}

function Filter({ label, value, options, onChange }) {
  return (
    <div className="relative inline-flex items-center">
      <span className="mr-2 text-body-sm text-secondary">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-lg border border-outline-variant bg-surface-container-lowest px-3 pr-8 text-label-md text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function CourseDetails({ course, onAction }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-5 rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm">
        <div className="border-b border-outline-variant pb-4">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-outline-variant bg-surface-container-high px-2.5 py-1 text-label-sm font-bold text-primary">
              <Icon className="text-xs">auto_stories</Icon>
              Selected Course
            </span>
            <span className="text-label-sm font-medium text-secondary">
              Scheme Rev: 2022
            </span>
          </div>

          <h3 className="mt-2 text-headline-sm font-bold text-on-surface">
            {course.code}: {course.name}
          </h3>
          <p className="mt-0.5 text-body-sm text-secondary">
            Core Departmental Theory • {course.credits} Credits •{" "}
            {course.mandatory ? "Mandatory" : "Elective"}
          </p>
        </div>

        {/* Constraints */}
        <div className="flex flex-col gap-3 rounded-lg border border-outline-variant bg-surface-container-low p-4">
          <div className="flex items-center justify-between">
            <h4 className="flex items-center gap-2 text-label-md font-bold text-on-surface">
              <Icon className="text-base text-primary">tune</Icon>
              AI Scheduling Constraints
            </h4>
            <span className="rounded bg-surface-container px-2 py-0.5 text-xs font-semibold text-primary">
              Hard Bound
            </span>
          </div>

          <Rule icon="event_repeat" title="Required Slots:" main={course.rules?.slots ?? "Course-specific weekly slot rule"} note={course.rules?.spread ?? "Configured according to curriculum policy."} />
          <Rule icon="wb_sunny" title="Preferred Time Window:" main={course.rules?.window ?? "Morning / department-defined slots"} note={course.rules?.windowNote ?? "Soft constraint based on faculty and room availability."} />
          <Rule icon="meeting_room" title="Room Requirements:" main={course.rules?.room ?? "Room requirements are defined for this course."} note={course.rules?.targetRoom ? `Assigned Target: ${course.rules.targetRoom}` : "Target room is assigned by the solver."} primaryNote={Boolean(course.rules?.targetRoom)} />
        </div>

        {/* Lab */}
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-3.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-label-md font-bold text-tertiary">
              <Icon className="text-base">biotech</Icon>
              Linked Practical Component
            </span>
            <span className="rounded bg-tertiary-fixed px-2 py-0.5 text-xs font-semibold text-on-tertiary-fixed">
              {course.linkedLab?.code ?? "N/A"}
            </span>
          </div>

          <p className="mt-2 text-body-sm font-medium text-on-surface">
            {course.linkedLab?.description ??
              "No linked practical component is specified for this course."}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-secondary">
            <span>{course.linkedLab?.ratio ?? "Lab Ratio: —"}</span>
            <span>{course.linkedLab?.faculty ?? "Faculty supervision as configured"}</span>
          </div>
        </div>

        {/* Faculty */}
        <div className="flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest p-3.5">
          <span className="flex items-center gap-1.5 text-label-md font-bold text-on-surface">
            <Icon className="text-base text-primary">person_outline</Icon>
            Faculty &amp; Teaching Assistant
          </span>

          {course.faculty?.length ? (
            course.faculty.map((person) => (
              <div
                key={person.name}
                className="flex items-center justify-between gap-3 border-t border-surface-container pt-2 first:border-0 first:pt-1"
              >
                <div>
                  <p className="font-semibold text-on-surface">{person.name}</p>
                  <p className="text-xs text-secondary">{person.role}</p>
                </div>
                <span
                  className={`rounded px-2 py-0.5 text-label-sm font-semibold ${
                    person.badge === "Primary"
                      ? "bg-surface-container text-primary"
                      : "bg-surface-container text-secondary"
                  }`}
                >
                  {person.badge}
                </span>
              </div>
            ))
          ) : (
            <p className="text-body-sm text-secondary">
              Faculty assignments will appear after curriculum mapping.
            </p>
          )}
        </div>

        {/* Students */}
        <div className="flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest p-3.5">
          <span className="flex items-center gap-1.5 text-label-md font-bold text-on-surface">
            <Icon className="text-base text-primary">school</Icon>
            Enrolled Student Groups
          </span>

          <div className="grid grid-cols-2 gap-2 text-body-sm">
            {course.students?.length ? (
              course.students.map(([section, count]) => (
                <div
                  key={section}
                  className="rounded border border-outline-variant bg-surface-container p-2"
                >
                  <div className="text-label-md font-semibold">{section}</div>
                  <div className="text-xs text-secondary">{count}</div>
                </div>
              ))
            ) : (
              <div className="col-span-2 rounded bg-surface-container p-3 text-secondary">
                Student groups are managed at the section/batch level.
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => onAction(`Constraint editor opened for ${course.code}.`)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary-container px-3 py-2.5 text-label-md font-semibold text-on-primary shadow-sm transition hover:bg-primary active:scale-95"
          >
            <Icon className="text-base">tune</Icon>
            Configure Constraints
          </button>

          <button
            onClick={() => onAction(`Course editor opened for ${course.code}.`)}
            className="rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-label-md text-on-surface shadow-sm transition hover:bg-surface-container active:scale-95"
          >
            Edit Details
          </button>
        </div>
      </div>

      {/* Solver health */}
      <div className="flex items-center justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container-high text-primary">
            <Icon className="text-xl">psychology</Icon>
          </div>
          <div>
            <p className="text-label-md font-bold text-on-surface">
              Curriculum Feasibility Index
            </p>
            <p className="text-body-sm text-secondary">
              0 Hard Conflicts • 98.4% Solver Ready
            </p>
          </div>
        </div>

        <span className="rounded bg-surface-container-highest px-2.5 py-1 text-label-md font-bold text-primary">
          Optimal
        </span>
      </div>
    </div>
  );
}

function Rule({ icon, title, main, note, primaryNote = false }) {
  return (
    <div className="flex items-start gap-2.5 text-body-sm">
      <Icon className="mt-0.5 text-lg text-secondary">{icon}</Icon>
      <div>
        <strong className="font-semibold text-on-surface">{title}</strong>{" "}
        <span>{main}</span>
        <p className={`mt-0.5 text-xs ${primaryNote ? "font-semibold text-primary" : "text-secondary"}`}>
          {note}
        </p>
      </div>
    </div>
  );
}
