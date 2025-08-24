export interface Employee {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  basePay: number;
  bonus: number;
  commission: number;
  overtime: number;
  gifFlex: number;
  onCall: number;
  salaryBasis: 'Monthly' | 'Hourly' | 'Annual';
  units: number;
  rate: number;
  totalIncome: number;
  deductions: number;
  takeHomePay: number;
  employerCost: number;
  status: 'Current' | 'Terminated' | 'On Leave';
  department: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contractor';
  // Deduction breakdown
  paye: number;
  ni: number;
  pension: number;
  studentLoan: number;
  postgradLoan: number;
  deductionVariance?: number;
  netPaymentVariance?: number;
  // Employer cost breakdown
  employerNI: number;
  employerPension: number;
  // Previous month data for comparison
  previousMonth?: {
    basePay: number;
    bonus: number;
    commission: number;
    overtime: number;
    gifFlex: number;
    onCall: number;
    totalIncome: number;
    deductions: number;
    takeHomePay: number;
    employerCost: number;
    paye: number;
    ni: number;
    pension: number;
    studentLoan: number;
    postgradLoan: number;
    employerNI: number;
    employerPension: number;
  };
}

export interface AdvancedFilter {
  id: string;
  payElement: string;
  condition: 'greater' | 'less' | 'equal';
  value: number;
  isPercentage: boolean;
  compareToLastMonth: boolean;
}

export interface SavedFilterView {
  id: string;
  name: string;
  filters: AdvancedFilter[];
  basicFilters: {
    showChangesOnly: boolean;
    department: string;
    employmentType: string;
    searchTerm: string;
  };
  createdAt: Date;
  isDefault?: boolean;
}

export interface PayrollPeriod {
  month: string;
  year: string;
  startDate: string;
  endDate: string;
  payDate: string;
  status: 'Draft' | 'Confirmed' | 'Processing' | 'Complete';
  totalEmployees: number;
  approvedEmployees: number;
}

export interface PayrollSummary {
  totalGrossPay: number;
  totalDeductions: number;
  totalNetPay: number;
  totalEmployerCost: number;
  employeeCount: number;
  averageGrossPay: number;
  totalPAYE: number;
  totalNI: number;
  totalPension: number;
  totalStudentLoan: number;
  totalPostgradLoan: number;
  totalEmployerNI: number;
  totalEmployerPension: number;
}

export type TabType = 'gross-pay' | 'deductions' | 'employer-cost' | 'total';