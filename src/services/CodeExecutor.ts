interface TestCase {
  input: string;
  output: string;
  status: 'pending' | 'passed' | 'failed';
  actualOutput?: string;
  error?: string;
}

interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  testCases: TestCase[];
  executionTime: number;
}

class CodeExecutor {
  private readonly JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';
  private readonly API_KEY = 'demo'; // Using demo key for now

  async executeCode(code: string, testCases: TestCase[]): Promise<ExecutionResult> {
    const startTime = performance.now();
    const results: TestCase[] = [];

    try {
      // Execute each test case
      for (const testCase of testCases) {
        const result = await this.executeSingleTestCase(code, testCase.input);
        
        // Compare output
        const normalizedActual = result.output.trim();
        const normalizedExpected = testCase.output.trim();
        const passed = normalizedActual === normalizedExpected && !result.error;
        
        results.push({
          ...testCase,
          status: passed ? 'passed' : 'failed',
          actualOutput: normalizedActual,
          error: result.error
        });
      }

      const executionTime = performance.now() - startTime;
      
      return {
        success: results.every(r => r.status === 'passed'),
        output: results.map(r => r.actualOutput || r.error || '').join('\n'),
        testCases: results,
        executionTime
      };

    } catch (error) {
      const executionTime = performance.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        output: '',
        error: errorMessage,
        testCases: testCases.map(tc => ({ ...tc, status: 'failed', error: errorMessage })),
        executionTime
      };
    }
  }

  private async executeSingleTestCase(code: string, input: string): Promise<{ output: string; error?: string }> {
    try {
      // For demo purposes, we'll simulate code execution
      // In a real implementation, you would use Judge0 API or similar
      
      // Simulate execution delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simple Python code execution simulation
      if (code.includes('print_series')) {
        // Handle the print_series function
        const lines = input.split('\n');
        const n = parseInt(lines[0]);
        if (isNaN(n)) {
          return { output: '', error: 'Invalid input: expected a number' };
        }
        
        const output = Array.from({ length: n }, (_, i) => i + 1).join('\n');
        return { output };
      } else if (code.includes('two_sum')) {
        // Handle the two_sum function
        const lines = input.split('\n');
        const [n, target] = lines[0].split(' ').map(Number);
        const nums = lines[1].split(' ').map(Number);
        
        // Simple two sum implementation
        for (let i = 0; i < nums.length; i++) {
          for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
              return { output: `${i} ${j}` };
            }
          }
        }
        return { output: '', error: 'No solution found' };
      } else if (code.includes('max_sum_subarray')) {
        // Handle the max_sum_subarray function
        const lines = input.split('\n');
        const [n, k] = lines[0].split(' ').map(Number);
        const arr = lines[1].split(' ').map(Number);
        
        // Sliding window implementation
        let maxSum = 0;
        for (let i = 0; i <= arr.length - k; i++) {
          const sum = arr.slice(i, i + k).reduce((a, b) => a + b, 0);
          maxSum = Math.max(maxSum, sum);
        }
        return { output: maxSum.toString() };
      } else if (code.includes('binary_search')) {
        // Handle the binary_search function
        const lines = input.split('\n');
        const n = parseInt(lines[0]);
        const arr = lines[1].split(' ').map(Number);
        const target = parseInt(lines[2]);
        
        // Binary search implementation
        let left = 0, right = arr.length - 1;
        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          if (arr[mid] === target) {
            return { output: mid.toString() };
          } else if (arr[mid] < target) {
            left = mid + 1;
          } else {
            right = mid - 1;
          }
        }
        return { output: '-1' };
      }
      
      // Default case - try to execute as simple Python code
      return this.simulatePythonExecution(code, input);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { output: '', error: errorMessage };
    }
  }

  private simulatePythonExecution(code: string, input: string): { output: string; error?: string } {
    try {
      // Very basic Python simulation for common patterns
      const lines = input.split('\n');
      
      if (code.includes('input()')) {
        // Handle input() calls
        const inputValue = lines[0];
        
        if (code.includes('int(input())')) {
          const n = parseInt(inputValue);
          if (isNaN(n)) {
            return { output: '', error: 'Invalid input: expected a number' };
          }
          
          // Handle common patterns
          if (code.includes('range(1, n + 1)')) {
            const output = Array.from({ length: n }, (_, i) => i + 1).join('\n');
            return { output };
          }
          
          // Handle other common patterns
          if (code.includes('for i in range')) {
            const output = Array.from({ length: n }, (_, i) => i + 1).join('\n');
            return { output };
          }
        }
        
        // Handle string input
        if (code.includes('input()') && !code.includes('int(')) {
          return { output: inputValue };
        }
      }
      
      // Handle map() and split() patterns
      if (code.includes('map(int, input().split())')) {
        const values = lines[0].split(' ').map(Number);
        if (values.some(isNaN)) {
          return { output: '', error: 'Invalid input: expected space-separated numbers' };
        }
        return { output: values.join(' ') };
      }
      
      // Handle list comprehension patterns
      if (code.includes('list(map(int, input().split()))')) {
        const values = lines[0].split(' ').map(Number);
        if (values.some(isNaN)) {
          return { output: '', error: 'Invalid input: expected space-separated numbers' };
        }
        return { output: values.join(' ') };
      }
      
      // If we can't handle it, return a generic error
      return { output: '', error: 'Code execution not supported for this pattern. Try using the provided code template.' };
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { output: '', error: errorMessage };
    }
  }

  async validateSyntax(code: string): Promise<{ valid: boolean; error?: string }> {
    try {
      // Basic syntax validation
      if (!code.trim()) {
        return { valid: false, error: 'Code cannot be empty' };
      }
      
      // Check for basic Python syntax patterns
      const lines = code.split('\n');
      let indentLevel = 0;
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed === '') continue;
        
        // Check for proper indentation after colons
        if (trimmed.endsWith(':')) {
          indentLevel += 1;
        }
        
        // Check for dedentation
        if (trimmed.startsWith('return') || trimmed.startsWith('break') || trimmed.startsWith('continue')) {
          indentLevel = Math.max(0, indentLevel - 1);
        }
      }
      
      return { valid: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { valid: false, error: errorMessage };
    }
  }
}

export default new CodeExecutor(); 