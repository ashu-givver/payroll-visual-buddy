import { CompactTable } from './CompactTable';
import { Employee } from '@/types/payroll';

interface EmployerCostTableProps {
  employees: Employee[];
  approvedEmployees: Set<string>;
  onEmployeeApproval: (id: string, approved: boolean) => void;
  onBulkApproval: (approved: boolean) => void;
}

export const EmployerCostTable = (props: EmployerCostTableProps) => {
  return <CompactTable {...props} currentView="employer-cost" onViewChange={() => {}} />;
};