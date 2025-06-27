import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { CalculationResult } from '@/lib/calculator';

interface CalculationHistoryProps {
  history: CalculationResult[];
  onClearHistory: () => void;
}

export function CalculationHistory({ history, onClearHistory }: CalculationHistoryProps) {
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getTypeIcon = (type: CalculationResult['type']) => {
    switch (type) {
      case 'derivative':
        return 'd/dx';
      case 'integral':
        return '∫';
      case 'error':
        return '⚠️';
      default:
        return '=';
    }
  };

  const getTypeColor = (type: CalculationResult['type']) => {
    switch (type) {
      case 'error':
        return 'calc-text-muted';
      case 'derivative':
        return 'calc-text-secondary';
      case 'integral':
        return 'calc-text-secondary';
      default:
        return 'calc-accent-text';
    }
  };

  return (
    <div className="mt-8 calc-dark-bg rounded-3xl p-8 shadow-2xl border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold calc-accent-text tracking-wide">Calculation History</h3>
        <Button
          className="calc-text-muted hover:calc-accent-text transition-colors duration-200 bg-transparent hover:bg-gray-800/30 p-3 rounded-xl"
          onClick={onClearHistory}
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Clear
        </Button>
      </div>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {history.length === 0 ? (
          <div className="text-center py-12 calc-text-muted">
            No calculations yet. Start calculating to see your history here.
          </div>
        ) : (
          history.map((entry, index) => (
            <div key={index} className="calc-display rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-mono font-medium ${getTypeColor(entry.type)}`}>
                  {getTypeIcon(entry.type)}
                </span>
                <span className="text-xs calc-text-muted">
                  {formatTimestamp(entry.timestamp)}
                </span>
              </div>
              <div className="text-sm calc-text-secondary font-mono mb-2 break-words">
                {entry.input}
              </div>
              <div className={`font-mono break-words text-base ${getTypeColor(entry.type)}`}>
                {entry.result}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
