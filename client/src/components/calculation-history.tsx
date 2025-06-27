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
        return 'text-red-400';
      case 'derivative':
        return 'text-blue-400';
      case 'integral':
        return 'text-purple-400';
      default:
        return 'calc-accent-text';
    }
  };

  return (
    <div className="mt-6 calc-dark-bg rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold calc-accent-text">Calculation History</h3>
        <Button
          className="calc-text-secondary hover:text-red-400 transition-colors duration-200 bg-transparent hover:bg-red-900/20"
          onClick={onClearHistory}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {history.length === 0 ? (
          <div className="text-center py-8 calc-text-secondary">
            No calculations yet. Start calculating to see your history here.
          </div>
        ) : (
          history.map((entry, index) => (
            <div key={index} className="calc-bg rounded-lg p-3 border border-gray-700">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-mono ${getTypeColor(entry.type)}`}>
                  {getTypeIcon(entry.type)}
                </span>
                <span className="text-xs calc-text-secondary">
                  {formatTimestamp(entry.timestamp)}
                </span>
              </div>
              <div className="text-sm calc-text-secondary font-mono mb-1 break-words">
                {entry.input}
              </div>
              <div className={`font-mono break-words ${getTypeColor(entry.type)}`}>
                {entry.result}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
