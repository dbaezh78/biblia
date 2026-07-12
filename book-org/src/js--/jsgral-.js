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
let libroActualData = null;
let capituloActualNum = 1;
let mapaEnlacesParalelos = null; 
let idLibroActual = "01_gn";
let rutaLibroActual = "src/libros/01_gn.json";

// Diccionario unificado con los 73 libros
const indiceLibrosRutas = {
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
  "14_2cr": { fontNombre: "II Crónicas", ruta: "src/libros/14_2cr.json" },
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
  "25_ecl": { nombre: "Eclesiastés", ruta: "src/libros/25_ecl.json" },
  "26_cant": { nombre: "Cantar de Cantares", ruta: "src/libros/26_cant.json" },
  "27_sab": { nombre: "Sabiduría", ruta: "src/libros/27_sab.json" },
  "28_ecl": { nombre: "Eclesiástico", ruta: "src/libros/28_ecl.json" },
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
  "39_jn": { nombre: "Jonás", ruta: "src/libros/39_jn.json" },
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
  "50_ju": { nombre: "Juan", ruta: "src/libros/50_ju.json" },
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
/* ==========================================================================
   CATEGORÍA 2: NÚCLEO DE NAVEGACIÓN Y CONFIGURACIÓN DE SELECTORES HORIZONTALES
   ========================================================================== */
function normalizarTexto(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function llenarSelectorLibros() {
  const listContainer = document.getElementById('libroOptionsList');
  if (!listContainer) return;

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
    
    opt.innerHTML = `<span>${libroInfo.nombre.toUpperCase()}</span>`;

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
  cargarLibroYCapitulo(ruta, 1);
  
  // Auto-abrir selector de capítulos después de seleccionar un libro
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

function seleccionarCapitulo(cap) {
  capituloActualNum = parseInt(cap, 10);
  cerrarTodosDropdowns();
  cargarLibroYCapitulo(rutaLibroActual, capituloActualNum);
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
      libroSearch.value = "";
      filtrarLibros("");
      setTimeout(() => libroSearch.focus(), 50);
    }
  });

  libroSearch.addEventListener('input', (e) => {
    filtrarLibros(e.target.value);
  });

  capituloTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = capituloDropdown.classList.contains('open');
    cerrarTodosDropdowns();
    if (!isOpen) {
      capituloDropdown.classList.add('open');
      capituloSearch.value = "";
      filtrarCapitulos("");
      setTimeout(() => capituloSearch.focus(), 50);
    }
  });

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

function renderizarVersiculos(libroData, capSeleccionado) {
  const contenedorPrincipal = document.querySelector('.main-content');
  if (!contenedorPrincipal) return;
  
  let htmlContenido = `<h1 class="libro-titulo">${libroData.libro}</h1>`;
  htmlContenido += `<div class="texto-sagrado"><span class="capitulo-num">${capSeleccionado}</span>`;
  
  const versiculos = libroData.capitulos[capSeleccionado];
  if (versiculos) {
    // Ordenar las claves de los versículos de manera inteligente (ej: 5a, 5b entre el 4 y el 7)
    const clavesOrdenadas = Object.keys(versiculos).sort(compararVersiculos);

    clavesOrdenadas.forEach(numV => {
      const textoVersiculo = versiculos[numV];
      const llaveCoordenada = `${idLibroActual}-c${capSeleccionado}-v${numV}`;
      const tieneParalelos = mapaEnlacesParalelos && mapaEnlacesParalelos[llaveCoordenada];
      
      if (tieneParalelos) {
        const destinosString = mapaEnlacesParalelos[llaveCoordenada].join(',');
        htmlContenido += `
          <span class="versiculo tiene-paralelo" data-vnum="${numV}" data-destinos="${destinosString}">
            <span class="num-v v-con-circulo">${numV}</span>${textoVersiculo}
          </span>`;
      } else {
        htmlContenido += `<span class="versiculo"><span class="num-v">${numV}</span>${textoVersiculo}</span>`;
      }
    });
  }
  htmlContenido += `</div>`;
  contenedorPrincipal.innerHTML = htmlContenido;
  activarEventosParalelos(); 
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
        const idVersiculoCompleto = partes[2].replace('v', ''); 

        const infoLibro = indiceLibrosRutas[libroId];
        if (!infoLibro) return Promise.resolve('');

        return fetch(infoLibro.ruta)
          .then(res => res.ok ? res.json() : null)
          .then(libroJson => {
            if (!libroJson || !libroJson.capitulos || !libroJson.capitulos[capNum]) return '';

            let textoOriginal = libroJson.capitulos[capNum][idVersiculoCompleto] || "";

            if (!textoOriginal && idVersiculoCompleto.includes('_')) {
              const primerNumero = idVersiculoCompleto.split('_')[0];
              textoOriginal = libroJson.capitulos[capNum][primerNumero] || "";
            }

            let vistaPreviaTexto = "";
            if (textoOriginal.length > 40) {
              vistaPreviaTexto = textoOriginal.substring(0, 40).trim() + "...";
            } else {
              vistaPreviaTexto = textoOriginal || "(Texto no disponible)";
            }

            const citaFormateadaLector = idVersiculoCompleto.replace('_', '-');
            const textoCitaFormateada = `${infoLibro.nombre} ${capNum},${citaFormateadaLector}`;

            return `
              <div class="bloque-paralelo-link" 
                   data-ruta="${infoLibro.ruta}" 
                   data-libro-id="${libroId}" 
                   data-cap="${capNum}" 
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

      closePanel();

      idLibroActual = libroIdDestino;
      rutaLibroActual = rutaDestino;
      cargarLibroYCapitulo(rutaDestino, capDestino);
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



function construirNavegacionDinamica() {
  const contenedorSelector = document.getElementById('selectorBiblico');
  if (!contenedorSelector) return;

  contenedorSelector.innerHTML = `
    <!-- Selector de Libro -->
    <div class="custom-select-container" id="libroContainer">
      <div class="custom-select-trigger" id="libroTrigger">GÉNESIS</div>
      <div class="custom-dropdown" id="libroDropdown">
        <input type="text" class="custom-search-input" id="libroSearch" placeholder="Buscar libro..." autocomplete="off">
        <div class="custom-options-list" id="libroOptionsList"></div>
      </div>
    </div>

    <!-- Selector de Capítulo -->
    <div class="custom-select-container" id="capituloContainer">
      <div class="custom-select-trigger cap-trigger" id="capituloTrigger">1</div>
      <div class="custom-dropdown cap-dropdown" id="capituloDropdown">
        <input type="text" class="custom-search-input" id="capituloSearch" placeholder="Capítulo..." autocomplete="off">
        <div class="custom-options-grid" id="capituloOptionsList"></div>
      </div>
    </div>
  `;
}


/* ==========================================================================
   5. INICIALIZACIÓN CORREGIDA
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // A. Construir visualmente la barra limpia (Libro y número rojo) desde el JS
  construirNavegacionDinamica();

  // B. Renderizar dinámicamente los 73 libros en el selector que se acaba de crear
  llenarSelectorLibros();

  // C. Configurar los eventos de escucha para Libro y Capítulo
  configurarNavegacionSuperior();

  // D. Carga original de referencias cruzadas y arranque de la App
  fetch('src/js/paralelos.json')
    .then(res => res.json())
    .then(data => {
      mapaEnlacesParalelos = data;
      
      const rutaInicial = "src/libros/01_gn.json";
      idLibroActual = "01_gn";
      rutaLibroActual = rutaInicial;
      
      cargarLibroYCapitulo(rutaInicial, 1);
    })
    .catch(err => {
      console.error("Error al cargar paralelos de inicio:", err);
      // Fallback de seguridad si falla el JSON de paralelos
      const rutaInicial = "src/libros/01_gn.json";
      idLibroActual = "01_gn";
      rutaLibroActual = rutaInicial;
      cargarLibroYCapitulo(rutaInicial, 1);
    });
});


/*    5. INICIALIZACIÓN CORREGIDA */

