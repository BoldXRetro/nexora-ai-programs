export interface Product {
  id: number
  name: string
  description: string
  shortDescription: string
  price: number
  category: 'AI essentials' | 'Automation' | 'Development' | 'Creator & business'
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  lessons: number
  theme: 'peach' | 'sage' | 'ink' | 'sand' | 'blue' | 'rose'
  artwork: 'prompt' | 'workflow' | 'code'
  tag: string
  whopProductId: string
  whopUrl: string
  outcomes: string[]
  curriculum: { title: string; topics: string[] }[]
}

const products: Product[] = [
  {
    id: 1,
    name: 'AI Foundations',
    whopProductId: '',
    whopUrl: 'https://whop.com/nexora-build-smarter-with-ai/ai-foundations-bc/',
    price: 10,
    category: 'AI essentials',
    level: 'Beginner',
    duration: '2.5 hours',
    lessons: 12,
    theme: 'peach',
    artwork: 'prompt',
    tag: 'START HERE',
    shortDescription: 'Build a confident AI foundation and learn where these tools actually fit.',
    description: 'Get comfortable with modern AI tools, understand the basics behind them, and build a practical routine for using AI thoughtfully in everyday tasks.',
    outcomes: [
      'Understand the core ideas behind generative AI',
      'Choose the right AI approach for common tasks',
      'Build a simple, repeatable AI workflow',
    ],
    curriculum: [
      { title: 'The AI landscape', topics: ['Generative AI in plain language', 'Models, context, and limitations', 'Choosing the right tool'] },
      { title: 'Working with AI', topics: ['Instructions and context', 'Checking and improving outputs', 'Privacy and responsible use'] },
      { title: 'Your first AI system', topics: ['Reusable workflows', 'Personal productivity setup', 'Project: your AI starter system'] },
    ],
  },
  {
    id: 2,
    name: 'Prompt Systems',
    whopProductId: '',
    whopUrl: 'https://whop.com/nexora-build-smarter-with-ai/prompt-systems-3c/',
    price: 25,
    category: 'AI essentials',
    level: 'Beginner',
    duration: '4 hours',
    lessons: 18,
    theme: 'sage',
    artwork: 'prompt',
    tag: 'BETTER OUTPUTS',
    shortDescription: 'Turn random prompts into repeatable systems for better AI results.',
    description: 'Learn how to structure instructions, context, examples, constraints, and reusable templates so your AI conversations become more consistent and useful.',
    outcomes: [
      'Design prompts that produce predictable results',
      'Create reusable prompt templates for recurring work',
      'Evaluate and refine AI output systematically',
    ],
    curriculum: [
      { title: 'Prompt architecture', topics: ['Instructions and context', 'Examples and constraints', 'Output formats'] },
      { title: 'From prompt to system', topics: ['Prompt chains', 'Reusable templates', 'Testing different inputs'] },
      { title: 'Quality control', topics: ['Spotting weak outputs', 'Fact checking and source awareness', 'Project: your prompt library'] },
    ],
  },
  {
    id: 3,
    name: 'AI Productivity OS',
    whopProductId: '',
    whopUrl: 'https://whop.com/nexora-build-smarter-with-ai/ai-productivity-os-b3/',
    price: 50,
    category: 'AI essentials',
    level: 'Intermediate',
    duration: '5 hours',
    lessons: 22,
    theme: 'sand',
    artwork: 'workflow',
    tag: 'WORK SMARTER',
    shortDescription: 'Design an AI-powered work system for planning, research, writing, and execution.',
    description: 'Move from isolated AI tricks to a complete productivity system. Build repeatable workflows that support planning, research, communication, and decision-making.',
    outcomes: [
      'Build a practical AI workflow around your real tasks',
      'Speed up research, writing, and planning without losing judgment',
      'Create reusable systems for recurring work',
    ],
    curriculum: [
      { title: 'Map your work', topics: ['Finding high-value tasks', 'Workflow mapping', 'Where AI helps and where it does not'] },
      { title: 'Build the productivity layer', topics: ['Planning and prioritization', 'Research and synthesis', 'Writing and editing workflows'] },
      { title: 'Make it repeatable', topics: ['Templates and checklists', 'Quality controls', 'Project: your personal AI operating system'] },
    ],
  },
  {
    id: 4,
    name: 'Build AI Tools',
    whopProductId: '',
    whopUrl: 'https://whop.com/nexora-build-smarter-with-ai/build-ai-tools/',
    price: 100,
    category: 'Development',
    level: 'Intermediate',
    duration: '8 hours',
    lessons: 30,
    theme: 'ink',
    artwork: 'code',
    tag: 'BUILD & SHIP',
    shortDescription: 'Go from an idea to a useful AI-powered web tool with a clean development workflow.',
    description: 'Bring your JavaScript fundamentals and build a focused AI application. Learn the architecture, model integration, interface patterns, and deployment decisions that turn an idea into a working product.',
    outcomes: [
      'Connect an AI model to a web application securely',
      'Build useful interfaces around model capabilities',
      'Deploy a focused AI tool with sensible safeguards',
    ],
    curriculum: [
      { title: 'Plan the product', topics: ['Choosing a focused use case', 'Application architecture', 'Model and API decisions'] },
      { title: 'Build the core', topics: ['Server-side model calls', 'Streaming responses', 'Loading and error states'] },
      { title: 'Ship the tool', topics: ['Input validation', 'Usage safeguards', 'Project: deploy your AI tool'] },
    ],
  },
  {
    id: 5,
    name: 'AI Automation Lab',
    whopProductId: '',
    whopUrl: 'https://whop.com/nexora-build-smarter-with-ai/ai-automation-lab-10/',
    price: 200,
    category: 'Automation',
    level: 'Intermediate',
    duration: '9 hours',
    lessons: 34,
    theme: 'blue',
    artwork: 'workflow',
    tag: 'AUTOMATE',
    shortDescription: 'Design reliable AI automations that connect tools, data, decisions, and actions.',
    description: 'Go beyond simple automations. Learn how to map business processes, connect tools, add AI decision steps, and build workflows that remain useful when real-world inputs get messy.',
    outcomes: [
      'Turn a repeatable business process into an automation',
      'Connect AI steps with triggers, actions, and data',
      'Design review, error-handling, and monitoring into workflows',
    ],
    curriculum: [
      { title: 'Automation strategy', topics: ['Process discovery', 'Automation opportunities', 'Workflow architecture'] },
      { title: 'Build the workflow', topics: ['Triggers and actions', 'AI decision steps', 'Data handoffs'] },
      { title: 'Make automation reliable', topics: ['Human review', 'Error paths and retries', 'Project: an end-to-end AI workflow'] },
    ],
  },
  {
    id: 6,
    name: 'AI Business Systems',
    whopProductId: '',
    whopUrl: 'https://whop.com/nexora-build-smarter-with-ai/ai-business-systems-1b/',
    price: 500,
    category: 'Creator & business',
    level: 'Advanced',
    duration: '12 hours',
    lessons: 42,
    theme: 'rose',
    artwork: 'code',
    tag: 'GO FURTHER',
    shortDescription: 'Build an AI operating layer for content, research, customer work, and repeatable growth.',
    description: 'A deeper program for turning AI into a practical business capability. Design systems for content, research, customer workflows, internal knowledge, and repeatable execution.',
    outcomes: [
      'Identify high-leverage AI opportunities across a business',
      'Design connected systems instead of isolated AI tasks',
      'Create an implementation roadmap with measurable outcomes',
    ],
    curriculum: [
      { title: 'Find the leverage', topics: ['Business process mapping', 'Opportunity scoring', 'Risk and governance'] },
      { title: 'Design the AI stack', topics: ['Knowledge and context', 'Automation architecture', 'Human-in-the-loop systems'] },
      { title: 'Build the operating model', topics: ['Content and customer systems', 'Measurement and iteration', 'Project: your AI business roadmap'] },
    ],
  },
]

export default products
