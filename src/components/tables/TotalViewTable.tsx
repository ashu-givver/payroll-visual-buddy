import { CompactTable } from './CompactTable';
import { Employee } from '@/types/payroll';

interface TotalViewTableProps {
  employees: Employee[];
  approvedEmployees: Set<string>;
  onEmployeeApproval: (id: string, approved: boolean) => void;
  onBulkApproval: (approved: boolean) => void;
}

export const TotalViewTable = (props: TotalViewTableProps) => {
  return <CompactTable {...props} currentView="total" onViewChange={() => {}} />;
};