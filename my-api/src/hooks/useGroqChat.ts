'use client';

import { useState, useEffect } from 'react';
import { ChatMessage, ChatUsage } from '@/types/chat';
import { sendChatHistory } from '@/services/chat.service';

export function useGroqChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usage, setUsage] = useState<ChatUsage>({ promptTokens: 0, completionTokens: 0, totalTokens: 0 });

  // Sincronización inicial con el almacenamiento local (Persistencia)
  useEffect(() => {
    const savedChat = localStorage.getItem('agenthub_session_chat');
    const savedUsage = localStorage.getItem('agenthub_session_usage');
    if (savedChat) setMessages(JSON.parse(savedChat));
    if (savedUsage) setUsage(JSON.parse(savedUsage));
  }, []);

  const executeSessionUpdate = (newMessages: ChatMessage[], newUsage: ChatUsage) => {
    setMessages(newMessages);
    setUsage(newUsage);
    localStorage.setItem('agenthub_session_chat', JSON.stringify(newMessages));
    localStorage.setItem('agenthub_session_usage', JSON.stringify(newUsage));
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return; // Cláusula de guarda (Early Return)

    const updatedMessages: ChatMessage[] = [...messages, { role: 'user', content }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const data = await sendChatHistory(updatedMessages);
      const accumulatedUsage: ChatUsage = {
        promptTokens: usage.promptTokens + data.usage.prompt_tokens,
        completionTokens: usage.completionTokens + data.usage.completion_tokens,
        totalTokens: usage.totalTokens + data.usage.total_tokens,
      };
      executeSessionUpdate([...updatedMessages, data.choices[0].message], accumulatedUsage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, usage, isLoading, sendMessage };
}