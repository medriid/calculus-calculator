import { Button } from '@/components/ui/button';

interface AdvancedFunctionsSidebarProps {
  onFunctionClick: (func: string) => void;
  onVariableClick: (variable: string) => void;
}

export function AdvancedFunctionsSidebar({ onFunctionClick, onVariableClick }: AdvancedFunctionsSidebarProps) {
  const trigFunctions = [
    { label: 'sec', value: 'sec' },
    { label: 'csc', value: 'csc' },
    { label: 'cot', value: 'cot' },
    { label: 'arcsin', value: 'arcsin' },
    { label: 'arccos', value: 'arccos' },
    { label: 'arctan', value: 'arctan' },
  ];

  const hyperbolicFunctions = [
    { label: 'sinh', value: 'sinh' },
    { label: 'cosh', value: 'cosh' },
    { label: 'tanh', value: 'tanh' },
    { label: 'sech', value: 'sech' },
  ];

  const logarithmicFunctions = [
    { label: 'log₂', value: 'log₂' },
    { label: 'log₁₀', value: 'log₁₀' },
    { label: 'logₙ', value: 'log(' },
  ];

  const specialFunctions = [
    { label: 'n!', value: 'factorial(' },
    { label: 'ⁿCᵣ', value: 'combinations(' },
    { label: 'ⁿPᵣ', value: 'permutations(' },
    { label: '|x|', value: 'abs' },
  ];

  const variables = ['x', 'y', 'z', 'n'];

  return (
    <div className="calc-dark-bg rounded-2xl p-6 shadow-2xl">
      <h3 className="text-xl font-semibold calc-accent-text mb-6">Advanced Functions</h3>
      
      {/* Trigonometric Functions */}
      <div className="mb-6">
        <h4 className="text-sm font-medium calc-text-secondary mb-3 uppercase tracking-wide">Trigonometric</h4>
        <div className="grid grid-cols-2 gap-2">
          {trigFunctions.map((func) => (
            <Button
              key={func.value}
              className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-2 rounded text-sm font-medium"
              onClick={() => onFunctionClick(func.value)}
            >
              {func.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Hyperbolic Functions */}
      <div className="mb-6">
        <h4 className="text-sm font-medium calc-text-secondary mb-3 uppercase tracking-wide">Hyperbolic</h4>
        <div className="grid grid-cols-2 gap-2">
          {hyperbolicFunctions.map((func) => (
            <Button
              key={func.value}
              className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-2 rounded text-sm font-medium"
              onClick={() => onFunctionClick(func.value)}
            >
              {func.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Logarithmic Functions */}
      <div className="mb-6">
        <h4 className="text-sm font-medium calc-text-secondary mb-3 uppercase tracking-wide">Logarithmic</h4>
        <div className="grid grid-cols-1 gap-2">
          {logarithmicFunctions.map((func) => (
            <Button
              key={func.value}
              className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-2 rounded text-sm font-medium"
              onClick={() => onFunctionClick(func.value)}
            >
              {func.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Special Functions */}
      <div className="mb-6">
        <h4 className="text-sm font-medium calc-text-secondary mb-3 uppercase tracking-wide">Special</h4>
        <div className="grid grid-cols-1 gap-2">
          {specialFunctions.map((func) => (
            <Button
              key={func.value}
              className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-2 rounded text-sm font-medium"
              onClick={() => onFunctionClick(func.value)}
            >
              {func.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Variables */}
      <div>
        <h4 className="text-sm font-medium calc-text-secondary mb-3 uppercase tracking-wide">Variables</h4>
        <div className="grid grid-cols-2 gap-2">
          {variables.map((variable) => (
            <Button
              key={variable}
              className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-2 rounded text-sm font-medium"
              onClick={() => onVariableClick(variable)}
            >
              {variable}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
