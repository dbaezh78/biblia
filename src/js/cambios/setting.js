/**
 * setting.js
 * Lógica para la configuración del formato de lectura de la Biblia.
 * Maneja el tamaño del texto, fuentes, espacio interlineal y separación de versículos.
 */

(function () {
  // 1. Cargar fuentes elegantes de Google Fonts para mejorar la lectura
  const linkFonts = document.createElement('link');
  linkFonts.rel = 'stylesheet';
  linkFonts.href = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap';
  document.head.appendChild(linkFonts);

  // Mapas de fuentes tipográficas
  const mapasFuentes = {
    'sans-serif': "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    'georgia': "Georgia, 'Times New Roman', Times, serif",
    'lora': "'Lora', Georgia, 'Times New Roman', Times, serif",
    'merriweather': "'Merriweather', Georgia, 'Times New Roman', Times, serif"
  };

  // Valores por defecto
  const DEFAULTS = {
    tamano: 18,
    interlineado: 1.7,
    fuente: 'sans-serif',
    separarVersiculos: false
  };

  // Estado actual de la configuración
  let config = {
    tamano: DEFAULTS.tamano,
    interlineado: DEFAULTS.interlineado,
    fuente: DEFAULTS.fuente,
    separarVersiculos: DEFAULTS.separarVersiculos
  };

  // 2. Cargar ajustes guardados en localStorage al iniciar
  function cargarAjustesGuardados() {
    try {
      const tamanoGuardado = localStorage.getItem('biblia_setting_tamano');
      const interlineadoGuardado = localStorage.getItem('biblia_setting_interlineado');
      const fuenteGuardada = localStorage.getItem('biblia_setting_fuente');
      const separarVersiculosGuardado = localStorage.getItem('biblia_setting_separar_versiculos');

      if (tamanoGuardado) config.tamano = parseInt(tamanoGuardado, 10);
      if (interlineadoGuardado) config.interlineado = parseFloat(interlineadoGuardado);
      if (fuenteGuardada && mapasFuentes[fuenteGuardada]) config.fuente = fuenteGuardada;
      if (separarVersiculosGuardado) config.separarVersiculos = (separarVersiculosGuardado === 'true');
    } catch (e) {
      console.error("Error al acceder a localStorage:", e);
    }
  }

  // 3. Aplicar ajustes actuales a las variables CSS en :root y clases del body
  function aplicarAjustesEnCSS() {
    const root = document.documentElement;
    root.style.setProperty('--tamano-texto', `${config.tamano}px`);
    root.style.setProperty('--interlineado-texto', config.interlineado);
    
    const fuenteCSS = mapasFuentes[config.fuente] || mapasFuentes['sans-serif'];
    root.style.setProperty('--fuente-texto', fuenteCSS);

    // Aplicar la clase para el formato de un versículo por línea
    if (config.separarVersiculos) {
      document.body.classList.add('versiculos-separados');
    } else {
      document.body.classList.remove('versiculos-separados');
    }
  }

  // 4. Inyectar el HTML del panel de Ajustes en el body
  function inyectarPanelAjustes() {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="panel-ajustes" id="panelAjustes">
        <div class="ajustes-header">
          <h3 class="ajustes-titulo">⚙️ Ajustes de Lectura</h3>
          <button class="ajustes-close-btn" id="closeAjustesBtn" aria-label="Cerrar Ajustes">&times;</button>
        </div>
        
        <div class="ajustes-seccion">
          <div class="ajustes-seccion-titulo">Tamaño del Texto</div>
          <div class="ajustes-control-fila">
            <input type="range" id="sliderTamano" class="ajustes-slider" min="14" max="28" step="1" value="${config.tamano}">
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
          <div class="ajustes-seccion-titulo">Tipografía</div>
          <div class="ajustes-control-fila">
            <select id="selectFuente" class="ajustes-select">
              <option value="sans-serif" ${config.fuente === 'sans-serif' ? 'selected' : ''}>Segoe UI (Moderna)</option>
              <option value="georgia" ${config.fuente === 'georgia' ? 'selected' : ''}>Georgia (Clásica)</option>
              <option value="lora" ${config.fuente === 'lora' ? 'selected' : ''}>Lora (Elegante)</option>
              <option value="merriweather" ${config.fuente === 'merriweather' ? 'selected' : ''}>Merriweather (Lectura)</option>
            </select>
          </div>
        </div>

        <div class="ajustes-seccion">
          <div class="ajustes-seccion-titulo">Formato de Lectura</div>
          <div class="ajustes-control-fila" style="justify-content: space-between; align-items: center;">
            <span style="font-size: 0.95rem; color: var(--color-texto, #1a1a1a);">Un versículo por línea</span>
            <label class="ajustes-switch">
              <input type="checkbox" id="chkSepararVersiculos" ${config.separarVersiculos ? 'checked' : ''}>
              <span class="ajustes-switch-slider"></span>
            </label>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(div.firstElementChild);
  }

  // 5. Mostrar y ocultar el panel de ajustes
  function abrirAjustes() {
    // Cerrar el menú lateral de la app si la función global existe
    if (typeof window.closeMenu === 'function') {
      window.closeMenu();
    } else {
      // Intento alternativo de cerrar el menú directamente manipulando clases del DOM
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
    
    // Solo ocultar overlay si el menú lateral tampoco está abierto
    const sidebar = document.getElementById('sidebar');
    const sidebarAbierto = sidebar && sidebar.classList.contains('open');
    if (overlay && !sidebarAbierto) {
      overlay.classList.remove('show');
    }
  }

  // 6. Configurar controladores de eventos
  function configurarEventos() {
    const btnMenuAjustes = document.getElementById('menuAjustesBtn');
    const btnCerrar = document.getElementById('closeAjustesBtn');
    const overlay = document.getElementById('overlay');

    const sliderTamano = document.getElementById('sliderTamano');
    const lblTamano = document.getElementById('lblTamano');

    const sliderInterlineado = document.getElementById('sliderInterlineado');
    const lblInterlineado = document.getElementById('lblInterlineado');

    const selectFuente = document.getElementById('selectFuente');
    const chkSepararVersiculos = document.getElementById('chkSepararVersiculos');

    // Apertura y cierre del panel
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
  }

  // 7. Inicialización de la lógica
  document.addEventListener('DOMContentLoaded', function () {
    cargarAjustesGuardados();
    aplicarAjustesEnCSS();
    inyectarPanelAjustes();
    configurarEventos();
    
    // Exponer las funciones globalmente por si se necesitan disparar desde otros scripts
    window.abrirAjustes = abrirAjustes;
    window.cerrarAjustes = cerrarAjustes;
  });
})();
