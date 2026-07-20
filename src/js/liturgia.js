/**
 * liturgia.js
 * Módulo para el Calendario Litúrgico y la Lectura del Día.
 */

(function () {
  const cacheLibros = {};

  // Mapear abreviaturas a los IDs de los libros locales de la Biblia
  const mapAbreviaturasRaw = window.liturgiaData ? window.liturgiaData.mapAbreviaturas : {};
  const mapAbreviaturas = {};
  for (const key in mapAbreviaturasRaw) {
    if (Object.prototype.hasOwnProperty.call(mapAbreviaturasRaw, key)) {
      mapAbreviaturas[key.replace(/\s+/g, '')] = mapAbreviaturasRaw[key];
    }
  }
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
    
    // 1. Reemplazar frases litúrgicas largas por nombres cortos/estándar de libros
    const reemplazos = [
      { regex: /lectura del primer libro de los reyes/gi, rep: "1 reyes" },
      { regex: /lectura del segundo libro de los reyes/gi, rep: "2 reyes" },
      { regex: /lectura de la primera carta del apóstol san pablo a los/gi, rep: "1" },
      { regex: /lectura de la segunda carta del apóstol san pablo a los/gi, rep: "2" },
      { regex: /lectura de la carta del apóstol san pablo a los/gi, rep: "" },
      { regex: /lectura de la carta del apóstol san pablo a/gi, rep: "" },
      { regex: /comienzo de la primera carta del apóstol san pablo a los/gi, rep: "1" },
      { regex: /lectura de la primera carta de/gi, rep: "1" },
      { regex: /lectura de la segunda carta de/gi, rep: "2" },
      { regex: /pablo a tito/gi, rep: "tito" }
    ];
    reemplazos.forEach(r => {
      citaStr = citaStr.replace(r.regex, r.rep);
    });

    // 2. Limpiar prefijos genéricos comunes
    const regexPrefijos = /^(lectura del libro de|lectura de la profecía de|lectura de la carta de|lectura del santo evangelio según san|lectura del santo evangelio según|salmo responsorial:|salmo:|ev\.\s+|hechos de los apóstoles:?|hechos de los apóstoles|del libro de los)/gi;
    citaStr = citaStr.replace(regexPrefijos, '').trim();
    
    // Remover respuestas parentéticas en salmos, ej: (R.: 8a y 9a)
    citaStr = citaStr.replace(/\s*\(.*?\)/g, '').trim();
    
    // Remover letras variantes pegadas a versículos (14a -> 14, 4ab -> 4)
    citaStr = citaStr.replace(/\b(\d+)[a-z]+\b/gi, '$1');
    
    // Reemplazar la conjunción " y " por un punto de separación "."
    citaStr = citaStr.replace(/\s+y\s+/gi, '.');
    
    // Reemplazar punto y coma ";" por punto "."
    citaStr = citaStr.replace(/;/g, '.');
    
    // Guardar versión limpia para mostrar en el subtítulo
    const citaVisible = citaStr.charAt(0).toUpperCase() + citaStr.slice(1);
    citaStr = citaStr.toLowerCase();
    
    // 3. Extraer el libro y el primer capítulo
    const bcMatch = citaStr.match(/^([1-3]?\s*[a-záéíóúñ\s]+?)\s+(\d+)/);
    if (!bcMatch) return null;
    
    const abrev = bcMatch[1].trim().replace(/\s+/g, '');
    const libroId = mapAbreviaturas[abrev];
    if (!libroId) return null;
    
    const abrevOriginal = bcMatch[1].trim();
    let currentCap = parseInt(bcMatch[2], 10);
    if (libroId === "23_sal") {
      currentCap = getHebrewPsalmChapter(currentCap);
    }
    
    const versePartStream = citaStr.substring(bcMatch[0].length).trim();
    
    // Detectar si es un guión de transición continua entre capítulos (ej: "8, 23—9, 3" o "8, 23-9, 3")
    const transitionMatch = versePartStream.match(/^,?\s*\d+\s*[-—–]\s*(\d+)\s*,/);
    if (transitionMatch) {
      const partsDash = versePartStream.split(/[-—–]/);
      if (partsDash.length === 2 && partsDash[1].includes(',')) {
        const leftVersePart = partsDash[0].replace(/^,/, '').trim();
        const right = partsDash[1].trim();
        
        const verseNumbers = leftVersePart.match(/\d+/g);
        if (!verseNumbers || verseNumbers.length === 0) return null;
        const verInicio = parseInt(verseNumbers[0], 10);
        
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
        
        const chapters = [
          { capNum: currentCap, ranges: [{ start: verInicio, end: null }] },
          { capNum: capFin, ranges: rightRanges }
        ];
        
        return { libroId, chapters, abrevOriginal, citaVisible };
      }
    }
    
    // Parsear segmentos de versículos separados por puntos, soportando saltos a capítulos con coma (ej: "Isaias 63, 16-17. 19. 64, 2-7")
    const chapterMap = {};
    chapterMap[currentCap] = [];
    
    // Remover la coma inicial si existe en el stream de versículos (ej: ", 16-17. 19...")
    const cleanStream = versePartStream.replace(/^,/, '').trim();
    const dotSegments = cleanStream.split('.');
    
    dotSegments.forEach(seg => {
      seg = seg.trim();
      if (!seg) return;
      
      if (seg.includes(',')) {
        const segParts = seg.split(',');
        let newCap = parseInt(segParts[0].trim(), 10);
        if (!isNaN(newCap)) {
          if (libroId === "23_sal") {
            newCap = getHebrewPsalmChapter(newCap);
          }
          currentCap = newCap;
          if (!chapterMap[currentCap]) {
            chapterMap[currentCap] = [];
          }
          
          const verseStr = segParts.slice(1).join(',').trim();
          const nums = verseStr.match(/\d+/g);
          if (nums && nums.length > 0) {
            const start = parseInt(nums[0], 10);
            const end = nums.length > 1 ? parseInt(nums[1], 10) : start;
            chapterMap[currentCap].push({ start, end });
          }
        }
      } else {
        const nums = seg.match(/\d+/g);
        if (nums && nums.length > 0) {
          const start = parseInt(nums[0], 10);
          const end = nums.length > 1 ? parseInt(nums[1], 10) : start;
          chapterMap[currentCap].push({ start, end });
        }
      }
    });
    
    const chapters = [];
    for (const capNumStr in chapterMap) {
      if (chapterMap[capNumStr].length > 0) {
        chapters.push({
          capNum: parseInt(capNumStr, 10),
          ranges: chapterMap[capNumStr]
        });
      }
    }
    
    if (chapters.length === 0) return null;
    
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
    const inputSelector = document.getElementById('inputLiturgiaFechaSelector');
    
    if (modal) {
      modal.style.display = "flex";
      modal.classList.add('open');
      
      if (selectorManual) {
        selectorManual.style.display = mostrarSelector ? "block" : "none";
      }

      // Inicializar el selector de fecha con el día de hoy
      if (inputSelector) {
        const hoyDate = new Date();
        const yyyy = hoyDate.getFullYear();
        const mm = String(hoyDate.getMonth() + 1).padStart(2, '0');
        const dd = String(hoyDate.getDate()).padStart(2, '0');
        inputSelector.value = `${yyyy}-${mm}-${dd}`;
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

  // Helper para obtener la clave litúrgica basada en una fecha (añadiendo días solemnes fijos)
  function obtenerClaveLiturgicaDeFecha(date) {
    const diaNum = date.getDate();
    const mesNum = date.getMonth() + 1; // 1-indexed
    
    // Comprobar días solemnes específicos fijos
    if (diaNum === 6 && mesNum === 1) {
      return "enero6";
    }
    if (diaNum === 1 && mesNum === 1) {
      return "enero1";
    }
    
    // Carga desde el mapa liturgiaFechas
    const fechaStr = obtenerFechaFormatoLimpio(date);
    return liturgiaFechas[fechaStr] || null;
  }

  // 8. Cargar lecturas para la fecha de hoy
  function cargarLecturaHoy() {
    const hoyDate = new Date();
    const ciclo = obtenerCicloLiturgico(hoyDate);
    const anoFerial = (hoyDate.getFullYear() % 2 === 0) ? "PAR" : "IMPAR";
    
    const claveLiturgica = obtenerClaveLiturgicaDeFecha(hoyDate);
    if (claveLiturgica) {
      const esDiaEspecial = claveLiturgica.startsWith("enero");
      const parts = claveLiturgica.split('_');
      const dia = parts[parts.length - 1]; // "lu", "ma", etc.
      const opcionCicloOAnio = (dia === "do" || esDiaEspecial) ? ciclo : anoFerial;
      cargarLiturgiaPorClave(claveLiturgica, opcionCicloOAnio);
    } else {
      mostrarMensajeVacio();
    }
  }

  // 9. Alternar la visibilidad entre Ciclo y Año Ferial según el día de la semana
  function actualizarVisibilidadCicloOAno() {
    const selectDia = document.getElementById('selectLiturgiaDia');
    const containerCiclo = document.getElementById('containerLiturgiaCiclo');
    const containerAnoFerial = document.getElementById('containerLiturgiaAnoFerial');
    
    if (!selectDia) return;
    
    const esDomingo = (selectDia.value === "do");
    if (containerCiclo) {
      containerCiclo.style.display = esDomingo ? "block" : "none";
    }
    if (containerAnoFerial) {
      containerAnoFerial.style.display = esDomingo ? "none" : "block";
    }
  }

  // 10. Inicializar filtros manuales con valores sugeridos de hoy
  function inicializarFiltrosManuales() {
    const selectCiclo = document.getElementById('selectLiturgiaCiclo');
    const selectTiempo = document.getElementById('selectLiturgiaTiempo');
    const selectSemana = document.getElementById('selectLiturgiaSemana');
    const selectDia = document.getElementById('selectLiturgiaDia');
    const selectAnoFerial = document.getElementById('selectLiturgiaAnoFerial');
    
    if (!selectCiclo || !selectTiempo || !selectSemana || !selectDia) return;

    const hoyDate = new Date();
    // Preseleccionar ciclo según fecha actual
    selectCiclo.value = obtenerCicloLiturgico(hoyDate);

    // Preseleccionar Año Ferial (Par/Impar) según fecha actual
    if (selectAnoFerial) {
      selectAnoFerial.value = (hoyDate.getFullYear() % 2 === 0) ? "PAR" : "IMPAR";
    }

    // Preseleccionar Lunes a Domingo de hoy
    const diasSemana = ["do", "lu", "ma", "mi", "ju", "vi", "sa"];
    selectDia.value = diasSemana[hoyDate.getDay()];

    // Ajustar visibilidad ciclo/año según el día actual
    actualizarVisibilidadCicloOAno();

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
    
    const selectAnoFerial = document.getElementById('selectLiturgiaAnoFerial');
    const anoFerial = selectAnoFerial ? selectAnoFerial.value : "PAR";

    // Actualizar la visibilidad de los selectores según el día
    actualizarVisibilidadCicloOAno();

    let claveTiempo = tiempo;
    if (claveTiempo === "pascual") claveTiempo = "pascua";

    const claveLiturgica = `${claveTiempo}_s${semana}_${dia}`;
    
    // Si es domingo ("do"), usamos ciclo (A, B, C)
    // Si es día de semana (lu, ma, mi, ju, vi, sa), usamos año ferial (PAR, IMPAR)
    const opcionCicloOAnio = (dia === "do") ? ciclo : anoFerial;
    
    cargarLiturgiaPorClave(claveLiturgica, opcionCicloOAnio);
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
    const selectAnoFerial = document.getElementById('selectLiturgiaAnoFerial');

    if (selectTiempo) {
      selectTiempo.addEventListener('change', () => {
        actualizarSemanasLiturgia();
        ejecutarFiltroManual();
      });
    }
    if (selectCiclo) selectCiclo.addEventListener('change', ejecutarFiltroManual);
    if (selectSemana) selectSemana.addEventListener('change', ejecutarFiltroManual);
    if (selectDia) {
      selectDia.addEventListener('change', () => {
        actualizarVisibilidadCicloOAno();
        ejecutarFiltroManual();
      });
    }
    if (selectAnoFerial) selectAnoFerial.addEventListener('change', ejecutarFiltroManual);

    // Selector de fecha (Calendario)
    const inputSelector = document.getElementById('inputLiturgiaFechaSelector');
    if (inputSelector) {
      inputSelector.addEventListener('change', function () {
        const val = this.value;
        if (!val) return;
        
        // Parsear fecha seleccionada
        const selectedDate = new Date(val + "T00:00:00");
        const ciclo = obtenerCicloLiturgico(selectedDate);
        const anoFerial = (selectedDate.getFullYear() % 2 === 0) ? "PAR" : "IMPAR";
        
        const claveLiturgica = obtenerClaveLiturgicaDeFecha(selectedDate);
        if (claveLiturgica) {
          const esDiaEspecial = claveLiturgica.startsWith("enero");
          const parts = claveLiturgica.split('_');
          const dia = parts[parts.length - 1]; // "lu", "ma", etc.
          const opcionCicloOAnio = (dia === "do" || esDiaEspecial) ? ciclo : anoFerial;
          cargarLiturgiaPorClave(claveLiturgica, opcionCicloOAnio);
        } else {
          mostrarMensajeVacio();
        }
      });
    }
  }

  // Registrar DOMContentLoaded para iniciar el módulo
  document.addEventListener('DOMContentLoaded', () => {
    configurarEventosLiturgia();
  });
})();
