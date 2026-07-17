/**
 * liturgia.js
 * Módulo para el Calendario Litúrgico y la Lectura del Día.
 */

(function () {
  const cacheLibros = {};

  // Mapear abreviaturas a los IDs de los libros locales de la Biblia
  const mapAbreviaturas = window.liturgiaData ? window.liturgiaData.mapAbreviaturas : {};
  const liturgiaFechas = window.liturgiaData ? window.liturgiaData.liturgiaFechas : {};
  const liturgiaLecturas = window.liturgiaData ? window.liturgiaData.liturgiaLecturas : {};

  // 1. Obtener la fecha en formato DD/MM/YYYY local
  function obtenerFechaFormatoLimpio(date) {
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const anio = date.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  // 2. Calcular ciclo litúrgico actual (A, B, C)
  function obtenerCicloLiturgico(fecha) {
    const anio = fecha.getFullYear();
    
    // Encontrar el 1º Domingo de Adviento del año actual
    // Es el Domingo entre el 27 de Noviembre y el 3 de Diciembre
    let primerDomingoAdviento = null;
    for (let d = 27; d <= 33; d++) {
      let tDia = d;
      let tMes = 10; // Noviembre (0-indexed)
      let tAnio = anio;
      if (d > 30) {
        tDia = d - 30;
        tMes = 11; // Diciembre
      }
      const tempDate = new Date(tAnio, tMes, tDia);
      if (tempDate.getDay() === 0) {
        primerDomingoAdviento = tempDate;
        break;
      }
    }
    
    let anioLiturgico = anio;
    if (fecha >= primerDomingoAdviento) {
      anioLiturgico = anio + 1;
    }
    
    const mod = anioLiturgico % 3;
    if (mod === 1) return "A";
    if (mod === 2) return "B";
    return "C";
  }

  // Helper para mapear Salmos del calendario litúrgico a la numeración hebrea del JSON
  function getHebrewPsalmChapter(vulgateCap) {
    if (vulgateCap >= 1 && vulgateCap <= 8) return vulgateCap;
    if (vulgateCap === 9) return 9;
    if (vulgateCap >= 10 && vulgateCap <= 112) return vulgateCap + 1;
    if (vulgateCap === 113) return 114;
    if (vulgateCap === 114 || vulgateCap === 115) return 116;
    if (vulgateCap >= 116 && vulgateCap <= 145) return vulgateCap + 1;
    if (vulgateCap === 146 || vulgateCap === 147) return 147;
    return vulgateCap;
  }

  // 3. Parser de citas litúrgicas
  function parseCita(citaStr) {
    if (!citaStr) return null;
    
    // Limpiar prefijos comunes de liturgia en español
    const regexPrefijos = /^(lectura del libro de|lectura de la profecía de|lectura de la primera carta del apóstol san pablo a los|lectura de la segunda carta del apóstol san pablo a los|lectura de la carta del apóstol san pablo a los|lectura de la carta de|lectura de la primera carta de|lectura de la segunda carta de|comienzo de la primera carta del apóstol san pablo a los|lectura del santo evangelio según san|lectura del santo evangelio según|salmo responsorial:|salmo:|ev\.\s+|lectura del primer libro de los reyes|lectura del segundo libro de los reyes|lectura de la carta del apóstol san pablo a|hechos de los apóstoles:?|hechos de los apóstoles|pablo a tito|del libro de los)/gi;
    
    citaStr = citaStr.replace(regexPrefijos, '').trim();
    
    // Remover respuestas parentéticas en salmos, ej: (R.: 8a y 9a)
    citaStr = citaStr.replace(/\s*\(.*?\)/g, '').trim();
    
    // Remover letras variantes pegadas a versículos (14a -> 14, 4ab -> 4)
    citaStr = citaStr.replace(/\b(\d+)[a-z]+\b/gi, '$1');
    
    // Reemplazar la conjunción " y " por un punto de separación "." para tratar los versículos como elementos individuales
    citaStr = citaStr.replace(/\s+y\s+/gi, '.');
    
    // Guardar una versión limpia con capitalización de título para mostrar de subtítulo
    const citaVisible = citaStr.charAt(0).toUpperCase() + citaStr.slice(1);
    citaStr = citaStr.toLowerCase();
    
    // Detectar si es multicapítulo (tiene un guión que separa capítulos, ej: "8, 23—9, 3")
    // Para ello, dividimos por guión y vemos si la parte derecha contiene una coma
    const partsDash = citaStr.split(/[-—–]/);
    
    let libroId = null;
    const chapters = [];
    let abrevOriginal = "";
    
    if (partsDash.length === 2 && partsDash[1].includes(',')) {
      const left = partsDash[0].trim();
      const right = partsDash[1].trim();
      
      // Parsear parte izquierda (inicio) - Separar por el primer coma
      const idxLeftComma = left.indexOf(',');
      if (idxLeftComma === -1) return null;
      
      const bookAndCap = left.substring(0, idxLeftComma).trim();
      const leftVersePart = left.substring(idxLeftComma + 1).trim();
      
      const bcMatch = bookAndCap.match(/^([1-3]?\s*[a-záéíóúñ]+)\s+(\d+)/);
      if (!bcMatch) return null;
      
      const abrev = bcMatch[1].replace(/\s+/g, '');
      libroId = mapAbreviaturas[abrev];
      abrevOriginal = bcMatch[1];
      
      let capInicio = parseInt(bcMatch[2], 10);
      if (libroId === "23_sal") {
        capInicio = getHebrewPsalmChapter(capInicio);
      }
      
      // Versículos de inicio (van desde verInicio hasta el final del capítulo)
      const verseNumbers = leftVersePart.match(/\d+/g);
      if (!verseNumbers || verseNumbers.length === 0) return null;
      const verInicio = parseInt(verseNumbers[0], 10);
      
      chapters.push({
        capNum: capInicio,
        ranges: [{ start: verInicio, end: null }] // null significa hasta el final del capítulo
      });
      
      // Parsear parte derecha (fin) - Separar por el primer coma
      const idxRightComma = right.indexOf(',');
      if (idxRightComma === -1) return null;
      
      let capFin = parseInt(right.substring(0, idxRightComma).trim(), 10);
      if (libroId === "23_sal") {
        capFin = getHebrewPsalmChapter(capFin);
      }
      const rightVersePart = right.substring(idxRightComma + 1).trim();
      
      const segments = rightVersePart.split(/[.,]/);
      const rightRanges = [];
      segments.forEach((seg, idx) => {
        const nums = seg.match(/\d+/g);
        if (nums && nums.length > 0) {
          const start = idx === 0 ? 1 : parseInt(nums[0], 10);
          const end = nums.length > 1 ? parseInt(nums[1], 10) : parseInt(nums[0], 10);
          rightRanges.push({ start, end });
        }
      });
      
      if (rightRanges.length === 0) {
        const fallbackNums = rightVersePart.match(/\d+/g);
        if (fallbackNums) {
          rightRanges.push({ start: 1, end: parseInt(fallbackNums[0], 10) });
        }
      }
      
      chapters.push({
        capNum: capFin,
        ranges: rightRanges
      });
      
    } else {
      // Caso estándar: un único capítulo - Separar por el primer coma
      const idxComma = citaStr.indexOf(',');
      if (idxComma === -1) return null;
      
      const bookAndCap = citaStr.substring(0, idxComma).trim();
      const versePart = citaStr.substring(idxComma + 1).trim();
      
      const bcMatch = bookAndCap.match(/^([1-3]?\s*[a-záéíóúñ]+)\s+(\d+)/);
      if (!bcMatch) return null;
      
      const abrev = bcMatch[1].replace(/\s+/g, '');
      libroId = mapAbreviaturas[abrev];
      abrevOriginal = bcMatch[1];
      
      let cap = parseInt(bcMatch[2], 10);
      if (libroId === "23_sal") {
        cap = getHebrewPsalmChapter(cap);
      }
      
      // Separar por punto o coma los segmentos de versículos
      const segments = versePart.split(/[.,]/);
      const ranges = [];
      
      segments.forEach(seg => {
        const nums = seg.match(/\d+/g);
        if (nums && nums.length > 0) {
          const start = parseInt(nums[0], 10);
          const end = nums.length > 1 ? parseInt(nums[1], 10) : start;
          ranges.push({ start, end });
        }
      });
      
      if (ranges.length === 0) return null;
      
      chapters.push({
        capNum: cap,
        ranges: ranges
      });
    }
    
    if (!libroId || chapters.length === 0) return null;
    
    return {
      libroId,
      chapters,
      abrevOriginal,
      citaVisible
    };
  }

  // 4. Cargar y renderizar pasajes de las lecturas
  async function cargarYMostrarLecturas(lecturasList, tituloDia) {
    const contenedor = document.getElementById('lecturasContenidoCuerpo');
    const descHeader = document.getElementById('lecturaDiaTituloDescripcion');
    if (!contenedor || !descHeader) return;

    descHeader.textContent = tituloDia;
    contenedor.innerHTML = `<div style="text-align: center; padding: 30px; color: #4a5568;">Cargando lecturas litúrgicas...</div>`;

    let htmlAcumulado = "";

    try {
      for (const lec of lecturasList) {
        const parsed = parseCita(lec.cita);
        if (!parsed) {
          // Mostrar cita simple si no se puede parsear localmente
          htmlAcumulado += `
            <div style="margin-bottom: 25px; padding: 15px; border-left: 4px solid #cbd5e0; background-color: #f7fafc; border-radius: 6px;">
              <h5 style="margin: 0 0 8px 0; color: #2d3748; font-size: 1rem; font-weight: bold;">${lec.tipo}</h5>
              <p style="margin: 0; font-size: 0.95rem; color: #e53e3e;">Cita: ${lec.cita} (Lectura en Biblia física)</p>
            </div>
          `;
          continue;
        }

        const infoLibro = window.indiceLibrosRutas[parsed.libroId];
        if (!infoLibro) continue;

        let bookData = cacheLibros[parsed.libroId];
        if (!bookData) {
          const res = await fetch(infoLibro.ruta);
          if (!res.ok) throw new Error();
          bookData = await res.json();
          cacheLibros[parsed.libroId] = bookData;
        }

        let textHtml = "";
        
        parsed.chapters.forEach((ch, idxCh) => {
          const capData = bookData.capitulos[ch.capNum];
          if (!capData) return;
          
          if (parsed.chapters.length > 1) {
            // Separador y título de capítulo si son múltiples capítulos
            if (idxCh > 0) {
              textHtml += `<hr style="border: none; border-top: 1px dashed #e2e8f0; margin: 15px 0;">`;
            }
            textHtml += `<p style="font-weight: bold; font-size: 0.85rem; color: #4a5568; margin-top: 10px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Capítulo ${ch.capNum}</p>`;
          }
          
          const allStarts = ch.ranges.map(r => r.start);
          const allEnds = ch.ranges.map(r => r.end === null ? Object.keys(capData).length : r.end);
          const minV = Math.min(...allStarts);
          const maxV = Math.max(...allEnds);
          
          let lastRendered = null;

          for (let v = minV; v <= maxV; v++) {
            const matched = ch.ranges.some(r => {
              const rEnd = r.end === null ? Object.keys(capData).length : r.end;
              return v >= r.start && v <= rEnd;
            });
            
            if (matched && capData[v]) {
              if (lastRendered !== null && v > lastRendered + 1) {
                textHtml += `<div style="text-align: center; margin: 8px 0; color: #a0aec0; font-size: 0.85rem; font-style: italic; letter-spacing: 4px;">...</div>`;
              }
              textHtml += `<p style="margin: 6px 0; font-size: 0.98rem; line-height: 1.6; text-align: justify; color: #2d3748;"><strong style="color: #c0392b; margin-right: 6px; font-size: 0.85em;">${v}</strong>${capData[v]}</p>`;
              lastRendered = v;
            }
          }
        });

        if (textHtml === "") {
          textHtml = `<p style="font-style: italic; color: #a0aec0;">Texto no disponible en este capítulo.</p>`;
        }

        const startCap = parsed.chapters[0].capNum;
        const startVer = parsed.chapters[0].ranges[0].start;

        htmlAcumulado += `
          <div style="margin-bottom: 25px; padding: 15px; border-left: 4px solid #3182ce; background-color: #f7fafc; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
            <h5 style="margin: 0 0 10px 0; color: #2b6cb0; font-size: 1.05rem; font-weight: bold; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
              <span>${lec.tipo} <span style="font-size: 0.85em; color: #718096; font-weight: normal;">(${parsed.citaVisible})</span></span>
            </h5>
            <div style="padding-right: 5px;">
              ${textHtml}
            </div>
            <button class="escrutacio-nodo-btn-ir" style="margin-top: 12px; padding: 6px 12px; font-size: 0.8rem; background-color: #3182ce; color: white; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 4px;" 
                    onclick="window.irALecturaBiblia('${parsed.libroId}', '${infoLibro.ruta}', ${startCap}, ${startVer})">
              Leer en la Biblia 📖
            </button>
          </div>
        `;
      }
      
      contenedor.innerHTML = htmlAcumulado;
    } catch (err) {
      console.error(err);
      contenedor.innerHTML = `<div style="text-align: center; padding: 30px; color: #e53e3e;">Error al cargar los textos bíblicos de la liturgia.</div>`;
    }
  }

  // 5. Cargar lectura por clave litúrgica y ciclo
  function cargarLiturgiaPorClave(clave, ciclo) {
    const diaObj = liturgiaLecturas[clave];
    if (!diaObj) {
      mostrarMensajeVacio();
      return;
    }

    const dataCiclo = diaObj[ciclo] || diaObj["A"] || diaObj["B"] || diaObj["C"];
    if (dataCiclo) {
      cargarYMostrarLecturas(dataCiclo.lecturas, dataCiclo.titulo);
    } else {
      mostrarMensajeVacio();
    }
  }

  function mostrarMensajeVacio() {
    const contenedor = document.getElementById('lecturasContenidoCuerpo');
    const descHeader = document.getElementById('lecturaDiaTituloDescripcion');
    if (descHeader) descHeader.textContent = "Lectura del Día";
    if (contenedor) {
      contenedor.innerHTML = `
        <div class="escrutacio-vacio-msg" style="padding: 20px; font-style: normal; color: #718096; background-color: #f7fafc; border-radius: 8px; text-align: left;">
          <p><strong>Calendario Litúrgico Automático:</strong> No se encontró lectura programada para la fecha seleccionada en el calendario automático.</p>
          <p style="margin-top: 8px;">Puedes seleccionar el Ciclo, Tiempo, Semana y Día en la parte superior para leer las lecturas litúrgicas correspondientes.</p>
        </div>
      `;
    }
  }

  // 6. Exponer navegación desde el botón
  window.irALecturaBiblia = function (libroId, ruta, cap, ver) {
    window.scrollToVerseAfterRender = ver;
    if (typeof window.cargarLibroYCapitulo === 'function') {
      window.cargarLibroYCapitulo(ruta, cap);
    }
    cerrarLecturaDiaModal();
  };

  // 7. Modales de abrir y cerrar
  function abrirLecturaDiaModal(mostrarSelector = false) {
    const modal = document.getElementById('modalLecturaDia');
    const selectorManual = document.getElementById('lecturaSeleccionManual');
    
    if (modal) {
      modal.style.display = "flex";
      modal.classList.add('open');
      
      if (selectorManual) {
        selectorManual.style.display = mostrarSelector ? "block" : "none";
      }

      // Si no es selección manual, cargar la lectura de hoy
      if (!mostrarSelector) {
        cargarLecturaHoy();
      } else {
        // Inicializar selectores litúrgicos manuales según fecha de hoy
        inicializarFiltrosManuales();
      }

      if (typeof window.closeMenu === 'function') window.closeMenu();
    }
  }

  function cerrarLecturaDiaModal() {
    const modal = document.getElementById('modalLecturaDia');
    if (modal) {
      modal.style.display = "none";
      modal.classList.remove('open');
    }
  }

  // 8. Cargar lecturas para la fecha de hoy
  function cargarLecturaHoy() {
    const hoyDate = new Date();
    const hoyStr = obtenerFechaFormatoLimpio(hoyDate);
    const ciclo = obtenerCicloLiturgico(hoyDate);
    
    const claveLiturgica = liturgiaFechas[hoyStr];
    if (claveLiturgica) {
      cargarLiturgiaPorClave(claveLiturgica, ciclo);
    } else {
      mostrarMensajeVacio();
    }
  }

  // 9. Inicializar filtros manuales con valores sugeridos de hoy
  function inicializarFiltrosManuales() {
    const selectCiclo = document.getElementById('selectLiturgiaCiclo');
    const selectTiempo = document.getElementById('selectLiturgiaTiempo');
    const selectSemana = document.getElementById('selectLiturgiaSemana');
    const selectDia = document.getElementById('selectLiturgiaDia');
    
    if (!selectCiclo || !selectTiempo || !selectSemana || !selectDia) return;

    // Preseleccionar ciclo según fecha actual
    const hoyDate = new Date();
    selectCiclo.value = obtenerCicloLiturgico(hoyDate);

    // Preseleccionar Lunes a Domingo de hoy
    const diasSemana = ["do", "lu", "ma", "mi", "ju", "vi", "sa"];
    selectDia.value = diasSemana[hoyDate.getDay()];

    // Si la fecha actual está mapeada a un tiempo/semana litúrgica, preseleccionarlo
    const hoyStr = obtenerFechaFormatoLimpio(hoyDate);
    const claveLiturgica = liturgiaFechas[hoyStr]; // ej. "adviento_s1_do" o "ordinario_s15_vi"
    
    if (claveLiturgica) {
      const parts = claveLiturgica.split('_'); // ["adviento", "s1", "do"]
      if (parts.length === 3) {
        let tiempo = parts[0];
        // Capitalizar tiempo
        tiempo = tiempo.charAt(0).toUpperCase() + tiempo.slice(1);
        if (tiempo === "Pascua") tiempo = "Pascual";

        const semana = parts[1].replace('s', ''); // "1" o "15"

        selectTiempo.value = tiempo;
        actualizarSemanasLiturgia();
        selectSemana.value = semana;
      }
    } else {
      // Default: Ordinario
      selectTiempo.value = "Ordinario";
      actualizarSemanasLiturgia();
      selectSemana.value = "1";
    }

    ejecutarFiltroManual();
  }

  // 10. Actualizar las opciones del select de semanas según el tiempo litúrgico
  function actualizarSemanasLiturgia() {
    const tiempo = document.getElementById('selectLiturgiaTiempo').value;
    const selectSemana = document.getElementById('selectLiturgiaSemana');
    if (!selectSemana) return;
    
    let maxSemanas = 4;
    if (tiempo === 'Adviento') maxSemanas = 4;
    else if (tiempo === 'Navidad') maxSemanas = 2;
    else if (tiempo === 'Cuaresma') maxSemanas = 5;
    else if (tiempo === 'Pascual') maxSemanas = 7;
    else if (tiempo === 'Ordinario') maxSemanas = 34;
    
    const valorPrevio = selectSemana.value;
    
    selectSemana.innerHTML = "";
    for (let i = 1; i <= maxSemanas; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `Semana ${i}`;
      selectSemana.appendChild(opt);
    }

    if (valorPrevio && parseInt(valorPrevio, 10) <= maxSemanas) {
      selectSemana.value = valorPrevio;
    }
  }

  // 11. Ejecutar consulta de lectura manual
  function ejecutarFiltroManual() {
    const ciclo = document.getElementById('selectLiturgiaCiclo').value;
    const tiempo = document.getElementById('selectLiturgiaTiempo').value.toLowerCase();
    const semana = document.getElementById('selectLiturgiaSemana').value;
    const dia = document.getElementById('selectLiturgiaDia').value;

    let claveTiempo = tiempo;
    if (claveTiempo === "pascual") claveTiempo = "pascua";

    const claveLiturgica = `${claveTiempo}_s${semana}_${dia}`;
    cargarLiturgiaPorClave(claveLiturgica, ciclo);
  }

  // 12. Enlazar eventos de interacción
  function configurarEventosLiturgia() {
    // Menu links
    const btnLecturaDia = document.getElementById('menuLecturaDiaBtn');
    if (btnLecturaDia) {
      btnLecturaDia.addEventListener('click', (e) => {
        e.preventDefault();
        abrirLecturaDiaModal(false); // Abrir directo hoy sin filtros
      });
    }

    const btnCalendarioLiturgico = document.getElementById('menuCalendarioLiturgicoBtn');
    if (btnCalendarioLiturgico) {
      btnCalendarioLiturgico.addEventListener('click', (e) => {
        e.stopPropagation();
        abrirLecturaDiaModal(true); // Abrir con filtros de selección manual
      });
    }

    const btnClose = document.getElementById('closeLecturaDiaBtn');
    if (btnClose) {
      btnClose.addEventListener('click', cerrarLecturaDiaModal);
    }

    const modal = document.getElementById('modalLecturaDia');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          cerrarLecturaDiaModal();
        }
      });
    }

    // Selectores del filtro manual
    const selectCiclo = document.getElementById('selectLiturgiaCiclo');
    const selectTiempo = document.getElementById('selectLiturgiaTiempo');
    const selectSemana = document.getElementById('selectLiturgiaSemana');
    const selectDia = document.getElementById('selectLiturgiaDia');

    if (selectTiempo) {
      selectTiempo.addEventListener('change', () => {
        actualizarSemanasLiturgia();
        ejecutarFiltroManual();
      });
    }
    if (selectCiclo) selectCiclo.addEventListener('change', ejecutarFiltroManual);
    if (selectSemana) selectSemana.addEventListener('change', ejecutarFiltroManual);
    if (selectDia) selectDia.addEventListener('change', ejecutarFiltroManual);
  }

  // Registrar DOMContentLoaded para iniciar el módulo
  document.addEventListener('DOMContentLoaded', () => {
    configurarEventosLiturgia();
  });
})();
