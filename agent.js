import { Agent, run } from '@openai/agents';
import { z } from 'zod';

let mathAgent = null;

const MathSolution = z.object({
  problem: z.string().describe("The original math problem from OCR"),
  solution: z.string().describe("Step-by-step solution explanation"),
  latexResult: z.string().describe("The final answer in LaTeX format"),
  steps: z.array(z.string()).describe("Array of solution steps"),
  finalAnswer: z.string().describe("The final numerical or symbolic answer")
});

const initializeAgent = () => {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }
  
  if (!mathAgent) {
    // Set the default key
    import('@openai/agents').then(({ setDefaultOpenAIKey }) => {
      setDefaultOpenAIKey(OPENAI_API_KEY);
    });
    
    mathAgent = new Agent({
      name: 'MathSolver',
      instructions: `You are a math tutor and problem solver. When given a math problem:
      1. First, understand the problem clearly
      2. Break it down into logical steps
      3. Solve each step methodically
      4. Provide the final answer in both regular text and LaTeX format
      5. Use clear, educational language for each step
      6. If the problem involves equations, show the LaTeX representation
      7. Always verify your solution makes mathematical sense`,
      model: "gpt-4o",
      outputType: MathSolution,
      apiKey: OPENAI_API_KEY,
    });

    mathAgent.on('agent_start', (ctx, agent) => {
      console.log(`[${agent.name}] started solving math problem`);
    });

    mathAgent.on('agent_end', (ctx, output) => {
      console.log(`produced solution:`, output);
    });
  }
  
  return mathAgent;
};

export const solveMathProblem = async (problemText) => {
  try {
    const agent = initializeAgent();
    
    const prompt = `Please solve this math problem step by step: ${problemText}
    
    Provide:
    1. A clear step-by-step solution
    2. The final answer in LaTeX format
    3. Each step explained clearly
    4. The final numerical or symbolic result`;
    
    const result = await run(agent, prompt);
    return result.finalOutput;
  } catch (error) {
    console.error('Error solving math problem:', error);
    throw new Error('Failed to solve math problem');
  }
};

export default mathAgent;