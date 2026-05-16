'use client';

import React from 'react';
import ChatLayout from '@/components/layout/ChatLayout';
import SessionHistory from '@/components/chat/SessionHistory'; // Importación limpia
import ChatArea from '@/components/chat/ChatArea';
import MetricsSidebar from '@/components/chat/MetricsSidebar';
import { useGroqChat } from '@/hooks/useGroqChat';

export default function HomePage() {
  const { messages, usage, isLoading, sendMessage } = useGroqChat();

  // Función para resetear la sesión (Vinculada al botón + New Session)
  const handleResetSession = () => {
    localStorage.removeItem('agenthub_session_chat');
    localStorage.removeItem('agenthub_session_usage');
    window.location.reload(); // Recarga limpia para vaciar los estados del hook
  };

  return (
    <ChatLayout
      historySlot={
        <SessionHistory onNewSession={handleResetSession} />
      }
      chatAreaSlot={
        <ChatArea messages={messages} isLoading={isLoading} onSendMessage={sendMessage} />
      }
      metricsSlot={
        <MetricsSidebar usage={usage} />
      }
    />
  );
}