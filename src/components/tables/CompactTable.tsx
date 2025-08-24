import { Employee } from '@/types/payroll';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/lib/formatters';
import { Checkbox } from '@/components/ui/checkbox';

interface CompactTableProps {
  employees: Employee[];
  approvedEmployees: Set<string>;
  onEmployeeApproval: (id: string, approved: boolean) => void;
  currentView: string;
  onViewChange: (view: any) => void;
  onBulkApproval: (approved: boolean) => void;
}

export const CompactTable = ({ employees, approvedEmployees, onEmployeeApproval }: CompactTableProps) => {
  return (
    <div className="bg-card border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Gross Pay</TableHead>
            <TableHead>Deductions</TableHead>
            <TableHead>Net Pay</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <Checkbox 
                  checked={approvedEmployees.has(employee.id)}
                  onCheckedChange={(checked) => onEmployeeApproval(employee.id, !!checked)}
                />
              </TableCell>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{formatCurrency(employee.totalIncome)}</TableCell>
              <TableCell>{formatCurrency(employee.deductions)}</TableCell>
              <TableCell>{formatCurrency(employee.takeHomePay)}</TableCell>
              <TableCell>{employee.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};