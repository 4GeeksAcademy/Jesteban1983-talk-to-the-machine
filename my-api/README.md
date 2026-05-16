# AgentHub - AI Copilot (Integración WMS)

Este proyecto es un prototipo funcional de un asistente inteligente integrado para un sistema de gestión de almacenes (WMS) llamado **AgentHub**. Permite interactuar con el modelo **Llama 3.3** a través de la API de Groq de forma fluida, manteniendo un control estricto sobre la seguridad de las credenciales, el consumo de tokens y la adaptabilidad visual de la interfaz.

Desarrollado como parte de una evaluación técnica/académica centrada en buenas prácticas de arquitectura de software con Next.js (App Router) y Tailwind CSS v4.

---

## Características clave del proyecto

* **Seguridad por diseño (Security First):** La clave privada de Groq (`GROQ_API_KEY`) está completamente blindada en el servidor. El frontend nunca la expone. Las peticiones pasan a través de un **Route Handler** interno que actúa como puente seguro.
* **Consumo Nativo (Sin SDKs):** Para cumplir con los requerimientos estrictos de la entrega, la comunicación con Groq se realiza directamente con la API de `fetch` nativa de JavaScript, configurando manualmente las cabeceras `Authorization: Bearer` y `Content-Type: application/json`.
* **Arquitectura Limpia (MVVM):** La interfaz visual es puramente presentacional. Toda la lógica de control de estados, llamadas asíncronas y manejo de tokens está aislada dentro de un Custom Hook (`useGroqChat`) y servicios dedicados.
* **Persistencia Local:** Tanto el feed de la conversación como el desglose de tokens acumulados sobreviven a las recargas del navegador mediante el uso sincronizado de `localStorage`. Cuenta con un botón de reinicio completo para iniciar nuevas sesiones de trabajo.
* **Costo Derivado:** El coste financiero de la sesión se calcula matemáticamente en tiempo de ejecución basándose en los tokens consumidos, evitando el uso de estados redundantes o efectos secundarios innecesarios.
* **Interfaz Premium y Responsive:** Rediseño minimalista enfocado en reducir la fatiga visual del operario. Cuenta con soporte completo para **Modo Claro / Modo Oscuro** controlado por un interruptor manual y un layout fluido que se adapta a teléfonos móviles mediante paneles deslizantes (*drawers*).

---

## Estructura del Proyecto (Rutas Clave)

Para facilitar la revisión, este es el mapa de los archivos donde se concentra la lógica principal solicitada en la rúbrica:

* `src/app/api/chat/route.ts` -> Route Handler (Servidor blindado que inyecta la API Key y ejecuta el `fetch` nativo).
* `src/types/chat.ts` -> Definición formal de contratos de datos e interfaces de TypeScript (PascalCase).
* `src/services/chat.service.ts` -> Servicio aislado encargado del despacho y transporte de las peticiones de red.
* `src/hooks/useGroqChat.ts` -> Cerebro lógico (Maneja `useState`, `useEffect`, persistencia y acumulación analítica).
* `src/context/ThemeContext.tsx` -> Proveedor global del estado del tema visual (Light/Dark).
* `src/components/layout/ChatLayout.tsx` -> Gestión de la cuadrícula espacial adaptable (Responsive Layout).
* `src/components/chat/` -> Componentes atómicos de la UI (`ChatArea.tsx`, `MetricsSidebar.tsx`, `SessionHistory.tsx`).

---

## ¿Cómo hacerlo funcionar en tu máquina local?

Por motivos de seguridad profesional, el archivo que contiene la API Key real (`.env.local`) está configurado en el `.gitignore` y **no se sube al repositorio público de GitHub**. 

Si eres el profesor o estás clonando este repositorio en una computadora nueva, sigue estos pasos para activarlo:

### 1. Clonar el repositorio e instalar dependencias
Abre tu terminal dentro de la carpeta del proyecto y ejecuta:
```bash
npm install