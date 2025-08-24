import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PayrollPeriod } from '@/types/payroll';

interface PayrollHeaderProps {
  period: PayrollPeriod;
  onConfirm: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  viewMode: 'compact' | 'detailed';
  onViewModeChange: (mode: 'compact' | 'detailed') => void;
  activeFilters: string[];
  onFilterChange: (filterId: string, active: boolean) => void;
  onAdvancedFilters: () => void;
  onDownload?: () => void;
}

export const PayrollHeader = ({ period, onConfirm }: PayrollHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 bg-card border-b">
      <div>
        <h1 className="text-2xl font-bold text-payroll-header">Payroll Dashboard</h1>
        <p className="text-muted-foreground">Period: {period.startDate} - {period.endDate}</p>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant="secondary">{period.status}</Badge>
        <Button onClick={onConfirm} className="bg-payroll-confirm text-white">
          Confirm Payroll
        </Button>
      </div>
    </div>
  );
};