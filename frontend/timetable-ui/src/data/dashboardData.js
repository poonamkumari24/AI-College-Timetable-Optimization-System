export const navItems = [
  { label: "Dashboard", icon: "dashboard" },
  { label: "Academic", icon: "school" },
  { label: "Faculty", icon: "badge" },
  { label: "Rooms & Labs", icon: "meeting_room" },
  { label: "Availability", icon: "event_available" },
  { label: "Scheduling", icon: "calendar_month" },
  { label: "Timetable", icon: "table_chart" },
  { label: "AI Assistant", icon: "auto_awesome", badge: "v2.4", tertiary: true },
  { label: "Conflicts", icon: "warning", badge: "0 hard" },
  { label: "Analytics", icon: "analytics" },
  { label: "Reports", icon: "description" },
  { label: "Settings", icon: "settings" }
];

export const kpis = [
  { label: "Total Departments", value: "12", icon: "business", detail: "+2 branches this term", trend: "up" },
  { label: "Total Faculty", value: "184", icon: "badge", detail: "176 active • 8 sabbatical" },
  { label: "Total Rooms & Labs", value: "68", icon: "meeting_room", detail: "Avg util: 78.4% (14 labs)" },
  { label: "Active Timetables", value: "42 / 42", icon: "table_chart", detail: "100% generated", trend: "check" },
  { label: "Scheduling Conflicts", value: "0 Hard / 2 Soft", icon: "check_circle", detail: "All hard constraints cleared" },
  { label: "Optimization Runs", value: "1,042", icon: "auto_awesome", detail: "Last run: 45m ago - OPTIMAL" }
];

export const workload = [
  { label: "Optimal Band (14 - 18 hrs/wk)", value: "82%", count: "151 faculty", width: "82%", color: "bg-primary-container" },
  { label: "Underloaded (< 12 hrs/wk)", value: "14%", count: "26 faculty", width: "14%", color: "bg-secondary" },
  { label: "High Load / Overloaded (> 18 hrs/wk)", value: "4%", count: "7 faculty", width: "4%", color: "bg-error", warning: true }
];

export const rooms = [
  { label: "Classrooms (34 rooms)", value: "82%", width: "82%", color: "bg-primary-container" },
  { label: "Computer Labs (14 labs)", value: "91%", width: "91%", color: "bg-primary" },
  { label: "Science Labs (12 labs)", value: "74%", width: "74%", color: "bg-secondary-fixed-dim" },
  { label: "Seminar Halls (8 halls)", value: "55%", width: "55%", color: "bg-secondary" }
];

export const weeklyClasses = [
  { day: "Mon", value: 264, height: 92 },
  { day: "Tue", value: 278, height: 100 },
  { day: "Wed", value: 270, height: 96 },
  { day: "Thu", value: 262, height: 91 },
  { day: "Fri", value: 254, height: 87 },
  { day: "Sat", value: 184, height: 60, secondary: true }
];

export const activity = [
  {
    icon: "table_chart",
    box: "bg-surface-container-high text-primary",
    text: "Timetable generated for CSE Sem 5 (Sec A, B, C) - OPTIMAL score 94.8",
    meta: "Triggered by AI Engine • Zero hard conflicts detected",
    time: "15m ago"
  },
  {
    icon: "event_available",
    box: "bg-surface-container-low text-secondary",
    text: "Prof. Vikram Sen updated Friday availability preference",
    meta: "Department of Mechanical Engineering • Self-service Portal",
    time: "42m ago"
  },
  {
    icon: "lock",
    box: "bg-surface-container-high text-primary",
    text: "Room 204 AV equipment verified & locked by Dept Coordinator",
    meta: "Room tagged as required for Advanced Network Lab sessions",
    time: "1h ago"
  },
  {
    icon: "tune",
    box: "bg-surface-container-low text-tertiary",
    text: "Soft constraint weighting adjusted: Minimized student gaps to priority 8",
    meta: "Global Timetable Rule configuration modified by Dean's Office",
    time: "3h ago"
  },
  {
    icon: "push_pin",
    box: "bg-surface-container-high text-primary",
    text: "Timetable entry locked: CS-501 Monday 09:00 AM by Coordinator",
    meta: "Fixed keynote lecture block in Central Auditorium",
    time: "5h ago"
  }
];

export const quickActions = [
  { title: "Generate Timetable", description: "Jump to automated solver setup", icon: "calendar_add_on", iconBox: "bg-primary-container text-on-primary", action: "generate" },
  { title: "Import Academic Data", description: "Excel / CSV for faculty & rooms", icon: "upload_file", iconBox: "bg-surface-container-high text-primary", action: "import" },
  { title: "Review Conflicts", description: "0 critical hard, 2 warnings", icon: "warning", iconBox: "bg-surface-container-high text-on-surface-variant", action: "conflicts" },
  { title: "AI Assistant Chat", description: "Natural language schedule adjustments", icon: "forum", iconBox: "bg-tertiary-container text-on-tertiary", action: "assistant" }
];
