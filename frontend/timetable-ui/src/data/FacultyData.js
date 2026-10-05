export const facultyMembers = [
  {
    id: 'CSE-2018-04', initials: 'AS', name: 'Dr. Anita Sharma', department: 'CSE',
    designation: 'Associate Professor', subtitle: 'Senior Researcher', status: 'Active', verified: true,
    courses: ['DBMS [CS-501]', 'DAA [CS-502]', 'DB Lab'], load: 14, maxLoad: 16,
    availability: 'Morning (08:00 AM - 01:00 PM)', lunch: 'Fixed (01:00 PM - 02:00 PM)', protectedTime: 'Wednesday Afternoon',
    classes: [
      { code: 'CS-501', title: 'Database Systems', type: 'Theory', section: 'Sec A', schedule: 'Mon/Wed/Thu 09:00 - 10:00 AM', location: 'Room 204 (Academic Block B)', icon: 'meeting_room' },
      { code: 'CS-501-L', title: 'Database Systems Lab', type: 'Lab', section: 'Sec A - Batch G1', schedule: 'Mon 02:00 - 04:00 PM', location: 'Lab 03 (Computing Pavilion)', icon: 'desktop_windows' }
    ],
    stats: [['Theory','3 Classes','9.0 Hours'], ['Labs','2 Blocks','4.0 Hours'], ['Tutorials','1 Slot','1.0 Hour']]
  },
  {
    id: 'CSE-2012-01', initials: 'VM', name: 'Prof. Vikram Malhotra', department: 'CSE',
    designation: 'Professor & HOD', subtitle: 'Department Chair', status: 'Active', verified: false,
    courses: ['Adv AI [CS-701]', 'Seminar-IV'], load: 10, maxLoad: 12,
    availability: 'Morning (08:00 AM - 01:00 PM)', lunch: 'Flexible', protectedTime: 'Friday Afternoon', classes: [], stats: []
  },
  {
    id: 'CSE-2020-19', initials: 'RK', name: 'Prof. Rajesh Koothrappali', department: 'CSE',
    designation: 'Assistant Professor', subtitle: 'Curriculum Lead', status: 'Max Load', verified: false,
    courses: ['OS [CS-403]', 'Networks', 'OS Lab', 'Net Lab'], load: 16, maxLoad: 16,
    availability: 'Morning (09:00 AM - 01:00 PM)', lunch: 'Fixed (01:00 PM - 02:00 PM)', protectedTime: 'Tuesday Afternoon', classes: [], stats: []
  },
  {
    id: 'CSE-2016-11', initials: 'PS', name: 'Dr. Priya Swaminathan', department: 'CSE',
    designation: 'Associate Professor', subtitle: 'Algorithms Lead', status: 'Active', verified: false,
    courses: ['Compiler [CS-601]', 'CD Lab'], load: 11, maxLoad: 16,
    availability: 'Morning (08:00 AM - 01:00 PM)', lunch: 'Fixed (01:00 PM - 02:00 PM)', protectedTime: 'Thursday Afternoon', classes: [], stats: []
  },
  {
    id: 'CSE-2015-08', initials: 'SV', name: 'Dr. Sandeep Verma', department: 'CSE',
    designation: 'Professor', subtitle: 'Research Leave', status: 'Sabbatical', verified: false,
    courses: [], load: 0, maxLoad: 16,
    availability: 'Not available', lunch: 'N/A', protectedTime: 'All afternoons', classes: [], stats: []
  }
];

export const departments = ['All Departments','Computer Science & Eng (CSE)','Information Tech (IT)','Electronics (ECE)','Mechanical (MECH)'];
export const designations = ['All Designations','Professor & HOD','Associate Professor','Assistant Professor','Visiting Faculty'];
export const workloadOptions = ['All Workload Status','Normal Load (80-95%)','Near Max Load (>95%)','Low Load (<70%)'];

export const workloadPercent = (faculty) => Math.round((faculty.load / faculty.maxLoad) * 100);
