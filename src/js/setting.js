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
    tema: 'light', // 'light' para Día, 'dark' para Noche
    colorSeleccion: '#72de54', // Valor por defecto
    colorHoverParalelo: '#30c6f8', // Valor por defecto (rojo)
    vozSeleccionada: '',
    velocidadVoz: 1.1,
    anchoTextoPc: 1020
  };

  // Estado actual de la configuración
  let config = {
    tamano: DEFAULTS.tamano,
    interlineado: DEFAULTS.interlineado,
    fuente: DEFAULTS.fuente,
    separarVersiculos: DEFAULTS.separarVersiculos,
    ocultarTitulo: DEFAULTS.ocultarTitulo,
    tema: DEFAULTS.tema,
    colorSeleccion: DEFAULTS.colorSeleccion,
    colorHoverParalelo: DEFAULTS.colorHoverParalelo,
    vozSeleccionada: DEFAULTS.vozSeleccionada,
    velocidadVoz: DEFAULTS.velocidadVoz,
    anchoTextoPc: DEFAULTS.anchoTextoPc
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
      const colorSeleccionGuardado = localStorage.getItem('biblia_setting_color_seleccion');
      const colorHoverParaleloGuardado = localStorage.getItem('biblia_setting_color_hover_paralelo');
      const vozGuardada = localStorage.getItem('biblia_setting_voz');
      const velocidadVozGuardada = localStorage.getItem('biblia_setting_velocidad_voz');
      const anchoTextoPcGuardado = localStorage.getItem('biblia_setting_ancho_texto_pc');

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
      if (colorSeleccionGuardado) config.colorSeleccion = colorSeleccionGuardado;
      if (colorHoverParaleloGuardado) config.colorHoverParalelo = colorHoverParaleloGuardado;
      if (vozGuardada) config.vozSeleccionada = vozGuardada;
      if (velocidadVozGuardada) config.velocidadVoz = parseFloat(velocidadVozGuardada);
      if (anchoTextoPcGuardado) config.anchoTextoPc = parseInt(anchoTextoPcGuardado, 10);
    } catch (e) {
      console.error("Error al acceder a localStorage:", e);
    }
  }

  // 2. Aplicar ajustes actuales a las variables CSS en :root y clases del body
  function aplicarAjustesEnCSS() {
    const root = document.documentElement;
    root.style.setProperty('--tamano-texto', `${config.tamano}px`);
    root.style.setProperty('--interlineado-texto', config.interlineado);
    root.style.setProperty('--ancho-texto-pc', `${config.anchoTextoPc}px`);
    
    const fuenteCSS = mapasFuentes[config.fuente] || mapasFuentes['aptos'];
    root.style.setProperty('--fuente-texto', fuenteCSS);
    root.style.setProperty('--color-seleccion-actual', `${config.colorSeleccion}70`);
    root.style.setProperty('--color-hover-paralelo', `${config.colorHoverParalelo}0d`);

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
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
            <div>
              <div class="ajustes-seccion-titulo" style="margin-bottom: 6px;">Tipografía</div>
              <select id="selectFuente" class="ajustes-select" style="width: 100%;">
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
            <div>
              <div class="ajustes-seccion-titulo" style="margin-bottom: 6px;">Voz de Lectura</div>
              <select id="selectVozLectura" class="ajustes-select" style="width: 100%;">
                <option value="">Cargando voces...</option>
              </select>
            </div>
          </div>
          <div style="border-top: 1px solid rgba(0,0,0,0.06); padding-top: 12px;">
            <div class="ajustes-seccion-titulo" style="margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
              <span>Velocidad de Voz</span>
              <span class="ajustes-valor-lbl" id="lblVelocidadVoz">${config.velocidadVoz.toFixed(1)}x</span>
            </div>
            <div class="ajustes-control-fila">
              <input type="range" id="sliderVelocidadVoz" class="ajustes-slider" min="0.5" max="2.0" step="0.1" value="${config.velocidadVoz}">
            </div>
          </div>
        </div>

        <div class="ajustes-seccion">
          <div class="ajustes-seccion-titulo">Personalizar color</div>
          
          <div class="ajustes-control-fila" style="justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 0.95rem; color: var(--color-texto, #1a1a1a);">Color de Selección</span>
            <input type="color" id="pickerColorSeleccion" value="${config.colorSeleccion}" style="border: none; width: 45px; height: 30px; border-radius: 6px; cursor: pointer; padding: 0; background: transparent;">
          </div>
          
          <div class="ajustes-control-fila" style="justify-content: space-between; align-items: center;">
            <span style="font-size: 0.95rem; color: var(--color-texto, #1a1a1a);">Color de paralelos</span>
            <input type="color" id="pickerColorHoverParalelo" value="${config.colorHoverParalelo}" style="border: none; width: 45px; height: 30px; border-radius: 6px; cursor: pointer; padding: 0; background: transparent;">
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
        
        <div class="ajustes-seccion solo-pc">
          <div class="ajustes-seccion-titulo">Ancho del Texto (PC)</div>
          <div class="ajustes-control-fila">
            <input type="range" id="sliderAnchoTextoPc" class="ajustes-slider" min="600" max="1400" step="20" value="${config.anchoTextoPc}">
            <span class="ajustes-valor-lbl" id="lblAnchoTextoPc">${config.anchoTextoPc}px</span>
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
        <div class="ajustes-seccion" style="border-top: 1px solid #edf2f7; padding-top: 15px; margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
          <div style="text-align: left; display: flex; flex-direction: column;">
            <span style="font-size: 0.95rem; font-weight: bold; color: var(--color-texto, #2d3748);">Actualizar Aplicación</span>
            <span style="font-size: 0.8rem; color: #718096; margin-top: 2px;">v1.39.0</span>
          </div>
          <button id="btnActualizarAplicacion" style="width: 44px; height: 36px; background-color: #3182ce; color: white; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: background-color 0.2s;" title="Actualizar Aplicación">
            <span class="material-symbols-outlined" style="font-size: 20px;">sync</span>
          </button>
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

  // 10. Configurar gestos táctiles para móviles (ajuste de tamaño de letra mediante pellizco multitáctil)
  function configurarGestosDesplazamiento() {
    let touchStartDist = 0;
    let touchStartFontSize = 25;
    let isPinching = false;

    function getTouchDistance(touches) {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }

    document.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        // Es un gesto de pellizco, prevenimos el zoom nativo del navegador
        e.preventDefault();
        touchStartDist = getTouchDistance(e.touches);
        touchStartFontSize = config.tamano;
        isPinching = true;
      }
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && isPinching) {
        e.preventDefault(); // Bloquear el zoom por defecto del viewport
        const currentDist = getTouchDistance(e.touches);
        if (touchStartDist > 0) {
          const ratio = currentDist / touchStartDist;
          let newSize = Math.round(touchStartFontSize * ratio);
          
          // Mantener la letra dentro de los límites del slider (14px - 50px)
          newSize = Math.max(14, Math.min(50, newSize));
          
          if (newSize !== config.tamano) {
            config.tamano = newSize;
            aplicarAjustesEnCSS();
            
            // Sincronizar el slider visual en el panel si está abierto
            const slider = document.getElementById('sliderTamano');
            const lbl = document.getElementById('lblTamano');
            if (slider) slider.value = newSize;
            if (lbl) lbl.textContent = `${newSize}px`;
          }
        }
      }
    }, { passive: false });

    document.addEventListener('touchend', (e) => {
      if (isPinching && e.touches.length < 2) {
        isPinching = false;
        try {
          localStorage.setItem('biblia_setting_tamano', config.tamano.toString());
        } catch (err) {
          console.error(err);
        }
      }
    });
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

    const sliderAnchoTextoPc = document.getElementById('sliderAnchoTextoPc');
    const lblAnchoTextoPc = document.getElementById('lblAnchoTextoPc');

    const selectFuente = document.getElementById('selectFuente');
    const pickerColorSeleccion = document.getElementById('pickerColorSeleccion');
    const pickerColorHoverParalelo = document.getElementById('pickerColorHoverParalelo');
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

    // Evento Slider de Ancho del Texto (PC)
    if (sliderAnchoTextoPc && lblAnchoTextoPc) {
      sliderAnchoTextoPc.addEventListener('input', function (e) {
        const val = parseInt(e.target.value, 10);
        config.anchoTextoPc = val;
        lblAnchoTextoPc.textContent = `${val}px`;
        aplicarAjustesEnCSS();
        
        try {
          localStorage.setItem('biblia_setting_ancho_texto_pc', val.toString());
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

    // Evento Selección de Voces (select dropdown)
    const selectVoz = document.getElementById('selectVozLectura');
    if (selectVoz) {
      selectVoz.addEventListener('change', function (e) {
        const voiceName = e.target.value;
        config.vozSeleccionada = voiceName;
        try {
          localStorage.setItem('biblia_setting_voz', voiceName);
        } catch (err) {
          console.error(err);
        }
      });
    }

    // Evento Color de Selección Personalizado
    if (pickerColorSeleccion) {
      pickerColorSeleccion.addEventListener('input', function (e) {
        const val = e.target.value;
        config.colorSeleccion = val;
        aplicarAjustesEnCSS();

        try {
          localStorage.setItem('biblia_setting_color_seleccion', val);
        } catch (err) {
          console.error(err);
        }
      });
    }

    // Evento Color Hover Paralelo Personalizado
    if (pickerColorHoverParalelo) {
      pickerColorHoverParalelo.addEventListener('input', function (e) {
        const val = e.target.value;
        config.colorHoverParalelo = val;
        aplicarAjustesEnCSS();

        try {
          localStorage.setItem('biblia_setting_color_hover_paralelo', val);
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

    // Evento Slider de Velocidad de Voz
    const sliderVelocidad = document.getElementById('sliderVelocidadVoz');
    const lblVelocidad = document.getElementById('lblVelocidadVoz');
    if (sliderVelocidad && lblVelocidad) {
      sliderVelocidad.addEventListener('input', function (e) {
        const val = parseFloat(e.target.value);
        config.velocidadVoz = val;
        lblVelocidad.textContent = `${val.toFixed(1)}x`;
        try {
          localStorage.setItem('biblia_setting_velocidad_voz', val.toString());
        } catch (err) {
          console.error(err);
        }
      });
    }

    // Evento para limpiar la caché de PWA y forzar recarga del navegador manteniendo la sesión
    const btnActualizarAplicacion = document.getElementById('btnActualizarAplicacion');
    if (btnActualizarAplicacion) {
      btnActualizarAplicacion.addEventListener('click', async function (e) {
        e.stopPropagation();

        // Verificar si el dispositivo está online para poder descargar
        if (!navigator.onLine) {
          alert("No se puede actualizar la aplicación sin conexión a Internet. Por favor, conéctate a una red e inténtalo de nuevo.");
          return;
        }

        btnActualizarAplicacion.disabled = true;
        btnActualizarAplicacion.innerHTML = '<span class="material-symbols-outlined">sync</span>';

        // Crear e inyectar el overlay de progreso premium
        const progressOverlay = document.createElement('div');
        progressOverlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(26, 32, 44, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 999999;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        `;
        progressOverlay.innerHTML = `
          <div style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 20px; padding: 35px 25px; max-width: 420px; width: 90%; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.4); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);">
            <div style="font-size: 2.5rem; margin-bottom: 15px;">📚</div>
            <h3 style="margin: 0 0 8px 0; font-size: 1.4rem; font-weight: 700; color: #fff; letter-spacing: -0.5px;">Actualizando Aplicación</h3>
            <p style="margin: 0 0 25px 0; font-size: 0.92rem; color: #a0aec0; line-height: 1.4;">Descargando textos sagrados y archivos del sistema para uso sin conexión (offline).</p>
            
            <div style="width: 100%; height: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; overflow: hidden; margin-bottom: 12px; border: 1px solid rgba(255,255,255,0.05);">
              <div id="progresoBarActualizar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #4299e1, #667eea); border-radius: 5px; transition: width 0.1s ease;"></div>
            </div>
            
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; color: #e2e8f0; margin-bottom: 15px;">
              <span id="progresoTextoActualizar">Preparando descarga...</span>
              <span id="progresoPorcentajeActualizar">0%</span>
            </div>
            
            <div id="progresoDetalleActualizar" style="font-size: 0.8rem; color: #a0aec0; font-style: italic; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"></div>
          </div>
        `;
        document.body.appendChild(progressOverlay);

        const progressBar = document.getElementById('progresoBarActualizar');
        const progressText = document.getElementById('progresoTextoActualizar');
        const progressPercent = document.getElementById('progresoPorcentajeActualizar');
        const progressDetail = document.getElementById('progresoDetalleActualizar');

        // Construir lista de archivos a actualizar/precargar
        const ASSETS = [
          './',
          './index.html',
          './manifest.json',
          './src/css/cssgral.css',
          './src/js/jsgral.js',
          './src/js/setting.js',
          './src/js/googlefirebase.js',
          './src/js/liturgia_data.js',
          './src/js/liturgia.js',
          './src/js/annotation.js',
          './src/img/ico.ico',
          './src/img/icon-192.png',
          './src/img/icon-512.png',
          'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0'
        ];

        // Añadir todos los libros JSON
        if (window.indiceLibrosRutas) {
          for (const key in window.indiceLibrosRutas) {
            ASSETS.push(window.indiceLibrosRutas[key].ruta);
          }
        }

        const totalFiles = ASSETS.length;
        let downloadedCount = 0;

        try {
          // Abrir la caché principal de la app (detectando el nombre dinámicamente)
          const cacheKeys = await caches.keys();
          const activeCacheName = cacheKeys.find(k => k.startsWith('biblia-digital-cache-')) || 'biblia-digital-cache-v13';
          const cache = await caches.open(activeCacheName);

          for (let i = 0; i < totalFiles; i++) {
            const url = ASSETS[i];
            
            // Extraer un nombre legible para el detalle
            let fileLabel = url;
            if (url.startsWith('./src/libros/') || url.startsWith('src/libros/')) {
              const filename = url.substring(url.lastIndexOf('/') + 1);
              let foundBook = null;
              if (window.indiceLibrosRutas) {
                foundBook = Object.values(window.indiceLibrosRutas).find(b => b.ruta === url || b.ruta === `./${url}`);
              }
              fileLabel = foundBook ? `Libro: ${foundBook.nombre}` : `Archivo: ${filename}`;
            } else if (url === './' || url === './index.html') {
              fileLabel = "Aplicación Principal";
            } else if (url.includes('cssgral')) {
              fileLabel = "Estilos visuales (CSS)";
            } else if (url.includes('jsgral') || url.includes('setting') || url.includes('liturgia')) {
              const jsName = url.substring(url.lastIndexOf('/') + 1);
              fileLabel = `Módulo: ${jsName}`;
            } else if (url.includes('icon') || url.includes('ico')) {
              fileLabel = "Iconos e imágenes";
            }

            progressText.textContent = `Descargando: ${downloadedCount + 1} de ${totalFiles}`;
            progressDetail.textContent = fileLabel;
            
            try {
              // Descargar omitiendo la caché del navegador para obtener el archivo fresco del servidor
              const response = await fetch(url, { cache: 'reload' });
              if (response.ok) {
                await cache.put(url, response);
              }
            } catch (fetchErr) {
              console.warn(`Fallo al descargar ${url}:`, fetchErr);
              try {
                const responseFallback = await fetch(url);
                if (responseFallback.ok) {
                  await cache.put(url, responseFallback);
                }
              } catch (fallbackErr) {
                console.error(`Error definitivo al descargar ${url}:`, fallbackErr);
              }
            }

            downloadedCount++;
            const percent = Math.round((downloadedCount / totalFiles) * 100);
            progressBar.style.width = `${percent}%`;
            progressPercent.textContent = `${percent}%`;
          }

          progressText.textContent = "¡Actualización completada!";
          progressDetail.textContent = "Reiniciando aplicación...";
          await new Promise(resolve => setTimeout(resolve, 800));

        } catch (cacheErr) {
          console.error("Error al guardar en Cache Storage:", cacheErr);
          progressText.textContent = "Error al actualizar caché local";
          progressDetail.textContent = "Recargando...";
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Forzar recarga completa para activar los cambios
        window.location.reload();
      });
    }
  }

  // Cargar las voces de Text-To-Speech disponibles en el selector
  function cargarVocesEnSelector() {
    const selectVoz = document.getElementById('selectVozLectura');
    if (!selectVoz) return;

    if (typeof window.speechSynthesis === 'undefined') {
      selectVoz.innerHTML = '<option value="">No soportado</option>';
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    // Filtrar voces que hablen español ("es")
    let vocesEspanol = voices.filter(v => v.lang.startsWith('es'));

    if (vocesEspanol.length === 0) {
      // Fallback: si no hay en español, mostrar todas para que el usuario pueda elegir
      vocesEspanol = voices;
    }

    if (vocesEspanol.length === 0) {
      selectVoz.innerHTML = '<option value="">Predeterminada del sistema</option>';
      return;
    }

    selectVoz.innerHTML = "";
    vocesEspanol.forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.name;
      // Indicar si es de Google o local
      const isGoogle = voice.name.toLowerCase().includes('google') ? ' (Google)' : '';
      option.textContent = `${voice.name}${isGoogle}`;
      
      if (config.vozSeleccionada === voice.name) {
        option.selected = true;
      }
      selectVoz.appendChild(option);
    });

    // Si no hay voz configurada en localStorage, intentar preseleccionar Google o la primera disponible
    const savedVoz = localStorage.getItem('biblia_setting_voz');
    if (!savedVoz && vocesEspanol.length > 0) {
      const googleVoice = vocesEspanol.find(v => v.name.toLowerCase().includes('google') && v.lang.startsWith('es'));
      const defaultVoice = googleVoice || vocesEspanol[0];
      selectVoz.value = defaultVoice.name;
      config.vozSeleccionada = defaultVoice.name;
      localStorage.setItem('biblia_setting_voz', defaultVoice.name);
    }
  }

  // Escuchar cambio de voces asíncrono
  if (typeof window.speechSynthesis !== 'undefined' && window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      cargarVocesEnSelector();
    };
  }

  // 12. Inicialización de la lógica
  document.addEventListener('DOMContentLoaded', function () {
    cargarAjustesGuardados();
    aplicarAjustesEnCSS();
    inyectarPanelAjustes();
    configurarEventos();
    cargarVocesEnSelector();
    // inyectarNavegacionPC(); // Deshabilitado para evitar botones flotantes molestos en los bordes
    configurarGestosDesplazamiento();
    
    // Exponer funciones útiles globalmente
    window.abrirAjustes = abrirAjustes;
    window.cerrarAjustes = cerrarAjustes;
    window.capituloSiguiente = capituloSiguiente;
    window.capituloAnterior = capituloAnterior;
  });
})();
