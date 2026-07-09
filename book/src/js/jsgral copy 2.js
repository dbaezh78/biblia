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
let mapaEnlacesParalelos = null; // Guarda el JSON relacional de enlaces
let idLibroActual = "01_gn";

// Diccionario indexado de libros. Mapea códigos cortos de paralelos con sus archivos JSON reales
const indiceLibrosRutas = {
  "01_gn": { nombre: "Génesis", ruta: "src/libros/01_gn.json" },
  "23_is": { nombre: "Isaías", ruta: "src/libros/23_is.json" },
  "28_os": { nombre: "Oseas", ruta: "src/libros/28_os.json" },
  "47_2co": { nombre: "2 Corintios", ruta: "src/libros/47_2co.json" }
  // Cuando crees nuevos archivos JSON de la biblia, solo los indexas aquí
};

/* ==========================================================================
   1. CONTROLADOR DE EVENTOS DE NAVEGACIÓN (SELECTORES)
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
   2. CARGADOR GENERAL DE DATOS (FETCH API)
   ========================================================================== */

// Inicializador: Descarga el archivo relacional de paralelos primero
function inicializarApp() {
  fetch('src/js/paralelos.json')
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar src/js/paralelos.json");
      return res.json();
    })
    .then(enlacesData => {
      mapaEnlacesParalelos = enlacesData;
      
      if (selectLibro) {
        idLibroActual = selectLibro.value.split('/').pop().replace('.json', '');
        cargarLibroYCapitulo(selectLibro.value, 1);
      }
    })
    .catch(err => {
      console.error("Error cargando mapa de relaciones:", err);
      if (selectLibro) cargarLibroYCapitulo(selectLibro.value, 1);
    });
}

function cargarLibroYCapitulo(rutaJson, numeroCapitulo) {
  fetch(rutaJson)
    .then(response => {
      if (!response.ok) throw new Error(`Error al leer: ${rutaJson}`);
      return response.json();
    })
    .then(data => {
      libroActualData = data;
      capituloActualNum = numeroCapitulo;
      
      actualizarSelectorCapitulos(data.capitulos, numeroCapitulo);
      renderizarVersiculos(data, numeroCapitulo);
    })
    .catch(error => {
      console.error("Error al obtener el libro bíblico:", error);
    });
}

function actualizarSelectorCapitulos(capitulosObjeto, capActivo) {
  if (!selectCapitulo) return;
  selectCapitulo.innerHTML = ""; 
  
  const listaCapitulos = Object.keys(capitulosObjeto);
  listaCapitulos.forEach(cap => {
    const opcion = document.createElement('option');
    opcion.value = cap;
    opcion.textContent = `${cap}`;
    if (parseInt(cap, 10) === capActivo) opcion.selected = true;
    selectCapitulo.appendChild(opcion);
  });
}

function renderizarVersiculos(libroData, capSeleccionado) {
  const contenedorPrincipal = document.querySelector('.main-content');
  if (!contenedorPrincipal) return;
  
  let htmlContenido = ``;
  
  // Título del libro dinámico extraído directamente de su JSON
  htmlContenido += `<h1 class="libro-titulo">${libroData.libro}</h1>`;
  
  htmlContenido += `<div class="texto-sagrado">`;
  htmlContenido += `<span class="capitulo-num">${capSeleccionado}</span>`;
  
  const versiculos = libroData.capitulos[capSeleccionado];
  
  if (versiculos) {
    for (const numV in versiculos) {
      const textoVersiculo = versiculos[numV];
      const llaveCoordenada = `${idLibroActual}-c${capSeleccionado}-v${numV}`;
      
      // Consultamos si el versículo actual tiene paralelos en src/js/paralelos.json
      const tieneParalelos = mapaEnlacesParalelos && mapaEnlacesParalelos[llaveCoordenada];
      
      if (tieneParalelos) {
        const destinosString = mapaEnlacesParalelos[llaveCoordenada].join(',');
        htmlContenido += `
          <span class="versiculo tiene-paralelo" data-vnum="${numV}" data-destinos="${destinosString}">
            <span class="num-v v-con-circulo">${numV}</span>${textoVersiculo}
          </span>`;
      } else {
        htmlContenido += `
          <span class="versiculo">
            <span class="num-v">${numV}</span>${textoVersiculo}
          </span>`;
      }
    }
  } else {
    htmlContenido += `<p>El capítulo ${capSeleccionado} no se encuentra disponible.</p>`;
  }
  
  htmlContenido += `</div>`;
  
  // Nota de pie de página dinámica basada en metadatos del libro si existen
  htmlContenido += `
    <footer class="pie-pagina">
      <p><strong>Nota de Estudio:</strong> Texto bíblico extraído de la base unificada de ${libroData.libro}.</p>
    </footer>`;
    
  contenedorPrincipal.innerHTML = htmlContenido;
  activarEventosParalelos(); 
}

/* ==========================================================================
   3. RESOLUCIÓN DINÁMICA DE TEXTOS PARALELOS (BOTTOM SHEET)
   ========================================================================== */
function activarEventosParalelos() {
  const versiculosConParalelo = document.querySelectorAll('.tiene-paralelo');

  versiculosConParalelo.forEach(versiculo => {
    versiculo.addEventListener('click', (e) => {
      const elementoTarget = e.currentTarget;
      const numVersiculoOrig = elementoTarget.getAttribute('data-vnum');
      const destinos = elementoTarget.getAttribute('data-destinos').split(',');

      if (panelTitulo) panelTitulo.innerHTML = `📚 Escrutando: Capítulo ${capituloActualNum}:${numVersiculoOrig}`;
      if (panelContenido) panelContenido.innerHTML = `<p style="color: #888; font-style: italic; padding: 10px;">Buscando textos paralelos...</p>`;
      if (panelParalelos) panelParalelos.classList.add('open');

      // Iteramos sobre cada coordenada de destino asignada al versículo
      const consultasPromesas = destinos.map(coordenadaDestino => {
        const [libroId, capParte, versParte] = coordenadaDestino.split('-');
        const capNum = capParte.replace('c', '');
        const versNum = versParte.replace('v', '');

        const infoLibro = indiceLibrosRutas[libroId];
        if (!infoLibro) {
          return Promise.resolve(`
            <div style="margin-bottom: 12px; border-left: 3px solid #ccc; padding-left: 10px; font-size:0.95em;">
              <strong style="color: #777;">${libroId.toUpperCase()} ${capNum}:${versNum}</strong><br>
              <span style="color: #999; font-style: italic;">Libro paralelo configurado, pero su archivo JSON aún no está indexado.</span>
            </div>
          `);
        }

        // Consultamos en tiempo real el archivo JSON del libro destino
        return fetch(infoLibro.ruta)
          .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
          })
          .then(libroJson => {
            const textoExtraido = libroJson.capitulos[capNum]?.[versNum] || "El versículo no se encuentra disponible.";
            return `
              <div style="margin-bottom: 15px; border-left: 3px solid #cc0000; padding-left: 10px; font-size:0.95em;">
                <strong style="color: #cc0000; display: block; margin-bottom: 3px;">${infoLibro.nombre} ${capNum}:${versNum}</strong>
                <span style="font-style: italic; color: #2d3748;">"${textoExtraido}"</span>
              </div>
            `;
          })
          .catch(() => {
            return `
              <div style="margin-bottom: 12px; border-left: 3px solid #bbaaaa; padding-left: 10px; font-size:0.95em;">
                <strong style="color: #777;">${infoLibro.nombre} ${capNum}:${versNum}</strong><br>
                <span style="color: #a84444; font-style: italic;">No se pudo leer el archivo físico en ${infoLibro.ruta}</span>
              </div>
            `;
          });
      });

      // Al resolverse todas las llamadas paralelas asíncronas, inyectamos la respuesta combinada
      Promise.all(consultasPromesas).then(bloquesHtml => {
        if (panelContenido) panelContenido.innerHTML = bloquesHtml.join('');
      });
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
   4. LÓGICA DEL MENÚ LATERAL (SIDEBAR)
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

let startX = 0;
let currentX = 0;

document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchmove', (e) => {
  currentX = e.touches[0].clientX;
  if (sidebar && !sidebar.classList.contains('open') && startX < 40 && (currentX - startX) > 60) openMenu();
  if (sidebar && sidebar.classList.contains('open') && (startX - currentX) > 60) closeMenu();
});

/* ==========================================================================
   INICIALIZACIÓN DE LA APP
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  inicializarApp();
});