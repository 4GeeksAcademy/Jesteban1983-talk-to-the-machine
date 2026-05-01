# 🤖 Talk to the Machine

**Interfaz de chat que se conecta directamente a una IA real (LLaMA a través de la API de Groq) usando solo HTML, CSS y JavaScript — sin frameworks, sin backend.**

Desarrollado como parte del currículo de Desarrollador Full Stack de 4Geeks Academy.

---

## 📌 Qué hace

- Permite enviar mensajes a un modelo de IA real (LLaMA 3) y recibir respuestas en tiempo real
- Mantiene el historial completo de la conversación en memoria para que la IA recuerde el contexto
- Muestra métricas en vivo: tokens totales usados, tiempo de respuesta en milisegundos y nombre del modelo
- Maneja errores de la API de forma visible para que el usuario siempre sepa qué ocurrió

---

## 🚀 Demo

> Abre `index.html` directamente en tu navegador — no requiere servidor.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Estructura | HTML5 |
| Estilos | CSS3 (inline) |
| Lógica | JavaScript Vanilla (ES6+) |
| Proveedor de IA | [Groq Cloud](https://console.groq.com) |
| Modelo de IA | `llama-3.3-70b-versatile` |
| HTTP | API nativa `fetch()` |

---

## 📁 Estructura del Proyecto

```
talk-to-the-machine/
└── index.html      ← proyecto completo en un solo archivo
```

---

## ⚙️ Configuración y Uso

### 1. Obtén tu API Key de Groq

1. Ve a [console.groq.com](https://console.groq.com)
2. Crea una cuenta gratuita
3. Ve a **API Keys → Create API Key**
4. Copia tu clave — tiene este formato: `gsk_abc123...`

### 2. Añade tu clave al código

Abre `index.html` y busca esta línea dentro del tag `<script>`:

```javascript
const API_KEY = "gsk_TU_CLAVE_AQUI";
```

Reemplaza `gsk_TU_CLAVE_AQUI` con tu API Key real.

### 3. Abre en el navegador

```bash
# Opción A: abrir directamente
open index.html

# Opción B: desde VS Code / Codespaces
# Click derecho en index.html → Open with Live Server
```

### 4. Empieza a chatear

Escribe cualquier mensaje en el campo de texto y presiona **Enter** o haz clic en **Enviar**.

---

## 🔌 Integración con la API

Cada mensaje dispara una petición `POST` al endpoint de Groq:

```
POST https://api.groq.com/openai/v1/chat/completions
```

### Estructura de la petición

```json
{
  "model": "llama-3.3-70b-versatile",
  "messages": [
    { "role": "user",      "content": "Hola!" },
    { "role": "assistant", "content": "¡Hola! ¿En qué te ayudo?" },
    { "role": "user",      "content": "¿Qué es JavaScript?" }
  ]
}
```

> El historial completo de la conversación se envía en cada petición para que el modelo mantenga el contexto entre mensajes.

### Campos que se leen de la respuesta

| Campo | Ruta en la respuesta | Para qué se usa |
|---|---|---|
| Texto de la IA | `choices[0].message.content` | Mostrar mensaje del asistente |
| Tokens del prompt | `usage.prompt_tokens` | Panel de métricas |
| Tokens de respuesta | `usage.completion_tokens` | Panel de métricas |
| Tokens totales | `usage.total_tokens` | Contador acumulado |
| Nombre del modelo | `model` | Panel de métricas |

---

## 📊 Panel de Métricas

Después de cada respuesta, el panel se actualiza con:

- **Tokens totales usados** — acumulado durante toda la sesión
- **Último tiempo de respuesta** — milisegundos desde el envío hasta la recepción
- **Nombre del modelo** — versión exacta del modelo que respondió

---

## 🧠 Cómo funciona la memoria de la conversación

Los mensajes se almacenan en un array JavaScript en memoria:

```javascript
let messages = [
  { role: "user",      content: "¿Qué es una API?" },
  { role: "assistant", content: "Una API es..." },
  { role: "user",      content: "¿Me das un ejemplo?" }
];
```

Este array crece con cada intercambio y se envía completo en cada petición. La IA usa todo el historial para responder con contexto — como leer un hilo de chat completo antes de contestar.

> ⚠️ La memoria es solo de sesión. Si recargas la página, la conversación se borra.

---

## ⚠️ Manejo de Errores

La aplicación muestra los errores de la API directamente al usuario en lugar de fallar silenciosamente:

| Tipo de error | Ejemplo | Lo que ve el usuario |
|---|---|---|
| API Key inválida | 401 Unauthorized | `⚠️ Error 401: Invalid API Key` |
| Modelo dado de baja | 400 Bad Request | `⚠️ Error 400: Model decommissioned...` |
| Sin conexión | Network failure | `⚠️ Failed to fetch` |

---

## 🔒 Nota de Seguridad

> **Este proyecto almacena la API Key directamente en JavaScript del lado del cliente — solo con fines de aprendizaje.**
> En una aplicación real en producción, la API Key nunca debe estar expuesta en el frontend. Debe vivir en un servidor backend que actúe como intermediario con el proveedor de IA.

---

## ✅ Checklist de Requisitos del Proyecto

- [x] API de Groq llamada con `fetch()` — sin wrappers ni SDKs
- [x] Endpoint correcto y headers requeridos (`Authorization`, `Content-Type`)
- [x] Historial completo de la conversación enviado en cada petición
- [x] Respuesta del asistente aparece en la UI sin recargar la página
- [x] Campos de `usage` leídos y acumulados a lo largo de la conversación
- [x] Panel de métricas se actualiza después de cada mensaje
- [x] Métrica adicional mostrada (tiempo de respuesta en ms)
- [x] Errores de la API mostrados al usuario con mensaje comprensible

---

## 👨‍💻 Autor

**Jonathan Esteban Barona**
Estudiante de Desarrollo Full Stack — 4Geeks Academy
Sabadell, Cataluña 🇪🇸

---

## 📄 Licencia

MIT — libre para usar y aprender.
