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
    if (isDerivativeMode) return (
      <span className="calc-text-secondary font-normal">
        <span className="text-lg">d</span>
        <span className="text-xs relative -top-1">/</span>
        <span className="text-lg">dx</span>
        <span className="text-xl">[</span>
      </span>
    );
    if (isIntegralMode) return (
      <span className="calc-text-secondary font-normal text-2xl">∫</span>
    );
    return '';
  };

  const getModeSuffix = () => {
    if (isDerivativeMode) return ']';
    if (isIntegralMode) return ' dx';
    return '';
  };

  return (
    <div className="lg:col-span-2 calc-dark-bg rounded-3xl p-8 shadow-2xl border border-gray-800">
      {/* Display Area */}
      <div className="mb-8">
        <div className="calc-display rounded-2xl p-6 min-h-[140px]">
          <div className="text-sm calc-text-muted mb-3 uppercase tracking-wide font-medium">Input</div>
          <div className="text-2xl font-mono mb-6 min-h-[36px] calc-text break-words leading-relaxed flex items-center">
            {getModePrefix()}
            <span>{currentInput || 'Enter expression...'}</span>
            <span className="calc-text-secondary">{getModeSuffix()}</span>
          </div>
          <div className="text-sm calc-text-muted mb-3 uppercase tracking-wide font-medium">Result</div>
          <div className="text-4xl font-mono calc-accent-text break-words leading-relaxed">
            {result || 'Ready for calculation'}
          </div>
        </div>
      </div>

      {/* Function Buttons Grid */}
      <div className="grid grid-cols-6 gap-4 mb-8">
        {/* Row 1: Advanced Functions */}
        <Button 
          className="calc-special-button calc-button calc-text p-4 rounded-xl font-medium text-sm hover:scale-105"
          onClick={() => handleFunctionClick('d/dx')}
        >
          <span className="flex items-center justify-center">
            <span className="text-base">d</span>
            <span className="text-xs mx-0.5">/</span>
            <span className="text-base">dx</span>
          </span>
        </Button>
        <Button 
          className="calc-special-button calc-button calc-text p-4 rounded-xl font-medium text-lg hover:scale-105"
          onClick={() => handleFunctionClick('∫')}
        >
          ∫
        </Button>
        <Button 
          className="calc-medium-bg calc-button calc-text p-4 rounded-xl font-medium hover:scale-105"
          onClick={() => handleFunctionClick('sin')}
        >
          sin
        </Button>
        <Button 
          className="calc-medium-bg calc-button calc-text p-4 rounded-xl font-medium hover:scale-105"
          onClick={() => handleFunctionClick('cos')}
        >
          cos
        </Button>
        <Button 
          className="calc-medium-bg calc-button calc-text p-4 rounded-xl font-medium hover:scale-105"
          onClick={() => handleFunctionClick('tan')}
        >
          tan
        </Button>
        <Button 
          className="calc-light-gray-bg calc-button calc-text p-4 rounded-xl font-semibold hover:scale-105"
          onClick={handleClear}
        >
          AC
        </Button>

        {/* Row 2: More Functions */}
        <Button 
          className="calc-medium-bg calc-button calc-text p-4 rounded-xl font-medium hover:scale-105"
          onClick={() => handleFunctionClick('ln')}
        >
          ln
        </Button>
        <Button 
          className="calc-medium-bg calc-button calc-text p-4 rounded-xl font-medium hover:scale-105"
          onClick={() => handleFunctionClick('log')}
        >
          log
        </Button>
        <Button 
          className="calc-medium-bg calc-button calc-text p-4 rounded-xl font-medium hover:scale-105"
          onClick={() => handleFunctionClick('exp')}
        >
          eˣ
        </Button>
        <Button 
          className="calc-medium-bg calc-button calc-text p-4 rounded-xl font-medium hover:scale-105"
          onClick={() => setCurrentInput(prev => prev + '^2')}
        >
          x²
        </Button>
        <Button 
          className="calc-medium-bg calc-button calc-text p-4 rounded-xl font-medium hover:scale-105"
          onClick={() => setCurrentInput(prev => prev + '^3')}
        >
          x³
        </Button>
        <Button 
          className="calc-light-gray-bg calc-button calc-text p-4 rounded-xl font-semibold text-lg hover:scale-105"
          onClick={handleBackspace}
        >
          ⌫
        </Button>

        {/* Row 3: Additional Functions */}
        <Button 
          className="calc-medium-bg calc-button calc-text p-4 rounded-xl font-medium hover:scale-105"
          onClick={() => handleFunctionClick('sqrt')}
        >
          √
        </Button>
        <Button 
          className="calc-medium-bg calc-button calc-text p-4 rounded-xl font-medium hover:scale-105"
          onClick={() => handleFunctionClick('pi')}
        >
          π
        </Button>
        <Button 
          className="calc-medium-bg calc-button calc-text p-4 rounded-xl font-medium hover:scale-105"
          onClick={() => handleFunctionClick('e')}
        >
          e
        </Button>
        <Button 
          className="calc-medium-bg calc-button calc-text p-4 rounded-xl font-semibold text-lg hover:scale-105"
          onClick={() => setCurrentInput(prev => prev + '(')}
        >
          (
        </Button>
        <Button 
          className="calc-medium-bg calc-button calc-text p-4 rounded-xl font-semibold text-lg hover:scale-105"
          onClick={() => setCurrentInput(prev => prev + ')')}
        >
          )
        </Button>
        <Button 
          className="calc-gray-bg calc-button calc-text p-4 rounded-xl font-semibold text-xl hover:scale-105"
          onClick={() => handleOperatorClick('÷')}
        >
          ÷
        </Button>
      </div>

      {/* Number Pad and Basic Operations */}
      <div className="grid grid-cols-4 gap-4">
        {/* Row 1 */}
        <Button 
          className="calc-dark-bg calc-button calc-text p-6 rounded-2xl text-2xl font-medium hover:scale-105"
          onClick={() => handleNumberClick('7')}
        >
          7
        </Button>
        <Button 
          className="calc-dark-bg calc-button calc-text p-6 rounded-2xl text-2xl font-medium hover:scale-105"
          onClick={() => handleNumberClick('8')}
        >
          8
        </Button>
        <Button 
          className="calc-dark-bg calc-button calc-text p-6 rounded-2xl text-2xl font-medium hover:scale-105"
          onClick={() => handleNumberClick('9')}
        >
          9
        </Button>
        <Button 
          className="calc-gray-bg calc-button calc-text p-6 rounded-2xl text-2xl font-semibold hover:scale-105"
          onClick={() => handleOperatorClick('×')}
        >
          ×
        </Button>

        {/* Row 2 */}
        <Button 
          className="calc-dark-bg calc-button calc-text p-6 rounded-2xl text-2xl font-medium hover:scale-105"
          onClick={() => handleNumberClick('4')}
        >
          4
        </Button>
        <Button 
          className="calc-dark-bg calc-button calc-text p-6 rounded-2xl text-2xl font-medium hover:scale-105"
          onClick={() => handleNumberClick('5')}
        >
          5
        </Button>
        <Button 
          className="calc-dark-bg calc-button calc-text p-6 rounded-2xl text-2xl font-medium hover:scale-105"
          onClick={() => handleNumberClick('6')}
        >
          6
        </Button>
        <Button 
          className="calc-gray-bg calc-button calc-text p-6 rounded-2xl text-2xl font-semibold hover:scale-105"
          onClick={() => handleOperatorClick('-')}
        >
          -
        </Button>

        {/* Row 3 */}
        <Button 
          className="calc-dark-bg calc-button calc-text p-6 rounded-2xl text-2xl font-medium hover:scale-105"
          onClick={() => handleNumberClick('1')}
        >
          1
        </Button>
        <Button 
          className="calc-dark-bg calc-button calc-text p-6 rounded-2xl text-2xl font-medium hover:scale-105"
          onClick={() => handleNumberClick('2')}
        >
          2
        </Button>
        <Button 
          className="calc-dark-bg calc-button calc-text p-6 rounded-2xl text-2xl font-medium hover:scale-105"
          onClick={() => handleNumberClick('3')}
        >
          3
        </Button>
        <Button 
          className="calc-gray-bg calc-button calc-text p-6 rounded-2xl text-2xl font-semibold hover:scale-105"
          onClick={() => handleOperatorClick('+')}
        >
          +
        </Button>

        {/* Row 4 */}
        <Button 
          className="calc-dark-bg calc-button calc-text p-6 rounded-2xl text-2xl font-medium col-span-2 hover:scale-105"
          onClick={() => handleNumberClick('0')}
        >
          0
        </Button>
        <Button 
          className="calc-dark-bg calc-button calc-text p-6 rounded-2xl text-2xl font-medium hover:scale-105"
          onClick={handleDecimal}
        >
          .
        </Button>
        <Button 
          className="calc-equals-button text-black p-6 rounded-2xl text-2xl font-bold transition-all duration-200 hover:scale-105"
          onClick={handleCalculate}
        >
          =
        </Button>
      </div>
    </div>
  );
}
