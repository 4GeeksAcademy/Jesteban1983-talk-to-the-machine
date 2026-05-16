'use client';

import React from 'react';
import { ChatUsage } from '@/types/chat';

interface MetricsSidebarProps {
  usage: ChatUsage;
}

export default function MetricsSidebar({ usage }: MetricsSidebarProps) {
  const estimatedCost = (usage.totalTokens * 0.00000015).toFixed(5);

  return (
    <div className="p-6 flex flex-col h-full justify-between bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="space-y-6">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Diagnóstico de Sesión</h3>
        
        <div className="space-y-4">
          {/* CARD PROMPT TOKENS */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/40 transition-colors">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Prompt Tokens</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{usage.promptTokens}</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-slate-700 dark:bg-slate-400 h-full transition-all duration-500" style={{ width: `${Math.min((usage.promptTokens / 1000) * 100, 100)}%` }}></div>
            </div>
          </div>

          {/* CARD COMPLETION TOKENS */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/40 transition-colors">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Completion Tokens</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{usage.completionTokens}</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full transition-all duration-500" style={{ width: `${Math.min((usage.completionTokens / 500) * 100, 100)}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* CARD ACUMULADO GLOBAL (Mantiene su esencia oscura premium) */}
      <div className="p-5 bg-slate-900 dark:bg-slate-900/40 text-white rounded-xl space-y-2 border border-transparent dark:border-slate-800/60 shadow-md">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Total Tokens Acumulados</p>
        <p className="text-3xl font-mono font-bold text-emerald-400">{usage.totalTokens.toLocaleString()}</p>
        <div className="pt-2 border-t border-slate-800 flex justify-between text-xs text-slate-400">
          <span>Costo Estimado (USD):</span>
          <span className="font-mono text-slate-200">${estimatedCost}</span>
        </div>
      </div>
    </div>
  );
}