export interface ChatMessage {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: string
  systemInstruction: string
}

export type FeatureId =
  | "knowledge-base"
  | "creative-writing"
  | "troubleshooting"
  | "inspiration-bot"
  | "code-assistant"
  | "math-solver"
