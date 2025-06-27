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
    { label: 'csch', value: 'csch' },
    { label: 'coth', value: 'coth' },
  ];

  const logarithmicFunctions = [
    { label: 'log₂', value: 'log₂' },
    { label: 'log₁₀', value: 'log₁₀' },
    { label: 'logₙ', value: 'logₙ' },
  ];

  const specialFunctions = [
    { label: 'n!', value: 'factorial' },
    { label: '|x|', value: 'abs' },
    { label: '⌊x⌋', value: 'floor' },
    { label: '⌈x⌉', value: 'ceil' },
    { label: 'γ(x)', value: 'gamma' },
    { label: 'gcd', value: 'gcd' },
  ];

  const combinatorics = [
    { label: 'ⁿCᵣ', value: 'nCr' },
    { label: 'ⁿPᵣ', value: 'nPr' },
  ];

  const constants = [
    { label: 'φ', value: 'phi' },
  ];

  const variables = ['x', 'y', 'z', 'n'];

  return (
    <div className="calc-dark-bg rounded-3xl p-8 shadow-2xl border border-gray-800">
      <h3 className="text-2xl font-bold calc-accent-text mb-8 tracking-wide">Advanced Functions</h3>
      
      {/* Trigonometric Functions */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold calc-text-muted mb-4 uppercase tracking-wider">Trigonometric</h4>
        <div className="grid grid-cols-2 gap-3">
          {trigFunctions.map((func) => (
            <Button
              key={func.value}
              className="calc-medium-bg calc-button calc-text p-3 rounded-xl text-sm font-medium hover:scale-105"
              onClick={() => onFunctionClick(func.value)}
            >
              {func.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Hyperbolic Functions */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold calc-text-muted mb-4 uppercase tracking-wider">Hyperbolic</h4>
        <div className="grid grid-cols-2 gap-3">
          {hyperbolicFunctions.map((func) => (
            <Button
              key={func.value}
              className="calc-medium-bg calc-button calc-text p-3 rounded-xl text-sm font-medium hover:scale-105"
              onClick={() => onFunctionClick(func.value)}
            >
              {func.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Logarithmic Functions */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold calc-text-muted mb-4 uppercase tracking-wider">Logarithmic</h4>
        <div className="grid grid-cols-1 gap-3">
          {logarithmicFunctions.map((func) => (
            <Button
              key={func.value}
              className="calc-medium-bg calc-button calc-text p-3 rounded-xl text-sm font-medium hover:scale-105"
              onClick={() => onFunctionClick(func.value)}
            >
              {func.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Special Functions */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold calc-text-muted mb-4 uppercase tracking-wider">Special</h4>
        <div className="grid grid-cols-2 gap-3">
          {specialFunctions.map((func) => (
            <Button
              key={func.value}
              className="calc-medium-bg calc-button calc-text p-3 rounded-xl text-sm font-medium hover:scale-105"
              onClick={() => onFunctionClick(func.value)}
            >
              {func.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Combinatorics */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold calc-text-muted mb-4 uppercase tracking-wider">Combinatorics</h4>
        <div className="grid grid-cols-1 gap-3">
          {combinatorics.map((func) => (
            <Button
              key={func.value}
              className="calc-gray-bg calc-button calc-text p-3 rounded-xl text-sm font-medium hover:scale-105"
              onClick={() => onFunctionClick(func.value)}
            >
              {func.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Constants */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold calc-text-muted mb-4 uppercase tracking-wider">Constants</h4>
        <div className="grid grid-cols-2 gap-3">
          {constants.map((constant) => (
            <Button
              key={constant.value}
              className="calc-light-gray-bg calc-button calc-text p-3 rounded-xl text-sm font-medium hover:scale-105"
              onClick={() => onFunctionClick(constant.value)}
            >
              {constant.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Variables */}
      <div>
        <h4 className="text-sm font-semibold calc-text-muted mb-4 uppercase tracking-wider">Variables</h4>
        <div className="grid grid-cols-2 gap-3">
          {variables.map((variable) => (
            <Button
              key={variable}
              className="calc-light-gray-bg calc-button calc-text p-3 rounded-xl text-sm font-semibold hover:scale-105"
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
