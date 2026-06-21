// ═══════════════════════════════════════════════════════════════════════════
// ECUACIONES.IO — LÓGICA DE LA APLICACIÓN ESTILO NETFLIX
// ═══════════════════════════════════════════════════════════════════════════

// ── Supabase Configuration ──────────────────────────────────────────────────
const SUPABASE_CONFIG = {
    url: "https://dyuadrzdrphzywbnxnhz.supabase.co",
    // Nota: Esta clave anónima es segura para exponer en el frontend gracias a las políticas RLS de Supabase.
    anonKey: "sb_publishable_rCwOvgVa1kGlO5PFAa8tRg_E1KIWKWX",
    useEdgeFunctions: true
};

const supabaseClient = (typeof window !== 'undefined' && window.supabase && SUPABASE_CONFIG.url) 
    ? window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey) 
    : null;

// ── Slide Data (contenido de cada diapositiva para modal y presentador) ─────
const SLIDES_DATA = {
    'slide-planteo': {
        title: '¿Qué significa "Plantear"?',
        icon: '🎓',
        heroColor: 'linear-gradient(135deg, #1a0000, #2d0000)',
        description: 'Proceso riguroso de traducción lingüística y conceptual del lenguaje cotidiano al lenguaje formal matemático.',
        content: `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:center;">
                <div>
                    <p style="font-size:1.05rem;color:var(--color-text-secondary);margin-bottom:20px;">
                        Plantear una ecuación es un riguroso proceso de <strong>traducción lingüística y conceptual</strong>.
                    </p>
                    <div class="modal-math-box" style="text-align:center;">
                        <span style="font-size:1.1rem;font-weight:700;">Lenguaje Verbal (Mundo Real)</span><br>
                        <span style="font-size:2rem;color:var(--color-accent);display:block;margin:8px 0;">↓</span>
                        <span style="font-size:1.1rem;font-weight:700;color:var(--color-accent);">Lenguaje Formal (Ecuación)</span>
                    </div>
                    <p style="color:var(--color-text-muted);font-size:0.9rem;margin-top:16px;">
                        Es la base fundamental del modelado de sistemas físicos, económicos y astronómicos.
                    </p>
                </div>
                <div style="background:rgba(229,9,20,0.04);border-radius:12px;padding:24px;text-align:center;border:1px solid rgba(229,9,20,0.1);">
                    <div style="font-size:5rem;margin-bottom:16px;">📝</div>
                    <div style="font-family:var(--font-mono);color:var(--color-accent);font-size:1.2rem;">"La suma de dos números es 48"</div>
                    <div style="font-size:1.5rem;color:var(--color-text-muted);margin:12px 0;">↓</div>
                    <div style="font-family:var(--font-mono);color:#fff;font-size:1.4rem;">$x + y = 48$</div>
                </div>
            </div>`
    },
    'slide-pasos': {
        title: 'Los 5 Pasos de Oro',
        icon: '✅',
        heroColor: 'linear-gradient(135deg, #001a0d, #002614)',
        description: 'La metodología probada para plantear cualquier ecuación de forma sistemática y sin errores.',
        content: `
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:16px;">
                ${[
                    ['🔍','1. Identificar','Aislar y definir claramente las variables o incógnitas del sistema.'],
                    ['🗣️','2. Traducir','Mapear los conectores lógicos de cantidad a operadores algebraicos.'],
                    ['⚖️','3. Igualar','Establecer el punto de balance o igualdad de la ecuación.']
                ].map(([icon,title,desc]) => `
                    <div style="background:rgba(229,9,20,0.05);border:1px solid rgba(229,9,20,0.15);border-radius:10px;padding:20px;text-align:center;">
                        <div style="font-size:2.5rem;margin-bottom:12px;">${icon}</div>
                        <div style="font-weight:700;font-family:var(--font-heading);margin-bottom:8px;color:var(--color-accent);">${title}</div>
                        <p style="font-size:0.8rem;color:var(--color-text-muted);">${desc}</p>
                    </div>`).join('')}
            </div>
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;">
                ${[
                    ['📐','4. Coherencia','Asegurar homogeneidad dimensional de todos los términos (unidades).'],
                    ['✔️','5. Comprobar','Validar la consistencia lógica del resultado en el contexto original.']
                ].map(([icon,title,desc]) => `
                    <div style="background:rgba(229,9,20,0.05);border:1px solid rgba(229,9,20,0.15);border-radius:10px;padding:20px;text-align:center;">
                        <div style="font-size:2.5rem;margin-bottom:12px;">${icon}</div>
                        <div style="font-weight:700;font-family:var(--font-heading);margin-bottom:8px;color:var(--color-accent);">${title}</div>
                        <p style="font-size:0.8rem;color:var(--color-text-muted);">${desc}</p>
                    </div>`).join('')}
            </div>`
    },
    'slide-diccionario': {
        title: 'Diccionario de Traducción Rápida',
        icon: '📖',
        heroColor: 'linear-gradient(135deg, #00102d, #001a45)',
        description: 'Referencia rápida de palabras clave y sus operadores matemáticos equivalentes.',
        content: `
            <table class="modal-table">
                <thead>
                    <tr>
                        <th>Término Verbal Común</th>
                        <th>Operador Matemático</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>"El doble de un valor", "El triple de un valor"</td><td class="mono">$2x$ / $3x$</td></tr>
                    <tr><td>"Aumentado en", "Disminuido en", "Excede a"</td><td class="mono">$+k$ / $-k$ / $A - B = k$</td></tr>
                    <tr><td>"Tres números consecutivos"</td><td class="mono">$x, x+1, x+2$</td></tr>
                    <tr><td>"Es equivalente a", "Representa", "Nos da"</td><td class="mono">$=$</td></tr>
                    <tr><td>"La mitad de", "La tercera parte de"</td><td class="mono">$x/2$ / $x/3$</td></tr>
                    <tr><td>"Más que", "Menos que"</td><td class="mono">$A + k$ / $A - k$</td></tr>
                </tbody>
            </table>`
    },
    'slide-errores': {
        title: '¡Cuidado! Evita estos Errores',
        icon: '⚠️',
        heroColor: 'linear-gradient(135deg, #1a0000, #2d0000)',
        description: 'Los tres errores más frecuentes al plantear ecuaciones y cómo evitarlos.',
        content: `
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;">
                ${[
                    ['❌','Olvidar Paréntesis','Al multiplicar el "doble de la suma", el multiplicador afecta a todos los términos dentro.'],
                    ['⚠️','Mezclar Unidades','No operes minutos con horas o metros con centímetros sin antes hacer la conversión.'],
                    ['🤔','Resultados Absurdos','Si el cálculo de una edad da fraccionario o negativo, revisa el planteamiento original.']
                ].map(([icon,title,desc]) => `
                    <div style="background:rgba(229,9,20,0.08);border:1px solid rgba(229,9,20,0.25);border-radius:12px;padding:24px;text-align:center;">
                        <div style="font-size:3rem;margin-bottom:12px;">${icon}</div>
                        <h3 style="font-weight:700;font-family:var(--font-heading);margin-bottom:10px;color:#fff;">${title}</h3>
                        <p style="font-size:0.85rem;color:var(--color-text-muted);">${desc}</p>
                    </div>`).join('')}
            </div>`
    },
    'slide-resumen': {
        title: 'En Resumen...',
        icon: '🏆',
        heroColor: 'linear-gradient(135deg, #0a1a00, #102400)',
        description: 'Las 4 claves fundamentales que garantizan el éxito en el planteo de ecuaciones.',
        content: `
            <ul style="list-style:none;display:flex;flex-direction:column;gap:20px;">
                ${[
                    'Lee el problema al menos 3 veces antes de estructurar variables.',
                    'Traduce palabra por palabra metódicamente al lenguaje formal.',
                    'Conserva el orden en cada una de las operaciones algebraicas.',
                    'Comprueba siempre el valor obtenido con el enunciado original.'
                ].map(tip => `
                    <li style="display:flex;align-items:center;gap:16px;font-size:1.05rem;color:var(--color-text-secondary);">
                        <span style="color:#46d369;font-size:1.5rem;flex-shrink:0;">✓</span>
                        ${tip}
                    </li>`).join('')}
            </ul>`
    },
    'slide-ej1': {
        title: 'Ejemplo 1: Suma de Consecutivos',
        icon: '1️⃣',
        heroColor: 'linear-gradient(135deg, #00102d, #001a45)',
        description: 'Problema clásico de aritmética: la suma de tres números enteros consecutivos es 72.',
        content: `
            <h3 style="font-size:1.1rem;color:var(--color-text-secondary);margin-bottom:20px;">
                <strong>Problema:</strong> La suma de tres números consecutivos es 72. Hallar los números.
            </h3>
            <div class="modal-math-box">
                <p><span class="modal-step-pill">Paso 1</span> Variables: Sean los números $x$, $x+1$, $x+2$</p>
                <p style="margin-top:10px;"><span class="modal-step-pill">Paso 2</span> Ecuación: $$x + (x+1) + (x+2) = 72$$</p>
                <p style="margin-top:10px;"><span class="modal-step-pill">Paso 3</span> Simplificar: $$3x + 3 = 72 \\Rightarrow 3x = 69 \\Rightarrow x = 23$$</p>
            </div>
            <div class="modal-solution-tag">
                <i class="fa-solid fa-circle-check"></i>
                Solución: Los números son <strong style="margin-left:4px;">23, 24 y 25</strong>.
            </div>`
    },
    'slide-ej2': {
        title: 'Ejemplo 2: Operadores Combinados',
        icon: '2️⃣',
        heroColor: 'linear-gradient(135deg, #00102d, #001a45)',
        description: 'El doble de un número aumentado en 5 es igual a 21. Encuentra el número.',
        content: `
            <h3 style="font-size:1.1rem;color:var(--color-text-secondary);margin-bottom:20px;">
                <strong>Problema:</strong> El doble de un número aumentado en 5 es igual a 21.
            </h3>
            <div class="modal-math-box">
                <p><span class="modal-step-pill">Ecuación</span> $$2x + 5 = 21$$</p>
                <p style="margin-top:12px;"><span class="modal-step-pill">Solución</span> $$2x = 16 \\Rightarrow x = 8$$</p>
            </div>
            <p style="font-size:0.85rem;color:var(--color-text-muted);margin-top:16px;background:rgba(229,9,20,0.05);padding:12px;border-radius:8px;border-left:3px solid var(--color-accent);">
                ⚠️ Un error común es interpretar el enunciado como $2(x+5)$, lo cual alteraría el resultado.
            </p>
            <div class="modal-solution-tag"><i class="fa-solid fa-circle-check"></i> Solución: el número es <strong style="margin-left:4px;">8</strong>.</div>`
    },
    'slide-ej3': {
        title: 'Ejemplo 3: Edades (Línea Temporal)',
        icon: '3️⃣',
        heroColor: 'linear-gradient(135deg, #002014, #001a10)',
        description: 'Problema clásico de edades con desplazamiento temporal futuro.',
        content: `
            <h3 style="font-size:1rem;color:var(--color-text-secondary);margin-bottom:16px;">
                <strong>Problema:</strong> La edad de Ana es el triple de la de su hijo. Dentro de 10 años será el doble. ¿Qué edad tiene cada uno?
            </h3>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
                <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:16px;text-align:center;">
                    <div style="font-size:0.7rem;text-transform:uppercase;color:var(--color-text-faint);font-weight:700;margin-bottom:10px;">Estado Actual</div>
                    <p style="font-family:var(--font-mono);">Hijo: $x$</p>
                    <p style="font-family:var(--font-mono);">Ana: $3x$</p>
                </div>
                <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:16px;text-align:center;">
                    <div style="font-size:0.7rem;text-transform:uppercase;color:var(--color-text-faint);font-weight:700;margin-bottom:10px;">En 10 años</div>
                    <p style="font-family:var(--font-mono);">Hijo: $x + 10$</p>
                    <p style="font-family:var(--font-mono);">Ana: $3x + 10$</p>
                </div>
            </div>
            <div class="modal-math-box">
                <p><span class="modal-step-pill">Igualdad</span> $$3x + 10 = 2(x + 10) \\Rightarrow x = 10$$</p>
            </div>
            <div class="modal-solution-tag"><i class="fa-solid fa-circle-check"></i> Ana tiene <strong style="margin:0 4px;">30 años</strong>; su hijo tiene <strong style="margin:0 4px;">10 años</strong>.</div>`
    },
    'slide-ej4': {
        title: 'Ejemplo 4: Modelado Geométrico',
        icon: '4️⃣',
        heroColor: 'linear-gradient(135deg, #00102d, #001a45)',
        description: 'Hallar las dimensiones de un rectángulo dado su perímetro.',
        content: `
            <h3 style="font-size:1rem;color:var(--color-text-secondary);margin-bottom:16px;">
                <strong>Problema:</strong> En un rectángulo, el largo es 4 cm mayor que el ancho y su perímetro es 32 cm.
            </h3>
            <div class="modal-math-box">
                <p>Ancho: $x$ · Largo: $x + 4$</p>
                <p style="margin-top:8px;"><span class="modal-step-pill">Perímetro</span> $$2(x) + 2(x + 4) = 32$$</p>
                <p style="margin-top:8px;"><span class="modal-step-pill">Cálculo</span> $$4x + 8 = 32 \\Rightarrow 4x = 24 \\Rightarrow x = 6$$</p>
            </div>
            <div class="modal-solution-tag"><i class="fa-solid fa-circle-check"></i> Ancho = <strong style="margin:0 4px;">6 cm</strong> · Largo = <strong style="margin:0 4px;">10 cm</strong>.</div>`
    },
    'slide-ej5': {
        title: 'Ejemplo 5: Reparto de Cantidades',
        icon: '5️⃣',
        heroColor: 'linear-gradient(135deg, #002014, #001a10)',
        description: 'Se reparten 50 caramelos entre dos niños: uno recibe 10 más que el otro.',
        content: `
            <h3 style="font-size:1rem;color:var(--color-text-secondary);margin-bottom:16px;">
                <strong>Problema:</strong> Se reparten 50 caramelos entre dos niños de modo que uno recibe 10 más que el otro.
            </h3>
            <div class="modal-math-box">
                <p>Niño A: $x$ · Niño B: $x + 10$</p>
                <p style="margin-top:8px;"><span class="modal-step-pill">Ecuación</span> $$x + (x + 10) = 50$$</p>
                <p style="margin-top:8px;"><span class="modal-step-pill">Solución</span> $$2x = 40 \\Rightarrow x = 20$$</p>
            </div>
            <div class="modal-solution-tag"><i class="fa-solid fa-circle-check"></i> Niño A = <strong style="margin:0 4px;">20</strong> · Niño B = <strong style="margin:0 4px;">30</strong> caramelos.</div>`
    },
    'slide-ej6': {
        title: 'Reto UNI I — Edades en el Tiempo',
        icon: '⭐',
        heroColor: 'linear-gradient(135deg, #1a0030, #0d0020)',
        description: 'Problema de preselección UNI con razones temporales. Calcular a+b.',
        content: `
            <p style="font-size:0.9rem;color:var(--color-text-muted);margin-bottom:16px;border-left:3px solid #a78bfa;padding-left:12px;">
                <strong>Problema (UNI):</strong> La edad de A hace $a$ años era a la de B como 5:4. Dentro de $b$ años la razón será 7:6. La suma de edades es 46 y la diferencia es 4. Calcule $a+b$.
            </p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                <div style="background:rgba(167,139,250,0.05);border:1px solid rgba(167,139,250,0.2);border-radius:10px;padding:16px;">
                    <p style="font-weight:700;color:#a78bfa;margin-bottom:8px;font-size:0.85rem;">1. Invariante Temporal:</p>
                    <div class="modal-math-box" style="border-color:#a78bfa;background:rgba(167,139,250,0.04);">
                        $$A - B = 4 \\quad \\land \\quad A + B = 46$$
                        <p style="color:#46d369;font-weight:700;text-align:center;margin-top:8px;">A = 25 años, B = 21 años</p>
                    </div>
                </div>
                <div style="background:rgba(167,139,250,0.05);border:1px solid rgba(167,139,250,0.2);border-radius:10px;padding:16px;">
                    <p style="font-weight:700;color:#a78bfa;margin-bottom:8px;font-size:0.85rem;">2. Razones Temporales:</p>
                    <div class="modal-math-box" style="border-color:#a78bfa;background:rgba(167,139,250,0.04);">
                        <p style="font-size:0.85rem;">Pasado: $$\\frac{25-a}{21-a} = \\frac{5}{4} \\Rightarrow a=5$$</p>
                        <p style="font-size:0.85rem;">Futuro: $$\\frac{25+b}{21+b} = \\frac{7}{6} \\Rightarrow b=3$$</p>
                    </div>
                </div>
            </div>
            <div class="modal-solution-tag"><i class="fa-solid fa-circle-check"></i> Resultado: $a + b = 5 + 3 = $ <strong style="margin-left:6px;font-size:1.3rem;color:#46d369;">8</strong></div>`
    },
    'slide-ej7': {
        title: 'Reto UNI II — Modelado Diofántico',
        icon: '⭐⭐',
        heroColor: 'linear-gradient(135deg, #1a0030, #0d0020)',
        description: 'Ecuación diofántica con restricción de enteros positivos. Cantidad máxima de textos.',
        content: `
            <p style="font-size:0.9rem;color:var(--color-text-muted);margin-bottom:16px;border-left:3px solid #a78bfa;padding-left:12px;">
                <strong>Problema (UNI):</strong> Textos de Física a $30 y de Química a $20. Gastó $500. Los de Química exceden al doble de Física. Determina la cantidad máxima de textos de Química.
            </p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                <div style="background:rgba(167,139,250,0.05);border:1px solid rgba(167,139,250,0.2);border-radius:10px;padding:16px;">
                    <p style="font-weight:700;color:#a78bfa;margin-bottom:8px;font-size:0.85rem;">1. Ecuación Diofántica:</p>
                    <div class="modal-math-box" style="border-color:#a78bfa;background:rgba(167,139,250,0.04);">
                        $$30x + 20y = 500 \\Rightarrow 3x + 2y = 50$$
                        <p style="font-size:0.8rem;color:var(--color-text-muted);margin-top:8px;">$y = 25 - 1.5x$. Para $y$ entero, $x$ debe ser par.</p>
                    </div>
                </div>
                <div style="background:rgba(167,139,250,0.05);border:1px solid rgba(167,139,250,0.2);border-radius:10px;padding:16px;">
                    <p style="font-weight:700;color:#a78bfa;margin-bottom:8px;font-size:0.85rem;">2. Restricción $y > 2x$:</p>
                    <ul style="list-style:none;font-size:0.82rem;color:var(--color-text-muted);display:flex;flex-direction:column;gap:6px;">
                        <li>$x=2 \\Rightarrow y=22$ ✓ <span style="color:#46d369;font-weight:700;">(Cumple: 22 > 4)</span></li>
                        <li>$x=4 \\Rightarrow y=19$ ✓ <span style="color:#46d369;">(Cumple: 19 > 8)</span></li>
                        <li>$x=6 \\Rightarrow y=16$ ✓ <span style="color:#46d369;">(Cumple: 16 > 12)</span></li>
                        <li>$x=8 \\Rightarrow y=13$ ✗ <span style="color:#e50914;">(No cumple: 13 ≯ 16)</span></li>
                    </ul>
                </div>
            </div>
            <div class="modal-solution-tag"><i class="fa-solid fa-circle-check"></i> Máximo de textos de Química: <strong style="margin-left:6px;font-size:1.3rem;color:#46d369;">22</strong></div>`
    }
};

// All slides in presenter order
const PRESENTER_SLIDES = [
    'slide-planteo', 'slide-pasos', 'slide-diccionario',
    'slide-ej1', 'slide-ej2', 'slide-ej3', 'slide-ej4', 'slide-ej5',
    'slide-ej6', 'slide-ej7', 'slide-errores', 'slide-resumen'
];

// ── State ────────────────────────────────────────────────────────────────────
let activeProfile = null;
let presenterIndex = 0;
let carouselOffsets = {};
let lastSolutionHtml = '';

// ── Profile Selection ────────────────────────────────────────────────────────
function selectProfile(name, avatarSrc, accentColor) {
    activeProfile = { name, avatarSrc, accentColor };

    // Update header avatar
    const headerAvatar = document.getElementById('header-avatar');
    if (headerAvatar) {
        if (avatarSrc) {
            headerAvatar.outerHTML = `<div class="header-profile-mini-icon" id="header-avatar" style="background:${accentColor}22;" title="${name}">
                <img src="${avatarSrc}" alt="${name}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;" onerror="this.outerHTML='🎓'">
            </div>`;
        } else {
            headerAvatar.style.background = `${accentColor}22`;
            headerAvatar.textContent = '👤';
            headerAvatar.title = name;
        }
    }

    // Fade out profile screen, fade in app
    const profileScreen = document.getElementById('profile-screen');
    const mainApp = document.getElementById('main-app');

    profileScreen.classList.add('fade-out');

    setTimeout(() => {
        profileScreen.style.display = 'none';
        mainApp.classList.add('visible');

        // Init scroll reveal
        initScrollReveal();
        renderAllMath();
        // Init Netflix-style video previews
        initCardPreviews();
    }, 800);
}

// ── Carousel Logic ───────────────────────────────────────────────────────────
function slideCarousel(rowId, direction) {
    const track = document.getElementById(`track-${rowId}`);
    if (!track) return;

    const cardWidth = 280 + 8; // card width + gap
    const visibleCount = Math.floor(track.parentElement.offsetWidth / cardWidth);
    const totalCards = track.children.length;
    const maxOffset = Math.max(0, totalCards - visibleCount);

    if (!carouselOffsets[rowId]) carouselOffsets[rowId] = 0;
    carouselOffsets[rowId] = Math.max(0, Math.min(carouselOffsets[rowId] + direction, maxOffset));

    track.style.transform = `translateX(-${carouselOffsets[rowId] * cardWidth}px)`;
}

// ── Slide Modal ───────────────────────────────────────────────────────────────
function openSlideModal(slideId) {
    stopAllPreviews();
    const data = SLIDES_DATA[slideId];
    if (!data) return;

    const modal = document.getElementById('slide-modal');
    const content = document.getElementById('modal-content');

    content.innerHTML = `
        <div class="modal-hero" style="background:${data.heroColor};">
            <div class="modal-hero-bg">${data.icon}</div>
            <div class="modal-hero-content">
                <h2 class="modal-hero-title">${data.title}</h2>
                <div class="modal-hero-actions">
                    <button class="btn-play" style="font-size:0.9rem;padding:10px 20px;" onclick="closeSlideModal();startPresenterFromSlide('${slideId}')">
                        <i class="fa-solid fa-play"></i> Presentar
                    </button>
                </div>
            </div>
        </div>
        <div class="modal-bottom">
            <div class="modal-bottom-grid">
                <div>
                    <p class="modal-description">${data.description}</p>
                </div>
                <div class="modal-meta">
                    <p><span class="modal-meta-label">Tema: </span><span class="modal-meta-value">Planteo de Ecuaciones</span></p>
                    <p><span class="modal-meta-label">Nivel: </span><span class="modal-meta-value">Básico–UNI</span></p>
                </div>
            </div>
            <div class="modal-content-area">
                ${data.content}
            </div>
        </div>`;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Render math
    setTimeout(() => renderAllMath(), 50);
}

function closeSlideModal(e) {
    if (e && e.target !== e.currentTarget) return;
    const modal = document.getElementById('slide-modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

// ── Presenter Mode ────────────────────────────────────────────────────────────
function startPresenterMode() {
    stopAllPreviews();
    presenterIndex = 0;
    renderPresenterSlide();
    document.getElementById('presenter-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function startPresenterFromSlide(slideId) {
    const idx = PRESENTER_SLIDES.indexOf(slideId);
    presenterIndex = idx >= 0 ? idx : 0;
    renderPresenterSlide();
    document.getElementById('presenter-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function exitPresenterMode() {
    document.getElementById('presenter-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

function renderPresenterSlide() {
    const slideId = PRESENTER_SLIDES[presenterIndex];
    const data = SLIDES_DATA[slideId];
    if (!data) return;

    const container = document.getElementById('presenter-slide-content');
    const indicator = document.getElementById('pbar-indicator');

    container.innerHTML = `
        <h2 style="font-family:var(--font-heading);font-size:1.8rem;font-weight:800;margin-bottom:20px;display:flex;align-items:center;gap:12px;padding-bottom:12px;border-bottom:2px solid var(--color-accent);">
            <span>${data.icon}</span> ${data.title}
        </h2>
        <p style="font-size:1rem;color:var(--color-text-muted);margin-bottom:24px;">${data.description}</p>
        <div style="font-size:1.05rem;line-height:1.8;">${data.content}</div>`;

    indicator.textContent = `${presenterIndex + 1} / ${PRESENTER_SLIDES.length}`;
    setTimeout(() => renderAllMath(), 50);
}

function presenterNext() {
    if (presenterIndex < PRESENTER_SLIDES.length - 1) {
        presenterIndex++;
        renderPresenterSlide();
    } else {
        showToast('Llegaste a la última diapositiva.', 'info');
    }
}

function presenterPrev() {
    if (presenterIndex > 0) {
        presenterIndex--;
        renderPresenterSlide();
    } else {
        showToast('Estás en la primera diapositiva.', 'info');
    }
}

// Global keyboard navigation
window.addEventListener('keydown', (e) => {
    if (document.getElementById('presenter-overlay').classList.contains('active')) {
        if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); presenterNext(); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); presenterPrev(); }
        else if (e.key === 'Escape') exitPresenterMode();
    } else if (document.getElementById('qr-modal').classList.contains('open')) {
        if (e.key === 'Escape') closeQRModal();
    } else if (document.getElementById('slide-modal').classList.contains('open')) {
        if (e.key === 'Escape') closeSlideModal();
    }
});

// ── Scroll Reveal ─────────────────────────────────────────────────────────────
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Header scroll effect ──────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
    const header = document.getElementById('netflix-header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 80);
    }
});

// ── KaTeX Math Rendering ──────────────────────────────────────────────────────
function renderAllMath() {
    if (window.renderMathInElement) {
        window.renderMathInElement(document.body, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ],
            throwOnError: false
        });
    }
}

// ── Toast Notifications ───────────────────────────────────────────────────────
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const colors = {
        error:   { bg: 'rgba(229,9,20,0.9)', icon: 'fa-triangle-exclamation' },
        warning: { bg: 'rgba(180,130,0,0.9)', icon: 'fa-circle-exclamation' },
        success: { bg: 'rgba(70,211,105,0.15)', icon: 'fa-circle-check' },
        info:    { bg: 'rgba(40,40,40,0.95)', icon: 'fa-circle-info' }
    };
    const c = colors[type] || colors.info;

    toast.style.cssText = `
        background:${c.bg};
        border:1px solid rgba(255,255,255,0.15);
        color:#fff;
        padding:10px 16px;
        border-radius:6px;
        font-size:0.82rem;
        font-weight:600;
        display:flex;
        align-items:center;
        gap:8px;
        box-shadow:0 4px 20px rgba(0,0,0,0.5);
        opacity:0;
        transform:translateY(8px);
        transition:all 0.3s ease;
        backdrop-filter:blur(8px);`;
    toast.innerHTML = `<i class="fa-solid ${c.icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(4px)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ── AI Service ────────────────────────────────────────────────────────────────
const MOCK_PROBLEMS = {
    "Edades": {
        "Básico": {
            problem: "La edad de un padre es el triple de la edad de su hijo. Si la suma de ambas edades es 48 años, ¿cuál es la edad de cada uno?",
            solution: `<div style="display:flex;flex-direction:column;gap:10px;">
                <p><span class="step-pill">Paso 1</span> Variable: Edad del hijo = $x$. Edad del padre = $3x$.</p>
                <p><span class="step-pill">Paso 2</span> La suma es 48: $x + 3x = 48$.</p>
                <p><span class="step-pill">Paso 3</span> Ecuación: $4x = 48$.</p>
                <p><span class="step-pill">Paso 4</span> Resolviendo: $x = 12$.</p>
                <p><span class="step-pill">Paso 5</span> El hijo tiene 12 años y el padre $3(12) = 36$ años. $12 + 36 = 48$ ✓</p>
            </div>`
        },
        "Intermedio": {
            problem: "Hace 5 años la edad de María era el doble de la de su prima Lucía. Si hoy sus edades suman 40 años, ¿cuántos años tiene María actualmente?",
            solution: `<div style="display:flex;flex-direction:column;gap:10px;">
                <p><span class="step-pill">Paso 1</span> Hace 5 años: Lucía = $y$, María = $2y$. Hoy: Lucía = $y+5$, María = $2y+5$.</p>
                <p><span class="step-pill">Paso 2</span> La suma actual: $(2y+5) + (y+5) = 40$.</p>
                <p><span class="step-pill">Paso 3</span> $3y + 10 = 40 \\Rightarrow y = 10$.</p>
                <p><span class="step-pill">Paso 4</span> María = $2(10) + 5 = 25$ años.</p>
                <p><span class="step-pill">Paso 5</span> $25 + 15 = 40$ ✓</p>
            </div>`
        },
        "Avanzado": {
            problem: "Un abuelo hoy cuadruplica la edad de su nieto. Hace 10 años era el séxtuple. ¿En cuántos años la edad del abuelo será el triple de la del nieto?",
            solution: `<div style="display:flex;flex-direction:column;gap:10px;">
                <p><span class="step-pill">Paso 1</span> Nieto = $x$, Abuelo = $4x$. Hace 10: $4x-10 = 6(x-10)$.</p>
                <p><span class="step-pill">Paso 2</span> $4x-10=6x-60 \\Rightarrow 2x=50 \\Rightarrow x=25$. Abuelo=100.</p>
                <p><span class="step-pill">Paso 3</span> Buscamos $N$: $100+N = 3(25+N) \\Rightarrow N=12.5$ años.</p>
                <p><span class="step-pill">Paso 4</span> Las edades futuras serán 37.5 y 112.5 años, cantidades coherentes.</p>
                <p><span class="step-pill">Paso 5</span> En 12.5 años: Nieto=37.5, Abuelo=112.5. $112.5/37.5=3$ ✓</p>
            </div>`
        }
    },
    "Geometría": {
        "Básico": {
            problem: "El perímetro de un cuadrado es de 36 cm. ¿Cuánto mide su área?",
            solution: `<div style="display:flex;flex-direction:column;gap:10px;">
                <p><span class="step-pill">Paso 1</span> Lado = $L$. Perímetro = $4L$. Área = $L^2$.</p>
                <p><span class="step-pill">Paso 2</span> $4L = 36$.</p>
                <p><span class="step-pill">Paso 3</span> $L = 9$ cm.</p>
                <p><span class="step-pill">Paso 4</span> Área: $9^2 = 81$ cm².</p>
                <p><span class="step-pill">Paso 5</span> Perímetro: $9 \\times 4 = 36$ ✓</p>
            </div>`
        },
        "Intermedio": {
            problem: "El largo de un rectángulo mide 4 metros más que el doble de su ancho. Si el perímetro es de 56 metros, calcula sus lados.",
            solution: `<div style="display:flex;flex-direction:column;gap:10px;">
                <p><span class="step-pill">Paso 1</span> Ancho = $x$, Largo = $2x + 4$.</p>
                <p><span class="step-pill">Paso 2</span> Perímetro: $2(x) + 2(2x + 4) = 56$.</p>
                <p><span class="step-pill">Paso 3</span> $6x + 8 = 56 \\Rightarrow x = 8$.</p>
                <p><span class="step-pill">Paso 4</span> Ancho = 8 m, Largo = 20 m.</p>
                <p><span class="step-pill">Paso 5</span> $2(8) + 2(20) = 56$ ✓</p>
            </div>`
        },
        "Avanzado": {
            problem: "En un triángulo rectángulo, la hipotenusa mide 2 cm más que el cateto mayor, y este 2 cm más que el menor. Determina el área.",
            solution: `<div style="display:flex;flex-direction:column;gap:10px;">
                <p><span class="step-pill">Paso 1</span> Cat. menor = $x$, mayor = $x+2$, hipotenusa = $x+4$.</p>
                <p><span class="step-pill">Paso 2</span> Pitágoras: $x^2 + (x+2)^2 = (x+4)^2$.</p>
                <p><span class="step-pill">Paso 3</span> $x^2 - 4x - 12 = 0 \\Rightarrow (x-6)(x+2)=0 \\Rightarrow x=6$.</p>
                <p><span class="step-pill">Paso 4</span> Catetos: 6 y 8. Área = $\\frac{6 \\times 8}{2} = 24$ cm².</p>
                <p><span class="step-pill">Paso 5</span> $6^2 + 8^2 = 100 = 10^2$ ✓</p>
            </div>`
        }
    }
};

class AIService {
    static async generateMockProblem(topic, difficulty) {
        return new Promise(resolve => {
            setTimeout(() => {
                const group = MOCK_PROBLEMS[topic] || MOCK_PROBLEMS['Edades'];
                const item = group[difficulty] || group['Básico'];
                resolve({ problem: item.problem, solution: item.solution });
            }, 800);
        });
    }

    static async analyzeMockProblem(text) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(`<div style="display:flex;flex-direction:column;gap:10px;">
                    <p style="color:#54b3d6;font-weight:700;">Análisis Estructurado (Modo Offline):</p>
                    <p><span class="step-pill">1. Identificación</span> Problema analizado: <em>"${text.substring(0, 60)}..."</em></p>
                    <p style="color:var(--color-text-muted);">Para análisis en tiempo real con DeepSeek/Gemini, despliega las Edge Functions de Supabase con los endpoints <code>generate-challenge</code> y <code>analyze-equation</code>.</p>
                    <div style="background:#0d0d0d;padding:10px;border-radius:6px;font-family:var(--font-mono);font-size:0.8rem;color:#54b3d6;border:1px solid rgba(255,255,255,0.06);">
                        Ecuación estimada: $Ax + B = C$
                    </div>
                </div>`);
            }, 1000);
        });
    }

    static async generateProblem(topic, difficulty) {
        let challenge;
        if (SUPABASE_CONFIG.useEdgeFunctions && SUPABASE_CONFIG.url) {
            try {
                challenge = await this.callSupabaseFunction('generate-challenge', { topic, difficulty });
            } catch (e) {
                console.warn('Edge Function no disponible. Usando generador local:', e);
                challenge = await this.generateMockProblem(topic, difficulty);
            }
        } else {
            challenge = await this.generateMockProblem(topic, difficulty);
        }

        // Save to Supabase table
        if (supabaseClient) {
            try {
                await supabaseClient.from('exposicion_retos').insert({
                    topic, difficulty,
                    problem_text: challenge.problem,
                    solution_html: challenge.solution
                });
            } catch (e) { console.warn('No se pudo registrar en Supabase:', e); }
        }

        return challenge;
    }

    static async analyzeProblem(text) {
        let analysis;
        if (SUPABASE_CONFIG.useEdgeFunctions && SUPABASE_CONFIG.url) {
            try {
                analysis = await this.callSupabaseFunction('analyze-equation', { text });
            } catch (e) {
                console.warn('Edge Function no disponible. Usando analizador local:', e);
                analysis = await this.analyzeMockProblem(text);
            }
        } else {
            analysis = await this.analyzeMockProblem(text);
        }

        if (supabaseClient) {
            try {
                await supabaseClient.from('exposicion_retos').insert({
                    topic: 'Análisis de Entrada',
                    difficulty: 'Personalizado',
                    problem_text: text,
                    solution_html: analysis
                });
            } catch (e) { console.warn('No se pudo registrar análisis en Supabase:', e); }
        }

        return analysis;
    }

    static async callSupabaseFunction(endpoint, payload) {
        const response = await fetch(`${SUPABASE_CONFIG.url}/functions/v1/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    }
}

// ── Supabase Realtime (Virtual Laser Pointer + Remote Commands) ──────────────────────
function initRealtimeUplink() {
    if (!supabaseClient) return;

    const laser = document.getElementById('virtual-laser');
    let laserX = window.innerWidth / 2, laserY = window.innerHeight / 2;
    let hideTimeout;

    supabaseClient.channel('presentation-planteo-ecuaciones')
        .on('broadcast', { event: 'laser-move' }, ({ payload }) => {
            if (!laser) return;
            laser.style.opacity = '1';
            laserX = Math.max(0, Math.min(laserX + payload.dx * window.innerWidth * 2, window.innerWidth));
            laserY = Math.max(0, Math.min(laserY + payload.dy * window.innerHeight * 2, window.innerHeight));
            laser.style.left = `${laserX}px`;
            laser.style.top = `${laserY}px`;
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => { laser.style.opacity = '0'; }, 1500);
        })
        .on('broadcast', { event: 'navigate' }, ({ payload }) => {
            if (document.getElementById('presenter-overlay').classList.contains('active')) {
                if (payload.direction === 'next') presenterNext();
                else presenterPrev();
            }
        })
        .on('broadcast', { event: 'start-presentation' }, () => {
            startPresenterMode();
            showToast('▶️ Presentación iniciada desde el mando remoto', 'success');
        })
        .on('broadcast', { event: 'exit-presentation' }, () => {
            exitPresenterMode();
            showToast('⏹️ Presentación detenida desde el mando remoto', 'info');
        })
        .subscribe((status) => {
            if (status === 'SUBSCRIBED') showToast('🔗 Mando remoto listo', 'success');
        });
}

// ── AI Button Handlers ────────────────────────────────────────────────────────
async function generateAIProblem() {
    const diff = document.getElementById('select-diff').value;
    const topic = document.getElementById('select-topic').value;
    const btn = document.getElementById('btn-generate-ai');
    const output = document.getElementById('ai-problem-output');
    const btnSol = document.getElementById('btn-reveal-solution');

    output.innerHTML = `<div style="display:flex;align-items:center;gap:10px;height:100%;justify-content:center;">
        <i class="fa-solid fa-spinner fa-spin" style="color:var(--color-accent);font-size:1.5rem;"></i>
        <span style="color:var(--color-text-muted);">Generando desafío matemático...</span>
    </div>`;
    btn.disabled = true; btnSol.disabled = true;

    try {
        const challenge = await AIService.generateProblem(topic, diff);
        output.innerHTML = `<div>
            <p style="color:#46d369;font-weight:700;font-size:0.75rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">¡Nuevo Desafío!</p>
            <p style="color:var(--color-text-secondary);line-height:1.65;">${challenge.problem}</p>
        </div>`;
        lastSolutionHtml = challenge.solution;
        btnSol.disabled = false;
        setTimeout(() => renderAllMath(), 50);
    } catch (e) {
        showToast(e.message, 'error');
        output.innerHTML = `<span style="color:var(--color-accent);">Error: ${e.message}</span>`;
    } finally {
        btn.disabled = false;
    }
}

function toggleAISolution() {
    if (!lastSolutionHtml) return;
    const output = document.getElementById('ai-problem-output');
    output.insertAdjacentHTML('beforeend', `<div style="margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.08);">
        <p style="color:#46d369;font-weight:700;font-size:0.72rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Resolución Paso a Paso:</p>
        <div style="font-size:0.82rem;display:flex;flex-direction:column;gap:8px;">${lastSolutionHtml}</div>
    </div>`);
    document.getElementById('btn-reveal-solution').disabled = true;
    setTimeout(() => renderAllMath(), 50);
}

async function analyzeUserProblem() {
    const text = document.getElementById('user-problem-input').value.trim();
    const btn = document.getElementById('btn-analyze-ai');
    const output = document.getElementById('ai-analysis-output');

    if (!text) { showToast('Por favor, escribe un problema antes de analizar.', 'warning'); return; }

    output.innerHTML = `<div style="display:flex;align-items:center;gap:10px;height:100%;justify-content:center;">
        <i class="fa-solid fa-circle-notch fa-spin" style="color:var(--color-accent);font-size:1.5rem;"></i>
        <span style="color:var(--color-text-muted);">Analizando y mapeando ecuaciones...</span>
    </div>`;
    btn.disabled = true;

    try {
        const analysis = await AIService.analyzeProblem(text);
        output.innerHTML = `<div style="font-size:0.82rem;">${analysis}</div>`;
        setTimeout(() => renderAllMath(), 50);
    } catch (e) {
        showToast(e.message, 'error');
        output.innerHTML = `<span style="color:var(--color-accent);">Error: ${e.message}</span>`;
    } finally {
        btn.disabled = false;
    }
}

// ── QR Modal ──────────────────────────────────────────────────────────────────
function openQRModal() {
    const base = window.location.origin + window.location.pathname.replace(/[^\/]*$/, '');
    const remoteURL = base + 'remote.html';
    const encoded = encodeURIComponent(remoteURL);
    const qrAPI = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=141414&bgcolor=ffffff&data=${encoded}`;

    document.getElementById('qr-img').src = qrAPI;
    document.getElementById('qr-url-text').textContent = remoteURL;
    document.getElementById('qr-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeQRModal() {
    document.getElementById('qr-modal').classList.remove('open');
    document.body.style.overflow = '';
}



// ── PDF Export ────────────────────────────────────────────────────────────────
window.exportSolutionsToPDF = () => {
    showToast('Preparando exportación a PDF...', 'info');
    setTimeout(() => window.print(), 400);
};

// ── Card Video Previews (Netflix-style hover) ─────────────────────────────────

/**
 * Map of YouTube video IDs per card to the channel name for the badge.
 * Cards that don't have a data-yt-id attribute are skipped automatically.
 */
const YT_CHANNEL_NAMES = {
    'CJEsybfPQSE': 'Profe Alex',
    'CN4n6Tfc5WI': 'Susi Profe',
    'F1d5vGkHlT8': 'JulioProfe',
    'K3t1XN1gN7c': 'JulioProfe',
    'R9H7nJ7yU38': 'JulioProfe',
    'kYJ53u0aJ8o': 'El Traductor',
    'F71H4y2t5aY': 'Academia Vonex'
};

let _previewTimers = {};
let _autoKillTimers = {};

/**
 * Stops all active video previews and destroys their iframes.
 */
function stopAllPreviews() {
    // Cancel all pending hover timers
    Object.values(_previewTimers).forEach(t => clearTimeout(t));
    _previewTimers = {};

    // Cancel all auto-kill timers
    Object.values(_autoKillTimers).forEach(t => clearTimeout(t));
    _autoKillTimers = {};

    // Remove all active preview iframes and badges
    document.querySelectorAll('.card-video-container').forEach(el => {
        // Setting src to '' stops audio immediately before removal
        const iframe = el.querySelector('iframe');
        if (iframe) iframe.src = '';
        el.remove();
    });
    document.querySelectorAll('.card-video-badge').forEach(el => el.remove());
}

/**
 * Initialises Netflix-style hover preview on every .slide-card that has
 * a data-yt-id attribute.
 */
/**
 * Initialises Netflix-style hover preview on every .slide-card that has
 * a data-yt-id attribute.
 */
function initCardPreviews() {
    // Prevent duplicate listeners by keeping track of initialized cards
    document.querySelectorAll('.slide-card[data-yt-id]').forEach((card, index) => {
        if (card.dataset.previewInit) return;
        card.dataset.previewInit = 'true';
        
        const ytId    = card.dataset.ytId;
        const ytStart = parseInt(card.dataset.ytStart || '0', 10);
        const cardKey = ytId + '_' + index;

        // ── mouseenter: schedule preview after 600 ms (like Netflix)
        card.addEventListener('mouseenter', () => {
            // Clear any previous timer for this card
            if (_previewTimers[cardKey]) {
                clearTimeout(_previewTimers[cardKey]);
            }

            _previewTimers[cardKey] = setTimeout(() => {
                // Don't start if presenter overlay or slide modal is open
                if (
                    document.getElementById('presenter-overlay').classList.contains('active') ||
                    document.getElementById('slide-modal').classList.contains('open')
                ) return;

                // Remove any existing preview on this card first
                _destroyCardPreview(card);

                // Build the container
                const container = document.createElement('div');
                container.className = 'card-video-container';

                // Channel badge
                const badge = document.createElement('div');
                badge.className = 'card-video-badge';
                badge.textContent = YT_CHANNEL_NAMES[ytId] || 'YouTube';

                // Inject into the thumb (first child of card)
                const thumb = card.querySelector('.slide-card-thumb');
                if (!thumb) return;
                thumb.appendChild(container);
                thumb.appendChild(badge);

                // Load YouTube iframe directly for preview
                const src = [
                    `https://www.youtube.com/embed/${ytId}`,
                    `?autoplay=1`,
                    `&mute=1`,
                    `&controls=0`,
                    `&modestbranding=1`,
                    `&rel=0`,
                    `&fs=0`,
                    `&iv_load_policy=3`,
                    `&disablekb=1`,
                    `&start=${ytStart}`,
                    `&enablejsapi=0`,
                    `&playsinline=1`
                ].join('');

                const iframe = document.createElement('iframe');
                iframe.src = src;
                iframe.title = 'Vista previa de video';
                iframe.allow = 'autoplay; encrypted-media';
                iframe.setAttribute('allowfullscreen', '');

                container.appendChild(iframe);

                // Fade in YouTube iframe after a short delay
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        container.classList.add('visible');
                        badge.classList.add('visible');
                    });
                });

                // Auto-kill after 15 seconds to save resources
                _autoKillTimers[cardKey] = setTimeout(() => {
                    _destroyCardPreview(card);
                }, 15000);

            }, 600);
        });

        // ── mouseleave: cancel timer and destroy preview immediately
        card.addEventListener('mouseleave', () => {
            if (_previewTimers[cardKey]) {
                clearTimeout(_previewTimers[cardKey]);
                delete _previewTimers[cardKey];
            }
            if (_autoKillTimers[cardKey]) {
                clearTimeout(_autoKillTimers[cardKey]);
                delete _autoKillTimers[cardKey];
            }
            _destroyCardPreview(card);
        });
    });
}

/** Remove the video preview from a single card, stopping audio first. */
function _destroyCardPreview(card) {
    const thumb = card.querySelector('.slide-card-thumb');
    if (!thumb) return;

    const container = thumb.querySelector('.card-video-container');
    if (container) {
        const iframe = container.querySelector('iframe');
        if (iframe) iframe.src = ''; // stops audio immediately
        
        const video = container.querySelector('video');
        if (video) {
            video.pause();
            video.src = '';
            try {
                video.load();
            } catch(e) {}
        }
        
        container.remove();
    }
    const badge = thumb.querySelector('.card-video-badge');
    if (badge) badge.remove();
}

// ── Global Bindings ───────────────────────────────────────────────────────────
window.generateAIProblem = generateAIProblem;
window.toggleAISolution = toggleAISolution;
window.analyzeUserProblem = analyzeUserProblem;
window.selectProfile = selectProfile;
window.openSlideModal = openSlideModal;
window.closeSlideModal = closeSlideModal;
window.startPresenterMode = startPresenterMode;
window.startPresenterFromSlide = startPresenterFromSlide;
window.exitPresenterMode = exitPresenterMode;
window.presenterNext = presenterNext;
window.presenterPrev = presenterPrev;
window.slideCarousel = slideCarousel;
window.showToast = showToast;
window.stopAllPreviews = stopAllPreviews;
window.initCardPreviews = initCardPreviews;
window.openQRModal = openQRModal;
window.closeQRModal = closeQRModal;

// ── Init on DOM Ready ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initRealtimeUplink();
    renderAllMath();
});
