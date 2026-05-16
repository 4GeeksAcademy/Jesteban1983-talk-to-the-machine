import { NextResponse } from 'next/server';

// Cumple con la regla estricta de menos de 20 líneas de código por función
export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    if (!messages || !process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: `Falta configuración. Clave cargada: ${!!process.env.GROQ_API_KEY}` }, { status: 400 }); // Early Return
    }

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages }), // Modelo actualizado y estable
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Groq rechazó el flete de datos', status: res.status, deatils: await res.text() }, { status: res.status });
    }

    return NextResponse.json(await res.json());
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Fallo crítico de red' }, { status: 500 });
  }
}