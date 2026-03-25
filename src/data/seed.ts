// Extended seed data for all EFM modules

// ============ CORE ENTITIES ============

export interface Horse {
  id: string;
  name: string;
  passportNo: string;
  stableNumber: string;
  gender: 'Stallion' | 'Mare';
  breed: string;
  color: string;
  height: string;
  dateOfBirth: string;
  status: 'Active' | 'Resting' | 'Medical' | 'Retired';
  assignedManager: string;
}

export interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'Approved' | 'Pending' | 'Inactive';
  supervisor: string;
}

export interface Task {
  id: string;
  taskName: string;
  description: string;
  taskType: 'Feed' | 'Grooming' | 'Medical' | 'Exercise' | 'Maintenance' | 'Inspection';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  scheduledDatetime: string;
  photoEvidenceRequired: boolean;
  horseName: string;
  assignedTo: string;
  createdBy: string;
}

export interface MedicineLog {
  id: string;
  date: string;
  horseName: string;
  medicineName: string;
  dosage: string;
  notes: string;
  administeredBy: string;
}

export interface MedicineInventory {
  id: string;
  medicineType: string;
  unit: string;
  openingStock: number;
  unitsPurchased: number;
  stockLevel: number;
  threshold: number;
  month: string;
  year: number;
}

export interface HorseFeedLog {
  id: string;
  date: string;
  horseName: string;
  stableNumber: string;
  himalayanBalance: number;
  barley: number;
  oats: number;
  soya: number;
  lucerne: number;
  linseed: number;
  rOil: number;
  biotin: number;
  joint: number;
  epsom: number;
  heylase: number;
  total: number;
  notes: string;
}

export interface FeedInventory {
  id: string;
  feedType: string;
  unit: string;
  openingStock: number;
  unitsBrought: number;
  totalAvailable: number;
  usedToday: number;
  totalUsed: number;
  unitsLeft: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  threshold: number;
}

export interface FarrierShoeing {
  id: string;
  horseName: string;
  shoeingDate: string;
  nextDueDate: string;
  notes: string;
  status: 'Completed' | 'Scheduled' | 'Overdue';
  farrierName: string;
}

export interface TackItem {
  id: string;
  itemName: string;
  category: string;
  quantity: number;
  condition: 'Good' | 'Fair' | 'Poor' | 'Replace';
  brand: string;
  size: string;
  horseName: string;
  riderName: string;
  storageLocation: string;
  lastUsedDate: string;
}

export interface FarrierInventory {
  id: string;
  itemName: string;
  category: string;
  quantity: number;
  condition: 'Good' | 'Fair' | 'Poor';
  sizeType: string;
  material: string;
  supplier: string;
  cost: number;
  nextServiceDue: string;
}

export interface GateRegister {
  id: string;
  operationType: 'Entry' | 'Exit';
  personType: 'Staff' | 'Visitor';
  personName: string;
  entryTime: string;
  exitTime: string | null;
  vehicleNo: string;
  purpose: string;
}

export interface DailyRegister {
  id: string;
  date: string;
  groomName: string;
  checkInTime: string;
  checkOutTime: string | null;
  status: 'Checked In' | 'Checked Out' | 'Absent';
}

export interface Attendance {
  id: string;
  date: string;
  employeeName: string;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day';
  remarks: string;
  markedAt: string;
}

export interface GroomWorksheetEntry {
  id: string;
  horseName: string;
  morningHours: number;
  afternoonHours: number;
  totalHours: number;
  woodchips: boolean;
  bichali: boolean;
  booSa: boolean;
  remarks: string;
}

export interface GroomWorksheet {
  id: string;
  date: string;
  groomName: string;
  overallRemarks: string;
  entries: GroomWorksheetEntry[];
}

export interface WorkRecordEntry {
  id: string;
  taskDescription: string;
  morningHours: number;
  afternoonHours: number;
  totalHours: number;
  remarks: string;
}

export interface WorkRecord {
  id: string;
  date: string;
  staffName: string;
  staffCategory: string;
  overallRemarks: string;
  entries: WorkRecordEntry[];
}

export interface InspectionRound {
  id: string;
  date: string;
  area: string;
  inspectorName: string;
  status: 'Passed' | 'Issues Found' | 'Pending';
  notes: string;
  items: { item: string; status: 'OK' | 'Issue'; note: string }[];
}

export interface HousekeepingItem {
  id: string;
  itemName: string;
  category: string;
  quantity: number;
  unitType: string;
  minStockLevel: number;
  usageArea: string;
  storageLocation: string;
  supplierName: string;
  costPerUnit: number;
  reorderAlertEnabled: boolean;
}

export interface GroceryItem {
  id: string;
  itemName: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  purchaseDate: string;
  expiryDate: string;
  description: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  dateFrom: string;
  dateTo: string;
  totalSessions: number;
  totalHours: number;
  instructorName: string;
  status: 'Draft' | 'Sent' | 'Paid';
  totalAmount: number;
}

export interface Expense {
  id: string;
  expenseType: string;
  amount: number;
  description: string;
  date: string;
  horseName: string;
  employeeName: string;
}

export interface Fine {
  id: string;
  reason: string;
  amount: number;
  status: 'Issued' | 'Paid' | 'Appealed' | 'Waived';
  issuedAt: string;
  employeeName: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  attendees: string[];
  notes: string;
}

export interface Approval {
  id: string;
  type: string;
  requestedBy: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  description: string;
}

// ============ SEEDED DATA ============

export const horses: Horse[] = [
  { id: 'h1', name: 'Alta Strada', passportNo: 'EQ-2019-4421', stableNumber: 'ST-1', gender: 'Stallion', breed: 'Thoroughbred', color: 'Bay', height: '15.2', dateOfBirth: '2019-03-14', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h2', name: 'Cadillac', passportNo: 'EQ-2020-5589', stableNumber: 'ST-12', gender: 'Stallion', breed: 'Thoroughbred', color: 'Bay', height: '16.0', dateOfBirth: '2020-07-22', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h3', name: 'Caesar', passportNo: 'EQ-2018-3310', stableNumber: 'ST-34', gender: 'Mare', breed: 'Thoroughbred', color: 'Chestnut', height: '15.3', dateOfBirth: '2018-11-05', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h4', name: 'Claudia', passportNo: 'EQ-2021-6678', stableNumber: 'ST-11', gender: 'Stallion', breed: 'Thoroughbred', color: 'Bay', height: '16.2', dateOfBirth: '2021-01-30', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h5', name: 'DejaVu', passportNo: 'EQ-2017-2205', stableNumber: 'ST-3', gender: 'Mare', breed: 'Thoroughbred', color: 'Grey', height: '16.1', dateOfBirth: '2017-09-18', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h6', name: 'Fatin', passportNo: 'EQ-2022-7791', stableNumber: 'ST-10', gender: 'Stallion', breed: 'Thoroughbred', color: 'Bay', height: '15.3', dateOfBirth: '2022-04-10', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h7', name: 'Fudge', passportNo: 'EQ-2020-5501', stableNumber: 'ST-10', gender: 'Stallion', breed: 'Thoroughbred', color: 'Chestnut', height: '15.2', dateOfBirth: '2020-12-01', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h8', name: 'General', passportNo: 'EQ-2019-4490', stableNumber: 'ST-26', gender: 'Mare', breed: 'Thoroughbred', color: 'Bay', height: '15.0', dateOfBirth: '2019-06-15', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h9', name: 'Leon', passportNo: 'EQ-2016-1103', stableNumber: 'ST-32', gender: 'Mare', breed: 'Thoroughbred', color: 'Grey', height: '16.3', dateOfBirth: '2016-02-28', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h10', name: 'Maximus', passportNo: 'EQ-2023-8834', stableNumber: 'ST-13', gender: 'Stallion', breed: 'Thoroughbred', color: 'Black', height: '16.0', dateOfBirth: '2023-05-20', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h11', name: 'Perseus', passportNo: 'EQ-2018-3312', stableNumber: 'ST-6', gender: 'Stallion', breed: 'Thoroughbred', color: 'Bay', height: '15.3', dateOfBirth: '2018-08-12', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h12', name: 'Pluto', passportNo: 'EQ-2019-4425', stableNumber: 'ST-15', gender: 'Stallion', breed: 'Thoroughbred', color: 'Bay', height: '16.0', dateOfBirth: '2019-04-20', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h13', name: 'Poppy', passportNo: 'EQ-2020-5510', stableNumber: 'ST-19', gender: 'Mare', breed: 'Thoroughbred', color: 'Grey', height: '15.1', dateOfBirth: '2020-09-08', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h14', name: 'Prala', passportNo: 'EQ-2021-6680', stableNumber: 'ST-7', gender: 'Mare', breed: 'Thoroughbred', color: 'Chestnut', height: '15.2', dateOfBirth: '2021-03-15', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h15', name: 'Rebeldita', passportNo: 'EQ-2017-2210', stableNumber: 'ST-16', gender: 'Stallion', breed: 'Thoroughbred', color: 'Bay', height: '16.1', dateOfBirth: '2017-11-22', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h16', name: 'Shadow', passportNo: 'EQ-2018-3315', stableNumber: 'ST-20', gender: 'Stallion', breed: 'Thoroughbred', color: 'Black', height: '16.2', dateOfBirth: '2018-06-10', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h17', name: 'Spirit', passportNo: 'EQ-2020-5520', stableNumber: 'ST-22', gender: 'Mare', breed: 'Thoroughbred', color: 'Grey', height: '15.3', dateOfBirth: '2020-01-14', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h18', name: 'Thunder', passportNo: 'EQ-2019-4430', stableNumber: 'ST-25', gender: 'Stallion', breed: 'Thoroughbred', color: 'Bay', height: '16.0', dateOfBirth: '2019-08-30', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h19', name: 'Valentino', passportNo: 'EQ-2021-6685', stableNumber: 'ST-28', gender: 'Stallion', breed: 'Thoroughbred', color: 'Chestnut', height: '15.3', dateOfBirth: '2021-02-14', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h20', name: 'Whisper', passportNo: 'EQ-2022-7795', stableNumber: 'ST-30', gender: 'Mare', breed: 'Thoroughbred', color: 'Grey', height: '15.1', dateOfBirth: '2022-07-04', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h21', name: 'Zara', passportNo: 'EQ-2018-3320', stableNumber: 'ST-31', gender: 'Mare', breed: 'Thoroughbred', color: 'Bay', height: '15.2', dateOfBirth: '2018-12-20', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h22', name: 'Apollo', passportNo: 'EQ-2020-5525', stableNumber: 'ST-33', gender: 'Stallion', breed: 'Thoroughbred', color: 'Bay', height: '16.1', dateOfBirth: '2020-05-18', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h23', name: 'Bella', passportNo: 'EQ-2019-4435', stableNumber: 'ST-35', gender: 'Mare', breed: 'Thoroughbred', color: 'Chestnut', height: '15.0', dateOfBirth: '2019-10-02', status: 'Active', assignedManager: 'Emma Manager' },
  { id: 'h24', name: 'Domino', passportNo: 'EQ-2021-6690', stableNumber: 'ST-36', gender: 'Stallion', breed: 'Thoroughbred', color: 'Black', height: '16.0', dateOfBirth: '2021-06-25', status: 'Active', assignedManager: 'Emma Manager' },
];

export const teamMembers: TeamMember[] = [
  { id: 't1', fullName: 'Admin User', email: 'admin@test.com', phone: '555-0001', role: 'Super Admin', department: 'Admin', status: 'Approved', supervisor: '-' },
  { id: 't2', fullName: 'Alex Rider', email: 'rider@test.com', phone: '555-0009', role: 'Rider', department: 'Stable Ops', status: 'Approved', supervisor: 'Emma Manager' },
  { id: 't3', fullName: 'Anand Jamedar', email: 'jamedar2@test.com', phone: '555-0006b', role: 'Jamedar', department: 'Ground Ops', status: 'Approved', supervisor: '-' },
  { id: 't4', fullName: 'Charles Executive Accounts', email: 'executive-accounts@test.com', phone: '555-0019', role: 'Executive Accounts', department: 'Accounts', status: 'Approved', supervisor: 'Dr. Director' },
  { id: 't5', fullName: 'David Guard', email: 'guard2@test.com', phone: '555-0013', role: 'Guard', department: 'Ground Ops', status: 'Approved', supervisor: 'Mike Supervisor' },
  { id: 't6', fullName: 'Dr. Director', email: 'director@test.com', phone: '555-0002', role: 'Director', department: 'Leadership', status: 'Approved', supervisor: '-' },
  { id: 't7', fullName: 'Emma Manager', email: 'manager@test.com', phone: '555-0004', role: 'Stable Manager', department: 'Stable Ops', status: 'Approved', supervisor: 'Dr. Director' },
  { id: 't8', fullName: 'James Instructor', email: 'instructor@test.com', phone: '555-0005', role: 'Instructor', department: 'Stable Ops', status: 'Approved', supervisor: 'Emma Manager' },
  { id: 't9', fullName: 'John Guard', email: 'guard@test.com', phone: '555-0012', role: 'Guard', department: 'Ground Ops', status: 'Approved', supervisor: 'Mike Supervisor' },
  { id: 't10', fullName: 'Lisa Housekeeping', email: 'housekeeping@test.com', phone: '555-0016', role: 'Housekeeping', department: 'Ground Ops', status: 'Approved', supervisor: 'Mike Supervisor' },
  { id: 't11', fullName: 'Michael Groom', email: 'groom2@test.com', phone: '555-0007b', role: 'Groom', department: 'Stable Ops', status: 'Approved', supervisor: 'Emma Manager' },
  { id: 't12', fullName: 'Mike Farrier', email: 'farrier@test.com', phone: '555-0010', role: 'Farrier', department: 'Stable Ops', status: 'Approved', supervisor: 'Emma Manager' },
  { id: 't13', fullName: 'Mike Supervisor', email: 'ground-supervisor@test.com', phone: '555-0011', role: 'Ground Supervisor', department: 'Ground Ops', status: 'Approved', supervisor: 'Dr. Director' },
  { id: 't14', fullName: 'Peter Gardener', email: 'gardener@test.com', phone: '555-0015', role: 'Gardener', department: 'Ground Ops', status: 'Approved', supervisor: 'Mike Supervisor' },
  { id: 't15', fullName: 'Rachel Senior Executive Admin', email: 'senior-exec-admin@test.com', phone: '555-0017', role: 'Senior Executive Admin', department: 'Admin', status: 'Approved', supervisor: 'Dr. Director' },
  { id: 't16', fullName: 'Sam Vet', email: 'vet@test.com', phone: '555-0020', role: 'Veterinarian', department: 'Stable Ops', status: 'Approved', supervisor: 'Dr. Director' },
  { id: 't17', fullName: 'Rashid Groom', email: 'groom3@test.com', phone: '555-0021', role: 'Groom', department: 'Stable Ops', status: 'Approved', supervisor: 'Emma Manager' },
  { id: 't18', fullName: 'Ahmed Jamedar', email: 'jamedar@test.com', phone: '555-0006', role: 'Jamedar', department: 'Ground Ops', status: 'Approved', supervisor: '-' },
  { id: 't19', fullName: 'Carlos Chef', email: 'chef@test.com', phone: '555-0022', role: 'Chef', department: 'Restaurant', status: 'Approved', supervisor: 'Dr. Director' },
  { id: 't20', fullName: 'Fahad Groom', email: 'groom4@test.com', phone: '555-0023', role: 'Groom', department: 'Stable Ops', status: 'Approved', supervisor: 'Emma Manager' },
  { id: 't21', fullName: 'Sarah Accountant', email: 'accountant@test.com', phone: '555-0024', role: 'Accountant', department: 'Accounts', status: 'Approved', supervisor: 'Charles Executive Accounts' },
  { id: 't22', fullName: 'Tariq Guard', email: 'guard3@test.com', phone: '555-0025', role: 'Guard', department: 'Ground Ops', status: 'Approved', supervisor: 'Mike Supervisor' },
  { id: 't23', fullName: 'Noor Rider', email: 'rider2@test.com', phone: '555-0026', role: 'Rider', department: 'Stable Ops', status: 'Approved', supervisor: 'Emma Manager' },
  { id: 't24', fullName: 'Daniel Maintenance', email: 'maintenance@test.com', phone: '555-0027', role: 'Maintenance', department: 'Ground Ops', status: 'Approved', supervisor: 'Mike Supervisor' },
  { id: 't25', fullName: 'Maria Kitchen', email: 'kitchen@test.com', phone: '555-0028', role: 'Kitchen Staff', department: 'Restaurant', status: 'Approved', supervisor: 'Carlos Chef' },
  { id: 't26', fullName: 'Omar Driver', email: 'driver@test.com', phone: '555-0029', role: 'Driver', department: 'Ground Ops', status: 'Approved', supervisor: 'Mike Supervisor' },
];

export const tasks: Task[] = [
  { id: 'tk1', taskName: 'Morning Feed — Block A', description: 'Standard AM feed protocol for all A-block horses', taskType: 'Feed', priority: 'High', status: 'Completed', scheduledDatetime: '2026-03-24T06:00', photoEvidenceRequired: false, horseName: 'Cadillac', assignedTo: 'Michael Groom', createdBy: 'Admin User' },
  { id: 'tk2', taskName: 'Vet Check — Shadow', description: 'Follow-up examination for left foreleg', taskType: 'Medical', priority: 'Critical', status: 'In Progress', scheduledDatetime: '2026-03-24T09:00', photoEvidenceRequired: true, horseName: 'Shadow', assignedTo: 'Sam Vet', createdBy: 'Emma Manager' },
  { id: 'tk3', taskName: 'Arena Grooming', description: 'Rake and level main training arena', taskType: 'Maintenance', priority: 'Medium', status: 'Pending', scheduledDatetime: '2026-03-24T11:00', photoEvidenceRequired: false, horseName: 'N/A', assignedTo: 'Daniel Maintenance', createdBy: 'Admin User' },
  { id: 'tk4', taskName: 'Shoeing — Blaze Runner', description: 'Full set replacement', taskType: 'Maintenance', priority: 'High', status: 'Pending', scheduledDatetime: '2026-03-24T14:00', photoEvidenceRequired: true, horseName: 'Alta Strada', assignedTo: 'Mike Farrier', createdBy: 'Emma Manager' },
  { id: 'tk5', taskName: 'Evening Grooming', description: 'Full groom including mane/tail', taskType: 'Grooming', priority: 'Medium', status: 'Pending', scheduledDatetime: '2026-03-24T17:00', photoEvidenceRequired: false, horseName: 'Caesar', assignedTo: 'Rashid Groom', createdBy: 'Admin User' },
  { id: 'tk6', taskName: 'Exercise — DejaVu', description: '45-min lunging session', taskType: 'Exercise', priority: 'Medium', status: 'Overdue', scheduledDatetime: '2026-03-23T10:00', photoEvidenceRequired: false, horseName: 'DejaVu', assignedTo: 'James Instructor', createdBy: 'Emma Manager' },
  { id: 'tk7', taskName: 'Stall Inspection', description: 'Check bedding, water systems', taskType: 'Inspection', priority: 'Low', status: 'Completed', scheduledDatetime: '2026-03-24T08:00', photoEvidenceRequired: true, horseName: 'All', assignedTo: 'Michael Groom', createdBy: 'Emma Manager' },
  { id: 'tk8', taskName: 'Medication — Maximus', description: 'Joint supplement (oral)', taskType: 'Medical', priority: 'High', status: 'Completed', scheduledDatetime: '2026-03-24T07:00', photoEvidenceRequired: true, horseName: 'Maximus', assignedTo: 'Sam Vet', createdBy: 'Admin User' },
];

export const medicineLogs: MedicineLog[] = [
  { id: 'ml1', date: '2026-03-24', horseName: 'Shadow', medicineName: 'Anti-Inflammatory Paste', dosage: '1 tube', notes: 'Applied to left foreleg', administeredBy: 'Sam Vet' },
  { id: 'ml2', date: '2026-03-24', horseName: 'Maximus', medicineName: 'Joint Supplement', dosage: '2 doses', notes: 'Morning feed', administeredBy: 'Sam Vet' },
  { id: 'ml3', date: '2026-03-23', horseName: 'Leon', medicineName: 'Electrolyte Powder', dosage: '1 sachet', notes: 'Post-exercise', administeredBy: 'Michael Groom' },
  { id: 'ml4', date: '2026-03-23', horseName: 'Cadillac', medicineName: 'Dewormer', dosage: '1 syringe', notes: 'Quarterly schedule', administeredBy: 'Sam Vet' },
  { id: 'ml5', date: '2026-03-22', horseName: 'Alta Strada', medicineName: 'Hoof Hardener', dosage: '1 application', notes: 'All hooves', administeredBy: 'Mike Farrier' },
];

export const medicineInventory: MedicineInventory[] = [
  { id: 'mi1', medicineType: 'Antiseptic', unit: 'ml', openingStock: 20, unitsPurchased: 0, stockLevel: 19.99, threshold: 5, month: 'March', year: 2026 },
  { id: 'mi2', medicineType: 'Joint Supplement (Oral)', unit: 'doses', openingStock: 60, unitsPurchased: 20, stockLevel: 42, threshold: 10, month: 'March', year: 2026 },
  { id: 'mi3', medicineType: 'Anti-Inflammatory Paste', unit: 'tubes', openingStock: 30, unitsPurchased: 0, stockLevel: 12, threshold: 8, month: 'March', year: 2026 },
  { id: 'mi4', medicineType: 'Wound Spray', unit: 'cans', openingStock: 15, unitsPurchased: 10, stockLevel: 18, threshold: 5, month: 'March', year: 2026 },
  { id: 'mi5', medicineType: 'Electrolyte Powder', unit: 'sachets', openingStock: 100, unitsPurchased: 50, stockLevel: 88, threshold: 20, month: 'March', year: 2026 },
  { id: 'mi6', medicineType: 'Dewormer (Ivermectin)', unit: 'syringes', openingStock: 20, unitsPurchased: 0, stockLevel: 8, threshold: 10, month: 'March', year: 2026 },
  { id: 'mi7', medicineType: 'Hoof Hardener', unit: 'bottles', openingStock: 12, unitsPurchased: 6, stockLevel: 11, threshold: 4, month: 'March', year: 2026 },
];

export const horseFeedLogs: HorseFeedLog[] = [
  { id: 'fl1', date: '2026-03-23', horseName: 'Alta Strada', stableNumber: 'ST-1', himalayanBalance: 10, barley: 10, oats: 1, soya: 10, lucerne: 1, linseed: 5, rOil: 5, biotin: 4, joint: 10, epsom: 5, heylase: 5, total: 66, notes: '' },
  { id: 'fl2', date: '2026-03-23', horseName: 'Cadillac', stableNumber: 'ST-12', himalayanBalance: 8, barley: 5, oats: 2, soya: 6, lucerne: 3, linseed: 2, rOil: 3, biotin: 2, joint: 5, epsom: 3, heylase: 2, total: 41, notes: '' },
  { id: 'fl3', date: '2026-03-23', horseName: 'Caesar', stableNumber: 'ST-34', himalayanBalance: 12, barley: 8, oats: 3, soya: 8, lucerne: 4, linseed: 3, rOil: 4, biotin: 3, joint: 8, epsom: 4, heylase: 3, total: 60, notes: 'Increased oats' },
];

export const feedInventory: FeedInventory[] = [
  { id: 'fi1', feedType: 'Himalayan Balance', unit: 'kg', openingStock: 200, unitsBrought: 50, totalAvailable: 250, usedToday: 18, totalUsed: 128, unitsLeft: 122, status: 'In Stock', threshold: 40 },
  { id: 'fi2', feedType: 'Barley', unit: 'kg', openingStock: 150, unitsBrought: 0, totalAvailable: 150, usedToday: 12, totalUsed: 110, unitsLeft: 40, status: 'Low Stock', threshold: 50 },
  { id: 'fi3', feedType: 'Oats', unit: 'kg', openingStock: 300, unitsBrought: 100, totalAvailable: 400, usedToday: 22, totalUsed: 195, unitsLeft: 205, status: 'In Stock', threshold: 60 },
  { id: 'fi4', feedType: 'Soya', unit: 'kg', openingStock: 80, unitsBrought: 0, totalAvailable: 80, usedToday: 8, totalUsed: 72, unitsLeft: 8, status: 'Out of Stock', threshold: 20 },
  { id: 'fi5', feedType: 'Lucerne', unit: 'kg', openingStock: 250, unitsBrought: 75, totalAvailable: 325, usedToday: 15, totalUsed: 160, unitsLeft: 165, status: 'In Stock', threshold: 50 },
  { id: 'fi6', feedType: 'Linseed', unit: 'kg', openingStock: 60, unitsBrought: 20, totalAvailable: 80, usedToday: 5, totalUsed: 45, unitsLeft: 35, status: 'In Stock', threshold: 15 },
  { id: 'fi7', feedType: 'Rice Bran Oil', unit: 'L', openingStock: 40, unitsBrought: 10, totalAvailable: 50, usedToday: 3, totalUsed: 28, unitsLeft: 22, status: 'In Stock', threshold: 10 },
  { id: 'fi8', feedType: 'Biotin Supplement', unit: 'kg', openingStock: 10, unitsBrought: 5, totalAvailable: 15, usedToday: 1, totalUsed: 9, unitsLeft: 6, status: 'In Stock', threshold: 3 },
];

export const farrierShoeings: FarrierShoeing[] = [
  { id: 'fs1', horseName: 'Alta Strada', shoeingDate: '2026-03-10', nextDueDate: '2026-04-10', notes: 'Full set front and back', status: 'Completed', farrierName: 'Mike Farrier' },
  { id: 'fs2', horseName: 'Cadillac', shoeingDate: '2026-03-05', nextDueDate: '2026-04-05', notes: 'Front shoes only', status: 'Completed', farrierName: 'Mike Farrier' },
  { id: 'fs3', horseName: 'Shadow', shoeingDate: '2026-02-20', nextDueDate: '2026-03-20', notes: 'Therapeutic shoeing', status: 'Overdue', farrierName: 'Mike Farrier' },
  { id: 'fs4', horseName: 'Maximus', shoeingDate: '2026-03-15', nextDueDate: '2026-04-15', notes: 'Standard set', status: 'Completed', farrierName: 'Mike Farrier' },
  { id: 'fs5', horseName: 'Leon', shoeingDate: '2026-03-28', nextDueDate: '2026-04-28', notes: 'Scheduled', status: 'Scheduled', farrierName: 'Mike Farrier' },
];

export const tackItems: TackItem[] = [
  { id: 'ti1', itemName: 'English Saddle', category: 'Saddle', quantity: 1, condition: 'Good', brand: 'Stubben', size: '17"', horseName: 'Alta Strada', riderName: 'Alex Rider', storageLocation: 'Tack Room A', lastUsedDate: '2026-03-23' },
  { id: 'ti2', itemName: 'Snaffle Bridle', category: 'Bridle', quantity: 1, condition: 'Good', brand: 'Schockemohle', size: 'Full', horseName: 'Cadillac', riderName: 'Alex Rider', storageLocation: 'Tack Room A', lastUsedDate: '2026-03-23' },
  { id: 'ti3', itemName: 'Dressage Saddle', category: 'Saddle', quantity: 1, condition: 'Fair', brand: 'Passier', size: '17.5"', horseName: 'Caesar', riderName: 'Noor Rider', storageLocation: 'Tack Room B', lastUsedDate: '2026-03-22' },
  { id: 'ti4', itemName: 'Saddle Pad', category: 'Pad', quantity: 3, condition: 'Good', brand: 'LeMieux', size: 'Full', horseName: 'General', riderName: '-', storageLocation: 'Tack Room A', lastUsedDate: '2026-03-23' },
  { id: 'ti5', itemName: 'Halter', category: 'Halter', quantity: 5, condition: 'Good', brand: 'Horseware', size: 'Full', horseName: 'Various', riderName: '-', storageLocation: 'Tack Room A', lastUsedDate: '2026-03-24' },
  { id: 'ti6', itemName: 'Lead Rope', category: 'Rope', quantity: 8, condition: 'Fair', brand: 'Weaver', size: '10ft', horseName: 'Various', riderName: '-', storageLocation: 'Barn', lastUsedDate: '2026-03-24' },
];

export const farrierInventoryItems: FarrierInventory[] = [
  { id: 'fii1', itemName: 'Horseshoe Set (Steel)', category: 'Shoes', quantity: 24, condition: 'Good', sizeType: 'Size 1', material: 'Steel', supplier: 'EquiSteel Co.', cost: 45, nextServiceDue: '2026-04-01' },
  { id: 'fii2', itemName: 'Farrier Nails', category: 'Nails', quantity: 500, condition: 'Good', sizeType: 'E4', material: 'Steel', supplier: 'EquiSteel Co.', cost: 15, nextServiceDue: '-' },
  { id: 'fii3', itemName: 'Hoof Rasp', category: 'Tools', quantity: 3, condition: 'Fair', sizeType: '14"', material: 'Carbon Steel', supplier: 'Bloom Forge', cost: 85, nextServiceDue: '2026-05-01' },
  { id: 'fii4', itemName: 'Nippers', category: 'Tools', quantity: 2, condition: 'Good', sizeType: '15"', material: 'Stainless Steel', supplier: 'Bloom Forge', cost: 120, nextServiceDue: '2026-06-01' },
  { id: 'fii5', itemName: 'Therapeutic Pads', category: 'Pads', quantity: 10, condition: 'Good', sizeType: 'Large', material: 'Rubber', supplier: 'HoofCare Ltd.', cost: 25, nextServiceDue: '-' },
];

export const gateRegister: GateRegister[] = [
  { id: 'g1', operationType: 'Entry', personType: 'Staff', personName: 'Michael Groom', entryTime: '2026-03-24T05:45', exitTime: null, vehicleNo: 'DXB-4421', purpose: 'Morning shift' },
  { id: 'g2', operationType: 'Entry', personType: 'Staff', personName: 'Rashid Groom', entryTime: '2026-03-24T05:50', exitTime: null, vehicleNo: 'DXB-7733', purpose: 'Morning shift' },
  { id: 'g3', operationType: 'Entry', personType: 'Visitor', personName: 'Ahmed Al-Mansouri', entryTime: '2026-03-24T08:15', exitTime: '2026-03-24T10:30', vehicleNo: 'AUH-9912', purpose: 'Horse viewing' },
  { id: 'g4', operationType: 'Entry', personType: 'Staff', personName: 'Sam Vet', entryTime: '2026-03-24T08:30', exitTime: null, vehicleNo: 'DXB-2288', purpose: 'Vet rounds' },
  { id: 'g5', operationType: 'Exit', personType: 'Staff', personName: 'Daniel Maintenance', entryTime: '2026-03-24T06:00', exitTime: '2026-03-24T14:00', vehicleNo: 'SHJ-5501', purpose: 'Shift end' },
];

export const dailyRegister: DailyRegister[] = [
  { id: 'dr1', date: '2026-03-24', groomName: 'Michael Groom', checkInTime: '05:45', checkOutTime: null, status: 'Checked In' },
  { id: 'dr2', date: '2026-03-24', groomName: 'Rashid Groom', checkInTime: '05:50', checkOutTime: null, status: 'Checked In' },
  { id: 'dr3', date: '2026-03-24', groomName: 'Fahad Groom', checkInTime: '06:00', checkOutTime: '14:00', status: 'Checked Out' },
  { id: 'dr4', date: '2026-03-24', groomName: 'Ali Hassan', checkInTime: '-', checkOutTime: '-', status: 'Absent' },
];

export const attendance: Attendance[] = [
  { id: 'a1', date: '2026-03-24', employeeName: 'Michael Groom', status: 'Present', remarks: '', markedAt: '06:00' },
  { id: 'a2', date: '2026-03-24', employeeName: 'Rashid Groom', status: 'Present', remarks: '', markedAt: '06:05' },
  { id: 'a3', date: '2026-03-24', employeeName: 'Fahad Groom', status: 'Present', remarks: '', markedAt: '06:10' },
  { id: 'a4', date: '2026-03-24', employeeName: 'Emma Manager', status: 'Present', remarks: '', markedAt: '07:30' },
  { id: 'a5', date: '2026-03-24', employeeName: 'Mike Farrier', status: 'Late', remarks: 'Traffic', markedAt: '08:45' },
  { id: 'a6', date: '2026-03-24', employeeName: 'James Instructor', status: 'Absent', remarks: 'On leave', markedAt: '-' },
  { id: 'a7', date: '2026-03-24', employeeName: 'John Guard', status: 'Present', remarks: '', markedAt: '06:00' },
  { id: 'a8', date: '2026-03-24', employeeName: 'David Guard', status: 'Present', remarks: '', markedAt: '06:00' },
  { id: 'a9', date: '2026-03-24', employeeName: 'Lisa Housekeeping', status: 'Present', remarks: '', markedAt: '07:00' },
  { id: 'a10', date: '2026-03-24', employeeName: 'Peter Gardener', status: 'Half Day', remarks: 'Personal', markedAt: '07:00' },
];

export const groomWorksheets: GroomWorksheet[] = [
  {
    id: 'gw1', date: '2026-03-24', groomName: 'Michael Groom', overallRemarks: 'All stalls cleaned',
    entries: [
      { id: 'gwe1', horseName: 'Alta Strada', morningHours: 1, afternoonHours: 0.5, totalHours: 1.5, woodchips: true, bichali: false, booSa: true, remarks: '' },
      { id: 'gwe2', horseName: 'Cadillac', morningHours: 1, afternoonHours: 0.5, totalHours: 1.5, woodchips: true, bichali: true, booSa: false, remarks: 'Extra grooming' },
      { id: 'gwe3', horseName: 'Caesar', morningHours: 0.5, afternoonHours: 0.5, totalHours: 1, woodchips: false, bichali: true, booSa: true, remarks: '' },
    ],
  },
  {
    id: 'gw2', date: '2026-03-24', groomName: 'Rashid Groom', overallRemarks: 'Block B done',
    entries: [
      { id: 'gwe4', horseName: 'Claudia', morningHours: 1, afternoonHours: 1, totalHours: 2, woodchips: true, bichali: false, booSa: false, remarks: '' },
      { id: 'gwe5', horseName: 'DejaVu', morningHours: 0.5, afternoonHours: 0.5, totalHours: 1, woodchips: true, bichali: true, booSa: true, remarks: '' },
    ],
  },
];

export const workRecords: WorkRecord[] = [
  {
    id: 'wr1', date: '2026-03-24', staffName: 'Daniel Maintenance', staffCategory: 'Maintenance', overallRemarks: 'Arena leveled',
    entries: [
      { id: 'wre1', taskDescription: 'Arena surface raking', morningHours: 3, afternoonHours: 0, totalHours: 3, remarks: '' },
      { id: 'wre2', taskDescription: 'Fence repair - paddock 3', morningHours: 0, afternoonHours: 2, totalHours: 2, remarks: 'New post installed' },
    ],
  },
  {
    id: 'wr2', date: '2026-03-24', staffName: 'Peter Gardener', staffCategory: 'Gardener', overallRemarks: '',
    entries: [
      { id: 'wre3', taskDescription: 'Lawn mowing - front entrance', morningHours: 2, afternoonHours: 0, totalHours: 2, remarks: '' },
      { id: 'wre4', taskDescription: 'Hedge trimming', morningHours: 0, afternoonHours: 1.5, totalHours: 1.5, remarks: '' },
    ],
  },
];

export const inspectionRounds: InspectionRound[] = [
  {
    id: 'ir1', date: '2026-03-24', area: 'Stable Block A', inspectorName: 'Emma Manager', status: 'Passed', notes: 'All clear',
    items: [
      { item: 'Bedding depth', status: 'OK', note: '' },
      { item: 'Water troughs', status: 'OK', note: '' },
      { item: 'Ventilation', status: 'OK', note: '' },
      { item: 'Feed buckets', status: 'OK', note: 'Cleaned' },
    ],
  },
  {
    id: 'ir2', date: '2026-03-24', area: 'Stable Block B', inspectorName: 'Emma Manager', status: 'Issues Found', notes: 'Ventilation issue in stall B-3',
    items: [
      { item: 'Bedding depth', status: 'OK', note: '' },
      { item: 'Water troughs', status: 'OK', note: '' },
      { item: 'Ventilation', status: 'Issue', note: 'Fan not working in B-3' },
      { item: 'Feed buckets', status: 'OK', note: '' },
    ],
  },
  {
    id: 'ir3', date: '2026-03-23', area: 'Training Arena', inspectorName: 'Mike Supervisor', status: 'Passed', notes: '',
    items: [
      { item: 'Surface condition', status: 'OK', note: '' },
      { item: 'Fencing', status: 'OK', note: '' },
      { item: 'Equipment storage', status: 'OK', note: '' },
    ],
  },
];

export const housekeepingItems: HousekeepingItem[] = [
  { id: 'hk1', itemName: 'Floor Cleaner', category: 'Cleaning', quantity: 15, unitType: 'bottles', minStockLevel: 5, usageArea: 'Stable', storageLocation: 'Storage Room 1', supplierName: 'CleanPro', costPerUnit: 12, reorderAlertEnabled: true },
  { id: 'hk2', itemName: 'Broom (Heavy Duty)', category: 'Tools', quantity: 8, unitType: 'pcs', minStockLevel: 3, usageArea: 'All', storageLocation: 'Storage Room 1', supplierName: 'ToolMart', costPerUnit: 25, reorderAlertEnabled: false },
  { id: 'hk3', itemName: 'Disinfectant Spray', category: 'Cleaning', quantity: 20, unitType: 'cans', minStockLevel: 8, usageArea: 'Stable', storageLocation: 'Storage Room 1', supplierName: 'CleanPro', costPerUnit: 8, reorderAlertEnabled: true },
  { id: 'hk4', itemName: 'Mop Heads', category: 'Tools', quantity: 4, unitType: 'pcs', minStockLevel: 3, usageArea: 'All', storageLocation: 'Storage Room 1', supplierName: 'ToolMart', costPerUnit: 15, reorderAlertEnabled: true },
  { id: 'hk5', itemName: 'Trash Bags (Large)', category: 'Supplies', quantity: 200, unitType: 'pcs', minStockLevel: 50, usageArea: 'All', storageLocation: 'Storage Room 2', supplierName: 'SupplyChain', costPerUnit: 0.5, reorderAlertEnabled: false },
];

export const groceryItems: GroceryItem[] = [
  { id: 'gr1', itemName: 'Rice', quantity: 50, unit: 'kg', pricePerUnit: 3.5, purchaseDate: '2026-03-20', expiryDate: '2026-09-20', description: 'Basmati long grain' },
  { id: 'gr2', itemName: 'Chicken Breast', quantity: 20, unit: 'kg', pricePerUnit: 18, purchaseDate: '2026-03-22', expiryDate: '2026-03-29', description: 'Fresh, boneless' },
  { id: 'gr3', itemName: 'Cooking Oil', quantity: 10, unit: 'L', pricePerUnit: 8, purchaseDate: '2026-03-15', expiryDate: '2027-03-15', description: 'Sunflower oil' },
  { id: 'gr4', itemName: 'Onions', quantity: 15, unit: 'kg', pricePerUnit: 2, purchaseDate: '2026-03-21', expiryDate: '2026-04-10', description: '' },
  { id: 'gr5', itemName: 'Tomatoes', quantity: 10, unit: 'kg', pricePerUnit: 4, purchaseDate: '2026-03-23', expiryDate: '2026-03-30', description: '' },
  { id: 'gr6', itemName: 'Bread', quantity: 20, unit: 'loaves', pricePerUnit: 2.5, purchaseDate: '2026-03-24', expiryDate: '2026-03-27', description: 'White sliced' },
];

export const invoices: Invoice[] = [
  { id: 'inv1', invoiceNumber: 'INV-2026-001', dateFrom: '2026-03-01', dateTo: '2026-03-15', totalSessions: 12, totalHours: 18, instructorName: 'James Instructor', status: 'Paid', totalAmount: 3600 },
  { id: 'inv2', invoiceNumber: 'INV-2026-002', dateFrom: '2026-03-01', dateTo: '2026-03-15', totalSessions: 8, totalHours: 12, instructorName: 'Alex Rider', status: 'Sent', totalAmount: 2400 },
  { id: 'inv3', invoiceNumber: 'INV-2026-003', dateFrom: '2026-03-16', dateTo: '2026-03-31', totalSessions: 6, totalHours: 9, instructorName: 'James Instructor', status: 'Draft', totalAmount: 1800 },
];

export const expenses: Expense[] = [
  { id: 'e1', expenseType: 'Feed Purchase', amount: 4200, description: 'Monthly oats and barley bulk', date: '2026-03-20', horseName: 'General', employeeName: 'Emma Manager' },
  { id: 'e2', expenseType: 'Veterinary', amount: 1800, description: 'Shadow foreleg treatment', date: '2026-03-22', horseName: 'Shadow', employeeName: 'Sam Vet' },
  { id: 'e3', expenseType: 'Farrier', amount: 950, description: 'Shoeing 3 horses', date: '2026-03-18', horseName: 'Multiple', employeeName: 'Mike Farrier' },
  { id: 'e4', expenseType: 'Equipment', amount: 620, description: 'Halters and lead ropes', date: '2026-03-15', horseName: 'General', employeeName: 'Emma Manager' },
  { id: 'e5', expenseType: 'Maintenance', amount: 3100, description: 'Arena surface renovation', date: '2026-03-10', horseName: 'N/A', employeeName: 'Daniel Maintenance' },
];

export const fines: Fine[] = [
  { id: 'f1', reason: 'Late arrival (3rd occurrence)', amount: 50, status: 'Paid', issuedAt: '2026-03-20', employeeName: 'Mike Farrier' },
  { id: 'f2', reason: 'Negligence — missed feed schedule', amount: 100, status: 'Issued', issuedAt: '2026-03-22', employeeName: 'Fahad Groom' },
  { id: 'f3', reason: 'Unauthorized equipment use', amount: 75, status: 'Appealed', issuedAt: '2026-03-18', employeeName: 'Daniel Maintenance' },
];

export const meetings: Meeting[] = [
  { id: 'mt1', title: 'Weekly Stable Review', date: '2026-03-23', time: '09:00', status: 'Scheduled', attendees: ['Emma Manager', 'Michael Groom', 'Sam Vet'], notes: '' },
  { id: 'mt2', title: 'Monthly Budget Meeting', date: '2026-03-25', time: '14:00', status: 'Scheduled', attendees: ['Dr. Director', 'Charles Executive Accounts', 'Emma Manager'], notes: '' },
  { id: 'mt3', title: 'Ground Ops Standup', date: '2026-03-21', time: '08:00', status: 'Completed', attendees: ['Mike Supervisor', 'John Guard', 'Peter Gardener'], notes: 'Discussed new shift schedule' },
];

export const approvals: Approval[] = [
  { id: 'ap1', type: 'Leave Request', requestedBy: 'James Instructor', date: '2026-03-22', status: 'Pending', description: '3 days annual leave' },
  { id: 'ap2', type: 'Purchase Order', requestedBy: 'Emma Manager', date: '2026-03-20', status: 'Approved', description: 'Feed stock — AED 4,200' },
  { id: 'ap3', type: 'Expense Claim', requestedBy: 'Mike Farrier', date: '2026-03-19', status: 'Rejected', description: 'Tool replacement — AED 320' },
  { id: 'ap4', type: 'Leave Request', requestedBy: 'Lisa Housekeeping', date: '2026-03-24', status: 'Pending', description: '1 day sick leave' },
];

// ============ DASHBOARD METRICS ============

export const dashboardMetrics = {
  totalHorses: 24,
  totalStaff: 26,
  pendingTasks: 0,
  auditLogs: 0,
};

export const teamByRole = [
  { role: 'Super Admin', count: 1, color: 'hsl(273, 100%, 80%)' },
  { role: 'Director', count: 1, color: 'hsl(180, 100%, 45%)' },
  { role: 'Stable Manager', count: 1, color: 'hsl(40, 100%, 60%)' },
  { role: 'Instructor', count: 1, color: 'hsl(340, 90%, 60%)' },
  { role: 'Groom', count: 4, color: 'hsl(120, 60%, 50%)' },
  { role: 'Rider', count: 2, color: 'hsl(200, 80%, 55%)' },
  { role: 'Farrier', count: 1, color: 'hsl(30, 90%, 55%)' },
  { role: 'Guard', count: 3, color: 'hsl(260, 60%, 60%)' },
  { role: 'Jamedar', count: 2, color: 'hsl(350, 80%, 55%)' },
  { role: 'Ground Supervisor', count: 1, color: 'hsl(160, 60%, 50%)' },
  { role: 'Housekeeping', count: 1, color: 'hsl(290, 60%, 55%)' },
  { role: 'Gardener', count: 1, color: 'hsl(100, 60%, 50%)' },
  { role: 'Executive Accounts', count: 1, color: 'hsl(220, 70%, 55%)' },
  { role: 'Senior Executive Admin', count: 1, color: 'hsl(50, 80%, 55%)' },
  { role: 'Veterinarian', count: 1, color: 'hsl(0, 70%, 55%)' },
  { role: 'Chef', count: 1, color: 'hsl(140, 60%, 50%)' },
  { role: 'Other', count: 3, color: 'hsl(260, 3%, 29%)' },
];

export const teamByDepartment = [
  { name: 'Stable Ops', value: 9, fill: 'hsl(273, 100%, 80%)' },
  { name: 'Ground Ops', value: 9, fill: 'hsl(120, 60%, 50%)' },
  { name: 'Accounts', value: 3, fill: 'hsl(40, 100%, 60%)' },
  { name: 'Leadership', value: 1, fill: 'hsl(200, 80%, 55%)' },
  { name: 'Restaurant', value: 2, fill: 'hsl(340, 90%, 60%)' },
  { name: 'Admin', value: 2, fill: 'hsl(180, 100%, 45%)' },
];

export const horsesByGender = [
  { name: 'Stallion', value: 13, fill: 'hsl(200, 80%, 55%)' },
  { name: 'Mare', value: 11, fill: 'hsl(340, 90%, 60%)' },
];

export const transactionsByDepartment = [
  { department: 'Stable Ops', value: 12 },
  { department: 'Ground Ops', value: 8 },
  { department: 'Accounts', value: 5 },
  { department: 'Restaurant', value: 3 },
  { department: 'Leadership', value: 2 },
];
