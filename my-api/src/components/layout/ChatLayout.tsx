'use client';

import React, { useState } from 'react';

interface ChatLayoutProps {
  historySlot: React.ReactNode;
  chatAreaSlot: React.ReactNode;
  metricsSlot: React.ReactNode;
}

export default function ChatLayout({ historySlot, chatAreaSlot, metricsSlot }: ChatLayoutProps) {
  // Booleanos interrogativos siguiendo los estándares de código de nuestra guía
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isMetricsOpen, setIsMetricsOpen] = useState<boolean>(false);

  return (
    <div className="relative grid h-screen w-screen overflow-hidden grid-cols-1 md:grid-cols-[250px_1fr_320px] bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      
      {/* HEADER DE NAVEGACIÓN MÓVIL (Solo visible en pantallas pequeñas) */}
      <div className="md:hidden h-14 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/60 px-4 flex items-center justify-between absolute top-0 left-0 right-0 z-40 backdrop-blur-md">
        <button 
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/40 dark:border-slate-800/40"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 font-mono">AgentHub</span>
        <button 
          onClick={() => setIsMetricsOpen(!isMetricsOpen)}
          className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/40 dark:border-slate-800/40"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        </button>
      </div>

      {/* COLUMNA 1: HISTORIAL (Drawer absoluto en móvil, estante fijo en desktop) */}
      <aside className={`
        fixed md:static inset-y-0 left-0 w-[250px] bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800/60 z-50 flex flex-col overflow-hidden transition-transform duration-300 ease-in-out
        ${isHistoryOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {historySlot}
        <button onClick={() => setIsHistoryOpen(false)} className="md:hidden absolute top-4 right-4 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-400 p-1.5 rounded-md">✕</button>
      </aside>

      {/* COLUMNA 2: ÁREA CENTRAL (Añade margen superior de 14 unidades en móvil para no taparse con la barra) */}
      <main className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 overflow-hidden pt-14 md:pt-0 transition-all">
        {chatAreaSlot}
      </main>

      {/* COLUMNA 3: DIAGNÓSTICOS (Drawer absoluto desde la derecha en móvil, fijo en desktop) */}
      <aside className={`
        fixed md:static inset-y-0 right-0 w-[320px] bg-white dark:bg-slate-950 border-l border-slate-200/60 dark:border-slate-800/60 z-50 flex flex-col overflow-hidden transition-transform duration-300 ease-in-out
        ${isMetricsOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        {metricsSlot}
        <button onClick={() => setIsMetricsOpen(false)} className="md:hidden absolute top-4 left-4 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-400 p-1.5 rounded-md">✕</button>
      </aside>

      {/* CAPA DE OSCURECIMIENTO (Fondo borroso protector para cerrar drawers al tocar fuera) */}
      {(isHistoryOpen || isMetricsOpen) && (
        <div 
          onClick={() => { setIsHistoryOpen(false); setIsMetricsOpen(false); }}
          className="md:hidden fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40 transition-opacity duration-300"
        />
      )}

    </div>
  );
}