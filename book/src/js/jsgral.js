// Elementos del DOM para el Menú Lateral y Paralelos
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('openBtn');

const panelParalelos = document.getElementById('panelParalelos');
const panelTitulo = document.getElementById('panelTitulo');
const panelContenido = document.getElementById('panelContenido');
const closePanelBtn = document.getElementById('closePanelBtn');

// Elementos del DOM para la Navegación Dinámica
const selectLibro = document.getElementById('selectLibro');
const selectCapitulo = document.getElementById('selectCapitulo');

// Variables de control de estado globales
let libroActualData = null;
let capituloActualNum = 1;
let mapaEnlacesParalelos = null; 
let idLibroActual = "01_gn";

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
   1. CONTROLADORES DE EVENTOS DE INTERFAZ
   ========================================================================== */
if (selectLibro) {
  selectLibro.addEventListener('change', (e) => {
    const rutaSeleccionada = e.target.value;
    idLibroActual = rutaSeleccionada.split('/').pop().replace('.json', '');
    cargarLibroYCapitulo(rutaSeleccionada, 1);
  });
}

if (selectCapitulo) {
  selectCapitulo.addEventListener('change', (e) => {
    const numeroCapitulo = parseInt(e.target.value, 10);
    capituloActualNum = numeroCapitulo;
    if (libroActualData) {
      renderizarVersiculos(libroActualData, capituloActualNum);
    }
  });
}

/* ==========================================================================
   2. NÚCLEO FETCH DE DATOS
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
  if (selectLibro) {
    idLibroActual = selectLibro.value.split('/').pop().replace('.json', '');
    cargarLibroYCapitulo(selectLibro.value, 1);
  }
}

function cargarLibroYCapitulo(rutaJson, numeroCapitulo) {
  fetch(rutaJson)
    .then(response => { if (!response.ok) throw new Error(); return response.json(); })
    .then(data => {
      libroActualData = data;
      capituloActualNum = numeroCapitulo;
      actualizarSelectorCapitulos(data.capitulos, numeroCapitulo);
      renderizarVersiculos(data, numeroCapitulo);
    })
    .catch(error => console.error("Error al obtener datos:", error));
}

function actualizarSelectorCapitulos(capitulosObjeto, capActivo) {
  if (!selectCapitulo) return;
  selectCapitulo.innerHTML = ""; 
  Object.keys(capitulosObjeto).forEach(cap => {
    const opcion = document.createElement('option');
    opcion.value = cap;
    opcion.textContent = `Capítulo ${cap}`;
    if (parseInt(cap, 10) === capActivo) opcion.selected = true;
    selectCapitulo.appendChild(opcion);
  });
}

function renderizarVersiculos(libroData, capSeleccionado) {
  const contenedorPrincipal = document.querySelector('.main-content');
  if (!contenedorPrincipal) return;
  
  let htmlContenido = `<h1 class="libro-titulo">${libroData.libro}</h1>`;
  htmlContenido += `<div class="texto-sagrado"><span class="capitulo-num">${capSeleccionado}</span>`;
  
  const versiculos = libroData.capitulos[capSeleccionado];
  if (versiculos) {
    for (const numV in versiculos) {
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
    }
  }
  htmlContenido += `</div>`;
  contenedorPrincipal.innerHTML = htmlContenido;
  activarEventosParalelos(); 
}

/* ==========================================================================
   CATEGORÍA 4: PROCESADOR DE CITAS - DISEÑO HORIZONTAL / VERTICAL MÓVIL
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

            // Ajustamos el estilo para que funcione dinámicamente en bloques con ancho del 100% en móviles
            return `
              <div class="bloque-paralelo-link" 
                   data-ruta="${infoLibro.ruta}" 
                   data-libro-id="${libroId}" 
                   data-cap="${capNum}" 
                   style="flex: 1 1 calc(50% - 10px); min-width: 250px; max-width: 100%; border-left: 3px solid #cc0000; padding: 10px; cursor: pointer; background: #fff; border-radius: 0 6px 6px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); box-sizing: border-box;">
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
            panelContenido.innerHTML = `<p style="color: #888; font-style: italic; padding: 10px;">No se encontraron los textos de las referencias cruzadas.</p>`;
          } else {
            // Detectamos si es pantalla móvil basándonos en el ancho de la ventana
            const esMovil = window.innerWidth <= 600;
            const direccionFlex = esMovil ? 'column' : 'row';

            panelContenido.innerHTML = `
              <div style="display: flex; flex-direction: ${direccionFlex}; flex-wrap: wrap; gap: 10px; width: 100%; padding: 5px; box-sizing: border-box;">
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

      if (selectLibro) {
        selectLibro.value = rutaDestino;
        idLibroActual = libroIdDestino;
      }
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

/* ==========================================================================
   5. INICIALIZACIÓN
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  inicializarApp();
});