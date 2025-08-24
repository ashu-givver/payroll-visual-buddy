import { Button } from '@/components/ui/button';

interface TableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  viewMode: 'compact' | 'detailed';
  onViewModeChange: (mode: 'compact' | 'detailed') => void;
  activeFilters: string[];
  onFilterChange: (filterId: string, active: boolean) => void;
  onAdvancedFilters: () => void;
}

export const TableToolbar = ({ viewMode, onViewModeChange }: TableToolbarProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-card border rounded-lg">
      <div className="flex gap-2">
        <Button 
          variant={viewMode === 'compact' ? 'default' : 'outline'}
          onClick={() => onViewModeChange('compact')}
        >
          Compact
        </Button>
        <Button 
          variant={viewMode === 'detailed' ? 'default' : 'outline'}
          onClick={() => onViewModeChange('detailed')}
        >
          Detailed
        </Button>
      </div>
    </div>
  );
};