import { create, all, MathJsStatic } from 'mathjs';

// Create a mathjs instance with all functions
const math = create(all) as MathJsStatic;

export interface CalculationResult {
  input: string;
  result: string;
  type: 'basic' | 'derivative' | 'integral' | 'error';
  timestamp: number;
}

export class CalculatorEngine {
  private history: CalculationResult[] = [];

  constructor() {
    // Configure math.js for better expression handling
    math.config({
      number: 'BigNumber',
      precision: 64
    });
  }

  evaluateExpression(expression: string): CalculationResult {
    try {
      // Clean up the expression
      const cleanExpression = this.preprocessExpression(expression);
      
      // Evaluate the expression
      const result = math.evaluate(cleanExpression);
      
      const calculationResult: CalculationResult = {
        input: expression,
        result: this.formatResult(result),
        type: 'basic',
        timestamp: Date.now()
      };

      this.addToHistory(calculationResult);
      return calculationResult;
    } catch (error) {
      const errorResult: CalculationResult = {
        input: expression,
        result: `Error: ${error instanceof Error ? error.message : 'Invalid expression'}`,
        type: 'error',
        timestamp: Date.now()
      };

      this.addToHistory(errorResult);
      return errorResult;
    }
  }

  calculateDerivative(expression: string, variable: string = 'x'): CalculationResult {
    try {
      // Parse the expression
      const expr = math.parse(expression);
      
      // Calculate derivative
      const derivative = math.derivative(expr, variable);
      
      const calculationResult: CalculationResult = {
        input: `d/d${variable}[${expression}]`,
        result: derivative.toString(),
        type: 'derivative',
        timestamp: Date.now()
      };

      this.addToHistory(calculationResult);
      return calculationResult;
    } catch (error) {
      const errorResult: CalculationResult = {
        input: `d/d${variable}[${expression}]`,
        result: `Error: ${error instanceof Error ? error.message : 'Cannot compute derivative'}`,
        type: 'error',
        timestamp: Date.now()
      };

      this.addToHistory(errorResult);
      return errorResult;
    }
  }

  calculateIntegral(expression: string, variable: string = 'x'): CalculationResult {
    try {
      // For indefinite integrals, we'll use symbolic integration
      // Note: mathjs doesn't have built-in symbolic integration, so we'll handle common cases
      const result = this.symbolicIntegration(expression, variable);
      
      const calculationResult: CalculationResult = {
        input: `∫${expression} d${variable}`,
        result: result,
        type: 'integral',
        timestamp: Date.now()
      };

      this.addToHistory(calculationResult);
      return calculationResult;
    } catch (error) {
      const errorResult: CalculationResult = {
        input: `∫${expression} d${variable}`,
        result: `Error: ${error instanceof Error ? error.message : 'Cannot compute integral'}`,
        type: 'error',
        timestamp: Date.now()
      };

      this.addToHistory(errorResult);
      return errorResult;
    }
  }

  private symbolicIntegration(expression: string, variable: string): string {
    // Basic symbolic integration for common functions
    const expr = expression.toLowerCase().trim();
    
    // Power rule: x^n -> x^(n+1)/(n+1)
    if (expr === variable) {
      return `${variable}²/2 + C`;
    }
    if (expr === `${variable}^2` || expr === `${variable}²`) {
      return `${variable}³/3 + C`;
    }
    if (expr === `${variable}^3` || expr === `${variable}³`) {
      return `${variable}⁴/4 + C`;
    }
    
    // Trigonometric functions
    if (expr === `sin(${variable})`) {
      return `-cos(${variable}) + C`;
    }
    if (expr === `cos(${variable})`) {
      return `sin(${variable}) + C`;
    }
    if (expr === `tan(${variable})`) {
      return `-ln|cos(${variable})| + C`;
    }
    
    // Exponential and logarithmic
    if (expr === `e^${variable}` || expr === `exp(${variable})`) {
      return `e^${variable} + C`;
    }
    if (expr === `ln(${variable})`) {
      return `${variable}*ln(${variable}) - ${variable} + C`;
    }
    if (expr === `1/${variable}`) {
      return `ln|${variable}| + C`;
    }
    
    // Linear combinations
    const match = expr.match(/^(\d+)\*?(.+)$/);
    if (match) {
      const coefficient = match[1];
      const function_part = match[2];
      const integrated = this.symbolicIntegration(function_part, variable);
      if (!integrated.includes('Error')) {
        return integrated.replace('+ C', `*${coefficient} + C`);
      }
    }
    
    return `∫${expression} d${variable} (symbolic integration not available for this function)`;
  }

  private preprocessExpression(expression: string): string {
    let processed = expression;
    
    // Replace mathematical symbols with mathjs equivalents
    processed = processed.replace(/×/g, '*');
    processed = processed.replace(/÷/g, '/');
    processed = processed.replace(/π/g, 'pi');
    processed = processed.replace(/√/g, 'sqrt');
    processed = processed.replace(/²/g, '^2');
    processed = processed.replace(/³/g, '^3');
    processed = processed.replace(/⁴/g, '^4');
    processed = processed.replace(/⁵/g, '^5');
    
    // Handle implicit multiplication
    processed = processed.replace(/(\d+)([a-zA-Z])/g, '$1*$2');
    processed = processed.replace(/([a-zA-Z])(\d+)/g, '$1*$2');
    processed = processed.replace(/\)(\d+)/g, ')*$1');
    processed = processed.replace(/(\d+)\(/g, '$1*(');
    
    return processed;
  }

  private formatResult(result: any): string {
    if (typeof result === 'number') {
      if (Math.abs(result) < 1e-10) return '0';
      if (Math.abs(result) > 1e10) return result.toExponential(6);
      return result.toString();
    }
    
    if (result && typeof result.toString === 'function') {
      return result.toString();
    }
    
    return String(result);
  }

  private addToHistory(result: CalculationResult): void {
    this.history.unshift(result);
    // Keep only the last 50 calculations
    if (this.history.length > 50) {
      this.history = this.history.slice(0, 50);
    }
  }

  getHistory(): CalculationResult[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
  }

  // Mathematical function helpers
  getFunctionTemplate(func: string): string {
    const templates: Record<string, string> = {
      // Basic trigonometric
      'sin': 'sin(',
      'cos': 'cos(',
      'tan': 'tan(',
      'sec': '1/cos(',
      'csc': '1/sin(',
      'cot': '1/tan(',
      
      // Inverse trigonometric
      'arcsin': 'asin(',
      'arccos': 'acos(',
      'arctan': 'atan(',
      'arcsec': 'asec(',
      'arccsc': 'acsc(',
      'arccot': 'acot(',
      
      // Hyperbolic
      'sinh': 'sinh(',
      'cosh': 'cosh(',
      'tanh': 'tanh(',
      'sech': '1/cosh(',
      'csch': '1/sinh(',
      'coth': '1/tanh(',
      
      // Logarithmic
      'ln': 'ln(',
      'log': 'log10(',
      'log₂': 'log2(',
      'log₁₀': 'log10(',
      'logₙ': 'log(',
      
      // Exponential
      'exp': 'exp(',
      'e^x': 'exp(',
      
      // Power and roots
      'sqrt': 'sqrt(',
      'cbrt': 'cbrt(',
      'nthRoot': 'nthRoot(',
      
      // Other functions
      'abs': 'abs(',
      'floor': 'floor(',
      'ceil': 'ceil(',
      'round': 'round(',
      'sign': 'sign(',
      'factorial': '!',
      'gamma': 'gamma(',
      
      // Constants
      'pi': 'pi',
      'e': 'e',
      'phi': '1.618033988749', // Golden ratio
      
      // Statistical
      'nCr': 'combinations(',
      'nPr': 'permutations(',
      'gcd': 'gcd(',
      'lcm': 'lcm(',
    };
    
    return templates[func] || func;
  }
}

export const calculatorEngine = new CalculatorEngine();
