export const timeSlots = [
  { id: 's1', label: '08:00 - 09:00', sub: 'Slot 1 (1 hr)' },
  { id: 's2', label: '09:00 - 10:00', sub: 'Slot 2 (1 hr)' },
  { id: 's3', label: '10:00 - 11:00', sub: 'Slot 3 (1 hr)' },
  { id: 's4', label: '11:00 - 12:00', sub: 'Slot 4 (1 hr)' },
  { id: 's5', label: '12:00 - 13:00', sub: 'Slot 5 (1 hr)' },
  { id: 'lunch', label: 'Lunch Break', sub: '13:00 - 14:00' },
  { id: 's6', label: '14:00 - 15:00', sub: 'Slot 6 (1 hr)' },
  { id: 's7', label: '15:00 - 16:00', sub: 'Slot 7 (1 hr)' },
  { id: 's8', label: '16:00 - 17:00', sub: 'Slot 8 / Tutorial' },
]

export const timetable = [
  {
    day: 'Monday',
    summary: '6 Lectures + Lab',
    cells: [
      { kind: 'free', text: 'Free Slot' },
      { kind: 'course', code: 'DBMS (CS-501)', room: 'Room 204 (CS Block)', faculty: 'Dr. Anita Sharma', type: 'Theory', locked: true, attended: '60/60' },
      { kind: 'course', code: 'DAA (CS-502)', room: 'Room 204', faculty: 'Prof. Vikram Sen', type: 'Theory', attended: '60/60' },
      { kind: 'course', code: 'Networks (CS-503)', room: 'Room 204', faculty: 'Dr. M. K. Verma', type: 'Theory', attended: '60/60' },
      { kind: 'course', code: 'Maths V (MA-501)', room: 'Room 204', faculty: 'Prof. Ramanujan', type: 'Theory', attended: '60/60' },
      { kind: 'lunch' },
      { kind: 'lab', code: 'Operating Systems Lab (CS-505P)', detail: 'Lab 3 (Systems Block) • Batch A1 & A2', time: '14:00 - 16:00', faculty: 'Instructor: Dr. Anita Sharma + 1 TA', status: 'Workstation Ready', colSpan: 2 },
      { kind: 'free', text: 'Tutorial / Self Study', sub: 'Library Annex' },
    ]
  },
  {
    day: 'Tuesday',
    summary: '5 Lectures + Lab',
    cells: [
      { kind: 'course', code: 'Maths V (MA-501)', faculty: 'Prof. Ramanujan', type: 'Theory' },
      { kind: 'course', code: 'Web Tech (CS-504)', faculty: 'Prof. Sneha Patel', type: 'Theory' },
      { kind: 'course', code: 'Networks (CS-503)', room: 'Room 204', faculty: 'Dr. M. K. Verma', type: 'Theory' },
      { kind: 'course', code: 'Software Eng (CS-506)', faculty: 'Dr. Rajesh Rao', type: 'Theory' },
      { kind: 'course', code: 'DBMS (CS-501)', faculty: 'Dr. Anita Sharma', type: 'Theory' },
      { kind: 'lunch' },
      { kind: 'lab', code: 'Web Technologies Lab (CS-504P)', detail: 'Lab 2 (Web Systems) • Batch A1 & A2', time: '14:00 - 16:00', faculty: 'Faculty: Prof. Sneha Patel', status: 'Node.js Stack Ready', colSpan: 2 },
      { kind: 'free', text: 'Open Lab Slot' },
    ]
  },
  {
    day: 'Wednesday',
    summary: '6 Lectures',
    cells: [
      { kind: 'free', text: 'Mentorship Slot' },
      { kind: 'course', code: 'Software Eng (CS-506)', room: 'Seminar Hall B', faculty: 'Dr. Rajesh Rao', type: 'Theory', locked: true },
      { kind: 'course', code: 'DAA (CS-502)', faculty: 'Prof. Vikram Sen', type: 'Theory' },
      { kind: 'course', code: 'DBMS Tutorial', room: 'Room 204', faculty: 'Dr. Anita Sharma', type: 'Tutorial', palette: 'teal' },
      { kind: 'course', code: 'Networks (CS-503)', faculty: 'Dr. M. K. Verma', type: 'Theory' },
      { kind: 'lunch' },
      { kind: 'course', code: 'Constitution of India', faculty: 'Prof. S. R. Hegde', type: 'Audit' },
      { kind: 'course', code: 'Web Tech (CS-504)', faculty: 'Prof. Sneha Patel', type: 'Theory' },
      { kind: 'free', text: 'Sports / Co-curricular' },
    ]
  },
  {
    day: 'Thursday',
    summary: '4 Lectures + Lab',
    cells: [
      { kind: 'course', code: 'Web Tech (CS-504)', faculty: 'Prof. Sneha Patel', type: 'Theory' },
      { kind: 'course', code: 'DBMS (CS-501)', faculty: 'Dr. Anita Sharma', type: 'Theory' },
      { kind: 'course', code: 'DAA (CS-502)', faculty: 'Prof. Vikram Sen', type: 'Theory' },
      { kind: 'course', code: 'Maths V (MA-501)', faculty: 'Prof. Ramanujan', type: 'Theory' },
      { kind: 'free', text: 'Elective Tutorial' },
      { kind: 'lunch' },
      { kind: 'lab', code: 'Capstone Project / AI Lab (CS-507P)', detail: 'AI & Data Lab (Room 402) • Dedicated GPU Nodes', time: '14:00 - 16:00', faculty: 'Lead Faculty: Prof. Sneha Patel + AI Scholars', status: 'Workstations Verified', colSpan: 2 },
      { kind: 'course', code: 'Lab Viva & Review', faculty: 'Prof. Sneha Patel', type: 'Review', compact: true },
    ]
  },
  {
    day: 'Friday',
    summary: '5 Lectures + Lab',
    cells: [
      { kind: 'course', code: 'Software Eng (CS-506)', faculty: 'Dr. Rajesh Rao', type: 'Theory' },
      { kind: 'course', code: 'DAA (CS-502)', faculty: 'Prof. Vikram Sen', type: 'Theory' },
      { kind: 'course', code: 'DBMS (CS-501)', room: 'Room 204 (CS Block)', faculty: 'Dr. Anita Sharma', type: 'Theory', locked: true, selected: true, attended: 'Locked' },
      { kind: 'course', code: 'Networks (CS-503)', faculty: 'Dr. M. K. Verma', type: 'Theory' },
      { kind: 'course', code: 'Maths V (MA-501)', faculty: 'Prof. Ramanujan', type: 'Theory' },
      { kind: 'lunch' },
      { kind: 'lab', code: 'Database & Cloud Lab (CS-508P)', detail: 'Cloud Lab 1 • Batch A1 & A2', time: '14:00 - 16:00', faculty: 'Dr. Anita Sharma & TA', status: 'PostgreSQL Instances Active', colSpan: 2 },
      { kind: 'free', text: "Dean's Colloquium / Seminar" },
    ]
  },
]

export const inspectorDetails = {
  code: 'CS-501',
  name: 'Database Management Systems',
  type: 'Core Theory',
  credits: '4.0 (3L + 1T)',
  semester: '5th (Sec A)',
  faculty: 'Dr. Anita Sharma',
  designation: 'Associate Professor (Dept of CSE)',
  initials: 'AS',
  load: '14 / 16 hrs (87.5%)',
  preference: 'Morning slots only (Honored)',
  room: 'Room 204 (CS Block, 2nd Fl)',
  roomType: 'Tiered Lecture Hall',
  capacity: '75 Seats',
  enrolled: '60 Enrolled (80%)',
  equipment: 'Equipped',
  equipmentDetail: 'Dual Projector',
  lockedBy: 'Dept Coordinator (Prof. Sen)',
  lockedDate: 'Sep 12',
  validation: [
    'Zero Hard Conflicts (Faculty & Room free)',
    'Lunch buffer respected (Precedes 13:00 - 14:00 break)',
    'Contiguous lab blocks satisfied (14:00 - 16:00)'
  ]
}
