(function () {
  "use strict";

  const ACADEMY_VERSION = "1.0";
  const EXTRA_LESSONS = [
    {
      id:"dom", module:"JavaScript", icon:"🕹️", title:"DOM y eventos: hacer que la página reaccione", xp:70,
      lead:"Ahora conectas JavaScript con botones, textos y elementos reales de la página.",
      easy:"El DOM es el mapa que JavaScript usa para encontrar cosas en la página. Un evento es algo que pasa: tocar un botón, escribir o enviar un formulario.",
      theory:"document.getElementById busca un elemento por su id. addEventListener escucha un evento. Cuando ocurre, ejecuta una función.",
      code:"const boton = document.getElementById(\"entrar\");\n\nboton.addEventListener(\"click\", () => {\n  console.log(\"Tocaste el botón\");\n});",
      quiz:{q:"¿Qué hace addEventListener(\"click\", ...)?",options:["Cambia el CSS","Escucha cuando se toca o hace clic","Guarda una contraseña"],answer:1,explain:"Escucha el evento click y ejecuta código cuando ocurre."},
      task:{prompt:"Busca un elemento cuyo id sea mensaje.",starter:"const mensaje = ",check:v=>/document\.getElementById\s*\(\s*["']mensaje["']\s*\)/i.test(v),hint:"Usa document.getElementById(\"mensaje\")."}
    },
    {
      id:"debug", module:"Depuración", icon:"🧯", title:"Errores: aprender a encontrar lo que se rompió", xp:75,
      lead:"Programar también es investigar. Aquí aprendes a leer errores sin entrar en pánico.",
      easy:"Un error es una pista. La consola te dice dónde empezó el problema y tú vas descartando causas.",
      theory:"Primero reproduce el fallo. Después mira la consola, identifica la primera línea relevante, revisa nombres y valores, y cambia una sola cosa cada vez.",
      code:"console.log(\"Antes del problema\");\n\nconst usuario = null;\n// usuario.nombre causaría un error\n\nconsole.log(usuario);",
      quiz:{q:"¿Qué conviene hacer primero cuando algo deja de funcionar?",options:["Cambiar diez cosas","Reproducir el fallo y mirar el error","Borrar todo"],answer:1,explain:"Si puedes reproducir el fallo, puedes investigarlo paso a paso."},
      task:{prompt:"Escribe una línea que muestre nivel en la consola.",starter:"",check:v=>/console\.log\s*\(\s*nivel\s*\)\s*;?/i.test(v),hint:"La herramienta básica es console.log(...)."}
    },
    {
      id:"json", module:"Datos", icon:"🗂️", title:"JSON: organizar y mover información", xp:75,
      lead:"JSON aparece por todas partes cuando una app guarda datos o habla con una API.",
      easy:"JSON es una ficha ordenada con nombres y valores.",
      theory:"Un objeto JSON usa pares clave-valor. Sirve para representar usuarios, misiones, peces, configuraciones y respuestas de APIs.",
      code:"{\n  \"name\": \"KAIZO\",\n  \"level\": 70,\n  \"admin\": true\n}",
      quiz:{q:"En JSON, ¿qué representa \"level\": 70?",options:["Una clave y su valor","Una función","Un botón"],answer:0,explain:"level es la clave y 70 es su valor."},
      task:{prompt:"Escribe una propiedad JSON llamada xp con valor 100.",starter:"{\n  \n}",check:v=>/["']?xp["']?\s*:\s*100/i.test(v),hint:"Dentro de las llaves escribe \"xp\": 100."}
    },
    {
      id:"api", module:"APIs", icon:"🔌", title:"APIs: hacer que dos programas hablen", xp:85,
      lead:"Una API permite pedir información o acciones a otro sistema.",
      easy:"Es como un camarero: tú haces un pedido con una forma concreta y recibes una respuesta.",
      theory:"fetch hace una petición HTTP. await espera la respuesta. response.json() convierte JSON recibido en un objeto que JavaScript puede usar.",
      code:"const response = await fetch(\"https://example.com/api/data\");\nconst data = await response.json();\nconsole.log(data);",
      quiz:{q:"¿Para qué sirve fetch?",options:["Pedir recursos o datos","Cambiar el color de un botón","Crear una carpeta"],answer:0,explain:"fetch realiza una petición a una URL."},
      task:{prompt:"Escribe una llamada fetch a /api/users.",starter:"const response = ",check:v=>/fetch\s*\(\s*["']\/api\/users["']\s*\)/i.test(v),hint:"Usa fetch(\"/api/users\")."}
    },
    {
      id:"supabase", module:"Backend", icon:"🗄️", title:"Supabase: usuarios, datos y backend", xp:90,
      lead:"Aquí conectas lo que ya has visto con una base de datos real y autenticación.",
      easy:"Supabase es como la oficina detrás de tu app: guarda datos, usuarios y permisos.",
      theory:"El frontend pide datos. Supabase puede autenticar al usuario, consultar tablas y aplicar reglas de seguridad. Nunca debes confiar solo en ocultar botones en la pantalla.",
      code:"const { data, error } = await supabase\n  .from(\"profiles\")\n  .select(\"id, username\");",
      quiz:{q:"¿Dónde deberían aplicarse los permisos importantes?",options:["Solo ocultando botones","En el backend/base de datos también","En el color del CSS"],answer:1,explain:"La interfaz ayuda, pero la seguridad real debe existir en el backend y sus reglas."},
      task:{prompt:"Completa el nombre de la tabla profiles.",starter:"supabase.from(\"\")",check:v=>/\.from\s*\(\s*["']profiles["']\s*\)/i.test(v),hint:"La tabla se llama profiles."}
    },
    {
      id:"security", module:"Seguridad", icon:"🛡️", title:"Seguridad: secretos, permisos y confianza", xp:95,
      lead:"Aprende qué jamás debe quedar expuesto en el navegador.",
      easy:"Todo lo que llega al teléfono del usuario puede ser inspeccionado. Un secreto de verdad debe quedarse del lado del servidor.",
      theory:"Claves públicas diseñadas para frontend pueden estar en la app, pero secretos administrativos, service role keys, tokens privados y contraseñas nunca deben incrustarse en JavaScript público.",
      code:"// ❌ Nunca\nconst SERVICE_ROLE_KEY = \"secreto-admin\";\n\n// ✅ Mantén secretos en servidor / Edge Function",
      quiz:{q:"¿Dónde debe ir un secreto administrativo?",options:["En script.js público","En una función o servidor protegido","En un comentario HTML"],answer:1,explain:"El navegador no es un lugar seguro para secretos administrativos."},
      task:{prompt:"Escribe la palabra server para indicar dónde guardarías un secreto.",starter:"",check:v=>/^\s*server\s*$/i.test(v),hint:"Escribe exactamente: server"}
    },
    {
      id:"pwa", module:"Móvil", icon:"📱", title:"PWA: convertir una web en experiencia de app", xp:85,
      lead:"Una PWA puede instalarse, abrir a pantalla completa y cachear recursos.",
      easy:"Es una web que se comporta más como una aplicación.",
      theory:"El manifest describe nombre, icono y apariencia. El service worker puede guardar archivos para funcionar mejor u offline. En iPhone se añade desde Compartir → Añadir a pantalla de inicio.",
      code:"{\n  \"name\": \"KAIZO Code Academy\",\n  \"display\": \"standalone\",\n  \"start_url\": \"./\"\n}",
      quiz:{q:"¿Qué archivo describe cómo se presenta una PWA instalada?",options:["manifest","README","gitignore"],answer:0,explain:"El web app manifest define nombre, iconos, start_url y display."},
      task:{prompt:"Escribe el valor que hace que la app se abra como aplicación independiente.",starter:"display: ",check:v=>/display\s*:\s*["']?standalone["']?/i.test(v),hint:"El valor es standalone."}
    },
    {
      id:"finalboss", module:"Proyecto final", icon:"🏰", title:"BOSS FINAL: construye una mini app tú mismo", xp:200, boss:true,
      lead:"Aquí ya no copias una solución completa. Combinas estructura, estilo, lógica, datos y depuración.",
      easy:"Vas a crear una pequeña app desde cero usando todo lo que aprendiste.",
      theory:"Tu objetivo será crear una app con título, campo de texto, botón, lista dinámica, almacenamiento local y una interfaz usable en móvil. Haz una parte, pruébala y continúa.",
      code:"// Plan\n// 1. HTML\n// 2. CSS mobile-first\n// 3. JavaScript\n// 4. Guardar datos\n// 5. Probar errores",
      quiz:{q:"¿Cuál es la mejor forma de construir un proyecto grande?",options:["Todo de una vez","En partes pequeñas que puedas probar","Sin probar hasta el final"],answer:1,explain:"Las partes pequeñas reducen errores y hacen más fácil entender qué cambió."},
      task:{prompt:"Escribe una función llamada guardar.",starter:"function ",check:v=>/function\s+guardar\s*\(\s*\)\s*\{/i.test(v),hint:"Empieza con function guardar() {"}
    }
  ];

  EXTRA_LESSONS.forEach(function (lesson) {
    if (!lessons.some(function (x) { return x.id === lesson.id; })) lessons.push(lesson);
  });

  const INSIGHTS = {
    web:["Por qué importa","Todo lo demás se apoya en esta idea: navegador, archivos y servidor cumplen trabajos diferentes."],
    html:["Dónde ya lo usaste","Cada tarjeta, botón y sección de nuestras guías existe porque primero hay HTML."],
    css:["Dónde ya lo usaste","Cuando una web se veía bien en PC pero mal en iPhone, el problema estaba en cómo diseñábamos el layout y el CSS responsive."],
    vars:["Dónde ya lo usaste","Nivel, XP, usuario conectado y progreso son valores que una aplicación necesita guardar en variables."],
    if:["Dónde ya lo usaste","El panel de administrador puede decidir qué mostrar usando condiciones; la seguridad real, además, debe reforzarse en backend."],
    github:["Dónde ya lo usaste","Esta escuela está publicada desde el repositorio kaizo-code-academy. Cada actualización queda guardada como commit."],
    boss:["Objetivo del boss","Demostrar que entiendes estructura + variable + evento, no solo que reconoces palabras."],
    dom:["Dónde ya lo usaste","Cada botón que abre una pestaña, cambia una pantalla o ejecuta código usa DOM y eventos."],
    debug:["Regla de oro","No cambies diez cosas a la vez. Reproduce, observa, cambia una cosa, vuelve a probar."],
    json:["Dónde ya lo usaste","Las fichas de Blue Quest, peces, usuarios y respuestas de APIs se pueden representar como objetos de datos."],
    api:["Dónde ya lo usaste","Cuando una app consulta Discord o un servicio externo, está hablando mediante una API."],
    supabase:["Dónde ya lo usaste","Login, recuperación de contraseña, perfiles y permisos son ejemplos reales de backend."],
    security:["Regla de oro","Que algo esté oculto en la interfaz no significa que esté protegido."],
    pwa:["Qué estás viendo ahora","KAIZO Code Academy ya está preparada para funcionar como PWA y añadirse al inicio del iPhone."],
    finalboss:["Meta","Cuando termines, deberías poder leer un proyecto pequeño, modificarlo y entender qué investigar cuando falle."]
  };

  const GLOSSARY = [
    ["HTML","Estructura de una página: qué elementos existen."],
    ["CSS","Reglas visuales: colores, tamaños, espacios y layout."],
    ["JavaScript","Lógica y comportamiento de una página."],
    ["Variable","Nombre que apunta a un valor que queremos usar."],
    ["Función","Grupo reutilizable de instrucciones."],
    ["DOM","Representación de la página que JavaScript puede leer y modificar."],
    ["Evento","Algo que ocurre: click, input, submit, load, etc."],
    ["Frontend","Parte que corre en el dispositivo del usuario."],
    ["Backend","Parte que corre en servidor y gestiona lógica/datos protegidos."],
    ["API","Contrato para que programas intercambien datos o acciones."],
    ["JSON","Formato de texto para representar datos estructurados."],
    ["Repository","Proyecto gestionado con Git/GitHub."],
    ["Commit","Punto de guardado con un conjunto de cambios."],
    ["Push","Subir commits al repositorio remoto."],
    ["Pull","Traer cambios del repositorio remoto."],
    ["Branch","Rama separada para trabajar sin tocar directamente la principal."],
    ["Database","Sistema organizado para guardar y consultar datos."],
    ["Auth","Sistema para identificar usuarios y manejar sesiones."],
    ["PWA","Web instalable con capacidades parecidas a una app."],
    ["Service worker","Script especial que puede cachear recursos y trabajar en segundo plano limitado."]
  ];

  const style = document.createElement("style");
  style.textContent = [
    ".academy-v1-card{margin-top:12px;padding:18px}",
    ".academy-v1-grid{display:grid;gap:10px}",
    ".academy-v1-grid.two{grid-template-columns:1fr 1fr}",
    ".academy-v1-row{display:flex;gap:10px;align-items:center;justify-content:space-between}",
    ".academy-v1-kpi{padding:14px;border:1px solid var(--line);border-radius:14px;background:#10131c}",
    ".academy-v1-kpi small{display:block;color:var(--muted);font-size:11px}",
    ".academy-v1-kpi strong{display:block;margin-top:5px;font-size:18px}",
    ".academy-v1-note{width:100%;min-height:110px;margin-top:10px;border:1px solid var(--line);border-radius:14px;background:#090b11;color:var(--text);padding:13px;resize:vertical}",
    ".academy-v1-practice button{width:100%;margin-top:8px}",
    ".academy-v1-practice .answer{min-height:42px;border:1px solid var(--line);background:#171b29;color:var(--text);border-radius:12px;padding:10px 12px;text-align:left}",
    ".academy-v1-practice .answer.good{border-color:rgba(34,197,94,.7);background:rgba(34,197,94,.08)}",
    ".academy-v1-practice .answer.bad{border-color:rgba(239,68,68,.7);background:rgba(239,68,68,.08)}",
    ".academy-v1-meter{height:9px;border-radius:999px;background:#272c3d;overflow:hidden;margin-top:10px}",
    ".academy-v1-meter>div{height:100%;background:linear-gradient(90deg,var(--accent),#c084fc)}",
    ".academy-v1-dialog{width:min(680px,calc(100% - 24px));max-height:82dvh;border:1px solid var(--line);border-radius:18px;background:#11141e;color:var(--text);padding:0;box-shadow:0 30px 90px rgba(0,0,0,.55)}",
    ".academy-v1-dialog::backdrop{background:rgba(0,0,0,.72)}",
    ".academy-v1-dialog header{position:sticky;top:0;display:flex;align-items:center;justify-content:space-between;padding:15px;background:#11141e;border-bottom:1px solid var(--line)}",
    ".academy-v1-dialog .body{padding:14px;display:grid;gap:9px}",
    ".academy-v1-term{padding:13px;border:1px solid var(--line);border-radius:13px;background:#171b29}",
    ".academy-v1-term strong{display:block}.academy-v1-term span{display:block;color:var(--muted);margin-top:5px;line-height:1.45}",
    ".academy-v1-timer{font-variant-numeric:tabular-nums;font-size:30px;font-weight:950;letter-spacing:-.03em}",
    ".academy-v1-version{font-size:10px;color:var(--muted);padding:5px 8px;border:1px solid var(--line);border-radius:999px;white-space:nowrap}",
    ".academy-v1-install{margin-top:12px;padding:14px;border:1px solid rgba(139,92,246,.3);background:rgba(139,92,246,.08);border-radius:14px}",
    "@media(max-width:520px){.academy-v1-grid.two{grid-template-columns:1fr}.academy-v1-row.stack{align-items:stretch;flex-direction:column}}"
  ].join("");
  document.head.appendChild(style);

  function localDateKey() {
    const d = new Date();
    return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
  }

  function readJSON(key, fallback) {
    try { return JSON.parse(getStore(key) || "") || fallback; } catch (_) { return fallback; }
  }

  function writeJSON(key, value) { setStore(key, JSON.stringify(value)); }

  function touchStudyDay() {
    const today = localDateKey();
    const data = readJSON("kaizoStudyV1", {last:null,streak:0,days:{},reviewed:0});
    if (data.last !== today) {
      if (data.last) {
        const a = new Date(data.last+"T12:00:00");
        const b = new Date(today+"T12:00:00");
        const diff = Math.round((b-a)/86400000);
        data.streak = diff === 1 ? (data.streak || 0) + 1 : 1;
      } else data.streak = 1;
      data.last = today;
    }
    if (!data.days[today]) data.days[today] = {xp:0,reviews:0};
    writeJSON("kaizoStudyV1", data);
    return data;
  }

  let study = touchStudyDay();
  let sessionInterval = null;
  let sessionRemaining = 15*60;

  function currentLessonIndex() {
    const idx = lessons.findIndex(function (l,i) { return unlocked(i) && !state.completed.includes(l.id); });
    return idx < 0 ? lessons.length - 1 : idx;
  }

  function masteryPercent() {
    if (!lessons.length) return 0;
    return Math.round((state.completed.length/lessons.length)*100);
  }

  function mountHomeCoach() {
    if ($("#academyCoach")) return;
    const hero = document.querySelector("#homeView .hero");
    const el = document.createElement("article");
    el.id = "academyCoach";
    el.className = "academy-v1-card card";
    hero.insertAdjacentElement("afterend", el);

    const review = document.createElement("article");
    review.id = "academyReview";
    review.className = "academy-v1-card card academy-v1-practice";
    document.querySelector("#homeView .roadmap").insertAdjacentElement("afterend", review);

    const tools = document.createElement("article");
    tools.id = "academyTools";
    tools.className = "academy-v1-card card";
    review.insertAdjacentElement("afterend", tools);
  }

  function renderCoach() {
    mountHomeCoach();
    study = touchStudyDay();
    const idx = currentLessonIndex();
    const l = lessons[idx];
    const today = localDateKey();
    const todayData = study.days[today] || {xp:0,reviews:0};
    const goal = 80;
    const progress = Math.min(100, Math.round((todayData.xp/goal)*100));
    $("#academyCoach").innerHTML =
      '<span class="eyebrow">Sesión recomendada</span>'+
      '<h2 style="margin:6px 0 8px;font-size:22px">Hoy: '+l.icon+' '+l.title+'</h2>'+
      '<p style="color:var(--muted);line-height:1.6;margin:0">Haz una lección, una práctica corta y escribe una nota con tus propias palabras. Objetivo diario: '+goal+' XP.</p>'+
      '<div class="academy-v1-grid two" style="margin-top:14px">'+
        '<div class="academy-v1-kpi"><small>RACHA</small><strong>🔥 '+study.streak+' día'+(study.streak===1?'':'s')+'</strong></div>'+
        '<div class="academy-v1-kpi"><small>DOMINIO DEL CURSO</small><strong>'+masteryPercent()+'%</strong></div>'+
      '</div>'+
      '<div class="academy-v1-meter"><div style="width:'+progress+'%"></div></div>'+
      '<div class="academy-v1-row stack" style="margin-top:12px">'+
        '<button class="btn primary" id="academyStartNext">Continuar: '+(idx+1)+'</button>'+
        '<div class="academy-v1-row" style="justify-content:flex-start"><span class="academy-v1-timer" id="academyTimer">15:00</span><button class="btn secondary" id="academyTimerBtn">Modo 15 min</button></div>'+
      '</div>';
    $("#academyStartNext").onclick = function () { showView("learn"); openLesson(idx); };
    $("#academyTimerBtn").onclick = toggleTimer;
  }

  function toggleTimer() {
    const btn = $("#academyTimerBtn");
    if (sessionInterval) {
      clearInterval(sessionInterval); sessionInterval = null;
      btn.textContent = "Continuar timer";
      return;
    }
    btn.textContent = "Pausar";
    sessionInterval = setInterval(function () {
      sessionRemaining -= 1;
      if (sessionRemaining <= 0) {
        clearInterval(sessionInterval); sessionInterval = null; sessionRemaining = 15*60;
        $("#academyTimer").textContent = "15:00";
        btn.textContent = "Modo 15 min";
        toast("Sesión terminada · descansa y vuelve cuando quieras");
        return;
      }
      const m = Math.floor(sessionRemaining/60);
      const s = sessionRemaining%60;
      $("#academyTimer").textContent = String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");
    },1000);
  }

  function reviewPool() {
    let pool = lessons.filter(function (l) { return state.completed.includes(l.id); });
    if (!pool.length) pool = lessons.slice(0, Math.min(3, lessons.length));
    return pool;
  }

  function renderReview() {
    mountHomeCoach();
    const pool = reviewPool();
    const l = pool[Math.floor(Math.random()*pool.length)];
    const root = $("#academyReview");
    root.innerHTML =
      '<span class="eyebrow">Repaso inteligente</span>'+
      '<h2 style="margin:6px 0 8px;font-size:22px">'+l.quiz.q+'</h2>'+
      '<p style="color:var(--muted);margin:0 0 8px">Una pregunta corta para reforzar lo que ya viste.</p>'+
      '<div id="academyReviewAnswers"></div>'+
      '<div class="feedback" id="academyReviewFeedback"></div>';
    const ar = $("#academyReviewAnswers");
    l.quiz.options.forEach(function (opt,i) {
      const b = document.createElement("button");
      b.className = "answer";
      b.textContent = opt;
      b.onclick = function () {
        Array.from(ar.children).forEach(function (x) { x.classList.remove("good","bad"); });
        if (i === l.quiz.answer) {
          b.classList.add("good");
          $("#academyReviewFeedback").textContent = "✅ "+l.quiz.explain;
          study = touchStudyDay();
          const today = localDateKey();
          study.days[today].reviews = (study.days[today].reviews||0)+1;
          study.reviewed = (study.reviewed||0)+1;
          writeJSON("kaizoStudyV1",study);
        } else {
          b.classList.add("bad");
          $("#academyReviewFeedback").textContent = "Todavía no. Inténtalo otra vez.";
        }
      };
      ar.appendChild(b);
    });
  }

  function ensureGlossary() {
    if ($("#academyGlossary")) return;
    const dlg = document.createElement("dialog");
    dlg.id = "academyGlossary";
    dlg.className = "academy-v1-dialog";
    dlg.innerHTML = '<header><strong>📖 Glosario</strong><button class="iconbtn" id="academyCloseGlossary" aria-label="Cerrar">×</button></header><div class="body" id="academyGlossaryBody"></div>';
    document.body.appendChild(dlg);
    $("#academyGlossaryBody").innerHTML = GLOSSARY.map(function (x) {
      return '<div class="academy-v1-term"><strong>'+x[0]+'</strong><span>'+x[1]+'</span></div>';
    }).join("");
    $("#academyCloseGlossary").onclick = function () { dlg.close(); };
  }

  function renderTools() {
    mountHomeCoach();
    ensureGlossary();
    const standalone = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
    $("#academyTools").innerHTML =
      '<span class="eyebrow">Herramientas de estudio</span>'+
      '<h2 style="margin:6px 0 10px;font-size:22px">Cuando una palabra te suene a chino, búscala.</h2>'+
      '<div class="academy-v1-grid two">'+
        '<button class="btn secondary" id="academyGlossaryBtn">📖 Abrir glosario</button>'+
        '<button class="btn secondary" id="academyGoLab">🧪 Practicar en laboratorio</button>'+
      '</div>'+
      '<div class="academy-v1-install">'+
        '<strong>'+(standalone?'✅ Escuela instalada':'📱 Puedes instalar esta escuela')+'</strong>'+
        '<p style="color:var(--muted);margin:6px 0 0;line-height:1.5">'+(standalone?'La estás usando en modo aplicación.':'En iPhone: Safari → Compartir → Añadir a pantalla de inicio. Así se abre como una app.')+'</p>'+
      '</div>';
    $("#academyGlossaryBtn").onclick = function () { $("#academyGlossary").showModal(); };
    $("#academyGoLab").onclick = function () { showView("lab"); };
  }

  function enhanceLesson(i) {
    const panel = $("#lessonPanel");
    if (!panel || !panel.classList.contains("open")) return;
    const l = lessons[i];
    const existing = panel.querySelector(".academy-v1-lessonextra");
    if (existing) existing.remove();

    const pair = INSIGHTS[l.id] || ["Conexión práctica","Este concepto aparece en aplicaciones reales."];
    const notes = getStore("kaizoNoteV1:"+l.id) || "";
    const box = document.createElement("div");
    box.className = "academy-v1-lessonextra";
    box.innerHTML =
      '<div class="block"><h3>🔗 '+pair[0]+'</h3><p>'+pair[1]+'</p></div>'+
      '<div class="block"><h3>✍️ Explícatelo con tus palabras</h3>'+
      '<p>Escribe lo que tú entendiste. No tiene que sonar técnico. Si puedes explicarlo sencillo, lo estás aprendiendo.</p>'+
      '<textarea class="academy-v1-note" id="academyLessonNote" placeholder="Ejemplo: una variable es como una caja con nombre..."></textarea>'+
      '<div class="feedback" id="academyNoteStatus"></div></div>';
    const complete = panel.querySelector("#completeBtn");
    if (complete) complete.insertAdjacentElement("beforebegin", box);
    else panel.appendChild(box);
    $("#academyLessonNote").value = notes;
    $("#academyLessonNote").addEventListener("input", function () {
      setStore("kaizoNoteV1:"+l.id, this.value);
      $("#academyNoteStatus").textContent = "Guardado en este dispositivo.";
    });
  }

  function addVersionBadge() {
    if ($(".academy-v1-version")) return;
    const top = document.querySelector(".topbar");
    if (!top) return;
    const b = document.createElement("span");
    b.className = "academy-v1-version";
    b.textContent = "v"+ACADEMY_VERSION;
    top.insertBefore(b, top.querySelector("#resetBtn"));
  }

  const originalOpenLesson = openLesson;
  openLesson = function (i) {
    originalOpenLesson(i);
    setTimeout(function () { enhanceLesson(i); }, 0);
  };

  const originalCompleteLesson = completeLesson;
  completeLesson = function (i) {
    const before = state.xp;
    originalCompleteLesson(i);
    const gain = Math.max(0,state.xp-before);
    if (gain) {
      study = touchStudyDay();
      const today = localDateKey();
      study.days[today].xp = (study.days[today].xp||0)+gain;
      writeJSON("kaizoStudyV1",study);
      renderCoach();
      renderReview();
    }
  };

  function refreshAcademyV1() {
    addVersionBadge();
    renderCoach();
    renderReview();
    renderTools();
  }

  renderAll();
  refreshAcademyV1();

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("./sw.js").catch(function () {});
  }
})();