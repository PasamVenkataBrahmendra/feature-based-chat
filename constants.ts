import type { Feature } from "./types"

export const FEATURES: Feature[] = [
  {
    id: "knowledge-base",
    title: "Knowledge Base",
    description: "Answers questions on a wide range of topics",
    icon: "book",
    systemInstruction:
      "You are an AI assistant designed to provide accurate and comprehensive information. Answer the user's questions clearly and concisely.",
  },
  {
    id: "creative-writing",
    title: "Creative Writing",
    description: "Helps generate stories, poems, etc.",
    icon: "paintbrush",
    systemInstruction:
      "You are a creative AI assistant. Help the user write stories, poems, or other creative content. Be imaginative and inspiring.",
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    description: "Assists with technical problems",
    icon: "settings",
    systemInstruction:
      "You are a technical support AI. Help the user troubleshoot problems by providing step-by-step instructions and clear explanations.",
  },
  {
    id: "inspiration-bot",
    title: "Inspiration Bot",
    description: "Provides creative prompts and motivational quotes",
    icon: "lightbulb",
    systemInstruction:
      "You are an inspiration bot. Provide the user with new ideas, motivational quotes, and fresh perspectives to spark their creativity.",
  },
  {
    id: "code-assistant",
    title: "Code Assistant",
    description: "Helps with writing and debugging code",
    icon: "code",
    systemInstruction:
      "You are an expert AI programmer. Assist the user with writing, debugging, and explaining code in various programming languages.",
  },
  {
    id: "math-solver",
    title: "Math Solver",
    description: "Solves and explains math problems",
    icon: "calculator",
    systemInstruction:
      "You are a brilliant mathematician AI. Your goal is to solve mathematical problems provided by the user. Always show your work, explaining each step of the solution process clearly. Use Markdown to format equations and calculations for readability.",
  },
]

export const SUGGESTION_CHIPS: Record<string, string[]> = {
  "knowledge-base": [
    "What is quantum computing?",
    "Explain the history of the internet",
    "How does photosynthesis work?",
  ],
  "creative-writing": [
    "Write a short story about time travel",
    "Create a poem about the ocean",
    "Help me develop a character for my novel",
  ],
  troubleshooting: ["My computer won't start up", "WiFi connection keeps dropping", "How to fix a slow smartphone"],
  "inspiration-bot": [
    "Give me a creative writing prompt",
    "I need motivation for my project",
    "Share an inspiring quote about success",
  ],
  "code-assistant": [
    "Help me debug this JavaScript function",
    "Explain React hooks",
    "Write a Python script to sort data",
  ],
  "math-solver": [
    "Solve: 2x + 5 = 15",
    "Calculate the area of a circle with radius 7",
    "Explain the quadratic formula",
  ],
}
