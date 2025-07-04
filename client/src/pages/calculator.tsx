import { useState, useEffect } from 'react';
import { CalculatorDisplay } from '@/components/calculator-display';
import { AdvancedFunctionsSidebar } from '@/components/advanced-functions-sidebar';
import { CalculationHistory } from '@/components/calculation-history';
import { CalculationResult, calculatorEngine } from '@/lib/calculator';

export default function Calculator() {
  const [history, setHistory] = useState<CalculationResult[]>([]);
  const [calculatorMethods, setCalculatorMethods] = useState<{
    insertFunction: (func: string) => void;
    insertVariable: (variable: string) => void;
  } | null>(null);

  useEffect(() => {
    // Load history on component mount
    setHistory(calculatorEngine.getHistory());

    // Keyboard support
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default for calculator keys
      if (['Enter', 'Escape', 'Backspace'].includes(event.key) || 
          /^[0-9+\-*/().=]$/.test(event.key)) {
        event.preventDefault();
      }

      // Handle specific keys
      switch (event.key) {
        case 'Enter':
        case '=':
          // Trigger calculation
          document.querySelector<HTMLButtonElement>('[data-calc-action="calculate"]')?.click();
          break;
        case 'Escape':
          // Clear all
          document.querySelector<HTMLButtonElement>('[data-calc-action="clear"]')?.click();
          break;
        case 'Backspace':
          // Backspace
          document.querySelector<HTMLButtonElement>('[data-calc-action="backspace"]')?.click();
          break;
        default:
          // Handle numbers and operators
          if (/^[0-9]$/.test(event.key)) {
            document.querySelector<HTMLButtonElement>(`[data-calc-number="${event.key}"]`)?.click();
          } else if (['+', '-', '*', '/'].includes(event.key)) {
            const opMap: Record<string, string> = { '*': '×', '/': '÷' };
            const op = opMap[event.key] || event.key;
            document.querySelector<HTMLButtonElement>(`[data-calc-operator="${op}"]`)?.click();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleHistoryUpdate = (newHistory: CalculationResult[]) => {
    setHistory(newHistory);
  };

  const handleClearHistory = () => {
    calculatorEngine.clearHistory();
    setHistory([]);
  };

  const handleSidebarFunctionClick = (func: string) => {
    if (calculatorMethods) {
      calculatorMethods.insertFunction(func);
    }
  };

  const handleSidebarVariableClick = (variable: string) => {
    if (calculatorMethods) {
      calculatorMethods.insertVariable(variable);
    }
  };

  return (
    <div className="min-h-screen calc-bg p-4">
      {/* Header */}
      <header className="text-center py-8">
        <h1 className="text-5xl font-bold calc-accent-text mb-3 tracking-tight">Med's Calculusator</h1>
        <p className="calc-text-secondary text-xl font-light">Calculus</p>
      </header>

      {/* Main Calculator Container */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calculator Display and Input */}
          <CalculatorDisplay 
            onHistoryUpdate={handleHistoryUpdate} 
            onMount={setCalculatorMethods}
          />

          {/* Sidebar with Advanced Functions */}
          <AdvancedFunctionsSidebar 
            onFunctionClick={handleSidebarFunctionClick}
            onVariableClick={handleSidebarVariableClick}
          />
        </div>

        {/* Calculation History */}
        <CalculationHistory 
          history={history}
          onClearHistory={handleClearHistory}
        />
      </div>

      {/* Footer */}
      <footer className="text-center py-8 mt-8">
        <p className="calc-text-muted text-sm">
          © 2025 Med's Calculusator - Calculus Computing
        </p>
      </footer>
    </div>
  );
}
