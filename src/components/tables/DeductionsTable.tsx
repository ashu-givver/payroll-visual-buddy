import { CompactTable } from './CompactTable';
import { Employee } from '@/types/payroll';

interface DeductionsTableProps {
  employees: Employee[];
  approvedEmployees: Set<string>;
  onEmployeeApproval: (id: string, approved: boolean) => void;
  onBulkApproval: (approved: boolean) => void;
}

export const DeductionsTable = (props: DeductionsTableProps) => {
  return <CompactTable {...props} currentView="deductions" onViewChange={() => {}} />;
};