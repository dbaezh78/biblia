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
    
    // Transición entre capítulos por guión (ej: "9, 35 - 10, 1. 6-8" o "8, 23—9, 3")
    const transitionMatch = versePartStream.match(/^(.*?)[-—–]\s*(\d+)\s*,(.*)$/);
    if (transitionMatch) {
      const leftVersePart = transitionMatch[1].replace(/^,/, '').trim();
      let capFin = parseInt(transitionMatch[2].trim(), 10);
      if (libroId === "23_sal") {
        capFin = getHebrewPsalmChapter(capFin);
      }
      const rightVersePart = transitionMatch[3].trim();
      
      const verseNumbers = leftVersePart.match(/\d+/g);
      if (!verseNumbers || verseNumbers.length === 0) return null;
      const verInicio = parseInt(verseNumbers[0], 10);
      
      const rightSegments = rightVersePart.split('.');
      const rightRanges = [];
      const isSingleNumberOnly = rightSegments.length === 1 && !rightVersePart.includes('-') && (rightVersePart.match(/\d+/g) || []).length === 1;
      
      rightSegments.forEach(seg => {
        const nums = seg.match(/\d+/g);
        if (nums && nums.length > 0) {
          if (isSingleNumberOnly) {
            rightRanges.push({ start: 1, end: parseInt(nums[0], 10) });
          } else {
            const start = parseInt(nums[0], 10);
            const end = nums.length > 1 ? parseInt(nums[1], 10) : start;
            rightRanges.push({ start, end });
          }
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
    
    // Segmentos de versículos en el mismo capítulo o con saltos a nuevos capítulos marcados por coma
    // (ej: "Isaias 63, 16-17. 19. 64, 2-7" o "Salmo 26, 1. 4. 13-14")
    const chapterMap = {};
    chapterMap[currentCap] = [];
    
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

  let currentLecturasList = null;
  let currentTituloDia = "";
  let currentOpcionesConfig = null;
  let subOpcionesState = {};

  // 4. Cargar y renderizar pasajes de las lecturas
  async function cargarYMostrarLecturas(lecturasList, tituloDia, opcionesConfig = null, subState = null) {
    currentLecturasList = lecturasList;
    currentTituloDia = tituloDia;
    currentOpcionesConfig = opcionesConfig;
    if (subState !== null) {
      subOpcionesState = subState;
    }

    const contenedor = document.getElementById('lecturasContenidoCuerpo');
    const descHeader = document.getElementById('lecturaDiaTituloDescripcion');
    if (!contenedor || !descHeader) return;

    let htmlSelectorOpciones = "";
    if (opcionesConfig && opcionesConfig.totalOpciones > 1) {
      htmlSelectorOpciones += `<div style="display: flex; gap: 4px; flex-shrink: 0; align-items: center;">`;
      for (let i = 0; i < opcionesConfig.totalOpciones; i++) {
        const isActive = i === opcionesConfig.opcionIndexActual;
        const styleBtn = isActive
          ? "padding: 1px 6px; font-size: 0.85rem; font-weight: bold; border: 1.5px solid #1a202c; border-radius: 2px; background-color: #ffffff; color: #1a202c; cursor: pointer; min-width: 22px; text-align: center; box-shadow: 0 1px 2px rgba(0,0,0,0.1);"
          : "padding: 1px 6px; font-size: 0.85rem; font-weight: bold; border: 1px solid #cbd5e0; border-radius: 2px; background-color: #ffffff; color: #718096; cursor: pointer; min-width: 22px; text-align: center;";
        
        htmlSelectorOpciones += `<button style="${styleBtn}" onclick="window.cambiarOpcionMisa('${opcionesConfig.baseClave}', '${opcionesConfig.ciclo}', ${i})">${i + 1}</button>`;
      }
      htmlSelectorOpciones += `</div>`;
    }

    descHeader.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; width: 100%;">
        <span style="flex-grow: 1;">${tituloDia}</span>
        ${htmlSelectorOpciones}
      </div>
    `;

    contenedor.innerHTML = `<div style="text-align: center; padding: 30px; color: #4a5568;">Cargando lecturas litúrgicas...</div>`;

    let htmlAcumulado = "";

    try {
      for (let idxLec = 0; idxLec < lecturasList.length; idxLec++) {
        const lec = lecturasList[idxLec];
        
        // Detectar si la cita contiene alternativas separadas por " o ", " ó ", " o bien "
        const subCitas = lec.cita.split(/\s+(?:o bien|o|ó)\s+/i).map(c => c.trim()).filter(Boolean);
        const subSelectedIdx = subOpcionesState[idxLec] !== undefined ? subOpcionesState[idxLec] : 0;
        const citaActiva = subCitas[subSelectedIdx] || subCitas[0] || lec.cita;

        const parsed = parseCita(citaActiva);
        if (!parsed) {
          // Mostrar cita simple si no se puede parsear localmente
          htmlAcumulado += `
            <div style="margin-bottom: 25px; padding: 15px; border-left: 4px solid #cbd5e0; background-color: #f7fafc; border-radius: 6px;">
              <h5 style="margin: 0 0 8px 0; color: #2d3748; font-size: 1rem; font-weight: bold;">${lec.tipo}</h5>
              <p style="margin: 0; font-size: 0.95rem; color: #e53e3e;">Cita: ${citaActiva} (Lectura en Biblia física)</p>
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
        
        // Caso especial: Ester Capítulo 14 en Biblia Griega (se encuentra dentro del cap 4 del JSON)
        const esEster14 = (parsed.libroId === "19_est" && parsed.chapters.some(c => c.capNum === 14));

        if (esEster14) {
          const capData = bookData.capitulos["4"];
          if (capData) {
            const mapEster14 = {
              1: "17-k",
              3: "17-l",
              4: "17-m",
              5: "17-n",
              12: "17-r",
              13: "17-s",
              14: "17-t"
            };
            parsed.chapters.forEach(ch => {
              ch.ranges.forEach(r => {
                const rEnd = r.end === null ? r.start : r.end;
                for (let v = r.start; v <= rEnd; v++) {
                  const key = mapEster14[v];
                  if (key && capData[key]) {
                    textHtml += `<p style="margin: 6px 0; font-size: 0.98rem; line-height: 1.6; text-align: justify; color: #2d3748;"><strong style="color: #c0392b; margin-right: 6px; font-size: 0.85em;">${v}</strong>${capData[key]}</p>`;
                  }
                }
              });
            });
          }
        } else {
          parsed.chapters.forEach((ch, idxCh) => {
            const capData = bookData.capitulos[ch.capNum];
            if (!capData) return;
            
            if (parsed.chapters.length > 1) {
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
        }

        if (textHtml === "") {
          textHtml = `<p style="font-style: italic; color: #a0aec0;">Texto no disponible en este capítulo.</p>`;
        }

        const startCap = parsed.chapters[0].capNum;
        const startVer = parsed.chapters[0].ranges[0].start;

        // Selector numerado de sub-opciones para la lectura individual
        let htmlSubOpciones = "";
        if (subCitas.length > 1) {
          htmlSubOpciones += `<div style="display: flex; gap: 4px; flex-shrink: 0; align-items: center;">`;
          for (let sIdx = 0; sIdx < subCitas.length; sIdx++) {
            const isSubActive = sIdx === subSelectedIdx;
            const btnStyle = isSubActive
              ? "padding: 1px 6px; font-size: 0.85rem; font-weight: bold; border: 1.5px solid #1a202c; border-radius: 2px; background-color: #ffffff; color: #1a202c; cursor: pointer; min-width: 22px; text-align: center; box-shadow: 0 1px 2px rgba(0,0,0,0.1);"
              : "padding: 1px 6px; font-size: 0.85rem; font-weight: bold; border: 1px solid #cbd5e0; border-radius: 2px; background-color: #ffffff; color: #718096; cursor: pointer; min-width: 22px; text-align: center;";

            htmlSubOpciones += `<button style="${btnStyle}" onclick="window.cambiarSubOpcionLectura(${idxLec}, ${sIdx})">${sIdx + 1}</button>`;
          }
          htmlSubOpciones += `</div>`;
        }

        htmlAcumulado += `
          <div style="margin-bottom: 25px; padding: 15px; border-left: 4px solid #3182ce; background-color: #f7fafc; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
            <h5 style="margin: 0 0 10px 0; color: #2b6cb0; font-size: 1.05rem; font-weight: bold; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; display: flex; justify-content: space-between; align-items: center; gap: 8px;">
              <span>${lec.tipo} <span style="font-size: 0.85em; color: #718096; font-weight: normal;">(${parsed.citaVisible})</span></span>
              ${htmlSubOpciones}
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

  window.cambiarSubOpcionLectura = function (idxLec, subIdx) {
    if (!currentLecturasList) return;
    subOpcionesState[idxLec] = subIdx;
    cargarYMostrarLecturas(currentLecturasList, currentTituloDia, currentOpcionesConfig, subOpcionesState);
  };

  // 5. Cargar lectura por clave litúrgica, ciclo y número de opción del ciclo (0-indexed)
  function cargarLiturgiaPorClave(clave, ciclo, opcionIndex = 0) {
    if (!clave) {
      mostrarMensajeVacio();
      return;
    }

    let baseClave = clave.replace(/_\d+$/, '');

    // Fallback automático de Ascensión del Jueves a Ascensión del Domingo si no está definida en los datos
    if (baseClave === "pascua_as_ju" && !liturgiaLecturas["pascua_as_ju"]) {
      baseClave = "pascua_as_do";
    }

    const opcionesList = [];

    if (Array.isArray(liturgiaLecturas[baseClave])) {
      opcionesList.push(...liturgiaLecturas[baseClave]);
    } else if (liturgiaLecturas[baseClave]) {
      opcionesList.push(liturgiaLecturas[baseClave]);

      let idx = 2;
      while (liturgiaLecturas[`${baseClave}_${idx}`]) {
        opcionesList.push(liturgiaLecturas[`${baseClave}_${idx}`]);
        idx++;
      }
    }

    // Filtrar las opciones que corresponden al ciclo o año ferial solicitado
    const opcionesFiltradas = [];
    opcionesList.forEach(opt => {
      if (opt[ciclo]) {
        opcionesFiltradas.push({
          data: opt[ciclo],
          originalOption: opt
        });
      }
    });

    // Fallback general por si no hay ninguna específica para ese ciclo
    if (opcionesFiltradas.length === 0) {
      opcionesList.forEach(opt => {
        const fallbackKey = opt[ciclo] ? ciclo : (opt["A"] ? "A" : (opt["B"] ? "B" : (opt["C"] ? "C" : (opt["PAR"] ? "PAR" : (opt["IMPAR"] ? "IMPAR" : null)))));
        if (fallbackKey && opt[fallbackKey]) {
          opcionesFiltradas.push({
            data: opt[fallbackKey],
            originalOption: opt
          });
        }
      });
    }

    if (opcionesFiltradas.length === 0) {
      mostrarMensajeVacio();
      return;
    }

    if (opcionIndex < 0 || opcionIndex >= opcionesFiltradas.length) {
      opcionIndex = 0;
    }

    const selectedOption = opcionesFiltradas[opcionIndex];
    const dataCiclo = selectedOption.data;

    if (dataCiclo) {
      subOpcionesState = {};
      cargarYMostrarLecturas(dataCiclo.lecturas, dataCiclo.titulo, {
        baseClave,
        ciclo,
        totalOpciones: opcionesFiltradas.length,
        opcionIndexActual: opcionIndex
      }, {});
    } else {
      mostrarMensajeVacio();
    }
  }

  window.cambiarOpcionMisa = function (baseClave, ciclo, opcionIdx) {
    cargarLiturgiaPorClave(baseClave, ciclo, opcionIdx);
  };

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

  // Helper para obtener la clave litúrgica basada en una fecha (soporta fechas completas DD/MM/YYYY y fechas fijas independientes del año D/M o DD/MM)
  function obtenerClaveLiturgicaDeFecha(date) {
    const diaNum = date.getDate();
    const mesNum = date.getMonth() + 1; // 1-indexed
    const anioNum = date.getFullYear();

    const fechaCompleta = `${String(diaNum).padStart(2, '0')}/${String(mesNum).padStart(2, '0')}/${anioNum}`; // "01/01/2026"
    const fechaDDMM = `${String(diaNum).padStart(2, '0')}/${String(mesNum).padStart(2, '0')}`; // "01/01"
    const fechaDM = `${diaNum}/${mesNum}`; // "1/1"
    
    if (liturgiaFechas[fechaCompleta]) return liturgiaFechas[fechaCompleta];
    if (liturgiaFechas[fechaDDMM]) return liturgiaFechas[fechaDDMM];
    if (liturgiaFechas[fechaDM]) return liturgiaFechas[fechaDM];

    // Fallbacks históricos
    if (diaNum === 6 && mesNum === 1) return "enero6";
    if (diaNum === 1 && mesNum === 1) return "enero1";

    return null;
  }

  // 8. Cargar lecturas para la fecha de hoy
  function cargarLecturaHoy() {
    const hoyDate = new Date();
    const ciclo = obtenerCicloLiturgico(hoyDate);
    const anoFerial = (hoyDate.getFullYear() % 2 === 0) ? "PAR" : "IMPAR";
    
    const claveLiturgica = obtenerClaveLiturgicaDeFecha(hoyDate);
    if (claveLiturgica) {
      const parts = claveLiturgica.split('_');
      const dia = parts[parts.length - 1]; // "lu", "ma", etc.
      const esDiaFijoOEspecial = claveLiturgica.startsWith("enero") || !["lu", "ma", "mi", "ju", "vi", "sa", "do"].includes(dia);
      const opcionCicloOAnio = (dia === "do" || esDiaFijoOEspecial) ? ciclo : anoFerial;
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
      const parts = claveLiturgica.split('_'); // ["cuaresma", "mc", "mi"] o ["pascua", "as", "do"]
      if (parts.length >= 2) {
        let tiempo = parts[0];
        // Capitalizar tiempo
        tiempo = tiempo.charAt(0).toUpperCase() + tiempo.slice(1);
        if (tiempo === "Pascua") tiempo = "Pascual";

        let semana = parts[1];
        if (semana === "pentecostes" || semana === "pent") {
          semana = "pentecostes";
        } else if (semana === "mc") {
          semana = "mc";
        } else if (semana.startsWith('s')) {
          semana = semana.replace('s', ''); // "1" o "15"
        }

        selectTiempo.value = tiempo;
        actualizarSemanasLiturgia();
        selectSemana.value = semana;
        actualizarDiasLiturgia();

        if (parts.length === 3) {
          const dia = parts[2];
          const optionExists = Array.from(selectDia.options).some(opt => opt.value === dia);
          if (optionExists) {
            selectDia.value = dia;
          }
        }
      }
    } else {
      // Default: Ordinario
      selectTiempo.value = "Ordinario";
      actualizarSemanasLiturgia();
      selectSemana.value = "1";
      actualizarDiasLiturgia();
    }

    ejecutarFiltroManual();
  }

  // 9b. Actualizar las opciones del select de días según la semana seleccionada
  function actualizarDiasLiturgia() {
    const selectSemana = document.getElementById('selectLiturgiaSemana');
    const selectDia = document.getElementById('selectLiturgiaDia');
    if (!selectSemana || !selectDia) return;

    const semana = selectSemana.value;
    const valorPrevio = selectDia.value;

    const selectTiempo = document.getElementById('selectLiturgiaTiempo');
    const tiempo = selectTiempo ? selectTiempo.value : "";

    const todosLosDias = [
      { value: "do", text: "Domingo" },
      { value: "lu", text: "Lunes" },
      { value: "ma", text: "Martes" },
      { value: "mi", text: "Miércoles" },
      { value: "ju", text: "Jueves" },
      { value: "vi", text: "Viernes" },
      { value: "sa", text: "Sábado" }
    ];

    let diasFiltrados = todosLosDias;

    if (semana === "pentecostes") {
      // Solo Domingo para Pentecostés
      diasFiltrados = [
        { value: "do", text: "Domingo" }
      ];
    } else if (semana === "as") {
      // Solo Domingo y Jueves para Ascensión
      diasFiltrados = [
        { value: "do", text: "Domingo" },
        { value: "ju", text: "Jueves" }
      ];
    } else if (semana === "mc") {
      // Solo Miércoles a Sábado para Ceniza
      diasFiltrados = [
        { value: "mi", text: "Miércoles" },
        { value: "ju", text: "Jueves" },
        { value: "vi", text: "Viernes" },
        { value: "sa", text: "Sábado" }
      ];
    } else if (tiempo === "Cuaresma" && ["3", "4", "5"].includes(semana)) {
      // Libre Elección debajo de Domingo y antes de Lunes
      diasFiltrados = [
        { value: "do", text: "Domingo" },
        { value: "le", text: "Libre Elección" },
        { value: "lu", text: "Lunes" },
        { value: "ma", text: "Martes" },
        { value: "mi", text: "Miércoles" },
        { value: "ju", text: "Jueves" },
        { value: "vi", text: "Viernes" },
        { value: "sa", text: "Sábado" }
      ];
    }

    console.log("actualizarDiasLiturgia - tiempo:", tiempo, "semana:", semana, "diasFiltrados:", diasFiltrados);

    selectDia.innerHTML = "";
    diasFiltrados.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d.value;
      opt.textContent = d.text;
      selectDia.appendChild(opt);
    });

    // Si el valor previo existe en la lista filtrada, lo restauramos.
    // De lo contrario, por defecto va Miércoles para Ceniza ("mi") y Domingo ("do") para los demás.
    const optionExists = Array.from(selectDia.options).some(opt => opt.value === valorPrevio);
    if (optionExists) {
      selectDia.value = valorPrevio;
    } else {
      if (semana === "mc") {
        selectDia.value = "mi";
      } else {
        selectDia.value = "do";
      }
    }
  }

  // 10. Actualizar las opciones del select de semanas según el tiempo litúrgico
  function actualizarSemanasLiturgia() {
    const tiempo = document.getElementById('selectLiturgiaTiempo').value;
    const selectSemana = document.getElementById('selectLiturgiaSemana');
    if (!selectSemana) return;
    
    const valorPrevio = selectSemana.value;
    selectSemana.innerHTML = "";

    if (tiempo === 'Pascual') {
      // Agregar semanas de Pascua de la 1 a la 6, luego la Ascensión, luego la semana 7 y luego Pentecostés
      for (let i = 1; i <= 6; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `Semana ${i}`;
        selectSemana.appendChild(opt);
      }
      
      const optAs = document.createElement('option');
      optAs.value = "as";
      optAs.textContent = "Ascensión";
      selectSemana.appendChild(optAs);

      const opt7 = document.createElement('option');
      opt7.value = 7;
      opt7.textContent = `Semana 7`;
      selectSemana.appendChild(opt7);

      const optPent = document.createElement('option');
      optPent.value = "pentecostes";
      optPent.textContent = "Pentecostés";
      selectSemana.appendChild(optPent);
    } else if (tiempo === 'Cuaresma') {
      // Miércoles de Ceniza (mc) antes de la semana 1
      const optMc = document.createElement('option');
      optMc.value = "mc";
      optMc.textContent = "Mié.Ceniza";
      selectSemana.appendChild(optMc);

      for (let i = 1; i <= 6; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `Semana ${i}`;
        selectSemana.appendChild(opt);
      }
    } else {
      let maxSemanas = 4;
      if (tiempo === 'Adviento') maxSemanas = 4;
      else if (tiempo === 'Navidad') maxSemanas = 2;
      else if (tiempo === 'Ordinario') maxSemanas = 34;

      for (let i = 1; i <= maxSemanas; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `Semana ${i}`;
        selectSemana.appendChild(opt);
      }
    }

    // Restaurar valor previo si existe y es válido
    if (valorPrevio) {
      const optionExists = Array.from(selectSemana.options).some(opt => opt.value === valorPrevio);
      if (optionExists) {
        selectSemana.value = valorPrevio;
      }
    }

    actualizarDiasLiturgia();
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

    let claveLiturgica;
    if (semana === "pentecostes") {
      claveLiturgica = `${claveTiempo}_pentecostes`;
    } else if (semana === "as") {
      claveLiturgica = `${claveTiempo}_as_${dia}`;
    } else if (semana === "mc") {
      claveLiturgica = `${claveTiempo}_mc_${dia}`;
    } else {
      claveLiturgica = `${claveTiempo}_s${semana}_${dia}`;
    }
    
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

    // Botón de alternancia de selector manual (Calendario Litúrgico) en el encabezado del modal
    const btnToggleSelectorLiturgico = document.getElementById('btnToggleSelectorLiturgico');
    if (btnToggleSelectorLiturgico) {
      btnToggleSelectorLiturgico.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectorManual = document.getElementById('lecturaSeleccionManual');
        if (!selectorManual) return;

        const isHidden = selectorManual.style.display === "none";
        if (isHidden) {
          selectorManual.style.display = "block";
          inicializarFiltrosManuales();
        } else {
          selectorManual.style.display = "none";
          // Cargar lectura de la fecha seleccionada en el selector de fecha
          const inputSelector = document.getElementById('inputLiturgiaFechaSelector');
          if (inputSelector && inputSelector.value) {
            const parts = inputSelector.value.split('-');
            if (parts.length === 3) {
              const yyyy = parseInt(parts[0], 10);
              const mm = parseInt(parts[1], 10) - 1;
              const dd = parseInt(parts[2], 10);
              const selDate = new Date(yyyy, mm, dd);
              
              const cycle = obtenerCicloLiturgico(selDate);
              const ferialYear = (selDate.getFullYear() % 2 === 0) ? "PAR" : "IMPAR";
              const key = obtenerClaveLiturgicaDeFecha(selDate);
              
              if (key) {
                const keyParts = key.split('_');
                const dia = keyParts[keyParts.length - 1];
                const esDiaFijoOEspecial = key.startsWith("enero") || !["lu", "ma", "mi", "ju", "vi", "sa", "do"].includes(dia);
                const opcionCicloOAnio = (dia === "do" || esDiaFijoOEspecial) ? cycle : ferialYear;
                cargarLiturgiaPorClave(key, opcionCicloOAnio);
              } else {
                mostrarMensajeVacio();
              }
            }
          } else {
            cargarLecturaHoy();
          }
        }
      });
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
    if (selectSemana) {
      selectSemana.addEventListener('change', () => {
        actualizarDiasLiturgia();
        ejecutarFiltroManual();
      });
    }
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
          const parts = claveLiturgica.split('_');
          const dia = parts[parts.length - 1]; // "lu", "ma", etc.
          const esDiaFijoOEspecial = claveLiturgica.startsWith("enero") || !["lu", "ma", "mi", "ju", "vi", "sa", "do"].includes(dia);
          const opcionCicloOAnio = (dia === "do" || esDiaFijoOEspecial) ? ciclo : anoFerial;
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
