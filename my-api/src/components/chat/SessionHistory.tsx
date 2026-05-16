'use client';

import React from 'react';

interface SessionHistoryProps {
  onNewSession?: () => void;
}

export default function SessionHistory({ onNewSession }: SessionHistoryProps) {
  const mockSessions = [
    { id: '1', title: 'Supplier SKU Discrepancy', code: 'REQ-8942-B', active: true },
    { id: '2', title: 'Stock Level Audit Llama 3', code: 'AUD-1029-X', active: false },
    { id: '3', title: 'Inbound Freight Delay', code: 'FRT-4401-Y', active: false },
    { id: '4', title: 'Route Optimization Q3', code: 'RTE-0092-Z', active: false },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-900 justify-between transition-colors duration-300">
      
      <div className="p-4 flex-none">
        <button
          onClick={onNewSession}
          className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold text-sm py-2 px-4 rounded-lg transition-all shadow-sm"
        >
          + New Session
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
        <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 px-2 mb-2">Recent Sessions</p>
        
        {mockSessions.map((session) => (
          <button
            key={session.id}
            className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
              session.active
                ? 'bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 shadow-sm font-bold text-slate-900 dark:text-slate-100'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <div className="truncate">{session.title}</div>
            <div className={`text-[10px] font-mono mt-0.5 ${session.active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>
              {session.code}
            </div>
          </button>
        ))}
      </div>

      {/* TARJETA DE PERFIL TOTALMENTE ADAPTABLE */}
      <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between flex-none transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
            JM
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">J. Miller</p>
            <p className="text-[9px] font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              Operator
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}