# ECUACIONES.io 🎓

Plataforma interactiva estilo Netflix para la enseñanza y el aprendizaje del **Planteo de Ecuaciones**. Desarrollada para una clase magistral universitaria, esta herramienta combina un diseño atractivo con metodologías sólidas y asistencia de Inteligencia Artificial.

## Características 🚀

- **Interfaz "Netflix-style"**: Navegación fluida y atractiva que invita al estudiante a explorar.
- **Modo Presentador**: Herramienta de pantalla completa para exponer las diapositivas con atajos de teclado.
- **Mando a Distancia (QR)**: Controla la presentación desde tu teléfono móvil utilizando tecnología en tiempo real (Supabase Realtime).
- **Taller Inteligente con IA**: 
  - **Generador de Desafíos**: Crea nuevos problemas matemáticos adaptativos usando IA.
  - **Traductor a Lenguaje Formal**: Ingresa un enunciado y obtén el análisis de los *5 Pasos de Oro*.
- **Cero dependencias pesadas**: Frontend Vanilla HTML/CSS/JS optimizado. Renderizado de fórmulas matemáticas de alta velocidad con KaTeX.

## Despliegue y Configuración ⚙️

El proyecto está diseñado para ser servido estáticamente en GitHub Pages.
1. Haz un fork o clona el repositorio.
2. Sirve los archivos estáticos desde la raíz (por ejemplo, con Live Server o desplegando en GitHub Pages).
3. **Backend / IA**: El sistema de Inteligencia Artificial depende de Supabase Edge Functions. Si deseas habilitarlo, despliega las funciones ubicadas en `supabase/functions/` y configura el secreto `DEEPSEEK_API_KEY` o `OPENAI_API_KEY` en tu proyecto de Supabase.

> [!NOTE]
> Si el backend de IA no está disponible, la aplicación hará *fallback* automáticamente a un sistema de simulación local interactivo.
