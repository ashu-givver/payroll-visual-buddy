import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatters';
import { PayrollSummary, Employee } from '@/types/payroll';

interface StaticTopSectionProps {
  summary: PayrollSummary;
  employees: Employee[];
  filteredEmployeeCount: number;
  totalEmployeeCount: number;
  onCardClick: (cardId: string) => void;
  activeCard?: string;
  approvedEmployees: Set<string>;
  currentView: 'gross-pay' | 'deductions' | 'employer-cost' | 'total';
  viewMode: 'compact' | 'detailed';
}

export const StaticTopSection = ({ summary }: StaticTopSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Total Gross Pay</h3>
          <p className="text-2xl font-bold text-payroll-positive">{formatCurrency(summary.totalGrossPay)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Total Deductions</h3>
          <p className="text-2xl font-bold text-payroll-negative">{formatCurrency(summary.totalDeductions)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Net Pay</h3>
          <p className="text-2xl font-bold">{formatCurrency(summary.totalNetPay)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Employer Cost</h3>
          <p className="text-2xl font-bold">{formatCurrency(summary.totalEmployerCost)}</p>
        </CardContent>
      </Card>
    </div>
  );
};