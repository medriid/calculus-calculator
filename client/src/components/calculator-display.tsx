import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { calculatorEngine, CalculationResult } from '@/lib/calculator';

interface CalculatorDisplayProps {
  onHistoryUpdate: (history: CalculationResult[]) => void;
}

export function CalculatorDisplay({ onHistoryUpdate }: CalculatorDisplayProps) {
  const [currentInput, setCurrentInput] = useState('');
  const [result, setResult] = useState('');
  const [isDerivativeMode, setIsDerivativeMode] = useState(false);
  const [isIntegralMode, setIsIntegralMode] = useState(false);

  const handleNumberClick = (number: string) => {
    setCurrentInput(prev => prev + number);
  };

  const handleOperatorClick = (operator: string) => {
    const operatorMap: Record<string, string> = {
      '×': '*',
      '÷': '/',
      '+': '+',
      '-': '-',
    };
    setCurrentInput(prev => prev + (operatorMap[operator] || operator));
  };

  const handleFunctionClick = (func: string) => {
    if (func === 'd/dx') {
      setIsDerivativeMode(true);
      setIsIntegralMode(false);
      setResult('Derivative mode - enter expression and press =');
      return;
    }
    
    if (func === '∫') {
      setIsIntegralMode(true);
      setIsDerivativeMode(false);
      setResult('Integral mode - enter expression and press =');
      return;
    }

    // Handle special functions
    const template = calculatorEngine.getFunctionTemplate(func);
    setCurrentInput(prev => prev + template);
  };

  const handleCalculate = () => {
    if (!currentInput.trim()) return;

    let calculationResult: CalculationResult;

    if (isDerivativeMode) {
      calculationResult = calculatorEngine.calculateDerivative(currentInput);
      setIsDerivativeMode(false);
    } else if (isIntegralMode) {
      calculationResult = calculatorEngine.calculateIntegral(currentInput);
      setIsIntegralMode(false);
    } else {
      calculationResult = calculatorEngine.evaluateExpression(currentInput);
    }

    setResult(calculationResult.result);
    onHistoryUpdate(calculatorEngine.getHistory());
  };

  const handleClear = () => {
    setCurrentInput('');
    setResult('');
    setIsDerivativeMode(false);
    setIsIntegralMode(false);
  };

  const handleBackspace = () => {
    setCurrentInput(prev => prev.slice(0, -1));
  };

  const handleDecimal = () => {
    setCurrentInput(prev => prev + '.');
  };

  const getModePrefix = () => {
    if (isDerivativeMode) return 'd/dx[';
    if (isIntegralMode) return '∫';
    return '';
  };

  const getModeSuffix = () => {
    if (isDerivativeMode) return ']';
    if (isIntegralMode) return ' dx';
    return '';
  };

  return (
    <div className="lg:col-span-2 calc-dark-bg rounded-2xl p-6 shadow-2xl">
      {/* Display Area */}
      <div className="mb-6">
        <div className="calc-bg rounded-xl p-4 min-h-[120px] border border-gray-700">
          <div className="text-sm calc-text-secondary mb-2">Input:</div>
          <div className="text-2xl font-mono mb-4 min-h-[32px] calc-text break-words">
            {getModePrefix()}{currentInput || 'Enter expression...'}{getModeSuffix()}
          </div>
          <div className="text-sm calc-text-secondary mb-2">Result:</div>
          <div className="text-3xl font-mono calc-accent-text break-words">
            {result || 'Ready for calculation'}
          </div>
        </div>
      </div>

      {/* Function Buttons Grid */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {/* Row 1: Advanced Functions */}
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={() => handleFunctionClick('d/dx')}
        >
          d/dx
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={() => handleFunctionClick('∫')}
        >
          ∫
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={() => handleFunctionClick('sin')}
        >
          sin
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={() => handleFunctionClick('cos')}
        >
          cos
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={() => handleFunctionClick('tan')}
        >
          tan
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={handleClear}
        >
          AC
        </Button>

        {/* Row 2: More Functions */}
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={() => handleFunctionClick('ln')}
        >
          ln
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={() => handleFunctionClick('log')}
        >
          log
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={() => handleFunctionClick('exp')}
        >
          exp
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={() => setCurrentInput(prev => prev + '^2')}
        >
          x²
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={() => setCurrentInput(prev => prev + '^3')}
        >
          x³
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={handleBackspace}
        >
          ⌫
        </Button>

        {/* Row 3: Additional Functions */}
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={() => handleFunctionClick('sqrt')}
        >
          √
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={() => handleFunctionClick('pi')}
        >
          π
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={() => handleFunctionClick('e')}
        >
          e
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={() => setCurrentInput(prev => prev + '(')}
        >
          (
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={() => setCurrentInput(prev => prev + ')')}
        >
          )
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-3 rounded-lg font-medium"
          onClick={() => handleOperatorClick('÷')}
        >
          ÷
        </Button>
      </div>

      {/* Number Pad and Basic Operations */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-4 rounded-lg text-xl font-medium"
          onClick={() => handleNumberClick('7')}
        >
          7
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-4 rounded-lg text-xl font-medium"
          onClick={() => handleNumberClick('8')}
        >
          8
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-4 rounded-lg text-xl font-medium"
          onClick={() => handleNumberClick('9')}
        >
          9
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-4 rounded-lg text-xl font-medium"
          onClick={() => handleOperatorClick('×')}
        >
          ×
        </Button>

        {/* Row 2 */}
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-4 rounded-lg text-xl font-medium"
          onClick={() => handleNumberClick('4')}
        >
          4
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-4 rounded-lg text-xl font-medium"
          onClick={() => handleNumberClick('5')}
        >
          5
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-4 rounded-lg text-xl font-medium"
          onClick={() => handleNumberClick('6')}
        >
          6
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-4 rounded-lg text-xl font-medium"
          onClick={() => handleOperatorClick('-')}
        >
          -
        </Button>

        {/* Row 3 */}
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-4 rounded-lg text-xl font-medium"
          onClick={() => handleNumberClick('1')}
        >
          1
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-4 rounded-lg text-xl font-medium"
          onClick={() => handleNumberClick('2')}
        >
          2
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-4 rounded-lg text-xl font-medium"
          onClick={() => handleNumberClick('3')}
        >
          3
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-4 rounded-lg text-xl font-medium"
          onClick={() => handleOperatorClick('+')}
        >
          +
        </Button>

        {/* Row 4 */}
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-4 rounded-lg text-xl font-medium col-span-2"
          onClick={() => handleNumberClick('0')}
        >
          0
        </Button>
        <Button 
          className="calc-gray-bg hover:calc-accent-bg hover:text-black calc-button calc-text p-4 rounded-lg text-xl font-medium"
          onClick={handleDecimal}
        >
          .
        </Button>
        <Button 
          className="calc-equals-button hover:bg-emerald-400 text-black p-4 rounded-lg text-xl font-bold transition-all duration-200"
          onClick={handleCalculate}
        >
          =
        </Button>
      </div>
    </div>
  );
}
