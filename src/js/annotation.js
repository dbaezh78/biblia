/**
 * annotation.js
 * Gestión de destacados (sombreado de colores, subrayado), notas, marcadores y su sincronización híbrida (Local + Cloud).
 * Control de vistas modales de anotaciones en el menú lateral.
 */

(function () {
  // Base de datos local de anotaciones (clave: libroId-cCap-vNum)
  let anotaciones = {};
  let seleccionados = []; // Guardará la lista de versículos seleccionados actualmente (objetos de datos)

  // 1. Inicialización y Carga de LocalStorage
  function cargarAnotacionesLocales() {
    try {
      const datosGuardados = localStorage.getItem('biblia_anotaciones');
      if (datosGuardados) {
        anotaciones = JSON.parse(datosGuardados);
      }
    } catch (e) {
      console.error("Error al cargar anotaciones de LocalStorage:", e);
    }
  }

  function guardarAnotacionesLocales() {
    try {
      localStorage.setItem('biblia_anotaciones', JSON.stringify(anotaciones));
    } catch (e) {
      console.error("Error al guardar anotaciones en LocalStorage:", e);
    }
  }

  // 2. Sincronización con Firebase Firestore
  function obtenerFirestoreColeccion() {
    if (!window.firebaseAuth || !window.firebaseAuth.currentUser || !window.firebaseAuth.db) {
      return null;
    }
    const uid = window.firebaseAuth.currentUser.uid;
    return window.firebaseAuth.db.collection('users').doc(uid).collection('anotaciones');
  }

  // Subir anotación a Firestore
  function subirAnotacionFirestore(anotacion) {
    const col = obtenerFirestoreColeccion();
    if (!col) return;
    
    col.doc(anotacion.id).set(anotacion)
      .then(() => console.log("Anotación sincronizada en la nube:", anotacion.id))
      .catch(err => console.error("Error al sincronizar con Firebase:", err));
  }

  // Descargar y fusionar anotaciones desde Firestore al iniciar sesión
  function sincronizarConFirebase(user) {
    if (!user) return;
    
    const col = obtenerFirestoreColeccion();
    if (!col) return;
    
    col.get()
      .then(snapshot => {
        let cambiosLocales = false;
        
        snapshot.forEach(doc => {
          const anotacionNube = doc.data();
          const anotacionLocal = anotaciones[anotacionNube.id];
          
          if (!anotacionLocal) {
            // No existe localmente: Añadir a local
            anotaciones[anotacionNube.id] = anotacionNube;
            cambiosLocales = true;
          } else {
            // Existe localmente: Conservar la que tenga la fecha más reciente (ISOString)
            const fechaNube = new Date(anotacionNube.fecha);
            const fechaLocal = new Date(anotacionLocal.fecha || 0);
            
            if (fechaNube > fechaLocal) {
              anotaciones[anotacionNube.id] = anotacionNube;
              cambiosLocales = true;
            } else if (fechaLocal > fechaNube) {
              // La local es más nueva: Subir la local a Firestore
              subirAnotacionFirestore(anotacionLocal);
            }
          }
        });
        
        // Subir elementos creados localmente que no existen en la nube
        Object.keys(anotaciones).forEach(id => {
          const docExiste = snapshot.docs.some(d => d.id === id);
          if (!docExiste) {
            subirAnotacionFirestore(anotaciones[id]);
          }
        });

        if (cambiosLocales) {
          guardarAnotacionesLocales();
          aplicarAnotacionesAlCapituloActual();
        }
        console.log("Sincronización con Firebase completada con éxito.");
      })
      .catch(err => {
        console.error("Error al descargar datos de Firestore:", err);
      });
  }

  // Escuchar evento de autenticación Firebase
  document.addEventListener('firebaseAuthChange', (e) => {
    const user = e.detail;
    if (user) {
      sincronizarConFirebase(user);
    }
  });

  // 3. Aplicar estilos en los versículos renderizados en el DOM
  function aplicarAnotacionesAlCapituloActual() {
    const versiculosDOM = document.querySelectorAll('.versiculo');
    versiculosDOM.forEach(v => {
      const vNum = v.getAttribute('data-vnum');
      const key = `${window.idLibroActual}-c${window.capituloActualNum}-v${vNum}`;
      const anotacion = anotaciones[key];
      
      // Buscar el span interno del texto (.v-texto)
      const spanTexto = v.querySelector('.v-texto') || v;
      
      // Limpiar clases de destacado anteriores
      spanTexto.classList.remove('destacado-azul', 'destacado-amarillo', 'destacado-rosado', 'destacado-verde', 'destacado-naranja', 'destacado-rojo', 'destacado-morado', 'subrayado-linea');
      
      if (anotacion) {
        if (anotacion.color) {
          spanTexto.classList.add(`destacado-${anotacion.color}`);
        }
        if (anotacion.subrayado) {
          spanTexto.classList.add('subrayado-linea');
        }
      }
    });
  }

  // Interceptar la función original de renderizado de versículos en jsgral.js
  const originalRenderizarVersiculos = window.renderizarVersiculos;
  window.renderizarVersiculos = function (libroData, capSeleccionado) {
    if (typeof originalRenderizarVersiculos === 'function') {
      originalRenderizarVersiculos(libroData, capSeleccionado);
    }
    
    // Registrar escuchadores y asegurar data-vnum en el DOM antes de aplicar las anotaciones
    configurarClicsEnVersiculos();

    // Aplicar sombreado y subrayado en el nuevo capítulo
    aplicarAnotacionesAlCapituloActual();

    // Comprobar si hay un scroll pendiente a un versículo específico (o múltiples separados por punto)
    if (window.scrollToVerseAfterRender) {
      const vTargetRaw = window.scrollToVerseAfterRender;
      window.scrollToVerseAfterRender = null;
      
      setTimeout(() => {
        const vNums = vTargetRaw.toString().includes('.') ? vTargetRaw.toString().split('.') : [vTargetRaw.toString()];
        const primerVNum = vNums[0];
        
        // Scroll al primer versículo de la lista
        const vElPrimer = document.querySelector(`.versiculo[data-vnum="${primerVNum}"]`);
        if (vElPrimer) {
          vElPrimer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Resaltar todos los versículos especificados por 3 segundos
        const elVersiculosResaltados = [];
        vNums.forEach(vNum => {
          const vEl = document.querySelector(`.versiculo[data-vnum="${vNum}"]`);
          if (vEl) {
            vEl.classList.add('seleccionado-actual');
            elVersiculosResaltados.push(vEl);
          }
        });

        if (elVersiculosResaltados.length > 0) {
          setTimeout(() => {
            elVersiculosResaltados.forEach(vEl => {
              vEl.classList.remove('seleccionado-actual');
            });
          }, 3000);
        }
      }, 500);
    }
  };

  // Quitar selección actual de versículos y guardar cambios de notas si corresponde
  function quitarSeleccionVersiculo() {
    document.querySelectorAll('.versiculo').forEach(el => {
      el.classList.remove('seleccionado-actual');
      const btn = el.querySelector('.btn-mas-versiculo');
      if (btn) btn.remove();
    });
    
    if (seleccionados.length > 0) {
      const notaInput = document.getElementById('accionVNotaInput');
      if (notaInput) {
        const notaTexto = notaInput.value.trim();
        const batchFecha = new Date().toISOString();
        
        seleccionados.forEach(sel => {
          const anotacion = anotaciones[sel.key] || {
            id: sel.key,
            libroNombre: sel.libroNombre,
            libroId: sel.libroId,
            capitulo: sel.capitulo,
            versiculo: sel.vNum,
            texto: sel.texto,
            color: null,
            subrayado: false,
            marcador: false,
            nota: "",
            fecha: batchFecha
          };
          
          if (notaTexto !== (anotacion.nota || "")) {
            anotacion.nota = notaTexto;
            anotacion.fecha = batchFecha;
            
            anotaciones[sel.key] = anotacion;
            guardarAnotacionesLocales();
            subirAnotacionFirestore(anotacion);
          }
        });
      }
      seleccionados = [];
    }
  }

  // 4. Configurar escuchadores de clics en versículos
  function configurarClicsEnVersiculos() {
    const versiculos = document.querySelectorAll('.versiculo');
    versiculos.forEach(v => {
      // 1. Si no tiene data-vnum (versículos comunes sin paralelos), asignarlo desde el span num-v
      if (!v.getAttribute('data-vnum')) {
        const numSpan = v.querySelector('.num-v');
        if (numSpan) {
          v.setAttribute('data-vnum', numSpan.textContent.trim());
        }
      }

      // 2. Envolver el texto del versículo en un span .v-texto si no existe aún
      if (!v.querySelector('.v-texto')) {
        const nodosTexto = [];
        Array.from(v.childNodes).forEach(node => {
          // Ignorar el span del número de versículo, el botón de más, badges o scripts
          if (node.nodeType === Node.TEXT_NODE || 
              (node.nodeType === Node.ELEMENT_NODE && 
               !node.classList.contains('num-v') && 
               !node.classList.contains('btn-mas-versiculo') && 
               !node.classList.contains('badge-paralelo'))) {
            nodosTexto.push(node);
          }
        });
        
        if (nodosTexto.length > 0) {
          const spanTexto = document.createElement('span');
          spanTexto.className = 'v-texto';
          
          const numSpan = v.querySelector('.num-v');
          if (numSpan) {
            numSpan.after(spanTexto);
          } else {
            v.prepend(spanTexto);
          }
          
          nodosTexto.forEach(node => spanTexto.appendChild(node));
        }
      }

      // Reemplazamos clics previos eliminando listeners clonando
      const clon = v.cloneNode(true);
      v.parentNode.replaceChild(clon, v);
      
      clon.addEventListener('click', (e) => {
        // Si el clic viene directamente del botón de más, no hacer nada aquí
        if (e.target.classList.contains('btn-mas-versiculo')) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        seleccionarVersiculo(clon);
      });
    });
  }

  // Cargar selección de versículo y mostrar signo de más y paralelos
  function seleccionarVersiculo(vElement) {
    const vNum = vElement.getAttribute('data-vnum');
    const libroNombre = window.libroActualData.libro;
    const capNum = window.capituloActualNum;
    const libroId = window.idLibroActual;
    const key = `${libroId}-c${capNum}-v${vNum}`;

    // Verificar si el versículo ya está seleccionado
    const idx = seleccionados.findIndex(s => s.key === key);

    if (idx !== -1) {
      // Ya está seleccionado: Deseleccionarlo
      seleccionados.splice(idx, 1);
      vElement.classList.remove('seleccionado-actual');
      const btn = vElement.querySelector('.btn-mas-versiculo');
      if (btn) btn.remove();

      // Si quedan versículos seleccionados, refrescar el Action Sheet (si está abierto)
      const panel = document.getElementById('panelAccionVersiculo');
      if (seleccionados.length > 0) {
        if (panel && panel.classList.contains('open')) {
          abrirActionSheetMulti();
        }
      } else {
        // Si ya no queda ninguno seleccionado, cerrar paneles
        if (panel && panel.classList.contains('open')) {
          cerrarActionSheet();
        }
        if (typeof window.panelParalelos !== 'undefined' && window.panelParalelos) {
          window.panelParalelos.classList.remove('open');
        }
      }
    } else {
      // No está seleccionado: Seleccionarlo
      vElement.classList.add('seleccionado-actual');
      
      // Crear el botón de más (+)
      const btnMas = document.createElement('button');
      btnMas.className = 'btn-mas-versiculo';
      btnMas.innerHTML = '+';
      btnMas.setAttribute('title', 'Opciones de Versículos');
      vElement.appendChild(btnMas);
      
      // Limpiar texto (sin el botón de más)
      const tempClone = vElement.cloneNode(true);
      const btnMasInClone = tempClone.querySelector('.btn-mas-versiculo');
      if (btnMasInClone) btnMasInClone.remove();
      const textoLimpio = tempClone.innerText.replace(/^\d+\s*/, "").trim();

      seleccionados.push({
        key: key,
        vNum: vNum,
        texto: textoLimpio,
        elementoDOM: vElement,
        libroNombre: libroNombre,
        libroId: libroId,
        capitulo: capNum
      });

      // Configurar clic en el botón de más (+)
      btnMas.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        abrirActionSheetMulti();
      });

      // Refrescar Action Sheet si ya está abierto
      const panel = document.getElementById('panelAccionVersiculo');
      if (panel && panel.classList.contains('open')) {
        abrirActionSheetMulti();
      }

      // Si tiene paralelos, abrir automáticamente el panel de paralelos nativo (para el último clicado)
      const tieneParalelos = vElement.getAttribute('data-destinos');
      if (tieneParalelos) {
        abrirParalelosNativos(libroNombre, capNum, vNum, tieneParalelos);
      } else {
        // Si el último seleccionado no tiene paralelos y es el único, cerrar paralelos
        if (seleccionados.length === 1 && typeof window.panelParalelos !== 'undefined' && window.panelParalelos) {
          window.panelParalelos.classList.remove('open');
        }
      }
    }
  }

  // Helper para abrir el panel de paralelos nativo de la app
  function abrirParalelosNativos(libroNombre, capNum, vNum, tieneParalelos) {
    if (typeof window.panelTitulo !== 'undefined' && window.panelTitulo) {
      window.panelTitulo.innerHTML = `📚 Paralelos de ${libroNombre} ${capNum},${vNum}`;
    }
    if (typeof window.panelContenido !== 'undefined' && window.panelContenido) {
      window.panelContenido.innerHTML = `<p style="color: #888; font-style: italic; padding: 10px;">Buscando textos paralelos...</p>`;
    }
    if (typeof window.panelParalelos !== 'undefined' && window.panelParalelos) {
      window.panelParalelos.classList.add('open');
    }
    
    const destinos = tieneParalelos.split(',');
    const consultasPromesas = destinos.map(coordenadaDestino => {
      const partes = coordenadaDestino.trim().split('-');
      if (partes.length < 3) return Promise.resolve('');
      const libroIdDest = partes[0];
      const capNumDest = partes[1].replace('c', '');
      
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

      const infoLibro = window.indiceLibrosRutas[libroIdDest];
      if (!infoLibro) return Promise.resolve('');

      return fetch(infoLibro.ruta)
        .then(res => res.ok ? res.json() : null)
        .then(libroJson => {
          if (!libroJson || !libroJson.capitulos || !libroJson.capitulos[capNumDest]) return '';
          
          let textoOriginal = "";
          textoOriginal = versesToFetch.map(vn => {
            if (vn.includes('_')) {
              const rangeParts = vn.split('_');
              return libroJson.capitulos[capNumDest][rangeParts[0]] || "";
            }
            return libroJson.capitulos[capNumDest][vn] || "";
          }).filter(Boolean).join(' ');

          let vistaPreviaTexto = textoOriginal.length > 40 ? textoOriginal.substring(0, 40).trim() + "..." : textoOriginal || "(No disponible)";
          const textoCitaFormateada = `${infoLibro.nombre} ${capNumDest},${citaFormateadaLector}`;

          return `
            <div class="bloque-paralelo-link" 
                 data-ruta="${infoLibro.ruta}" 
                 data-libro-id="${libroIdDest}" 
                 data-cap="${capNumDest}" 
                 data-verse="${versesToFetch.join('.')}" 
                 style="flex: 1 1 calc(50% - 10px); min-width: 250px; max-width: 100%; border-left: 3px solid #cc0000; padding: 4px; cursor: pointer; background: #fff; border-radius: 0 6px 6px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); box-sizing: border-box; margin-bottom: 4px;">
              <strong style="color: #cc0000; display: block; margin-bottom: 2px; font-size: 0.9em;">📌 ${textoCitaFormateada}</strong>
              <span style="font-style: italic; color: #4a5568; font-size: 0.85em; display: block; line-height: 1.3;">"${vistaPreviaTexto}"</span>
            </div>
          `;
        }).catch(() => '');
    });

    Promise.all(consultasPromesas).then(bloquesHtml => {
      if (window.panelContenido) {
        const htmlFinal = bloquesHtml.filter(b => b && b.trim() !== '').join('');
        if (htmlFinal.trim() === '') {
          window.panelContenido.innerHTML = `<p style="color: #888; font-style: italic; padding: 2px;">No se encontraron textos cruzados.</p>`;
        } else {
          const esMovil = window.innerWidth <= 600;
          window.panelContenido.innerHTML = `
            <div style="display: flex; flex-direction: ${esMovil ? 'column' : 'row'}; flex-wrap: wrap; gap: 4px; width: 100%; max-height: 180px; overflow-y: auto; padding: 5px; box-sizing: border-box;">
              ${htmlFinal}
            </div>
          `;
          if (typeof window.asignarEventosViajeReferencia === 'function') {
            window.asignarEventosViajeReferencia();
          }
        }
      }
    });
  }

  // 5. Lógica del Menú Contextual (Action Sheet)
  function inyectarActionSheet() {
    if (document.getElementById('panelAccionVersiculo')) return;

    const div = document.createElement('div');
    div.innerHTML = `
      <div class="panel-accion-versiculo" id="panelAccionVersiculo">
        <div class="accion-v-header">
          <div>
            <h4 class="accion-v-referencia" id="accionVReferencia">Libro 1:1</h4>
            <div class="accion-v-texto" id="accionVTexto">Cargando texto...</div>
          </div>
          <button class="ajustes-close-btn" id="closeAccionVBtn" aria-label="Cerrar">&times;</button>
        </div>
        
        <!-- Sombreado de Colores -->
        <div class="accion-v-colores-fila">
          <div class="accion-v-color-dot" data-color="azul" style="background-color: #38bdf8;" title="Azul"></div>
          <div class="accion-v-color-dot" data-color="amarillo" style="background-color: #fde047;" title="Amarillo"></div>
          <div class="accion-v-color-dot" data-color="rosado" style="background-color: #f472b6;" title="Rosado"></div>
          <div class="accion-v-color-dot" data-color="verde" style="background-color: #4ade80;" title="Verde"></div>
          <div class="accion-v-color-dot" data-color="naranja" style="background-color: #fb923c;" title="Naranja"></div>
          <div class="accion-v-color-dot" data-color="rojo" style="background-color: #f87171;" title="Rojo"></div>
          <div class="accion-v-color-dot" data-color="morado" style="background-color: #c084fc;" title="Morado"></div>
          <div class="accion-v-clear-dot" id="clearColorBtn" title="Limpiar Sombreado">🗑️</div>
        </div>
        
        <!-- Acciones Principales -->
        <div class="accion-v-botones-grid">
          <button class="accion-v-btn" id="btnAccionSubrayar">
            <span style="font-size:1.15rem;">✍️</span>
            <span>Subrayar</span>
          </button>
          <button class="accion-v-btn" id="btnAccionMarcador">
            <span style="font-size:1.15rem;">🔖</span>
            <span>Guardar</span>
          </button>
          <button class="accion-v-btn" id="btnAccionNota">
            <span style="font-size:1.15rem;">📝</span>
            <span>Nota</span>
          </button>
          <button class="accion-v-btn" id="btnAccionCopiar">
            <span style="font-size:1.15rem;">📋</span>
            <span>Copiar</span>
          </button>
        </div>

        <!-- Acciones Adicionales -->
        <div class="accion-v-botones-grid" style="grid-template-columns: repeat(2, 1fr); margin-bottom: 0;">
          <button class="accion-v-btn" id="btnAccionCompartir" style="flex-direction: row; gap: 8px; justify-content: center;">
            <span>🔗</span>
            <span>Compartir</span>
          </button>
          <button class="accion-v-btn" id="btnAccionParalelos" style="flex-direction: row; gap: 8px; justify-content: center; display: none;">
            <span>📚</span>
            <span>Paralelos</span>
          </button>
        </div>
        
        <!-- Entrada para notas -->
        <div class="accion-v-nota-contenedor" id="accionVNotaCont">
          <textarea class="accion-v-nota-input" id="accionVNotaInput" placeholder="Añade un comentario personal o nota de estudio..."></textarea>
        </div>
      </div>
    `;
    document.body.appendChild(div.firstElementChild);
    configurarEventosActionSheet();
  }

  function abrirActionSheetMulti() {
    if (seleccionados.length === 0) return;

    // Ordenar los seleccionados por número de versículo para que la cita y el texto queden ordenados
    seleccionados.sort((a, b) => parseInt(a.vNum, 10) - parseInt(b.vNum, 10));

    const libroNombre = seleccionados[0].libroNombre;
    const capNum = seleccionados[0].capitulo;
    
    // Formatear cita de versículos (ej: "Génesis 1:1, 2" o "Génesis 1:1-3")
    const vNums = seleccionados.map(s => parseInt(s.vNum, 10));
    let citacionV = "";
    
    const esRangoContinuo = vNums.every((val, i, arr) => i === 0 || val === arr[i-1] + 1);
    if (esRangoContinuo && vNums.length > 1) {
      citacionV = `${vNums[0]}-${vNums[vNums.length - 1]}`;
    } else {
      citacionV = vNums.join(', ');
    }
    
    const referenciaCompleta = `${libroNombre} ${capNum}:${citacionV}`;
    const textoConcatenado = seleccionados.map(s => s.texto).join(' ');

    // Cargar en la UI
    document.getElementById('accionVReferencia').textContent = referenciaCompleta;
    document.getElementById('accionVTexto').textContent = `"${textoConcatenado}"`;

    // Determinar valores compartidos por todos
    let colorComun = null;
    const primerId = seleccionados[0].key;
    const primeraAnotacion = anotaciones[primerId];
    if (primeraAnotacion) {
      colorComun = primeraAnotacion.color;
      const mismoColor = seleccionados.every(s => {
        const a = anotaciones[s.key];
        return a && a.color === colorComun;
      });
      if (!mismoColor) colorComun = null;
    }

    // Cargar burbujas
    document.querySelectorAll('.accion-v-color-dot').forEach(dot => {
      if (dot.getAttribute('data-color') === colorComun) {
        dot.classList.add('selected');
      } else {
        dot.classList.remove('selected');
      }
    });

    // Subrayado común
    const todosSubrayados = seleccionados.every(s => {
      const a = anotaciones[s.key];
      return a && a.subrayado;
    });
    const btnSubrayar = document.getElementById('btnAccionSubrayar');
    if (todosSubrayados) btnSubrayar.classList.add('active');
    else btnSubrayar.classList.remove('active');

    // Marcador común
    const todosMarcadores = seleccionados.every(s => {
      const a = anotaciones[s.key];
      return a && a.marcador;
    });
    const btnMarcador = document.getElementById('btnAccionMarcador');
    if (todosMarcadores) btnMarcador.classList.add('active');
    else btnMarcador.classList.remove('active');

    // Nota común
    let notaComun = "";
    if (primeraAnotacion) {
      notaComun = primeraAnotacion.nota || "";
      const mismaNota = seleccionados.every(s => {
        const a = anotaciones[s.key];
        return a && a.nota === notaComun;
      });
      if (!mismaNota) notaComun = "";
    }
    
    const btnNota = document.getElementById('btnAccionNota');
    const notaCont = document.getElementById('accionVNotaCont');
    const notaInput = document.getElementById('accionVNotaInput');
    
    notaInput.value = notaComun;
    if (notaComun && notaComun.trim() !== "") {
      btnNota.classList.add('active');
      notaCont.style.display = 'block';
    } else {
      btnNota.classList.remove('active');
      notaCont.style.display = 'none';
    }

    // Configurar botón de Paralelos (Solo si hay un único versículo seleccionado)
    const btnParalelos = document.getElementById('btnAccionParalelos');
    const ultimoElementoDOM = seleccionados[seleccionados.length - 1].elementoDOM;
    const tieneParalelos = ultimoElementoDOM.getAttribute('data-destinos');
    if (tieneParalelos && seleccionados.length === 1) {
      btnParalelos.style.display = 'flex';
      btnParalelos.onclick = function (e) {
        e.stopPropagation();
        cerrarActionSheet();
        abrirParalelosNativos(libroNombre, capNum, vNums[0].toString(), tieneParalelos);
      };
    } else {
      btnParalelos.style.display = 'none';
    }

    // Deslizar panel arriba
    document.getElementById('panelAccionVersiculo').classList.add('open');
  }

  function cerrarActionSheet() {
    const panel = document.getElementById('panelAccionVersiculo');
    if (panel) {
      panel.classList.remove('open');
    }
    
    // Guardar cambios en la nota al cerrar si hay datos cargados
    if (seleccionados.length > 0) {
      const notaInput = document.getElementById('accionVNotaInput');
      if (notaInput) {
        const notaTexto = notaInput.value.trim();
        const batchFecha = new Date().toISOString();
        
        seleccionados.forEach(sel => {
          const anotacion = anotaciones[sel.key] || {
            id: sel.key,
            libroNombre: sel.libroNombre,
            libroId: sel.libroId,
            capitulo: sel.capitulo,
            versiculo: sel.vNum,
            texto: sel.texto,
            color: null,
            subrayado: false,
            marcador: false,
            nota: "",
            fecha: batchFecha
          };
          
          if (notaTexto !== (anotacion.nota || "")) {
            anotacion.nota = notaTexto;
            anotacion.fecha = batchFecha;
            
            anotaciones[sel.key] = anotacion;
            guardarAnotacionesLocales();
            subirAnotacionFirestore(anotacion);
          }
        });
      }

      // Quitar selección visual y botón de más de todos los versículos
      document.querySelectorAll('.versiculo').forEach(el => {
        el.classList.remove('seleccionado-actual');
        const btn = el.querySelector('.btn-mas-versiculo');
        if (btn) btn.remove();
      });
      seleccionados = [];
    }
  }

  function configurarEventosActionSheet() {
    const panel = document.getElementById('panelAccionVersiculo');
    const btnCerrar = document.getElementById('closeAccionVBtn');
    
    if (btnCerrar) {
      btnCerrar.addEventListener('click', cerrarActionSheet);
    }
    
    // Clics fuera para cerrar la selección y el panel
    document.addEventListener('click', (e) => {
      const modal = document.getElementById('modalAnotaciones');
      
      if (!e.target.closest('.versiculo') && 
          (!panel || !panel.contains(e.target)) && 
          (!modal || !modal.contains(e.target)) &&
          !e.target.classList.contains('google-logout-btn') &&
          !e.target.classList.contains('google-login-btn')) {
        
        if (panel && panel.classList.contains('open')) {
          cerrarActionSheet();
        } else {
          quitarSeleccionVersiculo();
        }
      }
    });

    // Eventos de selección de color
    const dotsColor = document.querySelectorAll('.accion-v-color-dot');
    dotsColor.forEach(dot => {
      dot.addEventListener('click', () => {
        if (seleccionados.length === 0) return;
        
        const color = dot.getAttribute('data-color');
        
        // Determinar si quitamos o ponemos
        const primerId = seleccionados[0].key;
        const yaTieneColor = anotaciones[primerId] && anotaciones[primerId].color === color;
        const colorAAplicar = yaTieneColor ? null : color;

        if (colorAAplicar === null) {
          dotsColor.forEach(d => d.classList.remove('selected'));
        } else {
          dotsColor.forEach(d => d.classList.remove('selected'));
          dot.classList.add('selected');
        }

        seleccionados.forEach(sel => {
          const anotacion = anotaciones[sel.key] || {
            id: sel.key,
            libroNombre: sel.libroNombre,
            libroId: sel.libroId,
            capitulo: sel.capitulo,
            versiculo: sel.vNum,
            texto: sel.texto,
            color: null,
            subrayado: false,
            marcador: false,
            nota: "",
            fecha: new Date().toISOString()
          };

          const spanTexto = sel.elementoDOM.querySelector('.v-texto') || sel.elementoDOM;
          
          if (anotacion.color) {
            spanTexto.classList.remove(`destacado-${anotacion.color}`);
          }
          
          anotacion.color = colorAAplicar;
          anotacion.fecha = new Date().toISOString();

          if (colorAAplicar) {
            spanTexto.classList.add(`destacado-${colorAAplicar}`);
          }

          anotaciones[sel.key] = anotacion;
          guardarAnotacionesLocales();
          subirAnotacionFirestore(anotacion);
        });

        // Ocultar Action Sheet automáticamente después de seleccionar color
        setTimeout(() => cerrarActionSheet(), 200);
      });
    });

    // Limpiar color destacado y subrayado
    const clearBtn = document.getElementById('clearColorBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (seleccionados.length === 0) return;
        
        dotsColor.forEach(d => d.classList.remove('selected'));
        const btnSubrayar = document.getElementById('btnAccionSubrayar');
        if (btnSubrayar) btnSubrayar.classList.remove('active');

        seleccionados.forEach(sel => {
          const anotacion = anotaciones[sel.key] || {
            id: sel.key,
            libroNombre: sel.libroNombre,
            libroId: sel.libroId,
            capitulo: sel.capitulo,
            versiculo: sel.vNum,
            texto: sel.texto,
            color: null,
            subrayado: false,
            marcador: false,
            nota: "",
            fecha: new Date().toISOString()
          };

          const spanTexto = sel.elementoDOM.querySelector('.v-texto') || sel.elementoDOM;
          if (anotacion.color) {
            spanTexto.classList.remove(`destacado-${anotacion.color}`);
          }
          spanTexto.classList.remove('subrayado-linea');
          
          anotacion.color = null;
          anotacion.subrayado = false;
          anotacion.fecha = new Date().toISOString();

          anotaciones[sel.key] = anotacion;
          guardarAnotacionesLocales();
          subirAnotacionFirestore(anotacion);
        });

        // Ocultar Action Sheet automáticamente después de limpiar
        setTimeout(() => cerrarActionSheet(), 200);
      });
    }

    // Botón Subrayar
    const btnSubrayar = document.getElementById('btnAccionSubrayar');
    if (btnSubrayar) {
      btnSubrayar.addEventListener('click', () => {
        if (seleccionados.length === 0) return;
        
        const primerId = seleccionados[0].key;
        const yaSubrayado = anotaciones[primerId] && anotaciones[primerId].subrayado;
        const subrayadoAAplicar = !yaSubrayado;

        if (subrayadoAAplicar) btnSubrayar.classList.add('active');
        else btnSubrayar.classList.remove('active');

        seleccionados.forEach(sel => {
          const anotacion = anotaciones[sel.key] || {
            id: sel.key,
            libroNombre: sel.libroNombre,
            libroId: sel.libroId,
            capitulo: sel.capitulo,
            versiculo: sel.vNum,
            texto: sel.texto,
            color: null,
            subrayado: false,
            marcador: false,
            nota: "",
            fecha: new Date().toISOString()
          };

          const spanTexto = sel.elementoDOM.querySelector('.v-texto') || sel.elementoDOM;
          anotacion.subrayado = subrayadoAAplicar;
          anotacion.fecha = new Date().toISOString();

          if (subrayadoAAplicar) {
            spanTexto.classList.add('subrayado-linea');
          } else {
            spanTexto.classList.remove('subrayado-linea');
          }

          anotaciones[sel.key] = anotacion;
          guardarAnotacionesLocales();
          subirAnotacionFirestore(anotacion);
        });

        // Ocultar Action Sheet automáticamente después de subrayar
        setTimeout(() => cerrarActionSheet(), 200);
      });
    }

    // Botón Marcador (Guardar)
    const btnMarcador = document.getElementById('btnAccionMarcador');
    if (btnMarcador) {
      btnMarcador.addEventListener('click', () => {
        if (seleccionados.length === 0) return;
        
        const primerId = seleccionados[0].key;
        const yaMarcador = anotaciones[primerId] && anotaciones[primerId].marcador;
        const marcadorAAplicar = !yaMarcador;

        if (marcadorAAplicar) btnMarcador.classList.add('active');
        else btnMarcador.classList.remove('active');

        seleccionados.forEach(sel => {
          const anotacion = anotaciones[sel.key] || {
            id: sel.key,
            libroNombre: sel.libroNombre,
            libroId: sel.libroId,
            capitulo: sel.capitulo,
            versiculo: sel.vNum,
            texto: sel.texto,
            color: null,
            subrayado: false,
            marcador: false,
            nota: "",
            fecha: new Date().toISOString()
          };

          anotacion.marcador = marcadorAAplicar;
          anotacion.fecha = new Date().toISOString();

          anotaciones[sel.key] = anotacion;
          guardarAnotacionesLocales();
          subirAnotacionFirestore(anotacion);
        });

        // Ocultar Action Sheet automáticamente después de guardar
        setTimeout(() => cerrarActionSheet(), 200);
      });
    }

    // Botón Nota (Toggles textarea)
    const btnNota = document.getElementById('btnAccionNota');
    const notaCont = document.getElementById('accionVNotaCont');
    const notaInput = document.getElementById('accionVNotaInput');
    
    if (btnNota) {
      btnNota.addEventListener('click', () => {
        if (notaCont.style.display === 'none') {
          notaCont.style.display = 'block';
          btnNota.classList.add('active');
          notaInput.focus();
        } else {
          notaCont.style.display = 'none';
          if (notaInput.value.trim() === "") {
            btnNota.classList.remove('active');
          }
        }
      });
    }

    // Botón Copiar
    const btnCopiar = document.getElementById('btnAccionCopiar');
    if (btnCopiar) {
      btnCopiar.addEventListener('click', () => {
        if (seleccionados.length === 0) return;
        
        seleccionados.sort((a, b) => parseInt(a.vNum, 10) - parseInt(b.vNum, 10));
        
        const libroNombre = seleccionados[0].libroNombre;
        const capNum = seleccionados[0].capitulo;
        const vNums = seleccionados.map(s => parseInt(s.vNum, 10));
        let citacionV = "";
        const esRangoContinuo = vNums.every((val, i, arr) => i === 0 || val === arr[i-1] + 1);
        if (esRangoContinuo && vNums.length > 1) {
          citacionV = `${vNums[0]}-${vNums[vNums.length - 1]}`;
        } else {
          citacionV = vNums.join(', ');
        }

        const citaRef = `${libroNombre} ${capNum}:${citacionV}`;
        const textoCompletoCopiado = seleccionados.map(s => `[${s.vNum}] ${s.texto}`).join(' ');
        const copiadoTexto = `${citaRef} - "${textoCompletoCopiado}" (Biblia de Estudio)`;
        
        navigator.clipboard.writeText(copiadoTexto)
          .then(() => {
            alert("¡Versículos copiados al portapapeles con éxito!");
            // Ocultar Action Sheet automáticamente después de copiar
            setTimeout(() => cerrarActionSheet(), 200);
          })
          .catch(err => {
            console.error("Error al copiar texto:", err);
          });
      });
    }

    // Botón Compartir
    const btnCompartir = document.getElementById('btnAccionCompartir');
    if (btnCompartir) {
      btnCompartir.addEventListener('click', () => {
        if (seleccionados.length === 0) return;
        
        seleccionados.sort((a, b) => parseInt(a.vNum, 10) - parseInt(b.vNum, 10));
        const libroNombre = seleccionados[0].libroNombre;
        const capNum = seleccionados[0].capitulo;
        const vNums = seleccionados.map(s => parseInt(s.vNum, 10));
        let citacionV = "";
        const esRangoContinuo = vNums.every((val, i, arr) => i === 0 || val === arr[i-1] + 1);
        if (esRangoContinuo && vNums.length > 1) {
          citacionV = `${vNums[0]}-${vNums[vNums.length - 1]}`;
        } else {
          citacionV = vNums.join(', ');
        }

        const citaRef = `${libroNombre} ${capNum}:${citacionV}`;
        const textoCompletoCompartido = seleccionados.map(s => `[${s.vNum}] ${s.texto}`).join(' ');
        const compartirTexto = `${citaRef} - "${textoCompletoCompartido}"`;
        
        if (navigator.share) {
          navigator.share({
            title: 'Biblia de Estudio',
            text: compartirTexto,
            url: window.location.href
          })
          .then(() => {
            setTimeout(() => cerrarActionSheet(), 200);
          })
          .catch(err => console.warn(err));
        } else {
          navigator.clipboard.writeText(compartirTexto + " " + window.location.href);
          alert("Web Share no soportado. Se copió el texto y el enlace al portapapeles.");
          setTimeout(() => cerrarActionSheet(), 200);
        }
      });
    }
  }

  // 6. Modal de Listados (Marcadores, Notas, Destacados)
  function inyectarModalAnotaciones() {
    if (document.getElementById('modalAnotaciones')) return;

    const div = document.createElement('div');
    div.innerHTML = `
      <div class="modal-anotaciones" id="modalAnotaciones">
        <div class="modal-anotaciones-content">
          <div class="modal-anotaciones-header">
            <h3 class="modal-anotaciones-titulo" id="modalAnotacionesTitulo">Cargando...</h3>
            <button class="modal-anotaciones-close" id="closeModalAnotacionesBtn" aria-label="Cerrar">&times;</button>
          </div>
          <div class="modal-anotaciones-busqueda">
            <span class="material-symbols-outlined modal-anotaciones-buscar-icon">search</span>
            <input type="text" class="modal-anotaciones-input-buscar" id="buscarAnotacionesInput" placeholder="Buscar versículos o notas...">
          </div>
          <div class="modal-anotaciones-body" id="modalAnotacionesBody">
            <!-- Cargado con JS -->
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(div.firstElementChild);

    // Evento de Cierre del Modal
    const btnCerrar = document.getElementById('closeModalAnotacionesBtn');
    const modal = document.getElementById('modalAnotaciones');
    if (btnCerrar) {
      btnCerrar.addEventListener('click', () => {
        modal.classList.remove('open');
      });
    }
    
    // Cerrar al hacer clic en el fondo difuminado
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
        }
      });
    }
  }

  function mostrarAnotacionesDeTipo(tipo) {
    inyectarModalAnotaciones();
    
    const modal = document.getElementById('modalAnotaciones');
    const titulo = document.getElementById('modalAnotacionesTitulo');
    const inputBuscar = document.getElementById('buscarAnotacionesInput');
    
    // Cerrar sidebar si la función global existe
    if (typeof window.closeMenu === 'function') {
      window.closeMenu();
    }

    modal.classList.add('open');
    inputBuscar.value = ""; // Limpiar búsqueda previa

    let tituloTexto = "";
    if (tipo === 'marcadores') tituloTexto = "🔖 Mis Marcadores";
    else if (tipo === 'notas') tituloTexto = "📝 Mis Notas de Estudio";
    else if (tipo === 'destacados') tituloTexto = "🅰️ Textos Destacados";
    
    titulo.textContent = tituloTexto;

    // Función interna para filtrar y renderizar (agrupando por lote/fecha de marcado)
    function renderizarFiltro(query = "") {
      const bodyList = document.getElementById('modalAnotacionesBody');
      bodyList.innerHTML = "";

      const queryLimpia = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      // Filtrar base de datos individualmente
      const filtrados = Object.values(anotaciones).filter(item => {
        // Filtrar por tipo primero
        if (tipo === 'marcadores' && !item.marcador) return false;
        if (tipo === 'notas' && (!item.nota || item.nota.trim() === "")) return false;
        if (tipo === 'destacados' && !item.color) return false;

        // Filtrar por búsqueda si hay texto
        if (queryLimpia !== "") {
          const textoRef = `${item.libroNombre} ${item.capitulo} ${item.versiculo}`.toLowerCase();
          const textoVersiculo = (item.texto || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const textoNota = (item.nota || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          
          return textoRef.includes(queryLimpia) || textoVersiculo.includes(queryLimpia) || textoNota.includes(queryLimpia);
        }

        return true;
      });

      // Agrupar items por fecha (lote) y libro/capítulo
      const grupos = {};
      filtrados.forEach(item => {
        // Clave basada en la fecha y el capítulo para agrupar marcas del mismo lote
        const claveGrupo = item.fecha ? `${item.libroId}_c${item.capitulo}_f${item.fecha}` : item.id;
        
        if (!grupos[claveGrupo]) {
          grupos[claveGrupo] = {
            libroId: item.libroId,
            libroNombre: item.libroNombre,
            capitulo: item.capitulo,
            versiculos: [parseInt(item.versiculo, 10)],
            textosMap: { [item.versiculo]: item.texto },
            clavesAnotaciones: [item.id],
            nota: item.nota || "",
            color: item.color,
            subrayado: item.subrayado,
            marcador: item.marcador,
            fecha: item.fecha
          };
        } else {
          // Agregar versículo a grupo existente
          const vNumInt = parseInt(item.versiculo, 10);
          if (!grupos[claveGrupo].versiculos.includes(vNumInt)) {
            grupos[claveGrupo].versiculos.push(vNumInt);
          }
          grupos[claveGrupo].textosMap[item.versiculo] = item.texto;
          grupos[claveGrupo].clavesAnotaciones.push(item.id);
          
          if (item.nota && item.nota !== grupos[claveGrupo].nota) {
            if (!grupos[claveGrupo].nota) {
              grupos[claveGrupo].nota = item.nota;
            } else if (!grupos[claveGrupo].nota.includes(item.nota)) {
              grupos[claveGrupo].nota += " | " + item.nota;
            }
          }
        }
      });

      // Convertir a array agrupado final
      const itemsAgrupados = Object.values(grupos).map(g => {
        g.versiculos.sort((a, b) => a - b);
        
        let citacionV = "";
        const esRangoContinuo = g.versiculos.every((val, i, arr) => i === 0 || val === arr[i-1] + 1);
        if (esRangoContinuo && g.versiculos.length > 1) {
          citacionV = `${g.versiculos[0]}-${g.versiculos[g.versiculos.length - 1]}`;
        } else {
          citacionV = g.versiculos.join(', ');
        }
        
        const textoCompleto = g.versiculos.map(vNum => g.textosMap[vNum]).join(' ');
        
        return {
          libroId: g.libroId,
          libroNombre: g.libroNombre,
          capitulo: g.capitulo,
          versiculo: citacionV,
          primerVersiculo: g.versiculos[0],
          texto: textoCompleto,
          clavesAnotaciones: g.clavesAnotaciones,
          nota: g.nota,
          color: g.color,
          subrayado: g.subrayado,
          marcador: g.marcador,
          fecha: g.fecha
        };
      });

      // Ordenar por fecha (más recientes arriba)
      itemsAgrupados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

      if (itemsAgrupados.length === 0) {
        bodyList.innerHTML = `<div class="item-anotacion-vacio">No se encontraron elementos guardados.</div>`;
        return;
      }

      itemsAgrupados.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-anotacion-card';
        
        let fechaFormateada = "";
        try {
          fechaFormateada = new Date(item.fecha).toLocaleDateString();
        } catch (e) {
          fechaFormateada = "";
        }

        let sombreadoHTML = "";
        if (item.color) {
          let emoji = "🟡";
          if (item.color === 'azul') emoji = "🔵";
          else if (item.color === 'rosado') emoji = "🌸";
          else if (item.color === 'verde') emoji = "🟢";
          else if (item.color === 'naranja') emoji = "🟠";
          else if (item.color === 'rojo') emoji = "🔴";
          else if (item.color === 'morado') emoji = "🟣";
          sombreadoHTML = `<span style="font-size:0.8rem; margin-right:4px;">${emoji} Destacado</span>`;
        } else {
          sombreadoHTML = `<span style="font-size:0.8rem; margin-right:4px;">⚪ Guardado</span>`;
        }

        card.innerHTML = `
          <div class="item-anotacion-ref">
            <span>📌 ${item.libroNombre} ${item.capitulo}:${item.versiculo}</span>
            <div class="item-anotacion-meta-col">
              <div class="item-anotacion-acciones">
                <button class="item-accion-btn btn-item-copiar" title="Copiar versículos">📋</button>
                <button class="item-accion-btn btn-item-compartir" title="Compartir versículos">🔗</button>
                <button class="item-accion-btn btn-item-borrar" title="Eliminar anotación">🗑️</button>
              </div>
              <span class="item-anotacion-fecha">${sombreadoHTML} ${fechaFormateada}</span>
            </div>
          </div>
          <div class="item-anotacion-texto">"${item.texto}"</div>
          ${item.nota ? `<div class="item-anotacion-nota"><strong>Nota:</strong> ${item.nota}</div>` : ''}
        `;

        // Detener la propagación cuando hagan clic en los botones de acción individuales
        const btnItemCopiar = card.querySelector('.btn-item-copiar');
        if (btnItemCopiar) {
          btnItemCopiar.addEventListener('click', (e) => {
            e.stopPropagation();
            const citaRef = `${item.libroNombre} ${item.capitulo}:${item.versiculo}`;
            const copiadoTexto = `${citaRef} - "${item.texto}" (Biblia de Estudio)`;
            navigator.clipboard.writeText(copiadoTexto)
              .then(() => alert("¡Versículos copiados al portapapeles!"))
              .catch(err => console.error(err));
          });
        }

        const btnItemCompartir = card.querySelector('.btn-item-compartir');
        if (btnItemCompartir) {
          btnItemCompartir.addEventListener('click', (e) => {
            e.stopPropagation();
            const citaRef = `${item.libroNombre} ${item.capitulo}:${item.versiculo}`;
            const compartirTexto = `${citaRef} - "${item.texto}"`;
            if (navigator.share) {
              navigator.share({
                title: 'Biblia de Estudio',
                text: compartirTexto,
                url: window.location.href
              }).catch(err => console.warn(err));
            } else {
              navigator.clipboard.writeText(compartirTexto + " " + window.location.href);
              alert("Texto y enlace copiados para compartir.");
            }
          });
        }

        const btnItemBorrar = card.querySelector('.btn-item-borrar');
        if (btnItemBorrar) {
          btnItemBorrar.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`¿Estás seguro de que deseas eliminar esta anotación para ${item.libroNombre} ${item.capitulo}:${item.versiculo}?`)) {
              item.clavesAnotaciones.forEach(key => {
                const anotacion = anotaciones[key];
                if (anotacion) {
                  anotacion.color = null;
                  anotacion.subrayado = false;
                  anotacion.marcador = false;
                  anotacion.nota = "";
                  anotacion.fecha = new Date().toISOString();
                  
                  delete anotaciones[key];
                  subirAnotacionFirestore(anotacion);
                }
              });
              
              guardarAnotacionesLocales();
              
              if (window.idLibroActual === item.libroId && window.capituloActualNum === item.capitulo) {
                aplicarAnotacionesAlCapituloActual();
              }
              
              renderizarFiltro(inputBuscar.value);
              alert("Anotación eliminada correctamente.");
            }
          });
        }

        // Al hacer clic, navegar al primer versículo del grupo en el lector principal
        card.addEventListener('click', () => {
          modal.classList.remove('open');
          
          window.scrollToVerseAfterRender = item.primerVersiculo;

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
              }, 300);
            }
          }
        });

        bodyList.appendChild(card);
      });
    }

    // Configurar trigger de búsqueda
    inputBuscar.oninput = (e) => {
      renderizarFiltro(e.target.value);
    };

    renderizarFiltro();
  }

  // 7. Enlazar eventos de la barra lateral al iniciar
  function configurarEventosSidebar() {
    const btnMarcadores = document.getElementById('menuMarcadoresBtn');
    const btnNotas = document.getElementById('menuNotasBtn');
    const btnDestacados = document.getElementById('menuDestacadosBtn');

    if (btnMarcadores) {
      btnMarcadores.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarAnotacionesDeTipo('marcadores');
      });
    }

    if (btnNotas) {
      btnNotas.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarAnotacionesDeTipo('notes'); // Filtro interno usa 'notas'
        mostrarAnotacionesDeTipo('notas');
      });
    }

    if (btnDestacados) {
      btnDestacados.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarAnotacionesDeTipo('destacados');
      });
    }
  }

  // Inicialización de lógica
  document.addEventListener('DOMContentLoaded', () => {
    cargarAnotacionesLocales();
    inyectarActionSheet();
    configurarEventosSidebar();
    
    // Si la carga inicial de jsgral.js ya renderizó versículos, aplicar anotaciones
    setTimeout(() => {
      configurarClicsEnVersiculos();
      aplicarAnotacionesAlCapituloActual();
    }, 600);
  });
})();
