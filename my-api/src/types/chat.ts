// Estándar PascalCase estricto sin prefijos como "IChatMessage"
export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

export interface ChatUsage {
  promptTokens: number;      // Convertido a camelCase descriptivo
  completionTokens: number;  // Convertido a camelCase descriptivo
  totalTokens: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  usage: ChatUsage;
  model: string;
  createdAt: string;
}