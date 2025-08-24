import { useState, useMemo } from 'react';
import { TabType, AdvancedFilter, SavedFilterView } from '@/types/payroll';
import { employees, payrollPeriod, payrollSummary } from '@/data/employees';
import { PayrollHeader } from '@/components/PayrollHeader';
import { StaticTopSection } from '@/components/StaticTopSection';
import { AdvancedFilterPanel } from '@/components/AdvancedFilterPanel';
import { TableToolbar } from '@/components/TableToolbar';
import { CompactTable } from '@/components/tables/CompactTable';
import { DetailedTable } from '@/components/tables/DetailedTable';
import { DeductionsTable } from '@/components/tables/DeductionsTable';
import { EmployerCostTable } from '@/components/tables/EmployerCostTable';
import { TotalViewTable } from '@/components/tables/TotalViewTable';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export const PayrollDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showChangesOnly, setShowChangesOnly] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [viewMode, setViewMode] = useState<'compact' | 'detailed'>('compact');

  // Handle view mode changes
  const handleViewModeChange = (mode: 'compact' | 'detailed') => {
    setViewMode(mode);
    // When switching to detailed view, default to 'total' (All Details)
    if (mode === 'detailed') {
      setCurrentView('total');
    } else {
      setCurrentView('gross-pay');
    }
  };
  const [approvedEmployees, setApprovedEmployees] = useState<Set<string>>(new Set());
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilter[]>([]);
  const [savedViews, setSavedViews] = useState<SavedFilterView[]>([]);
  const [employeeData, setEmployeeData] = useState(employees);
  const [activeCard, setActiveCard] = useState<string>();
  const [currentView, setCurrentView] = useState<'gross-pay' | 'deductions' | 'employer-cost' | 'total'>('gross-pay');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const { toast } = useToast();

  const filteredEmployees = useMemo(() => {
    return employeeData.filter(employee => {
      // Search filter
      if (searchTerm && !employee.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Changes only filter
      if (showChangesOnly && !['1', '3', '5', '7'].includes(employee.id)) {
        return false;
      }

      // Department filter
      if (selectedDepartment !== 'all' && employee.department !== selectedDepartment) {
        return false;
      }

      // Card-based filtering and active filters
      const allActiveFilters = activeCard ? [activeCard, ...activeFilters] : activeFilters;

      for (const filterId of allActiveFilters) {
        switch (filterId) {
          case 'total-headcount':
            // Show all employees for total headcount
            break;
          case 'new-joiners':
            // Filter to show only new joiners (employees 1, 2, 3 based on mock data)
            if (!['1', '2', '3'].includes(employee.id)) return false;
            break;
          case 'leavers':
            // Filter to show only leavers (employee 4 based on mock data)
            if (!['4'].includes(employee.id)) return false;
            break;
          case 'pension-enrolled':
            // Filter to show employees newly enrolled in pension (employees 5, 6 based on mock data)
            if (!['5', '6'].includes(employee.id)) return false;
            break;
          case 'pension-opted-out':
            // Filter to show employees who opted out of pension (none in current mock data)
            return false;
            break;
          case 'salary-changes':
            // Filter to show employees with salary changes (employees 1, 3, 5, 7 based on mock data)
            if (!['1', '3', '5', '7'].includes(employee.id)) return false;
            break;
          case 'gross-pay':
          case 'deductions':
          case 'take-home-pay':
          case 'employer-cost':
          case 'net-differences':
            // For pay metrics, show all employees with their data
            break;
        }
      }

      // Advanced filters
      for (const filter of advancedFilters) {
        const employeeValue = getEmployeeValue(employee, filter.payElement);
        const filterValue = filter.value;
        
        if (filter.compareToLastMonth && employee.previousMonth) {
          const previousValue = getEmployeeValue(employee.previousMonth, filter.payElement);
          const change = employeeValue - previousValue;
          const changeValue = filter.isPercentage ? (change / previousValue) * 100 : change;
          
          if (!compareValues(changeValue, filter.condition, filterValue)) {
            return false;
          }
        } else {
          const comparisonValue = filter.isPercentage ? (employeeValue / employee.totalIncome) * 100 : employeeValue;
          if (!compareValues(comparisonValue, filter.condition, filterValue)) {
            return false;
          }
        }
      }

      return true;
    });
  }, [employeeData, searchTerm, showChangesOnly, selectedDepartment, activeCard, activeFilters, advancedFilters]);

  const getEmployeeValue = (employee: any, payElement: string): number => {
    switch (payElement) {
      case 'basePay': return employee.basePay;
      case 'bonus': return employee.bonus;
      case 'commission': return employee.commission;
      case 'overtime': return employee.overtime;
      case 'totalIncome': return employee.totalIncome;
      case 'deductions': return employee.deductions;
      case 'takeHomePay': return employee.takeHomePay;
      case 'paye': return employee.paye;
      case 'ni': return employee.ni;
      case 'pension': return employee.pension;
      case 'studentLoan': return employee.studentLoan;
      case 'postgradLoan': return employee.postgradLoan;
      case 'employerCost': return employee.employerCost;
      case 'employerNI': return employee.employerNI;
      case 'employerPension': return employee.employerPension;
      default: return 0;
    }
  };

  const compareValues = (value: number, condition: string, targetValue: number): boolean => {
    switch (condition) {
      case 'greater': return value > targetValue;
      case 'less': return value < targetValue;
      case 'equal': return Math.abs(value - targetValue) < 0.01;
      default: return true;
    }
  };

  const handleCardClick = (cardId: string) => {
    if (activeCard === cardId) {
      setActiveCard(undefined);
    } else {
      setActiveCard(cardId);
    }
  };

  const handleFilterChange = (filterId: string, active: boolean) => {
    if (active) {
      setActiveFilters(prev => [...prev, filterId]);
    } else {
      setActiveFilters(prev => prev.filter(f => f !== filterId));
    }
  };

  const handleConfirmPayroll = () => {
    toast({
      title: "Payroll Confirmed",
      description: "The payroll has been successfully confirmed and is ready for processing.",
    });
  };

  const handleEmployeeApproval = (employeeId: string, approved: boolean) => {
    if (approved) {
      setApprovedEmployees(prev => new Set([...prev, employeeId]));
    } else {
      setApprovedEmployees(prev => {
        const newSet = new Set(prev);
        newSet.delete(employeeId);
        return newSet;
      });
    }
  };

  const handleBulkApproval = (approved: boolean) => {
    if (approved) {
      setApprovedEmployees(new Set(filteredEmployees.map(emp => emp.id)));
    } else {
      setApprovedEmployees(new Set());
    }
  };

  const handleAdvancedFilterApply = (filters: AdvancedFilter[]) => {
    setAdvancedFilters(filters);
    setShowAdvancedFilters(false);
  };

  const handleSaveView = (view: SavedFilterView) => {
    setSavedViews(prev => [...prev, view]);
    toast({
      title: "View Saved",
      description: `The view "${view.name}" has been saved successfully.`,
    });
  };

  const renderTable = () => {
    if (viewMode === 'compact') {
      return (
        <CompactTable
          employees={filteredEmployees}
          approvedEmployees={approvedEmployees}
          onEmployeeApproval={handleEmployeeApproval}
          currentView={currentView}
          onViewChange={setCurrentView}
          onBulkApproval={handleBulkApproval}
        />
      );
    } else {
      switch (currentView) {
        case 'gross-pay':
          return (
            <DetailedTable
              employees={filteredEmployees}
              approvedEmployees={approvedEmployees}
              onEmployeeApproval={handleEmployeeApproval}
              onBulkApproval={handleBulkApproval}
            />
          );
        case 'deductions':
          return (
            <DeductionsTable
              employees={filteredEmployees}
              approvedEmployees={approvedEmployees}
              onEmployeeApproval={handleEmployeeApproval}
              onBulkApproval={handleBulkApproval}
            />
          );
        case 'employer-cost':
          return (
            <EmployerCostTable
              employees={filteredEmployees}
              approvedEmployees={approvedEmployees}
              onEmployeeApproval={handleEmployeeApproval}
              onBulkApproval={handleBulkApproval}
            />
          );
        case 'total':
          return (
            <TotalViewTable
              employees={filteredEmployees}
              approvedEmployees={approvedEmployees}
              onEmployeeApproval={handleEmployeeApproval}
              onBulkApproval={handleBulkApproval}
            />
          );
        default:
          return (
            <DetailedTable
              employees={filteredEmployees}
              approvedEmployees={approvedEmployees}
              onEmployeeApproval={handleEmployeeApproval}
              onBulkApproval={handleBulkApproval}
            />
          );
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto p-4 space-y-6">
        <PayrollHeader
          period={payrollPeriod}
          onConfirm={handleConfirmPayroll}
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onAdvancedFilters={() => setShowAdvancedFilters(true)}
        />

        <StaticTopSection
          summary={payrollSummary}
          employees={employeeData}
          filteredEmployeeCount={filteredEmployees.length}
          totalEmployeeCount={employeeData.length}
          onCardClick={handleCardClick}
          activeCard={activeCard}
          approvedEmployees={approvedEmployees}
          currentView={currentView}
          viewMode={viewMode}
        />

        {!showAdvancedFilters && (
          <TableToolbar
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onAdvancedFilters={() => setShowAdvancedFilters(true)}
          />
        )}

        {showAdvancedFilters && (
          <AdvancedFilterPanel
            filters={advancedFilters}
            onFiltersChange={handleAdvancedFilterApply}
            onCancel={() => setShowAdvancedFilters(false)}
            savedViews={savedViews}
            onSaveView={handleSaveView}
            currentFilters={{
              showChangesOnly,
              department: selectedDepartment,
              employmentType: 'all',
              searchTerm
            }}
          />
        )}

        {renderTable()}

        {filteredEmployees.length > 0 && (
          <div className="flex justify-end mt-6">
            <Button onClick={handleConfirmPayroll} size="lg">
              Confirm Payroll
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};