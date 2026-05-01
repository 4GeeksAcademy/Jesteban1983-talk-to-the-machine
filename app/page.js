'use client';

import { useState, useRef, useEffect } from 'react';

const SYSTEM_MESSAGE = {
  role: 'system',
  content: 'Eres un asistente útil. Siempre responde en español.'
};

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [stats, setStats] = useState({
    total: 0, prompt: 0, completion: 0, responseMs: '—', model: '—'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);
    setError('');
    const start = Date.now();
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [SYSTEM_MESSAGE, ...updatedMessages]
        })
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(`Error ${response.status}: ${err.error?.message}`);
      }
      const data = await response.json();
      const assistantText = data.choices[0].message.content;
      setMessages([...updatedMessages, { role: 'assistant', content: assistantText }]);
      setStats(prev => ({
        total: prev.total + data.usage.total_tokens,
        prompt: prev.prompt + data.usage.prompt_tokens,
        completion: prev.completion + data.usage.completion_tokens,
        responseMs: Date.now() - start,
        model: data.model
      }));
    } catch (err) {
      setError('⚠️ ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f0f2f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

        .layout { display: flex; height: 100vh; }

        /* SIDEBAR */
        .sidebar {
          width: 240px; min-width: 240px;
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
          padding: 24px 16px;
          display: flex; flex-direction: column; gap: 24px;
        }
        .sidebar-title {
          font-size: 11px; font-weight: 700; color: #9ca3af;
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .stat-block { display: flex; flex-direction: column; gap: 10px; }
        .stat-block-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; color: #374151;
        }
        .stat-row {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 13px; color: #6b7280;
          padding: 4px 0; border-bottom: 1px solid #f3f4f6;
        }
        .stat-value { font-weight: 700; color: #111827; font-variant-numeric: tabular-nums; }
        .model-badge {
          background: #eff6ff; color: #2563eb;
          padding: 4px 10px; border-radius: 20px;
          font-size: 11px; font-weight: 600;
          word-break: break-all;
        }
        .divider { height: 1px; background: #f3f4f6; }

        /* CHAT PANEL */
        .chat-panel { flex: 1; display: flex; flex-direction: column; min-width: 0; }

        .chat-header {
          padding: 16px 24px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          font-size: 16px; font-weight: 700; color: #111827;
          display: flex; align-items: center; gap: 8px;
        }
        .online-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #22c55e;
        }

        .messages {
          flex: 1; overflow-y: auto; padding: 24px;
          display: flex; flex-direction: column; gap: 16px;
          background: #f0f2f5;
        }
        .empty-state {
          text-align: center; color: #9ca3af;
          margin: auto; font-size: 14px; line-height: 1.6;
        }
        .empty-icon { font-size: 40px; margin-bottom: 12px; }

        .msg-row { display: flex; }
        .msg-row.user { justify-content: flex-end; }
        .msg-row.assistant { justify-content: flex-start; }

        .bubble {
          max-width: 68%; padding: 12px 16px;
          border-radius: 18px; font-size: 14px; line-height: 1.6;
          white-space: pre-wrap; word-break: break-word;
        }
        .bubble.user {
          background: #2563eb; color: #ffffff;
          border-bottom-right-radius: 4px;
        }
        .bubble.assistant {
          background: #ffffff; color: #111827;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.07);
        }

        .typing {
          display: flex; align-items: center; gap: 4px;
          background: #ffffff; padding: 12px 16px; border-radius: 18px;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.07);
          width: fit-content;
        }
        .dot {
          width: 7px; height: 7px; border-radius: 50%; background: #9ca3af;
          animation: bounce 1.2s infinite;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }

        .error-bar {
          padding: 10px 24px; background: #fef2f2;
          color: #dc2626; font-size: 13px;
          border-top: 1px solid #fecaca;
        }

        .input-area {
          padding: 16px 24px;
          background: #ffffff;
          border-top: 1px solid #e5e7eb;
          display: flex; gap: 10px; align-items: center;
        }
        .input-field {
          flex: 1; padding: 11px 16px;
          border: 1px solid #e5e7eb; border-radius: 24px;
          font-size: 14px; color: #111827; background: #f9fafb;
          outline: none; transition: border-color 0.15s;
        }
        .input-field:focus { border-color: #2563eb; background: #fff; }
        .send-btn {
          width: 42px; height: 42px; border-radius: 50%;
          background: #2563eb; color: white; border: none;
          cursor: pointer; font-size: 18px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s; flex-shrink: 0;
        }
        .send-btn:hover { background: #1d4ed8; }
        .send-btn:disabled { background: #93c5fd; cursor: not-allowed; }
      `}</style>

      <div className="layout">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <p className="sidebar-title">Estadísticas</p>

          <div className="stat-block">
            <p className="stat-block-label">🔵 Métricas de Tokens</p>
            <div className="stat-row">
              <span>Total</span>
              <span className="stat-value">{stats.total.toLocaleString()}</span>
            </div>
            <div className="stat-row">
              <span>Entrada</span>
              <span className="stat-value">{stats.prompt.toLocaleString()}</span>
            </div>
            <div className="stat-row">
              <span>Salida</span>
              <span className="stat-value">{stats.completion.toLocaleString()}</span>
            </div>
          </div>

          <div className="divider" />

          <div className="stat-block">
            <p className="stat-block-label">⏱ Tiempo de Respuesta</p>
            <div className="stat-row">
              <span>ms</span>
              <span className="stat-value">{stats.responseMs}</span>
            </div>
          </div>

          <div className="divider" />

          <div className="stat-block">
            <p className="stat-block-label">🤖 Modelo</p>
            <span className="model-badge">{stats.model}</span>
          </div>
        </aside>

        {/* CHAT */}
        <main className="chat-panel">
          <header className="chat-header">
            <div className="online-dot" />
            Chat de IA
          </header>

          <div className="messages">
            {messages.length === 0 && !loading && (
              <div className="empty-state">
                <div className="empty-icon">🤖</div>
                <p>¡Hola! Soy tu asistente de IA.</p>
                <p>Escribe un mensaje para comenzar.</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`msg-row ${msg.role}`}>
                <div className={`bubble ${msg.role}`}>{msg.content}</div>
              </div>
            ))}

            {loading && (
              <div className="msg-row assistant">
                <div className="typing">
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {error && <div className="error-bar">{error}</div>}

          <div className="input-area">
            <input
              className="input-field"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Escribe tu mensaje..."
            />
            <button className="send-btn" onClick={sendMessage} disabled={loading}>
              ➤
            </button>
          </div>
        </main>

      </div>
    </>
  );
}