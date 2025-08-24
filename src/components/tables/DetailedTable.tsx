import { CompactTable } from './CompactTable';
import { Employee } from '@/types/payroll';

interface DetailedTableProps {
  employees: Employee[];
  approvedEmployees: Set<string>;
  onEmployeeApproval: (id: string, approved: boolean) => void;
  onBulkApproval: (approved: boolean) => void;
}

export const DetailedTable = (props: DetailedTableProps) => {
  return <CompactTable {...props} currentView="detailed" onViewChange={() => {}} />;
};