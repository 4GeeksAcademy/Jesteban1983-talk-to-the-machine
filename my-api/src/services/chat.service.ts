import { ChatMessage } from '@/types/chat';

// Cumple con el patrón Verbo + Sustantivo en camelCase de nuestra guía
export async function sendChatHistory(messages: ChatMessage[]) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) throw new Error('Error en la comunicación con el servidor de IA.'); // Cláusula de guarda
  return response.json();
}