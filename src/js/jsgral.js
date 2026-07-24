// Elementos del DOM para el Menú Lateral y Paralelos
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('openBtn');

const panelParalelos = document.getElementById('panelParalelos');
const panelTitulo = document.getElementById('panelTitulo');
const panelContenido = document.getElementById('panelContenido');
const closePanelBtn = document.getElementById('closePanelBtn');

// Elementos del DOM para la Navegación Dinámica (Virtualizados para compatibilidad)
let selectLibro = null;
let selectCapitulo = null;

// Variables de control de estado globales
var libroActualData = null;
var capituloActualNum = 1;
var mapaEnlacesParalelos = null; 
var idLibroActual = "01_gn";
var rutaLibroActual = "src/libros/01_gn.json";

// Diccionario unificado con los 73 libros
var indiceLibrosRutas = {
  "01_gn": { nombre: "Génesis", ruta: "src/libros/01_gn.json" },
  "02_ex": { nombre: "Éxodo", ruta: "src/libros/02_ex.json" },
  "03_lv": { nombre: "Levítico", ruta: "src/libros/03_lv.json" },
  "04_nm": { nombre: "Números", ruta: "src/libros/04_nm.json" },
  "05_dt": { nombre: "Deuteronomio", ruta: "src/libros/05_dt.json" },
  "06_js": { nombre: "Josué", ruta: "src/libros/06_js.json" },
  "07_jc": { nombre: "Jueces", ruta: "src/libros/07_jc.json" },
  "08_rt": { nombre: "Rut", ruta: "src/libros/08_rt.json" },
  "09_1s": { nombre: "I Samuel", ruta: "src/libros/09_1s.json" },
  "10_2s": { nombre: "II Samuel", ruta: "src/libros/10_2s.json" },
  "11_1r": { nombre: "I Reyes", ruta: "src/libros/11_1r.json" },
  "12_2r": { nombre: "II Reyes", ruta: "src/libros/12_2r.json" },
  "13_1cr": { nombre: "I Crónicas", ruta: "src/libros/13_1cr.json" },
  "14_2cr": { nombre: "II Crónicas", ruta: "src/libros/14_2cr.json" },
  "15_esd": { nombre: "Esdras", ruta: "src/libros/15_esd.json" },
  "16_nh": { nombre: "Nehemías", ruta: "src/libros/16_nh.json" },
  "17_tb": { nombre: "Tobías", ruta: "src/libros/17_tb.json" },
  "18_jd": { nombre: "Judit", ruta: "src/libros/18_jd.json" },
  "19_est": { nombre: "Ester", ruta: "src/libros/19_est.json" },
  "20_1mac": { nombre: "I Macabeos", ruta: "src/libros/20_1mac.json" },
  "21_2mac": { nombre: "II Macabeos", ruta: "src/libros/21_2mac.json" },
  "22_jb": { nombre: "Job", ruta: "src/libros/22_jb.json" },
  "23_sal": { nombre: "Salmos", ruta: "src/libros/23_sal.json" },
  "24_pr": { nombre: "Proverbios", ruta: "src/libros/24_pr.json" },
  "25_qo": { nombre: "Eclesiastés(Qo)", ruta: "src/libros/25_qo.json" },   //  Qo Eclesiastés (Qohélet)
  "26_cant": { nombre: "Cantar", ruta: "src/libros/26_cant.json" },
  "27_sab": { nombre: "Sabiduría", ruta: "src/libros/27_sb.json" },
  "28_si": { nombre: "Eclesiástico(Si)", ruta: "src/libros/28_si.json" },    // Si Eclesiástico (Sirácida)
  "29_is": { nombre: "Isaías", ruta: "src/libros/29_is.json" },
  "30_jr": { nombre: "Jeremías", ruta: "src/libros/30_jr.json" },
  "31_lam": { nombre: "Lamentaciones", ruta: "src/libros/31_lam.json" },
  "32_ba": { nombre: "Baruc", ruta: "src/libros/32_ba.json" },
  "33_ez": { nombre: "Ezequiel", ruta: "src/libros/33_ez.json" },
  "34_dn": { nombre: "Daniel", ruta: "src/libros/34_dn.json" },
  "35_os": { nombre: "Oseas", ruta: "src/libros/35_os.json" },
  "36_jl": { nombre: "Joel", ruta: "src/libros/36_jl.json" },
  "37_am": { nombre: "Amós", ruta: "src/libros/37_am.json" },
  "38_ab": { nombre: "Abdías", ruta: "src/libros/38_ab.json" },
  "39_jon": { nombre: "Jonás", ruta: "src/libros/39_jon.json" },
  "40_mi": { nombre: "Miqueas", ruta: "src/libros/40_mi.json" },
  "41_na": { nombre: "Nahún", ruta: "src/libros/41_na.json" },
  "42_ha": { nombre: "Habacuc", ruta: "src/libros/42_ha.json" },
  "43_so": { nombre: "Sofonías", ruta: "src/libros/43_so.json" },
  "44_ag": { nombre: "Ageo", ruta: "src/libros/44_ag.json" },
  "45_za": { nombre: "Zacarías", ruta: "src/libros/45_za.json" },
  "46_ml": { nombre: "Malaquías", ruta: "src/libros/46_ml.json" },
  "47_mt": { nombre: "Mateo", ruta: "src/libros/47_mt.json" },
  "48_mc": { nombre: "Marcos", ruta: "src/libros/48_mc.json" },
  "49_lc": { nombre: "Lucas", ruta: "src/libros/49_lc.json" },
  "50_jn": { nombre: "Juan", ruta: "src/libros/50_jn.json" },
  "51_hch": { nombre: "Hechos", ruta: "src/libros/51_hch.json" },
  "52_rm": { nombre: "Romanos", ruta: "src/libros/52_rm.json" },
  "53_1co": { nombre: "I Corintios", ruta: "src/libros/53_1co.json" },
  "54_2co": { nombre: "II Corintios", ruta: "src/libros/54_2co.json" },
  "55_ga": { nombre: "Gálatas", ruta: "src/libros/55_ga.json" },
  "56_ef": { nombre: "Efesios", ruta: "src/libros/56_ef.json" },
  "57_flp": { nombre: "Filipenses", ruta: "src/libros/57_flp.json" },
  "58_col": { nombre: "Colosenses", ruta: "src/libros/58_col.json" },
  "59_1ts": { nombre: "I Tesalonicenses", ruta: "src/libros/59_1ts.json" },
  "60_2ts": { nombre: "II Tesalonicenses", ruta: "src/libros/60_2ts.json" },
  "61_1tm": { nombre: "I Timoteo", ruta: "src/libros/61_1tm.json" },
  "62_2tm": { nombre: "II Timoteo", ruta: "src/libros/62_2tm.json" },
  "63_tt": { nombre: "Tito", ruta: "src/libros/63_tt.json" },
  "64_flm": { nombre: "Filemón", ruta: "src/libros/64_flm.json" },
  "65_hb": { nombre: "Hebreos", ruta: "src/libros/65_hb.json" },
  "66_st": { nombre: "Santiago", ruta: "src/libros/66_st.json" },
  "67_1p": { nombre: "I Pedro", ruta: "src/libros/67_1p.json" },
  "68_2p": { nombre: "II Pedro", ruta: "src/libros/68_2p.json" },
  "69_1jn": { nombre: "I Juan", ruta: "src/libros/69_1jn.json" },
  "70_2jn": { nombre: "II Juan", ruta: "src/libros/70_2jn.json" },
  "71_3jn": { nombre: "III Juan", ruta: "src/libros/71_3jn.json" },
  "72_judas": { nombre: "Judas", ruta: "src/libros/72_judas.json" },
  "73_ap": { nombre: "Apocalipsis", ruta: "src/libros/73_ap.json" }
};

/* ==========================================================================
   CATEGORÍA 2: NÚCLEO DE NAVEGACIÓN Y CONFIGURACIÓN DE SELECTORES HORIZONTALES
   ========================================================================== */
function normalizarTexto(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function actualizarHistorialLibro(nuevoLibroKey) {
  let historial = [];
  try {
    const raw = localStorage.getItem('historialLibros');
    if (raw) historial = JSON.parse(raw);
  } catch (e) {}

  if (!Array.isArray(historial)) historial = [];
  
  // Remover si ya existe para colocarlo primero
  historial = historial.filter(k => k !== nuevoLibroKey);
  historial.unshift(nuevoLibroKey);
  
  // Guardar los 4 últimos para pantallas de PC/tablet
  historial = historial.slice(0, 4);
  
  try {
    localStorage.setItem('historialLibros', JSON.stringify(historial));
  } catch (e) {}
}

function llenarSelectorLibros() {
  const listContainer = document.getElementById('libroOptionsList');
  const historyContainer = document.getElementById('libroHistoryList');
  if (!listContainer) return;

  // 1. Renderizar Historial (Recientes)
  if (historyContainer) {
    historyContainer.innerHTML = "";
    let historial = [];
    try {
      const raw = localStorage.getItem('historialLibros');
      if (raw) historial = JSON.parse(raw);
    } catch (e) {}

    // Valores por defecto (Mateo, Lucas, Juan y Génesis) si no hay historial aún
    if (!Array.isArray(historial) || historial.length === 0) {
      historial = ['47_mt', '49_lc', '50_jn', '01_gn'];
    } else {
      // Completar hasta 4 elementos con valores por defecto no duplicados
      const defaults = ['47_mt', '49_lc', '50_jn', '01_gn'];
      for (const d of defaults) {
        if (historial.length >= 4) break;
        if (!historial.includes(d)) {
          historial.push(d);
        }
      }
      historial = historial.slice(0, 4);
    }

    historial.forEach(key => {
      const claveLimpia = key.toLowerCase();
      const libroInfo = indiceLibrosRutas[claveLimpia];
      if (!libroInfo) return;

      const opt = document.createElement('div');
      opt.className = "custom-option custom-history-btn";
      opt.dataset.key = claveLimpia;
      opt.style.opacity = "0.85";
      opt.style.fontSize = "0.85rem";

      if (claveLimpia === idLibroActual) {
        opt.classList.add('selected');
      }

      opt.innerHTML = `<span>${libroInfo.nombre}</span>`;

      opt.addEventListener('click', () => {
        seleccionarLibro(claveLimpia, libroInfo.ruta);
      });

      historyContainer.appendChild(opt);
    });
  }

  // 2. Renderizar Todos los Libros
  listContainer.innerHTML = "";
  Object.keys(indiceLibrosRutas).forEach(key => {
    const claveLimpia = key.toLowerCase();
    const libroInfo = indiceLibrosRutas[claveLimpia];
    if (!libroInfo || !libroInfo.nombre) return;

    const opt = document.createElement('div');
    opt.className = "custom-option";
    opt.dataset.value = libroInfo.ruta;
    opt.dataset.key = claveLimpia;
    
    if (claveLimpia === idLibroActual) {
      opt.classList.add('selected');
    }
    
    opt.innerHTML = `<span>${libroInfo.nombre}</span>`;

    opt.addEventListener('click', () => {
      seleccionarLibro(claveLimpia, libroInfo.ruta);
    });

    listContainer.appendChild(opt);
  });
}

function seleccionarLibro(key, ruta) {
  idLibroActual = key;
  rutaLibroActual = ruta;
  capituloActualNum = 1;
  cerrarTodosDropdowns();
  
  actualizarHistorialLibro(key);
  llenarSelectorLibros();
  
  window.navDirection = 'next';
  cargarLibroYCapitulo(ruta, 1);
  
  // Guardar estado en localStorage
  try {
    localStorage.setItem('ultimoLibroKey', key);
    localStorage.setItem('ultimoLibroRuta', ruta);
    localStorage.setItem('ultimoCapitulo', '1');
  } catch (e) {
    console.error("Error al guardar estado de libro en localStorage:", e);
  }
  
  // Auto-abrir selector de capítulos después de seleccionar un libro
  if (window.evitarAutoAbrirCapitulos) {
    window.evitarAutoAbrirCapitulos = false; // reset
  } else {
    setTimeout(() => {
      const capituloDropdown = document.getElementById('capituloDropdown');
      const capituloSearch = document.getElementById('capituloSearch');
      if (capituloDropdown && capituloSearch) {
        cerrarTodosDropdowns();
        capituloDropdown.classList.add('open');
        capituloSearch.value = "";
        filtrarCapitulos("");
        capituloSearch.focus();
      }
    }, 250);
  }
}

function seleccionarCapitulo(cap) {
  capituloActualNum = parseInt(cap, 10);
  cerrarTodosDropdowns();
  cargarLibroYCapitulo(rutaLibroActual, capituloActualNum);
  
  // Guardar estado en localStorage
  try {
    localStorage.setItem('ultimoCapitulo', cap.toString());
  } catch (e) {
    console.error("Error al guardar estado de capítulo en localStorage:", e);
  }
}

function filtrarLibros(query) {
  const listContainer = document.getElementById('libroOptionsList');
  if (!listContainer) return;

  const normalizedQuery = normalizarTexto(query);
  const options = listContainer.querySelectorAll('.custom-option');
  
  let primerMatch = null;
  let count = 0;

  options.forEach(opt => {
    const key = opt.dataset.key;
    const libroInfo = indiceLibrosRutas[key];
    const nombreNormalizado = normalizarTexto(libroInfo.nombre);
    
    if (nombreNormalizado.includes(normalizedQuery) || key.includes(normalizedQuery)) {
      opt.style.display = "flex";
      opt.classList.remove('highlighted');
      if (count === 0) {
        primerMatch = opt;
        opt.classList.add('highlighted');
      }
      count++;
    } else {
      opt.style.display = "none";
      opt.classList.remove('highlighted');
    }
  });

  return primerMatch;
}

function filtrarCapitulos(query) {
  const gridContainer = document.getElementById('capituloOptionsList');
  if (!gridContainer) return;

  const options = gridContainer.querySelectorAll('.custom-option-grid-item');
  let primerMatch = null;
  let count = 0;

  options.forEach(opt => {
    const capNum = opt.dataset.value;
    if (capNum.startsWith(query)) {
      opt.style.display = "block";
      opt.classList.remove('highlighted');
      if (count === 0) {
        primerMatch = opt;
        opt.classList.add('highlighted');
      }
      count++;
    } else {
      opt.style.display = "none";
      opt.classList.remove('highlighted');
    }
  });

  return primerMatch;
}

function cerrarTodosDropdowns() {
  document.querySelectorAll('.custom-dropdown').forEach(d => d.classList.remove('open'));
  document.body.style.overflow = '';
}

function configurarNavegacionSuperior() {
  const libroTrigger = document.getElementById('libroTrigger');
  const libroDropdown = document.getElementById('libroDropdown');
  const libroSearch = document.getElementById('libroSearch');
  
  const capituloTrigger = document.getElementById('capituloTrigger');
  const capituloDropdown = document.getElementById('capituloDropdown');
  const capituloSearch = document.getElementById('capituloSearch');

  if (!libroTrigger || !capituloTrigger) return;

  libroTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = libroDropdown.classList.contains('open');
    cerrarTodosDropdowns();
    if (!isOpen) {
      libroDropdown.classList.add('open');
      document.body.style.overflow = 'hidden';
      libroSearch.value = "";
      filtrarLibros("");
      setTimeout(() => libroSearch.focus(), 50);
    }
  });

  const closeLibroBtn = document.getElementById('closeLibroDropdownBtn');
  if (closeLibroBtn) {
    closeLibroBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      cerrarTodosDropdowns();
    });
  }

  libroSearch.addEventListener('input', (e) => {
    filtrarLibros(e.target.value);
  });

  capituloTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = capituloDropdown.classList.contains('open');
    cerrarTodosDropdowns();
    if (!isOpen) {
      capituloDropdown.classList.add('open');
      document.body.style.overflow = 'hidden';
      capituloSearch.value = "";
      filtrarCapitulos("");
      setTimeout(() => capituloSearch.focus(), 50);
    }
  });

  const closeCapituloBtn = document.getElementById('closeCapituloDropdownBtn');
  if (closeCapituloBtn) {
    closeCapituloBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      cerrarTodosDropdowns();
    });
  }

  capituloSearch.addEventListener('input', (e) => {
    filtrarCapitulos(e.target.value);
  });

  libroSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const listContainer = document.getElementById('libroOptionsList');
      const match = listContainer.querySelector('.custom-option.highlighted') || 
                    Array.from(listContainer.querySelectorAll('.custom-option')).find(el => el.style.display !== 'none');
      if (match) {
        seleccionarLibro(match.dataset.key, match.dataset.value);
      }
    } else if (e.key === 'Escape') {
      cerrarTodosDropdowns();
    }
  });

  capituloSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const valor = capituloSearch.value.trim();
      if (valor && libroActualData && libroActualData.capitulos && libroActualData.capitulos[valor]) {
        seleccionarCapitulo(valor);
      } else {
        const gridContainer = document.getElementById('capituloOptionsList');
        const match = gridContainer.querySelector('.custom-option-grid-item.highlighted') ||
                      Array.from(gridContainer.querySelectorAll('.custom-option-grid-item')).find(el => el.style.display !== 'none');
        if (match) {
          seleccionarCapitulo(match.dataset.value);
        }
      }
    } else if (e.key === 'Escape') {
      cerrarTodosDropdowns();
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select-container')) {
      cerrarTodosDropdowns();
    }
  });
}


/* ==========================================================================
   3. NÚCLEO FETCH DE DATOS
   ========================================================================== */
function inicializarApp() {
  fetch('src/js/paralelos.json')
    .then(res => { if (!res.ok) throw new Error(); return res.json(); })
    .then(enlacesData => {
      mapaEnlacesParalelos = enlacesData;
      ejecutarCargaInicial();
    })
    .catch(() => ejecutarCargaInicial());
}

function ejecutarCargaInicial() {
  cargarLibroYCapitulo(rutaLibroActual, 1);
}

function cargarLibroYCapitulo(rutaJson, capNum) {
  if (typeof window.speechSynthesis !== 'undefined') {
    window.speechSynthesis.cancel();
    window.lastSpokenText = null;
  }

  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.innerHTML = `<div id="loading-view" style="padding: 20px; color: #666; font-style: italic;">Cargando Escrituras...</div>`;
  }

  const encontrado = Object.keys(indiceLibrosRutas).find(key => indiceLibrosRutas[key].ruta === rutaJson);
  if (encontrado) {
    idLibroActual = encontrado;
    rutaLibroActual = rutaJson;
    const trigger = document.getElementById('libroTrigger');
    if (trigger) {
      trigger.textContent = indiceLibrosRutas[encontrado].nombre.toUpperCase();
    }
    
    document.querySelectorAll('#libroOptionsList .custom-option').forEach(opt => {
      if (opt.dataset.key === encontrado) {
        opt.classList.add('selected');
      } else {
        opt.classList.remove('selected');
      }
    });
  }

  fetch(rutaJson)
    .then(res => {
      if (!res.ok) throw new Error("No disponible");
      return res.json();
    })
    .then(data => {
      libroActualData = data;
      capituloActualNum = capNum;

      actualizarSelectorCapitulos(data.capitulos, capNum);
      renderizarVersiculos(data, capNum);
    })
    .catch(err => {
      console.error("Fallo cargando las escrituras:", err);
      if (mainContent) {
        const nombreLibro = encontrado ? indiceLibrosRutas[encontrado].nombre : "este libro";
        mainContent.innerHTML = `
          <div class="error-banner">
            <h3>📖 Libro no disponible</h3>
            <p>El libro <strong>${nombreLibro}</strong> aún no está cargado en la base de datos local (JSON). Puedes intentar con Génesis, Isaías, Oseas o II Corintios.</p>
          </div>
        `;
      }
      
      const capTrigger = document.getElementById('capituloTrigger');
      if (capTrigger) capTrigger.textContent = "-";
      const capGrid = document.getElementById('capituloOptionsList');
      if (capGrid) capGrid.innerHTML = `<div style="grid-column: span 5; color: #aaa; font-size: 0.9em; padding: 10px; text-align: center;">No disponible</div>`;
    });
}

function actualizarSelectorCapitulos(capitulosData, capSeleccionado) {
  const trigger = document.getElementById('capituloTrigger');
  if (trigger) {
    trigger.textContent = capSeleccionado;
  }

  const gridContainer = document.getElementById('capituloOptionsList');
  if (!gridContainer) return;

  gridContainer.innerHTML = "";
  Object.keys(capitulosData).forEach(cap => {
    const item = document.createElement('div');
    item.className = "custom-option-grid-item";
    item.dataset.value = cap;
    item.textContent = cap;

    if (parseInt(cap, 10) === parseInt(capSeleccionado, 10)) {
      item.classList.add('selected');
    }

    item.addEventListener('click', () => {
      const current = window.capituloActualNum || 1;
      const target = parseInt(cap, 10);
      window.navDirection = target >= current ? 'next' : 'prev';
      seleccionarCapitulo(cap);
    });

    gridContainer.appendChild(item);
  });
}

function compararVersiculos(a, b) {
  const numA = parseInt(a, 10);
  const numB = parseInt(b, 10);

  if (numA !== numB) {
    return numA - numB;
  }
  return a.localeCompare(b);
}

function obtenerHtmlCapitulo(libroData, capNum) {
  if (!libroData.capitulos || !libroData.capitulos[capNum]) return '';
  
  let html = `<h1 class="libro-titulo" style="text-align: center;">
    ${libroData.libro} ${capNum}
    <button class="btn-leer-capitulo" title="Leer Capítulo con Voz" style="background: none; border: none; padding: 4px; color: #718096; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; transition: background-color 0.2s, color 0.2s; vertical-align: middle; margin-left: 6px;" onmouseover="this.style.backgroundColor='rgba(0,0,0,0.05)'; this.style.color='#2b6cb0'" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#718096'" onclick="window.leerCapituloActualTextToSpeech()">
      <span class="material-symbols-outlined" style="font-size: 1.5rem; vertical-align: middle;">hearing</span>
    </button>
  </h1>`;
  html += `<div class="texto-sagrado"><span class="capitulo-num">${capNum}</span>`;
  
  const versiculos = libroData.capitulos[capNum];
  const clavesOrdenadas = Object.keys(versiculos).sort(compararVersiculos);

  clavesOrdenadas.forEach(numV => {
    const textoVersiculo = versiculos[numV];
    const llaveCoordenada = `${idLibroActual}-c${capNum}-v${numV}`;
    const tieneParalelos = mapaEnlacesParalelos && mapaEnlacesParalelos[llaveCoordenada];
    
    if (tieneParalelos) {
      const destinosString = mapaEnlacesParalelos[llaveCoordenada].join(',');
      html += `
        <span class="versiculo tiene-paralelo" data-vnum="${numV}" data-destinos="${destinosString}">
          <span class="num-v v-con-circulo">${numV}</span>${textoVersiculo}
        </span>`;
    } else {
      html += `<span class="versiculo"><span class="num-v">${numV}</span>${textoVersiculo}</span>`;
    }
  });
  
  html += `</div>`;
  return html;
}

function configurarEventosSwiper(slider) {
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let deltaX = 0;
  let sliderWidth = 0;
  
  const slidePrev = document.getElementById('slidePrev');
  const slideActive = document.getElementById('slideActive');
  const slideNext = document.getElementById('slideNext');
  
  function cargarDiapositivasAdyacentes() {
    if (!libroActualData) return;
    
    const prevCap = capituloActualNum - 1;
    const nextCap = capituloActualNum + 1;
    
    // Carga diapositiva anterior
    if (prevCap >= 1) {
      slidePrev.innerHTML = obtenerHtmlCapitulo(libroActualData, prevCap);
    } else {
      // Intentar cargar último capítulo del libro anterior
      const claves = Object.keys(window.indiceLibrosRutas).sort();
      const currentIndex = claves.indexOf(window.idLibroActual);
      if (currentIndex !== -1 && currentIndex - 1 >= 0) {
        const prevBookKey = claves[currentIndex - 1];
        const prevBookRuta = window.indiceLibrosRutas[prevBookKey].ruta;
        fetch(prevBookRuta)
          .then(res => res.json())
          .then(data => {
            if (isDragging && slidePrev) {
              const chapters = Object.keys(data.capitulos).map(c => parseInt(c, 10));
              const lastCap = Math.max(...chapters);
              slidePrev.innerHTML = obtenerHtmlCapitulo(data, lastCap);
            }
          })
          .catch(() => {});
      } else {
        slidePrev.innerHTML = '';
      }
    }
    
    // Carga diapositiva siguiente
    if (libroActualData.capitulos && libroActualData.capitulos[nextCap]) {
      slideNext.innerHTML = obtenerHtmlCapitulo(libroActualData, nextCap);
    } else {
      // Intentar cargar primer capítulo del siguiente libro
      const claves = Object.keys(window.indiceLibrosRutas).sort();
      const currentIndex = claves.indexOf(window.idLibroActual);
      if (currentIndex !== -1 && currentIndex + 1 < claves.length) {
        const nextBookKey = claves[currentIndex + 1];
        const nextBookRuta = window.indiceLibrosRutas[nextBookKey].ruta;
        fetch(nextBookRuta)
          .then(res => res.json())
          .then(data => {
            if (isDragging && slideNext) {
              slideNext.innerHTML = obtenerHtmlCapitulo(data, 1);
            }
          })
          .catch(() => {});
      } else {
        slideNext.innerHTML = '';
      }
    }
  }

  window.blockClick = false;

  function onDragStart(x) {
    if (document.getElementById('modalSearch').classList.contains('open')) return;
    isDragging = true;
    startX = x;
    sliderWidth = slideActive ? slideActive.offsetWidth : (slider.offsetWidth / 3);
    slider.style.transition = 'none';
    slider.style.cursor = 'grabbing';
    cargarDiapositivasAdyacentes();
  }

  function onDragMove(x) {
    if (!isDragging) return;
    currentX = x;
    deltaX = currentX - startX;
    
    if (Math.abs(deltaX) > 10) {
      window.blockClick = true;
    }

    // Efecto liga (rubberband) si no hay contenido adyacente
    if (deltaX > 0 && !slidePrev.innerHTML) {
      deltaX = deltaX * 0.2;
    }
    if (deltaX < 0 && !slideNext.innerHTML) {
      deltaX = deltaX * 0.2;
    }
    
    slider.style.transform = `translate3d(calc(-100% / 3 - 26.667px + ${deltaX}px), 0, 0)`;
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    
    slider.style.cursor = 'grab';
    slider.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    const threshold = sliderWidth * 0.20; // 20% de ancho de arrastre mínimo para pasar
    
    if (deltaX > threshold && slidePrev.innerHTML) {
      // Mover a la diapositiva anterior
      slider.style.transform = 'translate3d(0px, 0, 0)';
      setTimeout(() => {
        const prevCap = capituloActualNum - 1;
        if (prevCap >= 1) {
          capituloActualNum--;
          window.capituloActualNum = capituloActualNum;
          try {
            localStorage.setItem('ultimoCapitulo', capituloActualNum.toString());
          } catch (e) {}
          actualizarSelectorCapitulos(libroActualData.capitulos, capituloActualNum);
          renderizarVersiculos(libroActualData, capituloActualNum);
        } else {
          // Cambiar al libro anterior
          const claves = Object.keys(window.indiceLibrosRutas).sort();
          const currentIndex = claves.indexOf(window.idLibroActual);
          if (currentIndex !== -1 && currentIndex - 1 >= 0) {
            const prevBookKey = claves[currentIndex - 1];
            const prevBookRuta = window.indiceLibrosRutas[prevBookKey].ruta;
            
            idLibroActual = prevBookKey;
            window.idLibroActual = prevBookKey;
            rutaLibroActual = prevBookRuta;
            window.rutaLibroActual = prevBookRuta;
            
            actualizarHistorialLibro(prevBookKey);
            llenarSelectorLibros();
            
            const trigger = document.getElementById('libroTrigger');
            if (trigger) {
              trigger.textContent = window.indiceLibrosRutas[prevBookKey].nombre.toUpperCase();
            }
            
            document.querySelectorAll('#libroOptionsList .custom-option').forEach(opt => {
              if (opt.dataset.key === prevBookKey) {
                opt.classList.add('selected');
              } else {
                opt.classList.remove('selected');
              }
            });

            fetch(prevBookRuta)
              .then(res => res.json())
              .then(data => {
                libroActualData = data;
                window.libroActualData = data;
                const chapters = Object.keys(data.capitulos).map(c => parseInt(c, 10));
                capituloActualNum = Math.max(...chapters);
                window.capituloActualNum = capituloActualNum;
                
                try {
                  localStorage.setItem('ultimoLibroKey', prevBookKey);
                  localStorage.setItem('ultimoLibroRuta', prevBookRuta);
                  localStorage.setItem('ultimoCapitulo', capituloActualNum.toString());
                } catch (e) {
                  console.error("Error al guardar estado en localStorage:", e);
                }
                
                actualizarSelectorCapitulos(data.capitulos, capituloActualNum);
                renderizarVersiculos(data, capituloActualNum);
              });
          }
        }
      }, 300);
    } else if (deltaX < -threshold && slideNext.innerHTML) {
      // Mover a la diapositiva siguiente
      slider.style.transform = 'translate3d(calc(-200% / 3 - 53.333px), 0, 0)';
      setTimeout(() => {
        const nextCap = capituloActualNum + 1;
        if (libroActualData.capitulos && libroActualData.capitulos[nextCap]) {
          capituloActualNum++;
          window.capituloActualNum = capituloActualNum;
          try {
            localStorage.setItem('ultimoCapitulo', capituloActualNum.toString());
          } catch (e) {}
          actualizarSelectorCapitulos(libroActualData.capitulos, capituloActualNum);
          renderizarVersiculos(libroActualData, capituloActualNum);
        } else {
          // Cambiar al libro siguiente
          const claves = Object.keys(window.indiceLibrosRutas).sort();
          const currentIndex = claves.indexOf(window.idLibroActual);
          if (currentIndex !== -1 && currentIndex + 1 < claves.length) {
            const nextBookKey = claves[currentIndex + 1];
            const nextBookRuta = window.indiceLibrosRutas[nextBookKey].ruta;
            
            idLibroActual = nextBookKey;
            window.idLibroActual = nextBookKey;
            rutaLibroActual = nextBookRuta;
            window.rutaLibroActual = nextBookRuta;
            capituloActualNum = 1;
            window.capituloActualNum = 1;
            
            try {
              localStorage.setItem('ultimoLibroKey', nextBookKey);
              localStorage.setItem('ultimoLibroRuta', nextBookRuta);
              localStorage.setItem('ultimoCapitulo', '1');
            } catch (e) {
              console.error("Error al guardar estado en localStorage:", e);
            }
            
            actualizarHistorialLibro(nextBookKey);
            llenarSelectorLibros();
            
            const trigger = document.getElementById('libroTrigger');
            if (trigger) {
              trigger.textContent = window.indiceLibrosRutas[nextBookKey].nombre.toUpperCase();
            }
            
            document.querySelectorAll('#libroOptionsList .custom-option').forEach(opt => {
              if (opt.dataset.key === nextBookKey) {
                opt.classList.add('selected');
              } else {
                opt.classList.remove('selected');
              }
            });

            fetch(nextBookRuta)
              .then(res => res.json())
              .then(data => {
                libroActualData = data;
                window.libroActualData = data;
                actualizarSelectorCapitulos(data.capitulos, 1);
                renderizarVersiculos(data, 1);
              });
          }
        }
      }, 300);
    } else {
      // Regresar al centro (cancelar)
      slider.style.transform = 'translate3d(calc(-100% / 3 - 26.667px), 0, 0)';
      setTimeout(() => {
        window.blockClick = false;
      }, 50);
    }
    deltaX = 0;
  }

  // Eventos táctiles
  slider.addEventListener('touchstart', (e) => {
    onDragStart(e.touches[0].clientX);
  }, { passive: true });

  slider.addEventListener('touchmove', (e) => {
    onDragMove(e.touches[0].clientX);
  }, { passive: true });

  slider.addEventListener('touchend', onDragEnd);

  // Eventos de ratón (permite pruebas de arrastre en PC)
  slider.addEventListener('mousedown', (e) => {
    if (e.button !== 0 || e.target.closest('.versiculo.tiene-paralelo') || e.target.closest('button') || e.target.closest('select')) return;
    onDragStart(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    onDragMove(e.clientX);
  });

  window.addEventListener('mouseup', onDragEnd);

  slider.addEventListener('click', (e) => {
    if (window.blockClick) {
      e.preventDefault();
      e.stopPropagation();
      window.blockClick = false;
    }
  }, true);
}

function renderizarVersiculos(libroData, capSeleccionado) {
  const contenedorPrincipal = document.querySelector('.main-content');
  if (!contenedorPrincipal) return;
  
  // 1. Aseguramos estructura del Swiper Slider
  let slider = document.getElementById('readerSlider');
  if (!slider) {
    contenedorPrincipal.innerHTML = `
      <div id="readerSlider" class="reader-slider" style="display: flex; width: calc(300% + 160px); gap: 80px; transform: translate3d(calc(-100% / 3 - 26.667px), 0, 0); transition: none; cursor: grab; user-select: none;">
        <div id="slidePrev" class="reader-slide" style="width: calc((100% - 160px) / 3); flex-shrink: 0; box-sizing: border-box; padding: 0 10px;"></div>
        <div id="slideActive" class="reader-slide" style="width: calc((100% - 160px) / 3); flex-shrink: 0; box-sizing: border-box; padding: 0 10px;"></div>
        <div id="slideNext" class="reader-slide" style="width: calc((100% - 160px) / 3); flex-shrink: 0; box-sizing: border-box; padding: 0 10px;"></div>
      </div>
    `;
    slider = document.getElementById('readerSlider');
    configurarEventosSwiper(slider);
  }

  const slidePrev = document.getElementById('slidePrev');
  const slideActive = document.getElementById('slideActive');
  const slideNext = document.getElementById('slideNext');

  const direction = window.navDirection;
  window.navDirection = null; // reset

  // Si hay una dirección de navegación (desde botones o dropdowns), animamos el slider
  if (direction && slideActive.innerHTML !== '') {
    // 1. Cargamos el nuevo capítulo en la ranura adyacente correspondiente
    if (direction === 'next') {
      slideNext.innerHTML = obtenerHtmlCapitulo(libroData, capSeleccionado);
      
      // 2. Transicionamos hacia la derecha
      slider.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      slider.style.transform = 'translate3d(calc(-200% / 3 - 53.333px), 0, 0)';
    } else {
      slidePrev.innerHTML = obtenerHtmlCapitulo(libroData, capSeleccionado);
      
      // 2. Transicionamos hacia la izquierda
      slider.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      slider.style.transform = 'translate3d(0px, 0, 0)';
    }

    // 3. Después de terminar la animación, colocamos el capítulo en la ranura activa y restablecemos el slider
    setTimeout(() => {
      slideActive.innerHTML = obtenerHtmlCapitulo(libroData, capSeleccionado);
      slidePrev.innerHTML = '';
      slideNext.innerHTML = '';
      
      slider.style.transition = 'none';
      slider.style.transform = 'translate3d(calc(-100% / 3 - 26.667px), 0, 0)';
      slider.offsetHeight; // Forzar reflujo

      activarEventosParalelos(); 
      window.scrollTo(0, 0);
    }, 300);
  } else {
    // Carga inicial o actualización instantánea post-arrastre
    slideActive.innerHTML = obtenerHtmlCapitulo(libroData, capSeleccionado);
    slidePrev.innerHTML = '';
    slideNext.innerHTML = '';
    
    slider.style.transition = 'none';
    slider.style.transform = 'translate3d(calc(-100% / 3 - 26.667px), 0, 0)';
    slider.offsetHeight; // Forzar reflujo

    activarEventosParalelos(); 
    window.scrollTo(0, 0);
  }
}

/* ==========================================================================
   CATEGORÍA 4: PROCESADOR DE CITAS - ADAPTABLE CON SCROLL VERTICAL
   ========================================================================== */
function activarEventosParalelos() {
  const versiculosConParalelo = document.querySelectorAll('.tiene-paralelo');

  versiculosConParalelo.forEach(versiculo => {
    versiculo.addEventListener('click', (e) => {
      const elementoTarget = e.currentTarget;
      const numVersiculoOrig = elementoTarget.getAttribute('data-vnum');
      
      const rawDestinos = elementoTarget.getAttribute('data-destinos');
      if (!rawDestinos) return;
      const destinos = rawDestinos.split(',');

      if (panelTitulo) panelTitulo.innerHTML = `📚 Paralelos de ${libroActualData.libro} ${capituloActualNum},${numVersiculoOrig}`;
      if (panelContenido) panelContenido.innerHTML = `<p style="color: #888; font-style: italic; padding: 10px;">Buscando textos paralelos...</p>`;
      if (panelParalelos) panelParalelos.classList.add('open');

      const consultasPromesas = destinos.map(coordenadaDestino => {
        const partes = coordenadaDestino.trim().split('-');
        if (partes.length < 3) return Promise.resolve('');

        const libroId = partes[0];
        const capNum = partes[1].replace('c', '');
        
        let idVersiculoCompleto = "";
        let versesToFetch = [];
        let citaFormateadaLector = "";

        if (partes.length === 4) {
          // Rango, ej. v26-27
          const startV = parseInt(partes[2].replace('v', ''), 10);
          const endV = parseInt(partes[3], 10);
          idVersiculoCompleto = partes[2].replace('v', '');
          citaFormateadaLector = `${startV}-${endV}`;
          for (let i = startV; i <= endV; i++) {
            versesToFetch.push(i.toString());
          }
        } else {
          // Normal o con puntos, ej. v6.9
          idVersiculoCompleto = partes[2].replace('v', '');
          citaFormateadaLector = idVersiculoCompleto;
          if (idVersiculoCompleto.includes('.')) {
            versesToFetch = idVersiculoCompleto.split('.');
          } else {
            versesToFetch = [idVersiculoCompleto];
          }
        }

        const infoLibro = indiceLibrosRutas[libroId];
        if (!infoLibro) return Promise.resolve('');

        return fetch(infoLibro.ruta)
          .then(res => res.ok ? res.json() : null)
          .then(libroJson => {
            if (!libroJson || !libroJson.capitulos || !libroJson.capitulos[capNum]) return '';

            let textoOriginal = "";
            textoOriginal = versesToFetch.map(vn => {
              if (vn.includes('_')) {
                const rangeParts = vn.split('_');
                return libroJson.capitulos[capNum][rangeParts[0]] || "";
              }
              return libroJson.capitulos[capNum][vn] || "";
            }).filter(Boolean).join(' ');

            let vistaPreviaTexto = "";
            if (textoOriginal.length > 40) {
              vistaPreviaTexto = textoOriginal.substring(0, 40).trim() + "...";
            } else {
              vistaPreviaTexto = textoOriginal || "(Texto no disponible)";
            }

            const textoCitaFormateada = `${infoLibro.nombre} ${capNum},${citaFormateadaLector}`;

            return `
              <div class="bloque-paralelo-link" 
                   data-ruta="${infoLibro.ruta}" 
                   data-libro-id="${libroId}" 
                   data-cap="${capNum}" 
                   data-verse="${versesToFetch.join('.')}" 
                   style="flex: 1 1 calc(50% - 10px); min-width: 250px; max-width: 100%; border-left: 3px solid #cc0000; padding: 2px; cursor: pointer; background: #fff; border-radius: 0 6px 6px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); box-sizing: border-box;">
                <strong style="color: #cc0000; display: block; margin-bottom: 2px; font-size: 0.9em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  📌 ${textoCitaFormateada}
                </strong>
                <span style="font-style: italic; color: #4a5568; font-size: 0.85em; display: block; line-height: 1.3;">
                  "${vistaPreviaTexto}"
                </span>
              </div>
            `;
          })
          .catch(() => ''); 
      });

      Promise.all(consultasPromesas).then(bloquesHtml => {
        if (panelContenido) {
          const htmlFinal = bloquesHtml.filter(b => b && b.trim() !== '').join('');
          
          if (htmlFinal.trim() === '') {
            panelContenido.innerHTML = `<p style="color: #888; font-style: italic; padding: 2px;">No se encontraron los textos de las referencias cruzadas.</p>`;
          } else {
            const esMovil = window.innerWidth <= 600;
            const direccionFlex = esMovil ? 'column' : 'row';

            // Añadimos max-height y overflow-y: auto para habilitar el scroll si hay muchos elementos
            panelContenido.innerHTML = `
              <div style="display: flex; flex-direction: ${direccionFlex}; flex-wrap: wrap; gap: 2px; width: 100%; max-height: 300px; overflow-y: auto; padding: 5px; box-sizing: border-box;">
                ${htmlFinal}
              </div>
            `;
            asignarEventosViajeReferencia(); 
          }
        }
      });
    });
  });
}



function asignarEventosViajeReferencia() {
  const enlacesDestino = document.querySelectorAll('.bloque-paralelo-link');
  enlacesDestino.forEach(bloque => {
    bloque.addEventListener('mouseenter', () => bloque.style.background = '#f7fafc');
    bloque.addEventListener('mouseleave', () => bloque.style.background = '#fff');
    
    bloque.addEventListener('click', () => {
      const rutaDestino = bloque.getAttribute('data-ruta');
      const libroIdDestino = bloque.getAttribute('data-libro-id');
      const capDestino = parseInt(bloque.getAttribute('data-cap'), 10);
      const verseDestino = bloque.getAttribute('data-verse');

      // Extraer el primer número de versículo si es un rango
      let verseScrollTarget = verseDestino;
      if (verseDestino && verseDestino.includes('_')) {
        verseScrollTarget = verseDestino.split('_')[0];
      }

      closePanel();

      // Configurar scroll y resaltado temporal de 3 segundos
      if (verseScrollTarget) {
        window.scrollToVerseAfterRender = verseScrollTarget;
      }

      idLibroActual = libroIdDestino;
      rutaLibroActual = rutaDestino;
      cargarLibroYCapitulo(rutaDestino, capDestino);
      
      // Guardar estado en localStorage al viajar por referencias cruzadas
      try {
        localStorage.setItem('ultimoLibroKey', libroIdDestino);
        localStorage.setItem('ultimoLibroRuta', rutaDestino);
        localStorage.setItem('ultimoCapitulo', capDestino.toString());
      } catch (e) {
        console.error("Error al guardar estado por viaje de paralelo:", e);
      }
    });
  });
}

function closePanel() {
  if (panelParalelos) panelParalelos.classList.remove('open');
}

if (closePanelBtn) closePanelBtn.addEventListener('click', closePanel);

document.addEventListener('click', (e) => {
  if (panelParalelos && panelParalelos.classList.contains('open') && 
      !panelParalelos.contains(e.target) && 
      !e.target.closest('.tiene-paralelo')) {
    closePanel();
  }
});

/* ==========================================================================
   4. MENÚ LATERAL (SIDEBAR)
   ========================================================================== */
function openMenu() {
  if (sidebar) sidebar.classList.add('open');
  if (overlay) overlay.classList.add('show');
}

function closeMenu() {
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('show');
}

if (openBtn) openBtn.addEventListener('click', openMenu);
if (overlay) overlay.addEventListener('click', closeMenu);

// Gestos de deslizamiento (swipe) de borde de pantalla para abrir/cerrar el menú lateral
(function () {
  let touchstartX = 0;
  let touchstartY = 0;
  const EDGE_THRESHOLD = 35; // Umbral de píxeles desde el borde izquierdo para abrir
  const SWIPE_THRESHOLD = 50;  // Distancia mínima requerida para activar el deslizamiento

  document.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    touchstartX = e.touches[0].clientX;
    touchstartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (e.touches.length !== 1) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchstartX;
    const diffY = currentY - touchstartY;

    const isMenuOpen = sidebar && sidebar.classList.contains('open');

    if (!isMenuOpen) {
      // Si el menú está cerrado y el deslizamiento se inició en el borde izquierdo
      if (touchstartX <= EDGE_THRESHOLD && diffX > SWIPE_THRESHOLD && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
        openMenu();
      }
    } else {
      // Si el menú está abierto, permitir deslizar hacia la izquierda para cerrarlo
      if (diffX < -SWIPE_THRESHOLD && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
        closeMenu();
      }
    }
  }, { passive: true });
})();



function construirNavegacionDinamica() {
  const contenedorSelector = document.getElementById('selectorBiblico');
  if (!contenedorSelector) return;

  contenedorSelector.innerHTML = `
    <!-- Selector de Libro -->
    <div class="custom-select-container" id="libroContainer">
      <div class="custom-select-trigger" id="libroTrigger">GÉNESIS</div>
      <div class="custom-dropdown" id="libroDropdown">
        <!-- Botón de Cerrar Modal -->
        <button id="closeLibroDropdownBtn" class="close-dropdown-btn" style="position: absolute; top: 20px; right: 20px; background: transparent; border: none; font-size: 1.8rem; cursor: pointer; color: inherit; opacity: 0.6; transition: all 0.2s ease;">✕</button>
        
        <!-- Contenedor centralizado para no estirarse feo en pantallas anchas (PC / Laptop) -->
        <div style="max-width: 600px; margin: 40px auto 0 auto; width: 100%; display: flex; flex-direction: column; box-sizing: border-box;">
          <input type="text" class="custom-search-input" id="libroSearch" placeholder="Buscar libro..." autocomplete="off" style="margin-bottom: 24px; padding: 12px 16px; font-size: 1.1rem; border-radius: 10px;">
          
          <!-- Sección de Libros Recientes -->
          <div class="custom-book-history-title" style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.65; margin-bottom: 8px; padding-left: 2px; font-weight: bold; text-align: left;">Recientes</div>
          <div class="custom-book-history-row" id="libroHistoryList" style="margin-bottom: 24px; width: 100%; box-sizing: border-box;"></div>
          
          <div class="custom-book-history-title" style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.65; margin-bottom: 8px; padding-left: 2px; font-weight: bold; text-align: left;">Todos los libros</div>
          <div class="custom-options-list" id="libroOptionsList" style="max-height: calc(100vh - 280px) !important; overflow-y: auto;"></div>
        </div>
      </div>
    </div>

    <!-- Selector de Capítulo -->
    <div class="custom-select-container" id="capituloContainer">
      <div class="custom-select-trigger cap-trigger" id="capituloTrigger">1</div>
      <div class="custom-dropdown cap-dropdown" id="capituloDropdown">
        <!-- Botón de Cerrar Modal -->
        <button id="closeCapituloDropdownBtn" class="close-dropdown-btn" style="position: absolute; top: 20px; right: 20px; background: transparent; border: none; font-size: 1.8rem; cursor: pointer; color: inherit; opacity: 0.6; transition: all 0.2s ease;">✕</button>
        
        <!-- Contenedor centralizado para no estirarse feo en pantallas anchas (PC / Laptop) -->
        <div style="max-width: 600px; margin: 40px auto 0 auto; width: 100%; display: flex; flex-direction: column; box-sizing: border-box;">
          <input type="text" class="custom-search-input" id="capituloSearch" placeholder="Buscar capítulo..." autocomplete="off" style="margin-bottom: 24px; padding: 12px 16px; font-size: 1.1rem; border-radius: 10px;">
          
          <div class="custom-book-history-title" style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.65; margin-bottom: 12px; padding-left: 2px; font-weight: bold; text-align: left;">Seleccionar Capítulo</div>
          <div class="custom-options-grid" id="capituloOptionsList" style="max-height: calc(100vh - 200px) !important; overflow-y: auto;"></div>
        </div>
      </div>
    </div>
  `;
}


function obtenerEstadoInicial() {
  let estado = {
    key: "01_gn",
    ruta: "src/libros/01_gn.json",
    capitulo: 1
  };

  try {
    const savedKey = localStorage.getItem('ultimoLibroKey');
    const savedRuta = localStorage.getItem('ultimoLibroRuta');
    const savedCap = localStorage.getItem('ultimoCapitulo');

    // Validamos que el libro guardado exista en nuestro diccionario antes de usarlo
    if (savedKey && savedRuta && indiceLibrosRutas[savedKey]) {
      estado.key = savedKey;
      estado.ruta = savedRuta;
      if (savedCap) {
        const parsedCap = parseInt(savedCap, 10);
        if (!isNaN(parsedCap) && parsedCap > 0) {
          estado.capitulo = parsedCap;
        }
      }
    }
  } catch (e) {
    console.error("Error leyendo desde localStorage:", e);
  }

  return estado;
}

/* ==========================================================================
   5. INICIALIZACIÓN CORREGIDA
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // A. Construir visualmente la barra limpia (Libro y número rojo) desde el JS
  construirNavegacionDinamica();

  // Registrar el libro inicial en el historial antes de llenar el selector
  const estadoInicial = obtenerEstadoInicial();
  actualizarHistorialLibro(estadoInicial.key);

  // B. Renderizar dinámicamente los 73 libros en el selector que se acaba de crear
  llenarSelectorLibros();

  // C. Configurar los eventos de escucha para Libro y Capítulo
  configurarNavegacionSuperior();

  // D. Carga original de referencias cruzadas y arranque de la App con persistencia segura y bidireccionalidad
  fetch('src/js/paralelos.json')
    .then(res => res.json())
    .then(data => {
      // 1. Unificar claves origen que contengan puntos (.) copiándolas a claves individuales
      Object.keys(data).forEach(origen => {
        if (origen.includes('.')) {
          const partesOrig = origen.split('-v');
          if (partesOrig.length === 2) {
            const prefijo = partesOrig[0];
            const vNums = partesOrig[1].split('.');
            const destinos = data[origen] || [];
            
            vNums.forEach(vNum => {
              const claveIndiv = `${prefijo}-v${vNum}`;
              if (!data[claveIndiv]) {
                data[claveIndiv] = [];
              }
              destinos.forEach(dest => {
                if (!data[claveIndiv].includes(dest)) {
                  data[claveIndiv].push(dest);
                }
              });
            });
          }
        }
      });

      // 2. Hacer enlaces bidireccionales dinámicos y descomprimir destinos con puntos (.) o rangos (-)
      Object.keys(data).forEach(origen => {
        const destinos = data[origen];
        if (Array.isArray(destinos)) {
          destinos.forEach(destino => {
            const partesDest = destino.split('-');
            
            if (destino.includes('.')) {
              const partesV = destino.split('-v');
              if (partesV.length === 2) {
                const prefijo = partesV[0];
                const vNums = partesV[1].split('.');
                
                vNums.forEach(vNum => {
                  const claveIndiv = `${prefijo}-v${vNum}`;
                  if (!data[claveIndiv]) {
                    data[claveIndiv] = [];
                  }
                  if (!data[claveIndiv].includes(origen)) {
                    data[claveIndiv].push(origen);
                  }
                });
              }
            } else if (partesDest.length === 4) {
              // Rango de versículos, ej. 27_sab-c7-v26-27 -> mapear solo al primero
              const clavePrimerVersiculo = `${partesDest[0]}-${partesDest[1]}-${partesDest[2]}`;
              if (!data[clavePrimerVersiculo]) {
                data[clavePrimerVersiculo] = [];
              }
              if (!data[clavePrimerVersiculo].includes(origen)) {
                data[clavePrimerVersiculo].push(origen);
              }
            } else {
              if (!data[destino]) {
                data[destino] = [];
              }
              if (!data[destino].includes(origen)) {
                data[destino].push(origen);
              }
            }
          });
        }
      });

      mapaEnlacesParalelos = data;
      console.log("Diag - mapaEnlacesParalelos loaded. 27_sab-c7-v26:", data["27_sab-c7-v26"]);
      
      const estado = obtenerEstadoInicial();
      idLibroActual = estado.key;
      rutaLibroActual = estado.ruta;
      cargarLibroYCapitulo(estado.ruta, estado.capitulo);
    })
    .catch(err => {
      console.error("Error al cargar paralelos de inicio:", err);
      
      const estado = obtenerEstadoInicial();
      idLibroActual = estado.key;
      rutaLibroActual = estado.ruta;
      cargarLibroYCapitulo(estado.ruta, estado.capitulo);
    });
});

/*    5. INICIALIZACIÓN CORREGIDA */

/* ==========================================================================
   6. LÓGICA DEL MOTOR DE BÚSQUEDA GLOBAL Y LOCAL
   ========================================================================== */
(function() {
  let searchAbortController = null;

  document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const modalSearch = document.getElementById('modalSearch');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const globalSearchInput = document.getElementById('globalSearchInput');
    const executeSearchBtn = document.getElementById('executeSearchBtn');
    const modalSearchBody = document.getElementById('modalSearchBody');
    
    const progressContainer = document.getElementById('searchProgressContainer');
    const progressFill = document.getElementById('searchProgressFill');
    const progressText = document.getElementById('searchProgressText');

    if (!searchBtn || !modalSearch) return;

    // Abrir modal de búsqueda
    searchBtn.addEventListener('click', () => {
      if (typeof window.closeMenu === 'function') {
        window.closeMenu();
      }
      modalSearch.classList.add('open');
      globalSearchInput.focus();
    });

    // Cerrar modal
    function cerrarBuscar() {
      if (searchAbortController) {
        searchAbortController.abort();
        searchAbortController = null;
      }
      modalSearch.classList.remove('open');
      if (progressContainer) progressContainer.style.display = 'none';
    }

    if (closeSearchBtn) {
      closeSearchBtn.addEventListener('click', cerrarBuscar);
    }

    modalSearch.addEventListener('click', (e) => {
      if (e.target === modalSearch) {
        cerrarBuscar();
      }
    });

    // Ejecutar búsqueda al pulsar Enter o hacer clic en Buscar
    globalSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        ejecutarBusqueda();
      }
    });

    if (executeSearchBtn) {
      executeSearchBtn.addEventListener('click', ejecutarBusqueda);
    }

    function ejecutarBusqueda() {
      const query = globalSearchInput.value.trim();
      if (!query) {
        alert("Por favor, ingresa un texto para buscar.");
        return;
      }

      if (searchAbortController) {
        searchAbortController.abort();
      }
      searchAbortController = new AbortController();

      const scope = document.querySelector('input[name="searchScope"]:checked').value;
      modalSearchBody.innerHTML = `<div class="search-loading-msg">Buscando "${query}"...</div>`;
      
      if (progressContainer) {
        progressContainer.style.display = 'none';
        progressFill.style.width = '0%';
        progressText.textContent = 'Buscando... 0%';
      }

      if (scope === 'current') {
        buscarEnLibroActual(query);
      } else {
        buscarEnTodaLaBiblia(query, searchAbortController.signal);
      }
    }

    function buscarEnLibroActual(query) {
      if (!window.libroActualData) {
        modalSearchBody.innerHTML = `<div class="search-vacio-msg">El libro actual no está cargado.</div>`;
        return;
      }

      const resultados = [];
      const queryNormalizada = normalizarTexto(query);

      const libroNombre = window.libroActualData.libro;
      const libroId = window.idLibroActual;
      const capitulos = window.libroActualData.capitulos;

      Object.keys(capitulos).forEach(capNum => {
        const versiculos = capitulos[capNum];
        Object.keys(versiculos).forEach(vNum => {
          const texto = versiculos[vNum];
          const textoNormalizado = normalizarTexto(texto);
          if (textoNormalizado.includes(queryNormalizada)) {
            resultados.push({
              libroId: libroId,
              libroNombre: libroNombre,
              capitulo: capNum,
              versiculo: vNum,
              texto: texto
            });
          }
        });
      });

      renderizarResultados(resultados, query);
    }

    async function buscarEnTodaLaBiblia(query, signal) {
      if (!window.indiceLibrosRutas) {
        modalSearchBody.innerHTML = `<div class="search-vacio-msg">No se pudo acceder al diccionario de libros.</div>`;
        return;
      }

      if (progressContainer) progressContainer.style.display = 'flex';
      const resultados = [];
      const queryNormalizada = normalizarTexto(query);

      const keysLibros = Object.keys(window.indiceLibrosRutas);
      const totalLibros = keysLibros.length;

      try {
        for (let i = 0; i < totalLibros; i++) {
          if (signal.aborted) return;

          const key = keysLibros[i];
          const libroInfo = window.indiceLibrosRutas[key];
          
          const porcentaje = Math.round(((i + 1) / totalLibros) * 100);
          if (progressFill) progressFill.style.width = `${porcentaje}%`;
          if (progressText) progressText.textContent = `Buscando en ${libroInfo.nombre}... ${porcentaje}%`;

          try {
            const res = await fetch(libroInfo.ruta, { signal });
            if (!res.ok) continue;
            const libroJson = await res.json();
            
            if (libroJson && libroJson.capitulos) {
              Object.keys(libroJson.capitulos).forEach(capNum => {
                const versiculos = libroJson.capitulos[capNum];
                Object.keys(versiculos).forEach(vNum => {
                  const texto = versiculos[vNum];
                  const textoNormalizado = normalizarTexto(texto);
                  if (textoNormalizado.includes(queryNormalizada)) {
                    resultados.push({
                      libroId: key,
                      libroNombre: libroInfo.nombre,
                      capitulo: capNum,
                      versiculo: vNum,
                      texto: texto
                    });
                  }
                });
              });
            }
          } catch (fetchErr) {
            if (fetchErr.name === 'AbortError') return;
            console.warn(`No se pudo buscar en ${libroInfo.nombre}:`, fetchErr);
          }
        }

        if (progressContainer) progressContainer.style.display = 'none';
        renderizarResultados(resultados, query);
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error("Error en la búsqueda global:", err);
        modalSearchBody.innerHTML = `<div class="search-vacio-msg">Ocurrió un error al realizar la búsqueda.</div>`;
      } finally {
        searchAbortController = null;
      }
    }

    function renderizarResultados(resultados, query) {
      if (resultados.length === 0) {
        modalSearchBody.innerHTML = `<div class="search-vacio-msg">No se encontraron resultados para "${query}".</div>`;
        return;
      }

      modalSearchBody.innerHTML = "";
      
      const container = document.createElement('div');
      container.className = 'search-results-wrapper';
      
      const queryRegex = new RegExp(escapeRegExp(query), 'gi');

      resultados.forEach(item => {
        const card = document.createElement('div');
        card.className = 'search-result-card';
        
        const textoResaltado = item.texto.replace(queryRegex, (match) => `<mark>${match}</mark>`);

        card.innerHTML = `
          <div class="search-result-ref">📌 ${item.libroNombre} ${item.capitulo}:${item.versiculo}</div>
          <div class="search-result-text">${textoResaltado}</div>
        `;

        card.addEventListener('click', () => {
          cerrarBuscar();
          
          window.scrollToVerseAfterRender = item.versiculo;
          
          if (window.idLibroActual === item.libroId) {
            if (typeof window.seleccionarCapitulo === 'function') {
              window.seleccionarCapitulo(item.capitulo);
            }
          } else {
            if (typeof window.seleccionarLibro === 'function') {
              window.evitarAutoAbrirCapitulos = true;
              window.seleccionarLibro(item.libroId, window.indiceLibrosRutas[item.libroId].ruta);
              setTimeout(() => {
                if (typeof window.seleccionarCapitulo === 'function') {
                  window.seleccionarCapitulo(item.capitulo);
                }
              }, 250);
            }
          }
        });

        container.appendChild(card);
      });

      modalSearchBody.appendChild(container);
    }

    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Lógica de instalación PWA
    let deferredPrompt = null;
    const installContainer = document.getElementById('menuInstallContainer');
    const installBtn = document.getElementById('menuInstallBtn');

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevenir el banner por defecto del navegador
      e.preventDefault();
      // Guardar el evento para dispararlo después
      deferredPrompt = e;
      // Mostrar el botón en el menú lateral
      if (installContainer) {
        installContainer.style.display = 'block';
      }
    });

    if (installBtn) {
      installBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!deferredPrompt) return;
        
        // Mostrar el prompt de instalación nativo
        deferredPrompt.prompt();
        
        // Esperar la respuesta del usuario
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('El usuario aceptó la instalación de la PWA');
          } else {
            console.log('El usuario canceló la instalación de la PWA');
          }
          // Limpiar el prompt guardado
          deferredPrompt = null;
          if (installContainer) {
            installContainer.style.display = 'none';
          }
          
          // Cerrar menú lateral
          if (typeof window.closeMenu === 'function') {
            window.closeMenu();
          }
        });
      });
    }

    window.addEventListener('appinstalled', (evt) => {
      console.log('La aplicación fue instalada con éxito');
      if (installContainer) {
        installContainer.style.display = 'none';
      }
      deferredPrompt = null;
    });

    // ==========================================================================
    // 5. TEXT-TO-SPEECH (TTS) - LECTURA DE VOZ DE LAS ESCRITURAS
    // ==========================================================================
    window.lastSpokenText = null;

    window.toggleSpeakText = function (text) {
      if (typeof window.speechSynthesis === 'undefined') {
        alert("Tu navegador o dispositivo no soporta la lectura de voz (Text-to-Speech).");
        return;
      }

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        // Si el texto a hablar es el mismo, hacemos toggle para detener
        if (window.lastSpokenText === text) {
          window.lastSpokenText = null;
          return;
        }
      }

      window.lastSpokenText = text;
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Intentar obtener la voz seleccionada por el usuario
      const voices = window.speechSynthesis.getVoices();
      const savedVoiceName = localStorage.getItem('biblia_setting_voz');
      let voice = null;
      
      if (savedVoiceName) {
        voice = voices.find(v => v.name === savedVoiceName);
      }
      
      if (!voice) {
        // Fallback a "Google español"
        voice = voices.find(v => v.lang.startsWith('es') && v.name.toLowerCase().includes('google'));
      }
      if (!voice) {
        // Fallback a cualquier voz en español
        voice = voices.find(v => v.lang.startsWith('es'));
      }
      if (!voice) {
        // Fallback a la voz predeterminada del sistema
        voice = voices.find(v => v.default);
      }

      if (voice) {
        utterance.voice = voice;
      }
      
      // Obtener velocidad guardada en localStorage
      const savedRate = localStorage.getItem('biblia_setting_velocidad_voz');
      utterance.rate = savedRate ? parseFloat(savedRate) : 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        window.lastSpokenText = null;
      };
      
      utterance.onerror = () => {
        window.lastSpokenText = null;
      };

      window.speechSynthesis.speak(utterance);
    };

    window.leerCapituloActualTextToSpeech = function () {
      if (!libroActualData || !capituloActualNum) return;
      
      const capData = libroActualData.capitulos[capituloActualNum];
      if (!capData) return;

      const clavesOrdenadas = Object.keys(capData).sort(compararVersiculos);
      
      let textoCompleto = "";
      clavesOrdenadas.forEach(numV => {
        const textoLimpio = capData[numV];
        textoCompleto += `${textoLimpio} `;
      });

      window.toggleSpeakText(textoCompleto.trim());
    };
  });
})();