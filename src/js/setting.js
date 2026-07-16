/**
 * setting.js
 * Lógica para la configuración del formato de lectura de la Biblia.
 * Maneja el tamaño del texto, fuentes, espacio interlineal, separación de versículos,
 * modo oscuro (Día/Noche) y navegación gestual/con mouse de capítulos.
 */

(function () {
  // Mapas de fuentes tipográficas solicitadas (10 fuentes)
  const mapasFuentes = {
    'sans-serif': "sans-serif",
    'arial': "'Arial', sans-serif",
    'aptos': "'Aptos', sans-serif",
    'cavolini': "'Cavolini', sans-serif",
    'comic-sans': "'Comic Sans MS', cursive, sans-serif",
    'fairwater-script': "'Fairwater Script', 'Brush Script MT', cursive",
    'mv-boli': "'MV Boli', sans-serif",
    'neocat': "'Neocat', sans-serif",
    'pristina': "'Pristina', cursive, serif",
    'segoe-print': "'Segoe Print', cursive, sans-serif",
    'viner-hand': "'Viner Hand ITC', cursive, serif"
  };

  // Valores por defecto
  const DEFAULTS = {
    tamano: 25,
    interlineado: 1.7,
    fuente: 'mv-boli',
    separarVersiculos: true,
    ocultarTitulo: true, // Oculto por defecto
    tema: 'light' // 'light' para Día, 'dark' para Noche
  };

  // Estado actual de la configuración
  let config = {
    tamano: DEFAULTS.tamano,
    interlineado: DEFAULTS.interlineado,
    fuente: DEFAULTS.fuente,
    separarVersiculos: DEFAULTS.separarVersiculos,
    ocultarTitulo: DEFAULTS.ocultarTitulo,
    tema: DEFAULTS.tema
  };

  // 1. Cargar ajustes guardados en localStorage al iniciar
  function cargarAjustesGuardados() {
    try {
      const tamanoGuardado = localStorage.getItem('biblia_setting_tamano');
      const interlineadoGuardado = localStorage.getItem('biblia_setting_interlineado');
      const fuenteGuardada = localStorage.getItem('biblia_setting_fuente');
      const separarVersiculosGuardado = localStorage.getItem('biblia_setting_separar_versiculos');
      const ocultarTituloGuardado = localStorage.getItem('biblia_setting_ocultar_titulo');
      const temaGuardado = localStorage.getItem('biblia_setting_tema');

      if (tamanoGuardado) config.tamano = parseInt(tamanoGuardado, 10);
      if (interlineadoGuardado) config.interlineado = parseFloat(interlineadoGuardado);
      if (fuenteGuardada && mapasFuentes[fuenteGuardada]) config.fuente = fuenteGuardada;
      if (separarVersiculosGuardado) config.separarVersiculos = (separarVersiculosGuardado === 'true');
      
      if (ocultarTituloGuardado) {
        config.ocultarTitulo = (ocultarTituloGuardado === 'true');
      } else {
        config.ocultarTitulo = DEFAULTS.ocultarTitulo;
      }
      
      if (temaGuardado) config.tema = temaGuardado;
    } catch (e) {
      console.error("Error al acceder a localStorage:", e);
    }
  }

  // 2. Aplicar ajustes actuales a las variables CSS en :root y clases del body
  function aplicarAjustesEnCSS() {
    const root = document.documentElement;
    root.style.setProperty('--tamano-texto', `${config.tamano}px`);
    root.style.setProperty('--interlineado-texto', config.interlineado);
    
    const fuenteCSS = mapasFuentes[config.fuente] || mapasFuentes['aptos'];
    root.style.setProperty('--fuente-texto', fuenteCSS);

    // Aplicar la clase para el formato de un versículo por línea
    if (config.separarVersiculos) {
      document.body.classList.add('versiculos-separados');
    } else {
      document.body.classList.remove('versiculos-separados');
    }

    // Aplicar la clase para ocultar el título
    if (config.ocultarTitulo) {
      document.body.classList.add('titulo-oculto');
    } else {
      document.body.classList.remove('titulo-oculto');
    }

    // Aplicar clase para Modo Oscuro
    if (config.tema === 'dark') {
      document.body.classList.add('modo-oscuro');
    } else {
      document.body.classList.remove('modo-oscuro');
    }
  }

  // 3. Inyectar el HTML del panel de Ajustes en el body
  function inyectarPanelAjustes() {
    const div = document.createElement('div');
    div.className = 'container-panel-ajustes'; // Para no duplicar al re-inyectar
    div.innerHTML = `
      <div class="panel-ajustes" id="panelAjustes">
        <div class="ajustes-header">
          <h3 class="ajustes-titulo">⚙️ Ajustes de Lectura</h3>
          <button class="ajustes-close-btn" id="closeAjustesBtn" aria-label="Cerrar Ajustes">&times;</button>
        </div>
        
        <div class="ajustes-seccion">
          <div class="ajustes-seccion-titulo">Tipografía</div>
          <div class="ajustes-control-fila">
            <select id="selectFuente" class="ajustes-select">
              <option value="sans-serif" ${config.fuente === 'sans-serif' ? 'selected' : ''} style="font-family: sans-serif;">Sans-serif</option>
              <option value="arial" ${config.fuente === 'arial' ? 'selected' : ''} style="font-family: 'Arial', sans-serif;">Arial (Body CS)</option>
              <option value="aptos" ${config.fuente === 'aptos' ? 'selected' : ''} style="font-family: 'Aptos', sans-serif;">Aptos (Body)</option>
              <option value="cavolini" ${config.fuente === 'cavolini' ? 'selected' : ''} style="font-family: 'Cavolini', sans-serif;">Cavolini</option>
              <option value="comic-sans" ${config.fuente === 'comic-sans' ? 'selected' : ''} style="font-family: 'Comic Sans MS', sans-serif;">Comic Sans MS</option>
              <option value="fairwater-script" ${config.fuente === 'fairwater-script' ? 'selected' : ''} style="font-family: 'Fairwater Script', cursive;">Fairwater Script</option>
              <option value="mv-boli" ${config.fuente === 'mv-boli' ? 'selected' : ''} style="font-family: 'MV Boli', sans-serif;">MV Boli</option>
              <option value="neocat" ${config.fuente === 'neocat' ? 'selected' : ''} style="font-family: 'Neocat', sans-serif;">Neocat</option>
              <option value="pristina" ${config.fuente === 'pristina' ? 'selected' : ''} style="font-family: 'Pristina', cursive, serif;">Pristina</option>
              <option value="segoe-print" ${config.fuente === 'segoe-print' ? 'selected' : ''} style="font-family: 'Segoe Print', cursive, sans-serif;">Segoe Print</option>
              <option value="viner-hand" ${config.fuente === 'viner-hand' ? 'selected' : ''} style="font-family: 'Viner Hand ITC', cursive, serif;">Viner Hand ITC</option>
            </select>
          </div>
        </div>

        <div class="ajustes-seccion">
          <div class="ajustes-seccion-titulo">Tamaño del Texto</div>
          <div class="ajustes-control-fila">
            <input type="range" id="sliderTamano" class="ajustes-slider" min="14" max="50" step="1" value="${config.tamano}">
            <span class="ajustes-valor-lbl" id="lblTamano">${config.tamano}px</span>
          </div>
        </div>
        
        <div class="ajustes-seccion">
          <div class="ajustes-seccion-titulo">Espacio Interlineal</div>
          <div class="ajustes-control-fila">
            <input type="range" id="sliderInterlineado" class="ajustes-slider" min="1.2" max="2.2" step="0.1" value="${config.interlineado}">
            <span class="ajustes-valor-lbl" id="lblInterlineado">${config.interlineado}</span>
          </div>
        </div>
        
        <div class="ajustes-seccion">
          <div class="ajustes-seccion-titulo">Formato de Lectura</div>
          <div class="ajustes-control-fila" style="justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 0.95rem; color: var(--color-texto, #1a1a1a);">Un versículo por línea</span>
            <label class="ajustes-switch">
              <input type="checkbox" id="chkSepararVersiculos" ${config.separarVersiculos ? 'checked' : ''}>
              <span class="ajustes-switch-slider"></span>
            </label>
          </div>
          <div class="ajustes-control-fila" style="justify-content: space-between; align-items: center;">
            <span style="font-size: 0.95rem; color: var(--color-texto, #1a1a1a);">Ocultar título</span>
            <label class="ajustes-switch">
              <input type="checkbox" id="chkOcultarTitulo" ${config.ocultarTitulo ? 'checked' : ''}>
              <span class="ajustes-switch-slider"></span>
            </label>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(div.firstElementChild);
  }

  // 4. Mostrar y ocultar el panel de ajustes
  function abrirAjustes() {
    if (typeof window.closeMenu === 'function') {
      window.closeMenu();
    } else {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.remove('open');
    }

    const panel = document.getElementById('panelAjustes');
    const overlay = document.getElementById('overlay');
    
    if (panel) panel.classList.add('open');
    if (overlay) overlay.classList.add('show');
  }

  function cerrarAjustes() {
    const panel = document.getElementById('panelAjustes');
    const overlay = document.getElementById('overlay');
    
    if (panel) panel.classList.remove('open');
    
    const sidebar = document.getElementById('sidebar');
    const sidebarAbierto = sidebar && sidebar.classList.contains('open');
    if (overlay && !sidebarAbierto) {
      overlay.classList.remove('show');
    }
  }

  // 5. Comprobar si los paneles de control principales están cerrados
  function panelesCerrados() {
    const panelAjustes = document.getElementById('panelAjustes');
    const sidebar = document.getElementById('sidebar');
    
    const ajustesOpen = panelAjustes && panelAjustes.classList.contains('open');
    const sidebarOpen = sidebar && sidebar.classList.contains('open');
    
    return !ajustesOpen && !sidebarOpen;
  }

  // 6. Obtener claves ordenadas de libros
  function getClavesLibros() {
    if (typeof window.indiceLibrosRutas === 'undefined') return [];
    return Object.keys(window.indiceLibrosRutas).sort();
  }

  // 7. Navegar al capítulo siguiente
  function capituloSiguiente() {
    if (typeof window.libroActualData === 'undefined' || !window.libroActualData) return;
    
    const capSiguiente = window.capituloActualNum + 1;
    
    if (window.libroActualData.capitulos && window.libroActualData.capitulos[capSiguiente]) {
      window.navDirection = 'next';
      if (typeof window.seleccionarCapitulo === 'function') {
        window.seleccionarCapitulo(capSiguiente);
      }
    } else {
      // Siguiente libro, primer capítulo
      const claves = getClavesLibros();
      const currentIndex = claves.indexOf(window.idLibroActual);
      if (currentIndex !== -1 && currentIndex + 1 < claves.length) {
        const nextBookKey = claves[currentIndex + 1];
        window.navDirection = 'next';
        if (typeof window.seleccionarLibro === 'function') {
          window.seleccionarLibro(nextBookKey, window.indiceLibrosRutas[nextBookKey].ruta);
        }
      }
    }
  }

  // 8. Navegar al capítulo anterior
  function capituloAnterior() {
    if (typeof window.libroActualData === 'undefined' || !window.libroActualData) return;
    
    const capAnterior = window.capituloActualNum - 1;
    
    if (capAnterior >= 1) {
      window.navDirection = 'prev';
      if (typeof window.seleccionarCapitulo === 'function') {
        window.seleccionarCapitulo(capAnterior);
      }
    } else {
      // Libro anterior, último capítulo
      const claves = getClavesLibros();
      const currentIndex = claves.indexOf(window.idLibroActual);
      if (currentIndex !== -1 && currentIndex - 1 >= 0) {
        const prevBookKey = claves[currentIndex - 1];
        const prevBookRuta = window.indiceLibrosRutas[prevBookKey].ruta;
        
        window.navDirection = 'prev';
        fetch(prevBookRuta)
          .then(res => res.json())
          .then(data => {
            if (data && data.capitulos) {
              const chapters = Object.keys(data.capitulos).map(c => parseInt(c, 10));
              const lastCap = Math.max(...chapters);
              
              window.idLibroActual = prevBookKey;
              window.rutaLibroActual = prevBookRuta;
              
              try {
                localStorage.setItem('ultimoLibroKey', prevBookKey);
                localStorage.setItem('ultimoLibroRuta', prevBookRuta);
                localStorage.setItem('ultimoCapitulo', lastCap.toString());
              } catch (e) {
                console.error(e);
              }
              
              if (typeof window.cargarLibroYCapitulo === 'function') {
                window.cargarLibroYCapitulo(prevBookRuta, lastCap);
              }
            }
          })
          .catch(err => console.error("Error al navegar al libro anterior:", err));
      }
    }
  }

  // 9. Inyectar señalizadores y eventos para PC
  function inyectarNavegacionPC() {
    if (document.getElementById('detectZonaPrev')) return;

    // Zonas de detección
    const detectPrev = document.createElement('div');
    detectPrev.className = 'nav-zona-detect prev';
    detectPrev.id = 'detectZonaPrev';

    const detectNext = document.createElement('div');
    detectNext.className = 'nav-zona-detect next';
    detectNext.id = 'detectZonaNext';

    // Botones
    const btnPrev = document.createElement('button');
    btnPrev.className = 'nav-btn-flotante prev';
    btnPrev.id = 'navBtnFlotantePrev';
    btnPrev.innerHTML = `&#10094;`; // ❮
    btnPrev.setAttribute('aria-label', 'Capítulo anterior');

    const btnNext = document.createElement('button');
    btnNext.className = 'nav-btn-flotante next';
    btnNext.id = 'navBtnFlotanteNext';
    btnNext.innerHTML = `&#10095;`; // ❯
    btnNext.setAttribute('aria-label', 'Capítulo siguiente');

    document.body.appendChild(detectPrev);
    document.body.appendChild(detectNext);
    document.body.appendChild(btnPrev);
    document.body.appendChild(btnNext);

    // Detecciones Hover
    detectPrev.addEventListener('mouseenter', () => {
      if (panelesCerrados()) btnPrev.classList.add('visible');
    });
    detectPrev.addEventListener('mouseleave', () => {
      btnPrev.classList.remove('visible');
    });

    detectNext.addEventListener('mouseenter', () => {
      if (panelesCerrados()) btnNext.classList.add('visible');
    });
    detectNext.addEventListener('mouseleave', () => {
      btnNext.classList.remove('visible');
    });

    btnPrev.addEventListener('mouseenter', () => btnPrev.classList.add('visible'));
    btnPrev.addEventListener('mouseleave', () => btnPrev.classList.remove('visible'));

    btnNext.addEventListener('mouseenter', () => btnNext.classList.add('visible'));
    btnNext.addEventListener('mouseleave', () => btnNext.classList.remove('visible'));

    // Navegación en clics (también en la zona de detección completa)
    detectPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      if (panelesCerrados()) {
        capituloAnterior();
      }
    });
    detectNext.addEventListener('click', (e) => {
      e.stopPropagation();
      if (panelesCerrados()) {
        capituloSiguiente();
      }
    });

    btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      if (panelesCerrados()) {
        capituloAnterior();
      }
    });
    btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      if (panelesCerrados()) {
        capituloSiguiente();
      }
    });
  }

  // 10. Configurar gestos táctiles para móviles (desactivado en favor del nuevo swiper premium de arrastre)
  function configurarGestosDesplazamiento() {
    // Desactivado para evitar conflictos con el swiper continuo en jsgral.js
  }

  // 11. Configurar controladores de eventos tradicionales
  function configurarEventos() {
    const btnMenuAjustes = document.getElementById('menuAjustesBtn');
    const btnCerrar = document.getElementById('closeAjustesBtn');
    const overlay = document.getElementById('overlay');
    const btnMenuTema = document.getElementById('menuTemaBtn');

    const sliderTamano = document.getElementById('sliderTamano');
    const lblTamano = document.getElementById('lblTamano');

    const sliderInterlineado = document.getElementById('sliderInterlineado');
    const lblInterlineado = document.getElementById('lblInterlineado');

    const selectFuente = document.getElementById('selectFuente');
    const chkSepararVersiculos = document.getElementById('chkSepararVersiculos');
    const chkOcultarTitulo = document.getElementById('chkOcultarTitulo');

    // Apertura y cierre del panel de Ajustes
    if (btnMenuAjustes) {
      btnMenuAjustes.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        abrirAjustes();
      });
    }

    if (btnCerrar) {
      btnCerrar.addEventListener('click', function (e) {
        e.stopPropagation();
        cerrarAjustes();
      });
    }

    if (overlay) {
      overlay.addEventListener('click', cerrarAjustes);
    }

    // Evitar que clics dentro del panel lo cierren accidentalmente
    const panel = document.getElementById('panelAjustes');
    if (panel) {
      panel.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    }

    // Botón de alternancia de Tema (Día/Noche)
    if (btnMenuTema) {
      btnMenuTema.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        config.tema = (config.tema === 'dark') ? 'light' : 'dark';
        aplicarAjustesEnCSS();

        try {
          localStorage.setItem('biblia_setting_tema', config.tema);
        } catch (err) {
          console.error("Error al guardar tema:", err);
        }
      });
    }

    // Evento Slider de Tamaño de Texto
    if (sliderTamano && lblTamano) {
      sliderTamano.addEventListener('input', function (e) {
        const val = parseInt(e.target.value, 10);
        config.tamano = val;
        lblTamano.textContent = `${val}px`;
        aplicarAjustesEnCSS();
        
        try {
          localStorage.setItem('biblia_setting_tamano', val.toString());
        } catch (err) {
          console.error(err);
        }
      });
    }

    // Evento Slider de Espacio Interlineal
    if (sliderInterlineado && lblInterlineado) {
      sliderInterlineado.addEventListener('input', function (e) {
        const val = parseFloat(e.target.value);
        config.interlineado = val;
        lblInterlineado.textContent = val.toFixed(1);
        aplicarAjustesEnCSS();
        
        try {
          localStorage.setItem('biblia_setting_interlineado', val.toString());
        } catch (err) {
          console.error(err);
        }
      });
    }

    // Evento Selección de Fuentes (select dropdown)
    if (selectFuente) {
      selectFuente.addEventListener('change', function (e) {
        const fontKey = e.target.value;
        if (!fontKey || !mapasFuentes[fontKey]) return;

        config.fuente = fontKey;
        aplicarAjustesEnCSS();

        try {
          localStorage.setItem('biblia_setting_fuente', fontKey);
        } catch (err) {
          console.error(err);
        }
      });
    }

    // Evento Toggle de Separación de Versículos
    if (chkSepararVersiculos) {
      chkSepararVersiculos.addEventListener('change', function (e) {
        const checked = e.target.checked;
        config.separarVersiculos = checked;
        aplicarAjustesEnCSS();

        try {
          localStorage.setItem('biblia_setting_separar_versiculos', checked.toString());
        } catch (err) {
          console.error(err);
        }
      });
    }

    // Evento Toggle de Ocultar Título
    if (chkOcultarTitulo) {
      chkOcultarTitulo.addEventListener('change', function (e) {
        const checked = e.target.checked;
        config.ocultarTitulo = checked;
        aplicarAjustesEnCSS();

        try {
          localStorage.setItem('biblia_setting_ocultar_titulo', checked.toString());
        } catch (err) {
          console.error(err);
        }
      });
    }
  }

  // 12. Inicialización de la lógica
  document.addEventListener('DOMContentLoaded', function () {
    cargarAjustesGuardados();
    aplicarAjustesEnCSS();
    inyectarPanelAjustes();
    configurarEventos();
    inyectarNavegacionPC();
    configurarGestosDesplazamiento();
    
    // Exponer funciones útiles globalmente
    window.abrirAjustes = abrirAjustes;
    window.cerrarAjustes = cerrarAjustes;
    window.capituloSiguiente = capituloSiguiente;
    window.capituloAnterior = capituloAnterior;
  });
})();
