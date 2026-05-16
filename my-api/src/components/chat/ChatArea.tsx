'use client';

import React, { useState } from 'react';
import { ChatMessage } from '@/types/chat';
import { useTheme } from '@/context/ThemeContext';

interface ChatAreaProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
}

// Aplicando el Principio de Responsabilidad Única (SRP): Este componente solo gestiona la visualización del feed e input
export default function ChatArea({ messages, isLoading, onSendMessage }: ChatAreaProps) {
  const [input, setInput] = useState('');
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return; // Cláusula de Guarda / Early Return
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full justify-between bg-slate-50/50 dark:bg-slate-900 transition-colors duration-300">
      
      {/* HEADER PREMIUM - Oculto en móvil (hidden) y visible desde tablets/escritorios (md:flex) */}
      <header className="hidden md:flex h-14 border-b border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-950 px-6 items-center justify-between flex-none backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="font-bold text-sm tracking-tight text-slate-800 dark:text-slate-100">AgentHub AI Copilot</h2>
          <span className="text-[10px] bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded border border-slate-200/40 dark:border-slate-800/40 font-mono">
            Llama 3.3
          </span>
        </div>

        {/* BOTÓN INTERRUPTOR SOL / LUNA */}
        <button
          onClick={toggleTheme}
          aria-label="Cambiar tema visual"
          className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800/60 text-slate-600 dark:text-slate-300 transition-all duration-200 transform active:scale-95"
        >
          {theme === 'light' ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M6.343 6.343l.707-.707M14.25 12a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
          )}
        </button>
      </header>

      {/* FEED DE CONVERSACIÓN MINIMALISTA CON CAMBIO DE COLOR ADAPTABLE */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-4 rounded-xl text-sm leading-relaxed transition-all ${
              msg.role === 'user'
                ? 'bg-indigo-600 text-white shadow-sm font-medium rounded-br-none'
                : 'bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-800/50 shadow-sm rounded-bl-none'
            }`}>
              <p className="whitespace-pre-line">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" />
            Sintonizando respuesta logística...
          </div>
        )}
      </div>

      {/* BARRA DE ESCRITURA INTEGRADA (Siempre pegada al fondo de la vista) */}
      <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/60 flex gap-3 flex-none">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un comando o consulta de inventario..."
          className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg text-sm font-semibold tracking-wide shadow-sm transition-all duration-150 disabled:opacity-40"
          disabled={isLoading}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}