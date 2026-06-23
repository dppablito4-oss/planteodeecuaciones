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
        coverImage: 'assets/images/math_red_cover.png',
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
        coverImage: 'assets/images/math_green_cover.png',
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
        coverImage: 'assets/images/math_blue_cover.png',
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
        coverImage: 'assets/images/math_red_cover.png',
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
        coverImage: 'assets/images/math_olive_cover.png',
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
        coverImage: 'assets/images/math_blue_cover.png',
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
        coverImage: 'assets/images/math_olive_cover.png',
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
        coverImage: 'assets/images/math_green_cover.png',
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
        coverImage: 'assets/images/math_blue_cover.png',
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
        coverImage: 'assets/images/math_red_cover.png',
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
        coverImage: 'assets/math_problem_solving.png',
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
        coverImage: 'assets/math_logic_concept.png',
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
let lastExpectedAnswer = '';

// ── Profiles Management & Selection ──────────────────────────────────────────
const DEFAULT_PROFILES = [
    { name: 'Samuel Pablo', avatar: '🎓', color: '#e50914' },
    { name: 'Compañero 1', avatar: '📐', color: '#6366f1' },
    { name: 'Compañero 2', avatar: '∑', color: '#10b981' }
];

let currentEditingProfileIndex = null; // null represents adding a new profile

function getProfiles() {
    let profiles = localStorage.getItem('ecuaciones_profiles');
    if (!profiles) {
        profiles = JSON.stringify(DEFAULT_PROFILES);
        localStorage.setItem('ecuaciones_profiles', profiles);
    }
    return JSON.parse(profiles);
}

function saveProfiles(profiles) {
    localStorage.setItem('ecuaciones_profiles', JSON.stringify(profiles));
}

function renderProfiles() {
    const grid = document.getElementById('profiles-grid-container');
    if (!grid) return;

    const profiles = getProfiles();
    let html = '';
    profiles.forEach((p, idx) => {
        const isFile = p.avatar.includes('/');
        const avatarHtml = isFile 
            ? `<div class="profile-avatar">
                   <img src="${p.avatar}" alt="Avatar de ${p.name}" onerror="this.parentElement.innerHTML='<div style=\'width:100%;height:100%;background:linear-gradient(135deg,${p.color}aa,${p.color});display:flex;align-items:center;justify-content:center;font-size:3rem;\'>🎓</div>'">
               </div>`
            : `<div class="profile-avatar-icon" style="background:linear-gradient(135deg,${p.color}88,${p.color}); color:#fff; display:flex; align-items:center; justify-content:center; font-size:3.5rem;">
                   ${p.avatar}
               </div>`;

        html += `
        <div class="profile-card" role="button" tabindex="0" aria-label="Seleccionar perfil de ${p.name}"
             onclick="selectProfile('${p.name}', '${p.avatar}', '${p.color}')"
             onkeydown="if(event.key==='Enter') selectProfile('${p.name}','${p.avatar}','${p.color}')">
            ${avatarHtml}
            <span class="profile-name">${p.name}</span>
        </div>`;
    });

    // Fixed Guest Profile
    html += `
    <div class="profile-card" role="button" tabindex="0" aria-label="Entrar como invitado"
         onclick="selectProfile('Invitado', '👤', '#6d6d6e')"
         onkeydown="if(event.key==='Enter') selectProfile('Invitado','👤','#6d6d6e')">
        <div class="profile-avatar-icon" style="background:rgba(109,109,110,0.2); border:3px solid transparent; color:#6d6d6e; display:flex; align-items:center; justify-content:center; font-size:3.5rem;">
            <i class="fa-solid fa-user-plus"></i>
        </div>
        <span class="profile-name">Invitado</span>
    </div>`;

    grid.innerHTML = html;
}

function openProfileManageModal() {
    renderProfileManageList();
    document.getElementById('profile-list-view').style.display = 'block';
    document.getElementById('profile-form-view').style.display = 'none';
    document.getElementById('profile-manage-modal').classList.add('open');
}

function closeProfileManageModal() {
    document.getElementById('profile-manage-modal').classList.remove('open');
    renderProfiles(); // Refresh landing screen profiles
}

function renderProfileManageList() {
    const list = document.getElementById('profile-manage-list');
    if (!list) return;
    const profiles = getProfiles();
    let html = '';
    profiles.forEach((p, idx) => {
        const isFile = p.avatar.includes('/');
        const avatarHtml = isFile 
            ? `<img src="${p.avatar}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">`
            : p.avatar;
        html += `
        <div class="profile-manage-item">
            <div class="profile-manage-item-info">
                <div class="profile-manage-item-avatar" style="background:${p.color};">
                    ${avatarHtml}
                </div>
                <span class="profile-manage-item-name">${p.name}</span>
            </div>
            <div class="profile-manage-item-actions">
                <button class="profile-action-btn" onclick="showEditProfileForm(${idx})"><i class="fa-solid fa-pen"></i></button>
                <button class="profile-action-btn delete" onclick="deleteProfile(${idx})"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`;
    });
    list.innerHTML = html || '<p style="color:var(--color-text-muted);font-size:0.8rem;text-align:center;padding:12px 0;">No hay perfiles personalizados.</p>';
}

function showAddProfileForm() {
    currentEditingProfileIndex = null;
    document.getElementById('profile-form-title').textContent = 'Añadir Perfil';
    document.getElementById('profile-input-name').value = '';
    
    document.querySelectorAll('#avatar-choices .avatar-choice-item').forEach((el, i) => {
        el.classList.toggle('active', i === 0);
    });
    document.querySelectorAll('#color-choices .color-choice-item').forEach((el, i) => {
        el.classList.toggle('active', i === 0);
    });

    document.getElementById('profile-list-view').style.display = 'none';
    document.getElementById('profile-form-view').style.display = 'block';
}

function showEditProfileForm(idx) {
    currentEditingProfileIndex = idx;
    const profiles = getProfiles();
    const p = profiles[idx];

    document.getElementById('profile-form-title').textContent = 'Editar Perfil';
    document.getElementById('profile-input-name').value = p.name;

    document.querySelectorAll('#avatar-choices .avatar-choice-item').forEach(el => {
        el.classList.toggle('active', el.textContent.trim() === p.avatar);
    });

    document.querySelectorAll('#color-choices .color-choice-item').forEach(el => {
        const elColor = el.getAttribute('data-color');
        el.classList.toggle('active', elColor === p.color);
    });

    document.getElementById('profile-list-view').style.display = 'none';
    document.getElementById('profile-form-view').style.display = 'block';
}

function selectAvatarChoice(el) {
    document.querySelectorAll('#avatar-choices .avatar-choice-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');
}

function selectColorChoice(el) {
    document.querySelectorAll('#color-choices .color-choice-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');
}

function saveProfileForm() {
    const name = document.getElementById('profile-input-name').value.trim();
    if (!name) {
        showToast('Por favor, ingresa un nombre para el perfil.', 'warning');
        return;
    }

    const activeAvatarEl = document.querySelector('#avatar-choices .avatar-choice-item.active');
    const avatar = activeAvatarEl ? activeAvatarEl.textContent.trim() : '🎓';

    const activeColorEl = document.querySelector('#color-choices .color-choice-item.active');
    const color = activeColorEl ? activeColorEl.getAttribute('data-color') : '#e50914';

    const profiles = getProfiles();

    if (currentEditingProfileIndex === null) {
        profiles.push({ name, avatar, color });
        showToast(`Perfil "${name}" creado exitosamente.`, 'success');
    } else {
        profiles[currentEditingProfileIndex] = { name, avatar, color };
        showToast(`Perfil "${name}" actualizado.`, 'success');
    }

    saveProfiles(profiles);
    renderProfileManageList();
    cancelProfileForm();
}

function deleteProfile(idx) {
    const profiles = getProfiles();
    const name = profiles[idx].name;
    if (confirm(`¿Estás seguro de que deseas eliminar el perfil de "${name}"?`)) {
        profiles.splice(idx, 1);
        saveProfiles(profiles);
        renderProfileManageList();
        showToast(`Perfil "${name}" eliminado.`, 'info');
    }
}

function cancelProfileForm() {
    document.getElementById('profile-list-view').style.display = 'block';
    document.getElementById('profile-form-view').style.display = 'none';
}

function selectProfile(name, avatarSrc, accentColor) {
    activeProfile = { name, avatarSrc, accentColor };

    // Update header avatar
    const headerAvatar = document.getElementById('header-avatar');
    if (headerAvatar) {
        const isEmoji = !avatarSrc || (avatarSrc.length <= 2 && !avatarSrc.includes('/'));
        if (!isEmoji) {
            headerAvatar.outerHTML = `<div class="header-profile-mini-icon" id="header-avatar" style="background:${accentColor}22;" title="${name}">
                <img src="${avatarSrc}" alt="${name}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;" onerror="this.outerHTML='🎓'">
            </div>`;
        } else {
            headerAvatar.outerHTML = `<div class="header-profile-mini-icon" id="header-avatar" style="background:${accentColor}22; display:flex; align-items:center; justify-content:center;" title="${name}">
                ${avatarSrc || '🎓'}
            </div>`;
        }
    }

    // Fade out profile screen, fade in app
    const profileScreen = document.getElementById('profile-screen');
    const mainApp = document.getElementById('main-app');

    profileScreen.classList.add('fade-out');

    setTimeout(() => {
        profileScreen.style.display = 'none';
        mainApp.classList.add('visible');

        initScrollReveal();
        renderAllMath();
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

    const bgStyle = data.coverImage 
        ? `background: linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,0.4) 50%, rgba(20,20,20,0.85) 100%), url('${data.coverImage}');`
        : `background: ${data.heroColor};`;

    content.innerHTML = `
        <div class="modal-hero" style="${bgStyle}">
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
            </div>`,
            answer: "12 y 36"
        },
        "Intermedio": {
            problem: "Hace 5 años la edad de María era el doble de la de su prima Lucía. Si hoy sus edades suman 40 años, ¿cuántos años tiene María actualmente?",
            solution: `<div style="display:flex;flex-direction:column;gap:10px;">
                <p><span class="step-pill">Paso 1</span> Hace 5 años: Lucía = $y$, María = $2y$. Hoy: Lucía = $y+5$, María = $2y+5$.</p>
                <p><span class="step-pill">Paso 2</span> La suma actual: $(2y+5) + (y+5) = 40$.</p>
                <p><span class="step-pill">Paso 3</span> $3y + 10 = 40 \\Rightarrow y = 10$.</p>
                <p><span class="step-pill">Paso 4</span> María = $2(10) + 5 = 25$ años.</p>
                <p><span class="step-pill">Paso 5</span> $25 + 15 = 40$ ✓</p>
            </div>`,
            answer: "25"
        },
        "Avanzado": {
            problem: "Un abuelo hoy cuadruplica la edad de su nieto. Hace 10 años era el séxtuple. ¿En cuántos años la edad del abuelo será el triple de la del nieto?",
            solution: `<div style="display:flex;flex-direction:column;gap:10px;">
                <p><span class="step-pill">Paso 1</span> Nieto = $x$, Abuelo = $4x$. Hace 10: $4x-10 = 6(x-10)$.</p>
                <p><span class="step-pill">Paso 2</span> $4x-10=6x-60 \\Rightarrow 2x=50 \\Rightarrow x=25$. Abuelo=100.</p>
                <p><span class="step-pill">Paso 3</span> Buscamos $N$: $100+N = 3(25+N) \\Rightarrow N=12.5$ años.</p>
                <p><span class="step-pill">Paso 4</span> Las edades futuras serán 37.5 y 112.5 años, cantidades coherentes.</p>
                <p><span class="step-pill">Paso 5</span> En 12.5 años: Nieto=37.5, Abuelo=112.5. $112.5/37.5=3$ ✓</p>
            </div>`,
            answer: "12.5"
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
            </div>`,
            answer: "81"
        },
        "Intermedio": {
            problem: "El largo de un rectángulo mide 4 metros más que el doble de su ancho. Si el perímetro es de 56 metros, calcula sus lados.",
            solution: `<div style="display:flex;flex-direction:column;gap:10px;">
                <p><span class="step-pill">Paso 1</span> Ancho = $x$, Largo = $2x + 4$.</p>
                <p><span class="step-pill">Paso 2</span> Perímetro: $2(x) + 2(2x + 4) = 56$.</p>
                <p><span class="step-pill">Paso 3</span> $6x + 8 = 56 \\Rightarrow x = 8$.</p>
                <p><span class="step-pill">Paso 4</span> Ancho = 8 m, Largo = 20 m.</p>
                <p><span class="step-pill">Paso 5</span> $2(8) + 2(20) = 56$ ✓</p>
            </div>`,
            answer: "8 y 20"
        },
        "Avanzado": {
            problem: "En un triángulo rectángulo, la hipotenusa mide 2 cm más que el cateto mayor, y este 2 cm más que el menor. Determina el área.",
            solution: `<div style="display:flex;flex-direction:column;gap:10px;">
                <p><span class="step-pill">Paso 1</span> Cat. menor = $x$, mayor = $x+2$, hipotenusa = $x+4$.</p>
                <p><span class="step-pill">Paso 2</span> Pitágoras: $x^2 + (x+2)^2 = (x+4)^2$.</p>
                <p><span class="step-pill">Paso 3</span> $x^2 - 4x - 12 = 0 \\Rightarrow (x-6)(x+2)=0 \\Rightarrow x=6$.</p>
                <p><span class="step-pill">Paso 4</span> Catetos: 6 y 8. Área = $\\frac{6 \\times 8}{2} = 24$ cm².</p>
                <p><span class="step-pill">Paso 5</span> $6^2 + 8^2 = 100 = 10^2$ ✓</p>
            </div>`,
            answer: "24"
        }
    },
    "Móviles": {
        "Básico": {
            problem: "Dos autos parten de ciudades a 150 km de distancia y van al encuentro. Uno viaja a 60 km/h y el otro a 40 km/h. ¿En cuántas horas se encontrarán?",
            solution: `<div style="display:flex;flex-direction:column;gap:10px;">
                <p><span class="step-pill">Paso 1</span> Variable: Tiempo de encuentro = $t$ horas.</p>
                <p><span class="step-pill">Paso 2</span> Distancias: Auto A = $60t$, Auto B = $40t$.</p>
                <p><span class="step-pill">Paso 3</span> Ecuación: $60t + 40t = 150$.</p>
                <p><span class="step-pill">Paso 4</span> Resolviendo: $100t = 150 \\Rightarrow t = 1.5$ horas.</p>
                <p><span class="step-pill">Paso 5</span> Se encuentran en 1.5 horas (1 hora y 30 minutos). $60(1.5) + 40(1.5) = 90 + 60 = 150$ ✓</p>
            </div>`,
            answer: "1.5"
        },
        "Intermedio": {
            problem: "Un tren viaja a 80 km/h y otro a 100 km/h en la misma dirección. Si el segundo tren sale 1 hora después del primero, ¿en cuántas horas alcanzará al primer tren?",
            solution: `<div style="display:flex;flex-direction:column;gap:10px;">
                <p><span class="step-pill">Paso 1</span> Variable: Tiempo del segundo tren = $t$ horas. Tiempo del primer tren = $t+1$ horas.</p>
                <p><span class="step-pill">Paso 2</span> Distancias iguales: $80(t+1) = 100t$.</p>
                <p><span class="step-pill">Paso 3</span> Ecuación: $80t + 80 = 100t$.</p>
                <p><span class="step-pill">Paso 4</span> Resolviendo: $20t = 80 \\Rightarrow t = 4$ horas.</p>
                <p><span class="step-pill">Paso 5</span> El segundo tren alcanzará al primero en 4 horas. Distancia recorrida = 400 km ✓</p>
            </div>`,
            answer: "4"
        },
        "Avanzado": {
            problem: "Un ciclista recorre una distancia de 36 km. Si hubiera viajado a 3 km/h más rápido, habría tardado 1 hora menos. ¿A qué velocidad en km/h viajó?",
            solution: `<div style="display:flex;flex-direction:column;gap:10px;">
                <p><span class="step-pill">Paso 1</span> Variable: Velocidad inicial = $v$ km/h. Tiempo = $t = 36/v$.</p>
                <p><span class="step-pill">Paso 2</span> Nueva condición: $(v + 3)(t - 1) = 36$.</p>
                <p><span class="step-pill">Paso 3</span> Sustitución: $(v + 3)(\\frac{36}{v} - 1) = 36 \\Rightarrow 36 - v + \\frac{108}{v} - 3 = 36 \\Rightarrow v^2 + 3v - 108 = 0$.</p>
                <p><span class="step-pill">Paso 4</span> Factorización: $(v - 9)(v + 12) = 0 \\Rightarrow v = 9$ km/h.</p>
                <p><span class="step-pill">Paso 5</span> La velocidad original fue de 9 km/h. Con 9 km/h tarda 4h; con 12 km/h tarda 3h ✓</p>
            </div>`,
            answer: "9"
        }
    },
    "Grifos": {
        "Básico": {
            problem: "Un caño A llena una piscina en 4 horas y otro caño B la llena en 6 horas. Si se abren ambos caños a la vez, ¿en cuántas horas se llenará la piscina?",
            solution: `<div style="display:flex;flex-direction:column;gap:10px;">
                <p><span class="step-pill">Paso 1</span> Variable: Tiempo de llenado conjunto = $t$ horas.</p>
                <p><span class="step-pill">Paso 2</span> Fracción por hora: Caño A = $1/4$, Caño B = $1/6$.</p>
                <p><span class="step-pill">Paso 3</span> Ecuación: $\\frac{1}{4} + \\frac{1}{6} = \\frac{1}{t}$.</p>
                <p><span class="step-pill">Paso 4</span> Resolviendo: $\\frac{5}{12} = \\frac{1}{t} \\Rightarrow t = 12/5 = 2.4$ horas.</p>
                <p><span class="step-pill">Paso 5</span> Se llena en 2.4 horas (2 horas y 24 minutos). $\\frac{2.4}{4} + \\frac{2.4}{6} = 0.6 + 0.4 = 1$ (llena) ✓</p>
            </div>`,
            answer: "2.4"
        },
        "Intermedio": {
            problem: "Un grifo llena un tanque en 3 horas y un desagüe lo vacía en 5 horas. Si se abren ambos estando el tanque vacío, ¿en cuántas horas se llenará por completo?",
            solution: `<div style="display:flex;flex-direction:column;gap:10px;">
                <p><span class="step-pill">Paso 1</span> Variable: Tiempo de llenado = $t$ horas.</p>
                <p><span class="step-pill">Paso 2</span> Trabajo por hora: Grifo = $+1/3$, Desagüe = $-1/5$.</p>
                <p><span class="step-pill">Paso 3</span> Ecuación: $\\frac{1}{3} - \\frac{1}{5} = \\frac{1}{t}$.</p>
                <p><span class="step-pill">Paso 4</span> Resolviendo: $\\frac{2}{15} = \\frac{1}{t} \\Rightarrow t = 7.5$ horas.</p>
                <p><span class="step-pill">Paso 5</span> El tanque se llenará en 7.5 horas (7 horas y 30 minutos) ✓</p>
            </div>`,
            answer: "7.5"
        },
        "Avanzado": {
            problem: "Un tanque se puede llenar por dos caños en 2 horas. Si el primer caño solo tarda 3 horas más que el segundo solo, ¿cuántas horas tardaría el segundo caño solo en llenar el tanque?",
            solution: `<div style="display:flex;flex-direction:column;gap:10px;">
                <p><span class="step-pill">Paso 1</span> Variable: Tiempo del segundo caño solo = $x$ horas. Tiempo del primer caño solo = $x+3$ horas.</p>
                <p><span class="step-pill">Paso 2</span> Trabajo por hora conjunto: $\\frac{1}{x} + \\frac{1}{x+3} = \\frac{1}{2}$.</p>
                <p><span class="step-pill">Paso 3</span> Ecuación: $\\frac{2x+3}{x(x+3)} = \\frac{1}{2} \\Rightarrow 4x + 6 = x^2 + 3x \\Rightarrow x^2 - x - 6 = 0$.</p>
                <p><span class="step-pill">Paso 4</span> Factorización: $(x-3)(x+2) = 0 \\Rightarrow x = 3$ horas.</p>
                <p><span class="step-pill">Paso 5</span> El segundo caño tarda 3 horas. El primero tarda 6 horas. $\\frac{1}{3} + \\frac{1}{6} = \\frac{1}{2}$ ✓</p>
            </div>`,
            answer: "3"
        }
    }
};

class AIService {
    static async generateMockProblem(topic, difficulty) {
        return new Promise(resolve => {
            setTimeout(() => {
                const group = MOCK_PROBLEMS[topic] || MOCK_PROBLEMS['Edades'];
                const item = group[difficulty] || group['Básico'];
                resolve({ problem: item.problem, solution: item.solution, answer: item.answer });
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
        .on('broadcast', { event: 'laser-absolute' }, ({ payload }) => {
            if (!laser) return;
            laser.style.opacity = '1';
            laserX = payload.x * window.innerWidth;
            laserY = payload.y * window.innerHeight;
            laser.style.left = `${laserX}px`;
            laser.style.top = `${laserY}px`;
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => { laser.style.opacity = '0'; }, 1500);
        })
        .on('broadcast', { event: 'laser-click' }, () => {
            const el = document.elementFromPoint(laserX, laserY);
            if (el) {
                el.click();
                if (typeof el.focus === 'function') {
                    el.focus();
                }
            }
        })
        .on('broadcast', { event: 'scroll' }, ({ payload }) => {
            const slideView = document.querySelector('.presenter-slide-view');
            if (slideView && document.getElementById('presenter-overlay').classList.contains('active')) {
                slideView.scrollBy(0, payload.dy);
            } else {
                window.scrollBy(0, payload.dy);
            }
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

// ── Verification Helpers ──────────────────────────────────────────────────────
function getNumbers(str) {
    if (!str) return [];
    const matches = str.match(/\d+(\.\d+)?/g);
    return matches ? matches.map(Number).sort((a, b) => a - b) : [];
}

function verifyUserAnswer(userText, expectedText) {
    const userNums = getNumbers(userText);
    const expectedNums = getNumbers(expectedText);
    
    if (userNums.length === 0 || expectedNums.length === 0) {
        return userText.toLowerCase().trim() === expectedText.toLowerCase().trim();
    }
    
    if (userNums.length !== expectedNums.length) return false;
    
    return userNums.every((num, idx) => Math.abs(num - expectedNums[idx]) < 0.01);
}

function checkTallerAnswer() {
    const input = document.getElementById('practice-user-answer');
    const feedback = document.getElementById('practice-feedback-msg');
    if (!input || !feedback) return;
    
    const userVal = input.value.trim();
    if (!userVal) {
        showToast('Por favor, escribe una respuesta primero.', 'warning');
        return;
    }
    
    if (!lastExpectedAnswer) {
        showToast('No hay una respuesta esperada registrada para este problema.', 'info');
        return;
    }
    
    const isCorrect = verifyUserAnswer(userVal, lastExpectedAnswer);
    
    feedback.className = 'practice-feedback ' + (isCorrect ? 'success' : 'error');
    feedback.innerHTML = isCorrect 
        ? `<i class="fa-solid fa-face-grin-stars"></i> <strong>¡Correcto!</strong> La respuesta es ${lastExpectedAnswer}. ¡Excelente trabajo!`
        : `<i class="fa-solid fa-face-frown"></i> <strong>Inténtalo de nuevo.</strong> Sigue intentando y revisa tu planteamiento.`;
        
    if (isCorrect) {
        showToast('¡Respuesta Correcta! 🎉', 'success');
    } else {
        showToast('Respuesta incorrecta. Inténtalo otra vez.', 'warning');
    }
}

// ── Web Speech Synthesis (Lector de Voz) ──────────────────────────────────────
function speakText(text) {
    if (!text) {
        showToast('No hay texto para leer.', 'warning');
        return;
    }
    
    // Cancelar cualquier audio en curso
    window.speechSynthesis.cancel();
    
    // Limpiar LaTeX para lectura natural
    const cleanText = text
        .replace(/\$/g, '')
        .replace(/\\Rightarrow/g, ' significa ')
        .replace(/\\quad/g, ' ')
        .replace(/\\land/g, ' y ')
        .replace(/\\/g, '')
        .replace(/=/g, ' es igual a ')
        .replace(/\+/g, ' más ')
        .replace(/-/g, ' menos ');
        
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    
    // Usar la primera voz disponible en español
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(v => v.lang.startsWith('es'));
    if (esVoice) utterance.voice = esVoice;
    
    utterance.rate = 0.95; // Un poco más despacio para mejor comprensión
    
    utterance.onerror = (e) => {
        console.error('SpeechSynthesis error:', e);
        showToast('Error al reproducir el audio.', 'error');
    };
    
    window.speechSynthesis.speak(utterance);
    showToast('🔊 Reproduciendo enunciado en voz alta...', 'info');
}

function checkAIServiceStatus() {
    const badge = document.getElementById('ai-status-badge');
    if (!badge) return;
    
    if (SUPABASE_CONFIG.useEdgeFunctions && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
        // Realizar un preflight ping (OPTIONS) para comprobar si responde el endpoint
        fetch(`${SUPABASE_CONFIG.url}/functions/v1/generate-challenge`, {
            method: 'OPTIONS'
        }).then(res => {
            if (res.ok) {
                badge.className = 'ai-status-badge online';
                badge.innerHTML = '<i class="fa-solid fa-bolt"></i> Cloud IA (DeepSeek / OpenAI)';
            } else {
                badge.className = 'ai-status-badge offline';
                badge.innerHTML = '<i class="fa-solid fa-cloud-slash"></i> Offline (Simulación)';
            }
        }).catch(() => {
            badge.className = 'ai-status-badge offline';
            badge.innerHTML = '<i class="fa-solid fa-cloud-slash"></i> Offline (Simulación)';
        });
    } else {
        badge.className = 'ai-status-badge offline';
        badge.innerHTML = '<i class="fa-solid fa-cloud-slash"></i> Offline (Simulación)';
    }
}

// ── AI Button Handlers ────────────────────────────────────────────────────────
async function generateAIProblem() {
    const diff = document.getElementById('select-diff').value;
    const topic = document.getElementById('select-topic').value;
    const btn = document.getElementById('btn-generate-ai');
    const output = document.getElementById('ai-problem-output');
    const btnSol = document.getElementById('btn-reveal-solution');

    // Limpiamos y ocultamos el contenedor de solución separado
    const solOutput = document.getElementById('ai-solution-output');
    if (solOutput) {
        solOutput.innerHTML = '';
        solOutput.style.display = 'none';
    }

    output.innerHTML = `<div style="display:flex;align-items:center;gap:10px;height:100%;justify-content:center;">
        <i class="fa-solid fa-spinner fa-spin" style="color:var(--color-accent);font-size:1.5rem;"></i>
        <span style="color:var(--color-text-muted);">Generando desafío matemático...</span>
    </div>`;
    btn.disabled = true; btnSol.disabled = true;

    try {
        const challenge = await AIService.generateProblem(topic, diff);
        output.innerHTML = `<div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
                <p style="color:#46d369;font-weight:700;font-size:0.75rem;text-transform:uppercase;letter-spacing:1px;margin:0;">¡Nuevo Desafío!</p>
                <button class="speaker-btn" style="margin-left:0; width: 30px; height: 30px;" onclick="speakText(document.getElementById('challenge-text').textContent)" title="Escuchar problema">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <p id="challenge-text" style="color:var(--color-text-secondary);line-height:1.65;margin-bottom:12px;">${challenge.problem}</p>
            
            <!-- Contenedor interactivo de práctica -->
            <div class="practice-container">
                <span class="practice-title">📝 ¡Ponte a prueba!</span>
                <div class="practice-input-row">
                    <input type="text" id="practice-user-answer" class="practice-input" placeholder="Ingresa tu respuesta (ej: 12 o 20 y 30)..." onkeydown="if(event.key==='Enter') checkTallerAnswer()">
                    <button class="practice-btn-check" onclick="checkTallerAnswer()">
                        <i class="fa-solid fa-circle-check"></i> Verificar
                    </button>
                </div>
                <div id="practice-feedback-msg" class="practice-feedback"></div>
            </div>
        </div>`;
        lastSolutionHtml = challenge.solution;
        lastExpectedAnswer = challenge.answer || '';
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
    const solOutput = document.getElementById('ai-solution-output');
    if (solOutput) {
        solOutput.innerHTML = `<div>
            <p style="color:#46d369;font-weight:700;font-size:0.75rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Resolución Paso a Paso:</p>
            <div style="font-size:0.82rem;display:flex;flex-direction:column;gap:8px;">${lastSolutionHtml}</div>
        </div>`;
        solOutput.style.display = 'block';
        solOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
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
window.openProfileManageModal = openProfileManageModal;
window.closeProfileManageModal = closeProfileManageModal;
window.showAddProfileForm = showAddProfileForm;
window.showEditProfileForm = showEditProfileForm;
window.selectAvatarChoice = selectAvatarChoice;
window.selectColorChoice = selectColorChoice;
window.saveProfileForm = saveProfileForm;
window.deleteProfile = deleteProfile;
window.cancelProfileForm = cancelProfileForm;
window.checkTallerAnswer = checkTallerAnswer;
window.speakText = speakText;
window.initCardBackgrounds = initCardBackgrounds;

/**
 * Aplica de forma dinámica las imágenes de fondo opacas (con overlays) 
 * a cada tarjeta de diapositiva basadas en SLIDES_DATA.
 */
function initCardBackgrounds() {
    document.querySelectorAll('.slide-card').forEach(card => {
        const onclickAttr = card.getAttribute('onclick') || '';
        const match = onclickAttr.match(/openSlideModal\(['"]([^'"]+)['"]\)/);
        if (!match) return;
        
        const slideId = match[1];
        const slideData = SLIDES_DATA[slideId];
        if (!slideData || !slideData.coverImage) return;

        const thumbInner = card.querySelector('.slide-card-thumb-inner');
        if (thumbInner) {
            // Aplicamos degradado semi-opaco oscuro estilo Netflix y la imagen del tema/subtema
            thumbInner.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.85) 100%), url('${slideData.coverImage}')`;
            thumbInner.style.backgroundSize = 'cover';
            thumbInner.style.backgroundPosition = 'center';
            thumbInner.style.backgroundRepeat = 'no-repeat';
        }
    });
}

// ── Init on DOM Ready ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initRealtimeUplink();
    renderProfiles();
    checkAIServiceStatus();
    renderAllMath();
    initCardBackgrounds();
    initTorneo();
});

// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: TORNEO EN VIVO "MATH-FLIX"
// ═══════════════════════════════════════════════════════════════════════════

// ── Banco de preguntas del torneo ────────────────────────────────────────────
const TORNEO_PREGUNTAS = [
    { id: 1, texto: 'La suma de tres números consecutivos es 72. Halla los números.' },
    { id: 2, texto: 'El doble de un número aumentado en 5 es igual a 21. Encuentra el número.' },
    { id: 3, texto: 'La edad de Ana es el triple de la de su hijo. Dentro de 10 años será el doble. ¿Qué edad tiene cada uno?' },
    { id: 4, texto: 'En un rectángulo el largo es 4 cm mayor que el ancho y su perímetro es 32 cm. Halla sus dimensiones.' },
    { id: 5, texto: 'Se reparten 50 caramelos entre dos niños de modo que uno recibe 10 más que el otro. ¿Cuántos recibe cada uno?' },
];

// ── Estado local del torneo ───────────────────────────────────────────────────
let torneoEstado = { pantalla_actual: 'lobby', pregunta_actual_id: 1, tiempo_restante: 60 };
let torneoTimerInterval = null;
let torneoParticipantes = [];
let torneoRespuestasActuales = 0;

// ── Init ──────────────────────────────────────────────────────────────────────
function initTorneo() {
    if (!supabaseClient) return;

    // Suscribirse a cambios en estado_juego (para el overlay de la pantalla grande)
    supabaseClient
        .channel('torneo-estado-grande')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'estado_juego' }, ({ new: payload }) => {
            torneoEstado = payload;
            if (document.getElementById('tournament-overlay').style.display !== 'none') {
                _torneoRenderPanel(payload);
            }
        })
        .subscribe();

    // Suscribirse a participantes
    supabaseClient
        .channel('torneo-participantes-grande')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'participantes' }, () => {
            _torneoRecargarParticipantes();
        })
        .subscribe();

    // Suscribirse a respuestas (para el contador en tiempo real durante pregunta)
    supabaseClient
        .channel('torneo-respuestas-grande')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'respuestas' }, () => {
            torneoRespuestasActuales++;
            _torneoActualizarContadorRespuestas();
        })
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'respuestas', filter: 'procesado=eq.true' }, () => {
            // Cuando una respuesta queda procesada, refrescar leaderboard si está visible
            if (torneoEstado.pantalla_actual === 'leaderboard') _torneoRenderLeaderboard();
        })
        .subscribe();
}

// ── Abrir / cerrar overlay ────────────────────────────────────────────────────
async function openTorneoOverlay() {
    const overlay = document.getElementById('tournament-overlay');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Generar QR para torneo.html
    const base      = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
    const torneoURL = base + 'torneo.html';
    document.getElementById('torneo-qr-img').src  = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&color=141414&bgcolor=ffffff&data=${encodeURIComponent(torneoURL)}`;
    document.getElementById('torneo-qr-url').textContent = torneoURL;

    // Cargar estado actual
    if (supabaseClient) {
        const { data } = await supabaseClient.from('estado_juego').select('*').eq('id', 'global').single();
        if (data) { torneoEstado = data; _torneoRenderPanel(data); }
        else _torneoRenderPanel(torneoEstado);
    } else {
        _torneoRenderPanel(torneoEstado);
    }

    await _torneoRecargarParticipantes();
}

function closeTorneoOverlay() {
    document.getElementById('tournament-overlay').style.display = 'none';
    document.body.style.overflow = '';
    clearInterval(torneoTimerInterval);
}

// ── Render central ────────────────────────────────────────────────────────────
function _torneoRenderPanel(estado) {
    ['lobby','pregunta','leaderboard'].forEach(p => {
        const el = document.getElementById(`torneo-panel-${p}`);
        if (el) el.style.display = 'none';
    });

    const panelId = estado.pantalla_actual === 'pregunta' ? 'pregunta' : estado.pantalla_actual;
    const panel = document.getElementById(`torneo-panel-${panelId}`);
    if (panel) panel.style.display = 'flex';

    if (estado.pantalla_actual === 'pregunta') {
        _torneoRenderPregunta(estado);
    } else if (estado.pantalla_actual === 'leaderboard') {
        _torneoRenderLeaderboard();
    }
}

// ── Panel: Lobby ──────────────────────────────────────────────────────────────
async function _torneoRecargarParticipantes() {
    if (!supabaseClient) return;
    const { data } = await supabaseClient
        .from('participantes')
        .select('id, nombre, puntaje')
        .order('created_at', { ascending: true });

    if (!data) return;
    torneoParticipantes = data;

    const countEl = document.getElementById('torneo-count');
    const grid    = document.getElementById('torneo-participantes-grid');
    if (!countEl || !grid) return;

    countEl.textContent = data.length;
    grid.innerHTML = data.map(p => `
        <div onclick="abrirDetalleAlumno('${p.id}','${p.nombre.replace(/'/g,"'")}')"
             style="
            background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.09);
            border-radius:10px; padding:8px 14px;
            font-size:0.8rem; font-weight:600; color:#e5e5e5;
            display:flex; align-items:center; gap:8px;
            animation:fadeInCard 0.4s ease;
            cursor:pointer; transition:background 0.15s;
        " onmouseover="this.style.background='rgba(255,255,255,0.11)'" onmouseout="this.style.background='rgba(255,255,255,0.06)'">
            <span style="width:28px;height:28px;border-radius:50%;background:rgba(229,9,20,0.15);
                display:flex;align-items:center;justify-content:center;font-size:0.9rem;">🎓</span>
            ${p.nombre}
        </div>`).join('');
}

// ── Panel: Pregunta ───────────────────────────────────────────────────────────
async function _torneoRenderPregunta(estado) {
    const pid = estado.pregunta_actual_id || 1;
    // Usar texto personalizado si existe, sino banco estático
    const textoCustom = estado.pregunta_custom_texto;
    const pregunta = TORNEO_PREGUNTAS.find(p => p.id === pid) || TORNEO_PREGUNTAS[0];
    const textoFinal = textoCustom || pregunta.texto;

    document.getElementById('torneo-p-badge').textContent = `Pregunta ${pid}`;
    document.getElementById('torneo-p-texto').textContent  = textoFinal;

    // Contar respuestas de esta pregunta
    if (supabaseClient) {
        const { count } = await supabaseClient
            .from('respuestas')
            .select('*', { count: 'exact', head: true })
            .eq('pregunta_id', pid);
        torneoRespuestasActuales = count || 0;
    }
    _torneoActualizarContadorRespuestas();

    // Timer
    clearInterval(torneoTimerInterval);
    const ahora = new Date().getTime();
    const updatedAt = estado.updated_at ? new Date(estado.updated_at).getTime() : ahora;
    const segundosTranscurridos = Math.floor((ahora - updatedAt) / 1000);
    let t = Math.max(0, (estado.tiempo_restante || 60) - segundosTranscurridos);

    const timerEl = document.getElementById('torneo-timer');
    const _tick = () => {
        if (!timerEl) { clearInterval(torneoTimerInterval); return; }
        timerEl.textContent = t;
        timerEl.style.color = t <= 10 ? '#e50914' : '#46d369';
        if (t <= 0) {
            clearInterval(torneoTimerInterval);
            return;
        }
        t--;
    };
    _tick();
    torneoTimerInterval = setInterval(_tick, 1000);
}

function _torneoActualizarContadorRespuestas() {
    const el       = document.getElementById('torneo-resp-count');
    const progBar  = document.getElementById('torneo-prog-bar');
    const progText = document.getElementById('torneo-prog-text');
    if (!el) return;

    const total = torneoParticipantes.length || 1;
    const pct   = Math.min(100, Math.round((torneoRespuestasActuales / total) * 100));

    el.textContent        = torneoRespuestasActuales;
    if (progText) progText.textContent = `${torneoRespuestasActuales} de ${torneoParticipantes.length} alumnos`;
    if (progBar)  progBar.style.width  = `${pct}%`;
}

// ── Panel: Leaderboard ────────────────────────────────────────────────────────
async function _torneoRenderLeaderboard() {
    if (!supabaseClient) return;
    const { data } = await supabaseClient
        .from('participantes')
        .select('id, nombre, puntaje')
        .order('puntaje', { ascending: false })
        .limit(20);

    const list = document.getElementById('torneo-leaderboard-list');
    if (!list || !data) return;

    const medals = ['🥇','🥈','🥉'];
    list.innerHTML = data.map((p, i) => {
        const medal   = medals[i] || `#${i + 1}`;
        const isTop   = i < 3;
        const accent  = i === 0 ? '#f59e0b' : i === 1 ? '#9ca3af' : i === 2 ? '#b87333' : '#b3b3b3';
        return `
        <div onclick="abrirDetalleAlumno('${p.id || ''}','${(p.nombre || '').replace(/'/g,"'")}')"
             style="
            display:flex; align-items:center; justify-content:space-between;
            padding:14px 20px;
            background:${isTop ? `rgba(255,255,255,0.05)` : `rgba(255,255,255,0.02)`};
            border:1px solid ${isTop ? `rgba(255,255,255,0.12)` : `rgba(255,255,255,0.05)`};
            border-radius:12px;
            ${i === 0 ? 'box-shadow:0 0 24px rgba(245,158,11,0.15);' : ''}
            animation:fadeInCard 0.3s ease ${i * 0.06}s both;
            cursor:pointer; transition:background 0.12s;
        " onmouseover="this.style.filter='brightness(1.12)'" onmouseout="this.style.filter=''">
            <div style="display:flex;align-items:center;gap:14px;">
                <span style="font-size:${isTop ? '1.5rem' : '1rem'};min-width:32px;text-align:center;">${medal}</span>
                <span style="font-size:${isTop ? '1rem' : '0.88rem'};font-weight:${isTop ? '700' : '500'};color:#fff;">${p.nombre}</span>
            </div>
            <span style="font-size:${isTop ? '1.4rem' : '1rem'};font-weight:800;color:${accent};">${p.puntaje}<span style="font-size:0.6rem;color:#6d6d6e;margin-left:2px;">pts</span></span>
        </div>`;
    }).join('');
}

// ── Controles del Profesor ────────────────────────────────────────────────────
async function torneoSetPantalla(pantalla) {
    if (!supabaseClient) return showToast('Supabase no conectado', 'error');

    const pregId = torneoEstado.pregunta_actual_id || 1;
    const { error } = await supabaseClient
        .from('estado_juego')
        .update({ pantalla_actual: pantalla, pregunta_actual_id: pregId, tiempo_restante: 60, updated_at: new Date().toISOString() })
        .eq('id', 'global');

    if (error) return showToast('Error: ' + error.message, 'error');

    torneoEstado.pantalla_actual = pantalla;
    _torneoRenderPanel(torneoEstado);
    showToast(`Pantalla cambiada a: ${pantalla}`, 'success');
}

async function torneoSiguientePregunta() {
    const nextId = Math.min(TORNEO_PREGUNTAS.length, (torneoEstado.pregunta_actual_id || 1) + 1);
    if (!supabaseClient) return;

    const { error } = await supabaseClient
        .from('estado_juego')
        .update({ pregunta_actual_id: nextId, pantalla_actual: 'pregunta', tiempo_restante: 60, updated_at: new Date().toISOString() })
        .eq('id', 'global');

    if (error) return showToast('Error: ' + error.message, 'error');
    torneoEstado.pregunta_actual_id = nextId;
    torneoEstado.pantalla_actual    = 'pregunta';
    torneoRespuestasActuales = 0;
    _torneoRenderPanel(torneoEstado);
    showToast(`Pregunta ${nextId} lanzada`, 'success');
}

async function torneoReset() {
    if (!confirm('¿Resetear el torneo completo? Esto borrará respuestas y puntajes.')) return;
    if (!supabaseClient) return;

    await supabaseClient.from('respuestas').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabaseClient.from('participantes').update({ puntaje: 0 }).neq('id', '00000000-0000-0000-0000-000000000000');
    await supabaseClient.from('estado_juego').update({ pantalla_actual: 'lobby', pregunta_actual_id: 1, tiempo_restante: 60 }).eq('id', 'global');

    torneoEstado = { pantalla_actual: 'lobby', pregunta_actual_id: 1, tiempo_restante: 60 };
    torneoRespuestasActuales = 0;
    _torneoRenderPanel(torneoEstado);
    await _torneoRecargarParticipantes();
    showToast('Torneo reseteado correctamente', 'info');
}

// ── Global bindings (torneo) ─────────────────────────────────────────────────
window.openTorneoOverlay       = openTorneoOverlay;
window.closeTorneoOverlay      = closeTorneoOverlay;
window.torneoSetPantalla       = torneoSetPantalla;
window.torneoSiguientePregunta = torneoSiguientePregunta;
window.torneoReset             = torneoReset;
window.abrirDetalleAlumno      = abrirDetalleAlumno;
window.cerrarDetalleAlumnoModal = cerrarDetalleAlumnoModal;

// ── Modal Visor de Soluciones ────────────────────────────────────────────────
async function abrirDetalleAlumno(participanteId, nombre) {
    if (!supabaseClient || !participanteId) return;
    const modal = document.getElementById('torneo-detalle-alumno-modal');
    if (!modal) return;

    // Rellenar con datos básicos mientras carga
    document.getElementById('tdm-nombre').textContent       = nombre || '—';
    document.getElementById('tdm-puntaje').textContent      = '…';
    document.getElementById('tdm-transcripcion').textContent = '…';
    document.getElementById('tdm-feedback').textContent     = '…';
    document.getElementById('tdm-foto').src                 = '';
    document.getElementById('tdm-pregunta-label').textContent = '';
    modal.style.display = 'flex';

    // Consultar última respuesta procesada del alumno
    const { data } = await supabaseClient
        .from('respuestas')
        .select('*')
        .eq('participante_id', participanteId)
        .eq('procesado', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

    if (!data) {
        document.getElementById('tdm-puntaje').textContent      = '—';
        document.getElementById('tdm-transcripcion').textContent = 'Sin respuesta evaluada aún.';
        document.getElementById('tdm-feedback').textContent     = '—';
        return;
    }

    const scoreColors = { 5:'#46d369', 4:'#46d369', 3:'#f59e0b', 2:'#e50914', 1:'#e50914', 0:'#e50914' };
    const puntajeEl = document.getElementById('tdm-puntaje');
    puntajeEl.textContent  = data.puntaje_asignado ?? '—';
    puntajeEl.style.color  = scoreColors[data.puntaje_asignado] || '#b3b3b3';

    document.getElementById('tdm-pregunta-label').textContent =
        `Pregunta ${data.pregunta_id} · ${data.puntaje_asignado ?? '?'}/5 puntos`;
    document.getElementById('tdm-transcripcion').textContent =
        data.transcripcion_interna || '(sin transcripción disponible)';
    document.getElementById('tdm-feedback').textContent =
        data.feedback || '(sin feedback disponible)';

    if (data.url_foto) {
        document.getElementById('tdm-foto').src = data.url_foto;
        document.getElementById('tdm-foto').style.display = 'block';
    }
}

function cerrarDetalleAlumnoModal() {
    const modal = document.getElementById('torneo-detalle-alumno-modal');
    if (modal) modal.style.display = 'none';
}
